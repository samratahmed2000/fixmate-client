import { baseUrl } from "../utils";
import type { CreateBookingInput } from "@/types/bookings";

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
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "Failed to check booking status";

    throw new Error(message);
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
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "Failed to submit repair request";

    throw new Error(message);
  }
};
