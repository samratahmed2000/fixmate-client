"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { normalizeBookingStatus } from "@/app/components/bookings/BookingBadges";
import {
  handleTechnicianPaymentRequest,
  handleTechnicianBookingStatus,
} from "@/helper/bookings/handleTechnicianRequest";
import type {
  TechnicianBooking,
  TechnicianBookingStatus,
} from "@/types/bookings";

interface TechnicianRequestActionsProps {
  booking: TechnicianBooking;
  mobile?: boolean;
  onBookingUpdated: (booking: TechnicianBooking) => void;
}

const TechnicianRequestActions = ({
  booking,
  mobile = false,
  onBookingUpdated,
}: TechnicianRequestActionsProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSendingPaymentRequest, setIsSendingPaymentRequest] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [finalAmount, setFinalAmount] = useState(
    String(booking.service?.basePrice ?? ""),
  );
  const status = normalizeBookingStatus(booking.status);
  const isUnpaid = booking.paymentStatus.toLowerCase() !== "paid";
  const hasPaymentRequest = booking.paymentRequested === true;

  const updateStatus = (nextStatus: TechnicianBookingStatus) => {
    void handleTechnicianBookingStatus(
      booking,
      nextStatus,
      isUpdating,
      setIsUpdating,
      onBookingUpdated,
    );
  };

  const submitPaymentRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = Number(finalAmount);

    void handleTechnicianPaymentRequest(
      booking,
      amount,
      isSendingPaymentRequest,
      setIsSendingPaymentRequest,
      onBookingUpdated,
    ).then((saved) => {
      if (saved) setIsPaymentDialogOpen(false);
    });
  };

  const buttonClassName = mobile
    ? "w-full"
    : "min-w-0 px-1.5 text-[11px] leading-4";
  const fullWidthButtonClassName = mobile
    ? "col-span-2 w-full"
    : "min-w-0 px-1.5 text-[11px] leading-4";

  return (
    <>
      <div
        className={
          mobile
            ? "grid w-full grid-cols-2 gap-2"
            : "flex items-center justify-center gap-1"
        }
      >
        {status === "requested" ? (
          <>
            <Button
              type="button"
              size="sm"
              className={buttonClassName}
              disabled={isUpdating}
              onClick={() => updateStatus("accepted")}
            >
              Accept
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className={buttonClassName}
              disabled={isUpdating}
              onClick={() => updateStatus("rejected")}
            >
              Reject
            </Button>
          </>
        ) : null}

        {status === "accepted" ? (
          <Button
            type="button"
            size="sm"
            className={fullWidthButtonClassName}
            disabled={isUpdating}
            onClick={() => updateStatus("in-progress")}
          >
            Start Work
          </Button>
        ) : null}

        {status === "in-progress" ? (
          <Button
            type="button"
            size="sm"
            className={fullWidthButtonClassName}
            disabled={isUpdating}
            onClick={() => updateStatus("completed")}
          >
            Mark Completed
          </Button>
        ) : null}

        {status === "completed" && isUnpaid && !hasPaymentRequest ? (
          <Button
            type="button"
            size="sm"
            className={fullWidthButtonClassName}
            onClick={() => {
              setFinalAmount(
                String(booking.finalAmount ?? booking.service?.basePrice ?? ""),
              );
              setIsPaymentDialogOpen(true);
            }}
          >
            Request Payment
          </Button>
        ) : null}
        {status === "completed" && isUnpaid && hasPaymentRequest ? (
          <span
            className={`text-sm text-muted-foreground ${
              mobile ? "col-span-2 text-center" : ""
            }`}
          >
            Requested
          </span>
        ) : null}

        {status !== "requested" &&
        status !== "accepted" &&
        status !== "in-progress" &&
        !(status === "completed" && isUnpaid) ? (
          <span
            className={`text-sm text-muted-foreground ${
              mobile ? "col-span-2 text-center" : ""
            }`}
          >
            —
          </span>
        ) : null}
      </div>

      <Dialog
        open={isPaymentDialogOpen}
        onOpenChange={(open) => {
          if (!isSendingPaymentRequest) setIsPaymentDialogOpen(open);
        }}
      >
        <DialogContent>
          <form onSubmit={submitPaymentRequest} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Request Customer Payment</DialogTitle>
              <DialogDescription>
                Enter the final amount for{" "}
                {booking.service?.title || "this service"}. The customer will
                complete the payment through Stripe.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <label
                htmlFor={`final-amount-${booking._id}`}
                className="text-sm font-medium"
              >
                Final Amount
              </label>
              <Input
                id={`final-amount-${booking._id}`}
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
                required
                value={finalAmount}
                onChange={(event) => setFinalAmount(event.target.value)}
                disabled={isSendingPaymentRequest}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isSendingPaymentRequest}
                onClick={() => setIsPaymentDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSendingPaymentRequest}>
                {isSendingPaymentRequest
                  ? "Sending Request..."
                  : "Send Payment Request"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TechnicianRequestActions;
