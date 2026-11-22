import { randomUUID } from "node:crypto";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { auth, mongoClient } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

const normalizeStatus = (status: unknown) =>
  String(status || "")
    .toLowerCase()
    .replaceAll("_", "-")
    .replace("on-progress", "in-progress");

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Sign in to make a payment" },
        { status: 401 },
      );
    }
    if (session.user.role !== "customer") {
      return NextResponse.json(
        { success: false, message: "Only customers can make booking payments" },
        { status: 403 },
      );
    }

    const body: unknown = await request.json().catch(() => null);
    const bookingId =
      body && typeof body === "object" && "bookingId" in body
        ? body.bookingId
        : undefined;
    if (
      typeof bookingId !== "string" ||
      !/^[a-f\d]{24}$/i.test(bookingId) ||
      !ObjectId.isValid(bookingId)
    ) {
      return NextResponse.json(
        { success: false, message: "A valid booking is required" },
        { status: 400 },
      );
    }

    await mongoClient.connect();
    const database = mongoClient.db("fixMate");
    const booking = await database.collection("bookings").findOne({
      _id: new ObjectId(bookingId),
      customerId: session.user.id,
    });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 },
      );
    }
    if (normalizeStatus(booking.status) !== "completed") {
      return NextResponse.json(
        { success: false, message: "Only completed bookings can be paid" },
        { status: 409 },
      );
    }
    if (String(booking.paymentStatus || "").toLowerCase() === "paid") {
      return NextResponse.json(
        { success: false, message: "This booking has already been paid" },
        { status: 409 },
      );
    }
    if (booking.paymentRequested !== true) {
      return NextResponse.json(
        {
          success: false,
          message: "The technician has not requested payment for this booking",
        },
        { status: 409 },
      );
    }

    const serviceId =
      booking.serviceId instanceof ObjectId
        ? booking.serviceId
        : typeof booking.serviceId === "string" &&
            ObjectId.isValid(booking.serviceId)
          ? new ObjectId(booking.serviceId)
          : null;
    const service = serviceId
      ? await database.collection("services").findOne({ _id: serviceId })
      : null;

    if (!service) {
      return NextResponse.json(
        { success: false, message: "The booked service could not be found" },
        { status: 404 },
      );
    }

    const amount = Number(
      booking.finalAmount ?? booking.basePrice ?? service.basePrice,
    );
    const unitAmount = Math.round(amount * 100);
    if (
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !Number.isSafeInteger(unitAmount) ||
      unitAmount > 99_999_999 ||
      Math.abs(amount - unitAmount / 100) > 0.001
    ) {
      return NextResponse.json(
        { success: false, message: "The booking has an invalid payment amount" },
        { status: 409 },
      );
    }

    const origin = new URL(request.url).origin;
    const bookings = database.collection("bookings");
    const lockId = randomUUID();
    const now = new Date();
    const lockResult = await bookings.updateOne(
      {
        _id: booking._id,
        customerId: session.user.id,
        paymentStatus: { $not: /^paid$/i },
        $or: [
          { "stripeCheckout.lockExpiresAt": { $exists: false } },
          { "stripeCheckout.lockExpiresAt": { $lte: now } },
        ],
      },
      {
        $set: {
          "stripeCheckout.lockId": lockId,
          "stripeCheckout.lockExpiresAt": new Date(now.getTime() + 120_000),
        },
      },
    );

    if (lockResult.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment is already being prepared. Please try again.",
        },
        { status: 409 },
      );
    }

    try {
      const lockedBooking = await bookings.findOne({
        _id: booking._id,
        customerId: session.user.id,
        "stripeCheckout.lockId": lockId,
      });
      if (!lockedBooking) {
        return NextResponse.json(
          { success: false, message: "Could not prepare this payment" },
          { status: 409 },
        );
      }

      const existingSessionId = lockedBooking.stripeCheckout?.sessionId;
      let isExistingSessionExpired = false;
      if (existingSessionId) {
        const existingSession =
          await stripe.checkout.sessions.retrieve(existingSessionId);
        if (existingSession.status === "open" && existingSession.url) {
          return NextResponse.json({
            success: true,
            data: { url: existingSession.url },
          });
        }
        if (
          existingSession.status === "complete" &&
          existingSession.payment_status === "paid"
        ) {
          return NextResponse.json({
            success: true,
            data: {
              url: `${origin}/dashboard/customer/payment/success?session_id=${encodeURIComponent(existingSession.id)}`,
            },
          });
        }
        if (existingSession.status === "complete") {
          return NextResponse.json(
            {
              success: false,
              message: "This payment is still processing. Please try again.",
            },
            { status: 409 },
          );
        }
        if (existingSession.status !== "expired") {
          return NextResponse.json(
            {
              success: false,
              message: "The existing payment session could not be reused",
            },
            { status: 409 },
          );
        }
        isExistingSessionExpired = true;
      }

      const idempotencyKey =
        !isExistingSessionExpired &&
        typeof lockedBooking.stripeCheckout?.idempotencyKey === "string"
          ? lockedBooking.stripeCheckout.idempotencyKey
          : randomUUID();
      const checkoutStateUpdate = await bookings.updateOne(
        { _id: booking._id, "stripeCheckout.lockId": lockId },
        {
          $set: { "stripeCheckout.idempotencyKey": idempotencyKey },
          ...(isExistingSessionExpired
            ? {
                $unset: {
                  "stripeCheckout.sessionId": "",
                  "stripeCheckout.createdAt": "",
                },
              }
            : {}),
        },
      );
      if (checkoutStateUpdate.matchedCount === 0) {
        throw new Error("Could not save payment session state");
      }

      const checkoutSession = await stripe.checkout.sessions.create(
        {
          mode: "payment",
          customer_email: session.user.email,
          client_reference_id: bookingId,
          line_items: [
            {
              price_data: {
                currency: "bdt",
                unit_amount: unitAmount,
                product_data: {
                  name: service.title || "FixMate repair service",
                  description: `${service.category || "Repair"} · ${service.serviceMode || "Service"}`,
                },
              },
              quantity: 1,
            },
          ],
          metadata: {
            bookingId,
            customerId: session.user.id,
            serviceTitle: String(service.title || ""),
            category: String(service.category || ""),
            serviceMode: String(service.serviceMode || ""),
            technicianName: String(service.technicianName || ""),
          },
          payment_intent_data: {
            metadata: {
              bookingId,
              customerId: session.user.id,
            },
          },
          success_url: `${origin}/dashboard/customer/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/dashboard/customer/payment/cancel?booking_id=${encodeURIComponent(bookingId)}`,
        },
        { idempotencyKey },
      );

      if (!checkoutSession.url) {
        return NextResponse.json(
          { success: false, message: "Stripe did not return a checkout URL" },
          { status: 502 },
        );
      }

      const savedSession = await bookings.updateOne(
        { _id: booking._id, "stripeCheckout.lockId": lockId },
        {
          $set: {
            "stripeCheckout.sessionId": checkoutSession.id,
            "stripeCheckout.createdAt": new Date(),
          },
        },
      );
      if (savedSession.modifiedCount === 0) {
        throw new Error("Could not save Stripe checkout session");
      }

      return NextResponse.json({
        success: true,
        data: { url: checkoutSession.url },
      });
    } finally {
      await bookings.updateOne(
        { _id: booking._id, "stripeCheckout.lockId": lockId },
        {
          $unset: {
            "stripeCheckout.lockId": "",
            "stripeCheckout.lockExpiresAt": "",
          },
        },
      );
    }
  } catch (error) {
    console.error("Failed to create Stripe checkout session:", error);
    return NextResponse.json(
      { success: false, message: "Unable to start payment. Please try again." },
      { status: 500 },
    );
  }
}
