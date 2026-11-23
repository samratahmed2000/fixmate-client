import Link from "next/link";
import { CircleCheckIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireDashboardRole } from "@/lib/core/server";
import { confirmStripeCheckout } from "@/lib/api/payments";
import { cn } from "@/lib/utils";

const PaymentSuccessPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) => {
  await requireDashboardRole("customer");
  const { session_id: sessionIdParam } = await searchParams;
  const sessionId = Array.isArray(sessionIdParam)
    ? sessionIdParam[0]
    : sessionIdParam;

  let payment:
    | Awaited<ReturnType<typeof confirmStripeCheckout>>
    | null = null;
  let errorMessage = "";

  if (sessionId) {
    try {
      payment = await confirmStripeCheckout(sessionId);
    } catch (error) {
      console.error("Could not confirm Stripe checkout:", error);
      errorMessage =
        "We could not confirm this payment. Please check your payment history or contact support.";
    }
  } else {
    errorMessage = "The payment confirmation details are missing.";
  }

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 lg:py-16">
      {payment ? (
        <Card>
          <CardHeader className="items-center text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CircleCheckIcon aria-hidden="true" className="size-6" />
            </div>
            <CardTitle className="font-heading text-2xl">
              Payment Successful
            </CardTitle>
            <CardDescription>
              Your booking payment has been recorded.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-lg border bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="font-heading text-xl font-bold tabular-nums">
                  ৳{payment.amount}
                </span>
              </div>
              <div className="mt-4 border-t pt-3">
                <p className="text-xs text-muted-foreground">Transaction ID</p>
                <p className="mt-1 break-all font-mono text-sm">
                  {payment.transactionId}
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/customer/bookings"
              className={cn(buttonVariants(), "w-full")}
            >
              Back to My Bookings
            </Link>
            <Link
              href="/dashboard/customer/payments"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full",
              )}
            >
              View Payment History
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-destructive/30">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-xl">
              Payment Not Confirmed
            </CardTitle>
            <CardDescription>{errorMessage}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/dashboard/customer/bookings"
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              Back to My Bookings
            </Link>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default PaymentSuccessPage;
