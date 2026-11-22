import type { Dispatch, SetStateAction } from "react";
import { toast } from "@/components/ui/toast";
import { notifyDashboardDataUpdated } from "@/lib/dashboard/refresh";
import {
  requestTechnicianBookingPayment,
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
    notifyDashboardDataUpdated();
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

export const handleTechnicianPaymentRequest = async (
  booking: TechnicianBooking,
  finalAmount: number,
  isSaving: boolean,
  setIsSaving: Dispatch<SetStateAction<boolean>>,
  onBookingUpdated: (booking: TechnicianBooking) => void,
) => {
  if (isSaving) return false;
  if (!Number.isFinite(finalAmount) || finalAmount <= 0) {
    toast.add({
      title: "Invalid final amount",
      description: "Enter a valid amount greater than zero.",
      type: "error",
    });
    return false;
  }

  setIsSaving(true);

  try {
    const result = await requestTechnicianBookingPayment(
      booking._id,
      finalAmount,
    );
    onBookingUpdated({
      ...booking,
      finalAmount: result.finalAmount,
      paymentStatus: result.paymentStatus,
      paymentRequested: result.paymentRequested,
    });
    toast.add({
      title: "Payment request sent",
      description: `The customer can now pay ৳${result.finalAmount} through Stripe.`,
      type: "success",
    });
    return true;
  } catch (error) {
    toast.add({
      title: "Could not send payment request",
      description:
        error instanceof Error ? error.message : "Please try again.",
      type: "error",
    });
    return false;
  } finally {
    setIsSaving(false);
  }
};
