"use client";

import * as React from "react";
import { CreditCardIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { getCustomerPaymentHistory } from "@/lib/actions/bookings";
import type { CustomerPayment } from "@/types/bookings";
import PaymentHistoryCard from "./PaymentHistoryCard";
import PaymentHistoryTable from "./PaymentHistoryTable";

const CustomerPaymentsView = () => {
  const [payments, setPayments] = React.useState<CustomerPayment[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [loadAttempt, setLoadAttempt] = React.useState(0);

  React.useEffect(() => {
    let isCurrent = true;
    getCustomerPaymentHistory()
      .then((result) => {
        if (isCurrent) setPayments(result);
      })
      .catch((cause: unknown) => {
        if (isCurrent) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Failed to fetch payment history",
          );
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [loadAttempt]);

  const retryLoading = () => {
    setError("");
    setIsLoading(true);
    setLoadAttempt((attempt) => attempt + 1);
  };

  return (
    <section className="space-y-6">
      <header>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Payment History
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Review your completed one-time service payments.
        </p>
      </header>

      {isLoading ? (
        <Card>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border-b pb-3 last:border-0"
              >
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="border-dashed py-10">
          <CardContent className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button type="button" variant="outline" onClick={retryLoading}>
              <RefreshCwIcon data-icon="inline-start" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : payments.length === 0 ? (
        <Card className="border-dashed py-12">
          <Empty>
            <EmptyMedia variant="icon">
              <CreditCardIcon aria-hidden="true" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No payments yet</EmptyTitle>
              <EmptyDescription>
                Your successful payments will appear here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Card>
      ) : (
        <>
          <PaymentHistoryTable payments={payments} />
          <div className="space-y-3 md:hidden">
            {payments.map((payment) => (
              <PaymentHistoryCard key={payment.id} payment={payment} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default CustomerPaymentsView;
