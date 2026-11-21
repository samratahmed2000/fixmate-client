"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { cancelCustomerBooking } from "@/lib/actions/bookings";
import type { CustomerBooking } from "@/types/bookings";
import { normalizeBookingStatus } from "./BookingBadges";

const BookingActions = ({
  booking,
  mobile = false,
  onBookingCancelled,
}: {
  booking: CustomerBooking;
  mobile?: boolean;
  onBookingCancelled: (bookingId: string) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const status = normalizeBookingStatus(booking.status);
  const isUnpaid = booking.paymentStatus?.toLowerCase() !== "paid";
  const canCancel = status === "requested";
  const canPay = status === "completed" && isUnpaid;

  const handleBookingCancel = async () => {
    if (isCancelling) return;

    setIsCancelling(true);

    try {
      await cancelCustomerBooking(booking._id);
      toast.add({
        title: "Booking cancelled",
        description: "Your repair request has been cancelled.",
        type: "success",
      });
      onBookingCancelled(booking._id);
      setIsDialogOpen(false);
    } catch (error) {
      toast.add({
        title: "Could not cancel booking",
        description:
          error instanceof Error
            ? error.message
            : "Please try cancelling your booking again.",
        type: "error",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      {canCancel || canPay ? (
        <div className={`flex gap-2 ${mobile ? "w-full" : "justify-center"}`}>
          {canCancel && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsDialogOpen(true)}
              className={`cursor-pointer ${mobile ? "flex-1" : ""}`}
            >
              Cancel
            </Button>
          )}
          {canPay && (
            <Button
              type="button"
              size="sm"
              className={`cursor-pointer ${mobile ? "flex-1" : ""}`}
            >
              Pay Now
            </Button>
          )}
        </div>
      ) : (
        <span className="text-muted-foreground">—</span>
      )}

      <AlertDialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!isCancelling) setIsDialogOpen(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader className="sm:text-center">
            <AlertDialogTitle className="w-full text-center">
              Cancel this booking?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your request for{" "}
              <span className="font-medium text-foreground">
                {booking.service?.title || "this service"}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isCancelling}
              className="cursor-pointer"
            >
              Keep Booking
            </AlertDialogCancel>
            <AlertDialogAction
              type="button"
              variant="destructive"
              disabled={isCancelling}
              className="cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                void handleBookingCancel();
              }}
            >
              {isCancelling ? (
                <>
                  <Spinner data-icon="inline-start" />
                  Cancelling...
                </>
              ) : (
                "Confirm Cancel"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingActions;
