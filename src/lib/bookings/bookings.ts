import { CustomerBooking } from "@/types/bookings";

export const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-BD", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

export const getAmount = (booking: CustomerBooking) =>
  booking.finalAmount ?? booking.basePrice ?? booking.service?.basePrice;
