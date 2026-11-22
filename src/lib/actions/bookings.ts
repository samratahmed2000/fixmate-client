import { baseUrl } from "../utils";
import type {
  CreateBookingInput,
  AdminBooking,
  AdminBookingStatusFilter,
  CustomerBooking,
  TechnicianBooking,
  TechnicianBookingStatus,
} from "@/types/bookings";

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

const isTechnicianBooking = (value: unknown): value is TechnicianBooking =>
  isRecord(value) &&
  typeof value._id === "string" &&
  typeof value.serviceId === "string" &&
  typeof value.customerName === "string" &&
  typeof value.phone === "string" &&
  typeof value.address === "string" &&
  typeof value.bookingDate === "string" &&
  typeof value.problemDescription === "string" &&
  typeof value.status === "string" &&
  typeof value.paymentStatus === "string" &&
  (value.service === null ||
    (isRecord(value.service) && typeof value.service.title === "string"));

const isAdminBooking = (value: unknown): value is AdminBooking =>
  isRecord(value) &&
  typeof value._id === "string" &&
  (value.service === null ||
  (isRecord(value.service) && typeof value.service.title === "string")) &&
  typeof value.customerName === "string" &&
  typeof value.technicianName === "string" &&
  typeof value.bookingDate === "string" &&
  typeof value.status === "string" &&
  typeof value.paymentStatus === "string" &&
  (value.amount === null ||
  typeof value.amount === "number" ||
  typeof value.amount === "string");

export const getAdminBookings = async (
  status: AdminBookingStatusFilter,
): Promise<AdminBooking[]> => {
  const query = new URLSearchParams({ status });
  const res = await fetch(`${baseUrl}/api/bookings/admin?${query}`, {
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

  if (!data.data.every(isAdminBooking)) {
  throw new Error("The server returned invalid booking details");
  }

  return data.data;
};

export const getTechnicianBookings = async (): Promise<TechnicianBooking[]> => {
  const res = await fetch(`${baseUrl}/api/bookings/technician`, {
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
    throw new Error(getErrorMessage(data, "Failed to fetch repair requests"));
  }

  if (!isRecord(data) || !Array.isArray(data.data)) {
    throw new Error("The server returned an invalid requests list");
  }

  if (!data.data.every(isTechnicianBooking)) {
    throw new Error("The server returned invalid repair request details");
  }

  return data.data;
};

const updateTechnicianBooking = async (
  bookingId: string,
  action: "status" | "payment",
  payload: Record<string, string | number>,
) => {
  const res = await fetch(
    `${baseUrl}/api/bookings/${encodeURIComponent(bookingId)}/${action}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
    throw new Error(getErrorMessage(data, "Failed to update the booking"));
  }

  if (!isRecord(data) || !isRecord(data.data)) {
    throw new Error("The server returned an invalid booking update");
  }

  return data.data;
};

export const updateTechnicianBookingStatus = async (
  bookingId: string,
  status: TechnicianBookingStatus,
): Promise<{ status: string }> => {
  const data = await updateTechnicianBooking(bookingId, "status", { status });
  if (typeof data.status !== "string") {
    throw new Error("The server returned an invalid booking status");
  }

  return { status: data.status };
};

export const markTechnicianBookingPaid = async (
  bookingId: string,
  finalAmount: number,
): Promise<{ finalAmount: number; paymentStatus: string }> => {
  const data = await updateTechnicianBooking(bookingId, "payment", {
    finalAmount,
  });
  if (
    typeof data.finalAmount !== "number" ||
    typeof data.paymentStatus !== "string"
  ) {
    throw new Error("The server returned invalid payment details");
  }

  return {
    finalAmount: data.finalAmount,
    paymentStatus: data.paymentStatus,
  };
};

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
