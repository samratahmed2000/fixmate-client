import type { Dispatch, SetStateAction } from "react";
import { toast } from "@/components/ui/toast";
import {
  markTechnicianBookingPaid,
  updateTechnicianBookingStatus,
} from "@/lib/actions/bookings";
import type {
  TechnicianBooking,
  TechnicianBookingStatus,
} from "@/types/bookings";

export const handleTechnicianBookingStatus = async (
  booking: TechnicianBooking,
  status: TechnicianBookingStatus,
  isUpdating: boolean,
  setIsUpdating: Dispatch<SetStateAction<boolean>>,
  onBookingUpdated: (booking: TechnicianBooking) => void,
) => {
  if (isUpdating) return;

  setIsUpdating(true);

  try {
    const result = await updateTechnicianBookingStatus(booking._id, status);
    onBookingUpdated({ ...booking, status: result.status });
    toast.add({
      title: "Request updated",
      description: `Booking status changed to ${result.status}.`,
      type: "success",
    });
  } catch (error) {
    toast.add({
      title: "Could not update request",
      description:
        error instanceof Error ? error.message : "Please try again.",
      type: "error",
    });
  } finally {
    setIsUpdating(false);
  }
};

export const handleTechnicianBookingPayment = async (
  booking: TechnicianBooking,
  finalAmount: number,
  isSaving: boolean,
  setIsSaving: Dispatch<SetStateAction<boolean>>,
  onBookingUpdated: (booking: TechnicianBooking) => void,
) => {
  if (isSaving) return false;
  if (!Number.isFinite(finalAmount) || finalAmount < 0) {
    toast.add({
      title: "Invalid final amount",
      description: "Enter a valid amount of zero or more.",
      type: "error",
    });
    return false;
  }

  setIsSaving(true);

  try {
    const result = await markTechnicianBookingPaid(booking._id, finalAmount);
    onBookingUpdated({
      ...booking,
      finalAmount: result.finalAmount,
      paymentStatus: result.paymentStatus,
    });
    toast.add({
      title: "Payment recorded",
      description: `Final amount ৳${result.finalAmount} was recorded.`,
      type: "success",
    });
    return true;
  } catch (error) {
    toast.add({
      title: "Could not record payment",
      description:
        error instanceof Error ? error.message : "Please try again.",
      type: "error",
    });
    return false;
  } finally {
    setIsSaving(false);
  }
};
