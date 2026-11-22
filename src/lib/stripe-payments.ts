import "server-only";

import { ObjectId } from "mongodb";
import { mongoClient } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import type { AdminTransaction } from "@/types/transactions";

const getObjectId = (value: unknown) => {
  if (value instanceof ObjectId) return value;
  if (typeof value === "string" && ObjectId.isValid(value)) {
    return new ObjectId(value);
  }
  return null;
};

const toIsoString = (value: unknown) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }
  if (typeof value === "string" && !Number.isNaN(new Date(value).getTime())) {
    return new Date(value).toISOString();
  }
  return null;
};

export const confirmStripeCheckout = async (
  sessionId: string,
  customerId: string,
) => {
  const checkout = await stripe.checkout.sessions.retrieve(sessionId);
  if (
    checkout.status !== "complete" ||
    checkout.payment_status !== "paid" ||
    checkout.metadata?.customerId !== customerId
  ) {
    throw new Error("Stripe could not verify this completed payment");
  }

  const bookingId = checkout.metadata.bookingId;
  const transactionId =
    typeof checkout.payment_intent === "string"
      ? checkout.payment_intent
      : checkout.payment_intent?.id;
  const amount = checkout.amount_total;
  if (
    !bookingId ||
    !/^[a-f\d]{24}$/i.test(bookingId) ||
    !transactionId ||
    checkout.currency !== "bdt" ||
    typeof amount !== "number" ||
    amount <= 0
  ) {
    throw new Error("Stripe returned incomplete payment details");
  }

  await mongoClient.connect();
  const database = mongoClient.db("fixMate");
  const bookings = database.collection("bookings");
  const bookingObjectId = new ObjectId(bookingId);
  const booking = await bookings.findOne({
    _id: bookingObjectId,
    customerId,
  });
  if (!booking) {
    throw new Error("The paid booking does not belong to this customer");
  }

  const existingPayment = booking.stripePayment;
  if (
    String(booking.paymentStatus || "").toLowerCase() === "paid" &&
    existingPayment?.checkoutSessionId === checkout.id
  ) {
    return {
      amount: existingPayment.amount,
      transactionId: existingPayment.transactionId,
      paymentDate: toIsoString(existingPayment.paidAt),
    };
  }
  if (String(booking.paymentStatus || "").toLowerCase() === "paid") {
    throw new Error("This booking has already been paid");
  }
  if (booking.paymentRequested !== true) {
    throw new Error("The technician has not requested payment for this booking");
  }

  const serviceId = getObjectId(booking.serviceId);
  const service = serviceId
    ? await database.collection("services").findOne({ _id: serviceId })
    : null;
  const metadata = checkout.metadata;
  const paymentDate = new Date();
  const paidAmount = amount / 100;
  const stripePayment = {
    checkoutSessionId: checkout.id,
    transactionId,
    amount: paidAmount,
    currency: checkout.currency,
    paidAt: paymentDate,
    serviceTitle: metadata.serviceTitle || service?.title || "",
    category: metadata.category || service?.category || "",
    serviceMode: metadata.serviceMode || service?.serviceMode || "",
    technicianName: metadata.technicianName || service?.technicianName || "",
  };

  const updateResult = await bookings.updateOne(
    {
      _id: bookingObjectId,
      customerId,
      paymentStatus: { $ne: "paid" },
      paymentRequested: true,
    },
    {
      $set: {
        paymentStatus: "paid",
        paymentRequested: false,
        finalAmount: paidAmount,
        stripePayment,
        updatedAt: paymentDate,
      },
    },
  );

  if (updateResult.modifiedCount === 0) {
    const currentBooking = await bookings.findOne({
      _id: bookingObjectId,
      customerId,
    });
    if (currentBooking?.stripePayment?.checkoutSessionId === checkout.id) {
      return {
        amount: currentBooking.stripePayment.amount,
        transactionId: currentBooking.stripePayment.transactionId,
        paymentDate: toIsoString(currentBooking.stripePayment.paidAt),
      };
    }
    throw new Error("This booking has already been paid");
  }

  return {
    amount: paidAmount,
    transactionId,
    paymentDate: paymentDate.toISOString(),
  };
};

