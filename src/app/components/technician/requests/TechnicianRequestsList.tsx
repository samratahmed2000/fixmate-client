"use client";

import { useEffect, useState } from "react";
import { ClipboardListIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getTechnicianBookings } from "@/lib/actions/bookings";
import type { TechnicianBooking } from "@/types/bookings";
import TechnicianRequestCard from "./TechnicianRequestCard";
import TechnicianRequestTable from "./TechnicianRequestTable";
import TechnicianRequestsSkeleton from "./TechnicianRequestsSkeleton";

const TechnicianRequestsList = () => {
  const [bookings, setBookings] = useState<TechnicianBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    let isCurrent = true;

    getTechnicianBookings()
      .then((result) => {
        if (isCurrent) setBookings(result);
      })
      .catch((fetchError: unknown) => {
        if (isCurrent) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Failed to fetch repair requests",
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

  const handleBookingUpdated = (updatedBooking: TechnicianBooking) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking._id === updatedBooking._id ? updatedBooking : booking,
      ),
    );
  };

  if (isLoading) {
    return <TechnicianRequestsSkeleton />;
  }

  if (error) {
    return (
      <Card className="border-dashed py-10">
        <div className="flex flex-col items-center gap-4 px-4 text-center">
          <p className="text-sm text-destructive">{error}</p>
          <Button type="button" variant="outline" onClick={retryLoading}>
            <RefreshCwIcon data-icon="inline-start" />
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card className="border-dashed py-12">
        <Empty>
          <EmptyMedia variant="icon">
            <ClipboardListIcon className="size-6 text-primary" />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>No service requests yet</EmptyTitle>
            <EmptyDescription>
              Customer bookings for your services will appear here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Card>
    );
  }

  return (
    <>
      <TechnicianRequestTable
        bookings={bookings}
        onBookingUpdated={handleBookingUpdated}
      />
      <div className="space-y-3 md:hidden">
        {bookings.map((booking) => (
          <TechnicianRequestCard
            key={booking._id}
            booking={booking}
            onBookingUpdated={handleBookingUpdated}
          />
        ))}
      </div>
    </>
  );
};

export default TechnicianRequestsList;
