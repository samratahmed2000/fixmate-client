import { Service } from "@/types/services";
import { baseUrl } from "../utils";

// All Services
export const getAllServices = async (): Promise<Service[]> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured");
  }

  const res = await fetch(`${baseUrl}/api/services`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }

  const result = await res.json();
  const list = Array.isArray(result)
    ? result
    : Array.isArray(result?.data)
      ? result.data
      : [];

  return list as Service[];
};

// Service Details
export const getServiceById = async (
  serviceId: string,
): Promise<Service | null> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured");
  }

  const res = await fetch(`${baseUrl}/api/services/${serviceId}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to load service details");
  }

  return (await res.json()) as Service | null;
};