export const getCustomerPaymentHistory = async (customerId: string) => {
  await mongoClient.connect();
  const database = mongoClient.db("fixMate");
  const bookings = await database
    .collection("bookings")
    .find({
      customerId,
      paymentStatus: { $regex: "^paid$", $options: "i" },
    })
    .sort({ "stripePayment.paidAt": -1, updatedAt: -1 })
    .toArray();

  const serviceIds = [
    ...new Map(
      bookings.flatMap((booking) => {
        const id = getObjectId(booking.serviceId);
        return id ? [[id.toString(), id]] : [];
      }),
    ).values(),
  ];
  const services = serviceIds.length
    ? await database
        .collection("services")
        .find(
          { _id: { $in: serviceIds } },
          {
            projection: {
              title: 1,
              category: 1,
              technicianName: 1,
              basePrice: 1,
            },
          },
        )
        .toArray()
    : [];
  const serviceById = new Map(
    services.map((service) => [service._id.toString(), service]),
  );

  return bookings.map((booking) => {
    const service = serviceById.get(booking.serviceId?.toString() || "");
    const payment = booking.stripePayment;
    return {
      id: booking._id.toString(),
      service: payment?.category || service?.category || "",
      title: payment?.serviceTitle || service?.title || "Service unavailable",
      technicianName:
        payment?.technicianName || service?.technicianName || "",
      amount:
        payment?.amount ??
        booking.finalAmount ??
        booking.basePrice ??
        service?.basePrice ??
        null,
      transactionId: payment?.transactionId || null,
      paymentDate:
        toIsoString(payment?.paidAt) ??
        toIsoString(booking.updatedAt) ??
        toIsoString(booking.createdAt),
    };
  });
};

export const getAdminPaymentTransactions = async (): Promise<{
  transactions: AdminTransaction[];
  totalRevenue: number;
}> => {
  await mongoClient.connect();
  const database = mongoClient.db("fixMate");
  const bookings = await database
    .collection("bookings")
    .find({ paymentStatus: { $regex: "^paid$", $options: "i" } })
    .sort({ "stripePayment.paidAt": -1, updatedAt: -1, _id: -1 })
    .toArray();

  const serviceIds = [
    ...new Map(
      bookings.flatMap((booking) => {
        const id = getObjectId(booking.serviceId);
        return id ? [[id.toString(), id]] : [];
      }),
    ).values(),
  ];
  const services = serviceIds.length
    ? await database
        .collection("services")
        .find(
          { _id: { $in: serviceIds } },
          {
            projection: {
              title: 1,
              technicianName: 1,
            },
          },
        )
        .toArray()
    : [];
  const serviceById = new Map(
    services.map((service) => [service._id.toString(), service]),
  );

  const transactions = bookings.map((booking): AdminTransaction => {
    const service = serviceById.get(booking.serviceId?.toString() || "");
    const payment = booking.stripePayment;
    const rawAmount =
      payment?.amount ??
      booking.finalAmount ??
      booking.basePrice ??
      null;
    const parsedAmount =
      rawAmount === null ? null : Number(rawAmount);

    return {
      id: booking._id.toString(),
      customerName: String(booking.customerName || "Customer unavailable"),
      technicianName: String(
        payment?.technicianName ||
          service?.technicianName ||
          booking.technicianName ||
          "",
      ),
      serviceTitle: String(
        payment?.serviceTitle || service?.title || "Service unavailable",
      ),
      amount:
        parsedAmount !== null && Number.isFinite(parsedAmount)
          ? parsedAmount
          : null,
      transactionId:
        typeof payment?.transactionId === "string"
          ? payment.transactionId
          : null,
      paymentDate:
        toIsoString(payment?.paidAt) ??
        toIsoString(booking.updatedAt) ??
        toIsoString(booking.createdAt),
    };
  });

  const totalCents = transactions.reduce(
    (total, transaction) =>
      total +
      (transaction.amount === null
        ? 0
        : Math.round(transaction.amount * 100)),
    0,
  );

  return {
    transactions,
    totalRevenue: totalCents / 100,
  };
};
