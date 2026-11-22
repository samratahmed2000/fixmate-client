import { Service } from "@/types/services";
import { baseUrl } from "../utils";

export interface ServiceQuery {
  search?: string;
  category?: string[];
  mode?: string[];
  sort?: string;
  limit?: number;
}

// All Services
export const getAllServices = async (
  query: ServiceQuery = {},
): Promise<Service[]> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured");
  }

  const params = new URLSearchParams();
  if (query.search) params.set("search", query.search);
  if (query.category?.length) params.set("category", query.category.join(","));
  if (query.mode?.length) params.set("mode", query.mode.join(","));
  if (query.sort) params.set("sort", query.sort);
  if (query.limit) params.set("limit", String(query.limit));

  const queryString = params.toString();
  const res = await fetch(
    `${baseUrl}/api/services${queryString ? `?${queryString}` : ""}`,
    {
      cache: "no-store",
    },
  );

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

export const getFeaturedServices = async (
  limit = 6,
): Promise<Service[]> => {
  if (!baseUrl) {
    throw new Error("BASE_URL is not configured");
  }

  const res = await fetch(
    `${baseUrl}/api/services/featured?limit=${encodeURIComponent(limit)}`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch featured services");
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
