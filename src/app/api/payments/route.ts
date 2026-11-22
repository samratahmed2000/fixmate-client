import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getCustomerPaymentHistory } from "@/lib/stripe-payments";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Sign in to view your payment history" },
        { status: 401 },
      );
    }
    if (session.user.role !== "customer") {
      return NextResponse.json(
        { success: false, message: "Customer access required" },
        { status: 403 },
      );
    }

    const payments = await getCustomerPaymentHistory(session.user.id);
    return NextResponse.json({
      success: true,
      message: "Payment history fetched successfully",
      data: payments,
    });
  } catch (error) {
    console.error("Failed to fetch customer payment history:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch payment history" },
      { status: 500 },
    );
  }
}
