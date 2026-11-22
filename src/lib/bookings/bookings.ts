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

export const formatDateTime = (value: string | null) => {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat("en-BD", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
};

export const formatCurrency = (amount: number | null) =>
  amount === null
    ? "—"
    : `৳${amount.toLocaleString("en-BD", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;

export const getAmount = (booking: CustomerBooking) =>
  booking.finalAmount ?? booking.basePrice ?? booking.service?.basePrice;
