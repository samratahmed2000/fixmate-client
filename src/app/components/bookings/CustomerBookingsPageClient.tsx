"use client";

import { useEffect, useState } from "react";
import { CalendarDaysIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import CustomerBookingsList from "@/app/components/bookings/CustomerBookingsList";
import CustomerBookingsSkeleton from "@/app/components/bookings/CustomerBookingsSkeleton";
import { getCustomerBookings } from "@/lib/actions/bookings";
import type { CustomerBooking } from "@/types/bookings";

const CustomerBookingsPageClient = () => {
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    getCustomerBookings()
      .then((result) => {
        if (isCurrent) setBookings(result);
      })
      .catch((fetchError: unknown) => {
        if (isCurrent) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Failed to fetch your bookings",
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

  const handleBookingCancelled = (bookingId: string) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking._id === bookingId
          ? { ...booking, status: "cancelled" }
          : booking,
      ),
    );
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          My Bookings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Track your repair requests, booking status, and payment.
        </p>
      </div>

      {isLoading ? (
        <CustomerBookingsSkeleton />
      ) : error ? (
        <Card className="border-dashed py-10">
          <div className="flex flex-col items-center gap-4 px-4 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button type="button" variant="outline" onClick={retryLoading}>
              <RefreshCwIcon data-icon="inline-start" />
              Try Again
            </Button>
          </div>
        </Card>
      ) : bookings.length === 0 ? (
        <Card className="border-dashed py-12">
          <Empty>
            <EmptyMedia variant="icon">
              <CalendarDaysIcon className="size-6 text-primary" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No bookings yet</EmptyTitle>
              <EmptyDescription>
                Your repair service requests will appear here.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Card>
      ) : (
        <CustomerBookingsList
          bookings={bookings}
          onBookingCancelled={handleBookingCancelled}
        />
      )}
    </section>
  );
};

export default CustomerBookingsPageClient;
