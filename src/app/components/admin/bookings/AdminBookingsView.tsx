"use client";

import * as React from "react";
import { CalendarDaysIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import SelectField from "@/app/components/shared/SelectField";
import { getAdminBookings } from "@/lib/actions/bookings";
import type {
  AdminBooking,
  AdminBookingStatusFilter,
} from "@/types/bookings";
import type { SelectOption } from "@/lib/services/service-options";
import AdminBookingCard from "./AdminBookingCard";
import AdminBookingsTable from "./AdminBookingsTable";

const statusOptions: SelectOption<AdminBookingStatusFilter>[] = [
  { value: "all", label: "All bookings" },
  { value: "requested", label: "Requested" },
  { value: "accepted", label: "Accepted" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "rejected", label: "Rejected" },
];

const AdminBookingsView = () => {
  const [bookings, setBookings] = React.useState<AdminBooking[]>([]);
  const [status, setStatus] =
    React.useState<AdminBookingStatusFilter>("all");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [loadAttempt, setLoadAttempt] = React.useState(0);

  React.useEffect(() => {
    let isCurrent = true;

    getAdminBookings(status)
      .then((result) => {
        if (isCurrent) setBookings(result);
      })
      .catch((cause: unknown) => {
        if (isCurrent) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Failed to fetch booking history",
          );
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [status, loadAttempt]);

  const handleStatusChange = (nextStatus: AdminBookingStatusFilter) => {
    setStatus(nextStatus);
    setIsLoading(true);
    setError("");
  };

  const retryLoading = () => {
    setError("");
    setIsLoading(true);
    setLoadAttempt((attempt) => attempt + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SelectField
          id="booking-status-filter"
          label="Filter by status"
          value={status}
          onValueChange={handleStatusChange}
          options={statusOptions}
          className="w-full sm:max-w-56"
        />
        {!isLoading && !error ? (
          <Badge variant="secondary">
            {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
          </Badge>
        ) : null}
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border-b pb-3 last:border-0"
              >
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </CardContent>
        </Card>
      ) : error ? (
        <Card className="border-dashed py-10">
          <CardContent className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button type="button" variant="outline" onClick={retryLoading}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : bookings.length === 0 ? (
        <Card className="border-dashed py-12">
          <Empty>
            <EmptyMedia variant="icon">
              <CalendarDaysIcon aria-hidden="true" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No bookings found</EmptyTitle>
              <EmptyDescription>
                There are no bookings for this status yet.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </Card>
      ) : (
        <>
          <AdminBookingsTable bookings={bookings} />
          <div className="space-y-3 md:hidden">
            {bookings.map((booking) => (
              <AdminBookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBookingsView;
