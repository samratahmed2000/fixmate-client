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
