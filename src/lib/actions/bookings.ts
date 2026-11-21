import { baseUrl } from "../utils";
import type { CreateBookingInput, CustomerBooking } from "@/types/bookings";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getErrorMessage = (data: unknown, fallback: string) =>
  isRecord(data) && typeof data.message === "string"
    ? data.message
    : fallback;

const isCustomerBooking = (value: unknown): value is CustomerBooking =>
  isRecord(value) &&
  typeof value._id === "string" &&
  typeof value.serviceId === "string" &&
  typeof value.bookingDate === "string" &&
  typeof value.status === "string" &&
  (value.service === null || isRecord(value.service));

export const getCustomerBookings = async () => {
  const res = await fetch(`${baseUrl}/api/bookings/my`, {
    cache: "no-store",
    credentials: "include",
  });

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error("The server returned an invalid response");
  }

  if (!res.ok) {
    throw new Error(getErrorMessage(data, "Failed to fetch bookings"));
  }

  if (!isRecord(data) || !Array.isArray(data.data)) {
    throw new Error("The server returned an invalid bookings list");
  }

  if (!data.data.every(isCustomerBooking)) {
    throw new Error("The server returned invalid booking details");
  }

  return data.data;
};

export const hasActiveServiceBooking = async (serviceId: string) => {
  const query = new URLSearchParams({ serviceId });
  const res = await fetch(`${baseUrl}/api/bookings?${query}`, {
    cache: "no-store",
    credentials: "include",
  });

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error("The server returned an invalid response");
  }

  if (!res.ok) {
    throw new Error(getErrorMessage(data, "Failed to check booking status"));
  }

  if (
    typeof data !== "object" ||
    data === null ||
    !("hasActiveBooking" in data) ||
    typeof data.hasActiveBooking !== "boolean"
  ) {
    throw new Error("The server returned an invalid booking status");
  }

  return data.hasActiveBooking;
};

export const bookingService = async (booking: CreateBookingInput) => {
  const res = await fetch(`${baseUrl}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
    cache: "no-store",
    credentials: "include",
  });

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error("The server returned an invalid response");
  }

  if (!res.ok) {
    throw new Error(getErrorMessage(data, "Failed to submit repair request"));
  }
};

export const cancelCustomerBooking = async (bookingId: string) => {
  const res = await fetch(
    `${baseUrl}/api/bookings/${encodeURIComponent(bookingId)}`,
    {
      method: "DELETE",
      cache: "no-store",
      credentials: "include",
    },
  );

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error("The server returned an invalid response");
  }

  if (!res.ok) {
    throw new Error(getErrorMessage(data, "Failed to cancel booking"));
  }
};
