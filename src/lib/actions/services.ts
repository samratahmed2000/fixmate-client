import { InsertedService, Service } from "@/types/services";
import { baseUrl } from "../utils";

// Add New Service
export const addNewService = async (
  service: Service,
): Promise<InsertedService> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured");
  }

  const res = await fetch(`${baseUrl}/api/services`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      typeof data?.message === "string"
        ? data.message
        : "Failed to publish service",
    );
  }

  return data as InsertedService;
};

// Update Service
export const updateService = async (
  id: string,
  service: Partial<Service>,
): Promise<{ success: boolean; message: string }> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured");
  }

  const res = await fetch(`${baseUrl}/api/services/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(service),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      typeof data?.message === "string"
        ? data.message
        : "Failed to update service",
    );
  }

  return data;
};

// Delete Service
export const deleteService = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured");
  }

  const res = await fetch(`${baseUrl}/api/services/${id}`, {
    method: "DELETE",
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(
      typeof data?.message === "string"
        ? data.message
        : "Failed to delete service",
    );
  }

  return {
    success: true,
    message: data?.message || "Service deleted successfully",
  };
};

// Toggle Service Availability (Active / Not-Active)
export const toggleServiceAvailability = async (
  id: string,
  newAvailability: "Active" | "Not-Active",
): Promise<{ success: boolean; message: string }> => {
  return updateService(id, {
    availability: newAvailability,
    isActive: newAvailability === "Active",
  });
};

export const toggleServiceStatus = async (
  id: string,
): Promise<{ isActive: boolean; message: string }> => {
  const res = await fetch(`${baseUrl}/api/services/${id}/toggle`, {
    method: "PATCH",
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
        : "Failed to update service availability";
    throw new Error(message);
  }

  if (
    typeof data !== "object" ||
    data === null ||
    !("data" in data) ||
    typeof data.data !== "object" ||
    data.data === null ||
    !("isActive" in data.data) ||
    typeof data.data.isActive !== "boolean"
  ) {
    throw new Error("The server returned an invalid service status");
  }

  return {
    isActive: data.data.isActive,
    message:
      "message" in data && typeof data.message === "string"
        ? data.message
        : "Service availability updated",
  };
};
