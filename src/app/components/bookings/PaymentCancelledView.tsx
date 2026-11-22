"use client";

import * as React from "react";
import Link from "next/link";
import { CircleAlertIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { createBookingCheckoutSession } from "@/lib/actions/bookings";
import { cn } from "@/lib/utils";

const PaymentCancelledView = ({ bookingId }: { bookingId: string }) => {
  const [isRetrying, setIsRetrying] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleRetry = async () => {
    if (!bookingId || isRetrying) return;
    setError("");
    setIsRetrying(true);
    try {
      const checkoutUrl = await createBookingCheckoutSession(bookingId);
      window.location.assign(checkoutUrl);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to start payment. Please try again.",
      );
      setIsRetrying(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-10 sm:px-6 lg:py-16">
      <Card>
        <CardHeader className="items-center text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
            <CircleAlertIcon aria-hidden="true" className="size-6" />
          </div>
          <CardTitle className="font-heading text-2xl">
            Payment Cancelled
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 text-center">
          <p className="text-sm text-muted-foreground">
            Your payment was cancelled and you have not been charged. You can
            return to checkout whenever you are ready.
          </p>

          {error ? (
            <p
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}

          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <Button
              type="button"
              disabled={!bookingId || isRetrying}
              onClick={() => void handleRetry()}
            >
              {isRetrying ? (
                <>
                  <Spinner data-icon="inline-start" />
                  Connecting to Stripe…
                </>
              ) : (
                "Try Again"
              )}
            </Button>
            <Link
              href="/dashboard/customer/bookings"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Back to My Bookings
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PaymentCancelledView;
