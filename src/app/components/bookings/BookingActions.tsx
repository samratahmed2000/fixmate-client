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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  cancelCustomerBooking,
  createBookingCheckoutSession,
} from "@/lib/actions/bookings";
import { getAmount } from "@/lib/bookings/bookings";
import { notifyDashboardDataUpdated } from "@/lib/dashboard/refresh";
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
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isStartingPayment, setIsStartingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const status = normalizeBookingStatus(booking.status);
  const isUnpaid = booking.paymentStatus?.toLowerCase() !== "paid";
  const canCancel = status === "requested";
  const canPay =
    status === "completed" && isUnpaid && booking.paymentRequested === true;
  const awaitingPaymentRequest =
    status === "completed" && isUnpaid && !booking.paymentRequested;
  const amount = getAmount(booking);

  const handleBookingCancel = async () => {
    if (isCancelling) return;

    setIsCancelling(true);

    try {
      await cancelCustomerBooking(booking._id);
      notifyDashboardDataUpdated();
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

  const handleStartPayment = async () => {
    if (isStartingPayment) return;

    setPaymentError("");
    setIsStartingPayment(true);
    try {
      const checkoutUrl = await createBookingCheckoutSession(booking._id);
      window.location.assign(checkoutUrl);
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Unable to start payment. Please try again.",
      );
    } finally {
      setIsStartingPayment(false);
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
              onClick={() => {
                setPaymentError("");
                setIsPaymentDialogOpen(true);
              }}
            >
              Pay Now
            </Button>
          )}
        </div>
      ) : (
        <span className="text-muted-foreground">
          {awaitingPaymentRequest ? "Awaiting payment request" : "—"}
        </span>
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

      <Dialog
        open={isPaymentDialogOpen}
        onOpenChange={(open) => {
          if (!isStartingPayment) setIsPaymentDialogOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Payment</DialogTitle>
            <DialogDescription>
              Review the details before continuing to Payment.
            </DialogDescription>
          </DialogHeader>

          <Card className="border-border shadow-none">
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Service Name</p>
                <p className="mt-1 font-semibold">
                  {booking.service?.title || "Service unavailable"}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 border-y py-3">
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="mt-1 font-medium">
                    {booking.service?.category || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Service Mode</p>
                  <p className="mt-1 font-medium">
                    {booking.service?.serviceMode || "—"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Final Amount</p>
                <p className="font-heading text-lg font-bold tabular-nums">
                  {amount !== undefined ? `৳${amount}` : "—"}
                </p>
              </div>
            </CardContent>
          </Card>

          {paymentError ? (
            <p
              role="alert"
              className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            >
              {paymentError}
            </p>
          ) : null}

          <DialogFooter>
            <Button
              type="button"
              disabled={isStartingPayment || amount === undefined}
              onClick={() => void handleStartPayment()}
            >
              {isStartingPayment ? (
                <>
                  <Spinner data-icon="inline-start" />
                  Connecting to Stripe…
                </>
              ) : (
                "Make Payment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingActions;
