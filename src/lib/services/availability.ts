import type { Service } from "@/types/services";

export const isServiceAvailable = (
  service: Pick<Service, "isActive" | "availability">,
) => service.isActive !== false && service.availability !== "Not-Active";
