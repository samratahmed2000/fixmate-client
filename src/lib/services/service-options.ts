import type { DurationUnit, ServiceFormValues, ServiceMode } from "@/types/services";

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
};

export const serviceModeOptions: SelectOption<ServiceMode>[] = [
  { value: "Home Visit", label: "Home Visit" },
  { value: "Shop Drop Off", label: "Shop Drop Off" },
];

export const durationUnitOptions: SelectOption<DurationUnit>[] = [
  { value: "Minutes", label: "Minutes" },
  { value: "Hours", label: "Hours" },
  { value: "Days", label: "Days" },
];

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export const initialServiceFormValues: ServiceFormValues = {
  title: "",
  category: "",
  description: "",
  basePrice: "",
  durationValue: "",
  durationUnit: "Hours",
  serviceMode: "",
  serviceArea: "",
  imageFile: null,
  existingImage: "",
};

export const parseEstimatedDuration = (
  durationStr?: string,
): { durationValue: string; durationUnit: DurationUnit } => {
  if (!durationStr) {
    return { durationValue: "", durationUnit: "Hours" };
  }
  const parts = durationStr.trim().split(/\s+/);
  const durationValue = parts[0] || "";
  const unitStr = parts[1]?.toLowerCase() || "";

  let durationUnit: DurationUnit = "Hours";
  if (unitStr.startsWith("min")) {
    durationUnit = "Minutes";
  } else if (unitStr.startsWith("day")) {
    durationUnit = "Days";
  } else if (unitStr.startsWith("hour")) {
    durationUnit = "Hours";
  }

  return { durationValue, durationUnit };
};

export const getInitialServiceFormValues = (
  initialData?: Partial<import("@/types/services").Service>,
): ServiceFormValues => {
  const { durationValue, durationUnit } = parseEstimatedDuration(
    initialData?.estimatedDuration,
  );

  return {
    title: initialData?.title ?? "",
    category: initialData?.category ?? "",
    description: initialData?.description ?? "",
    basePrice: initialData?.basePrice ? String(initialData.basePrice) : "",
    durationValue,
    durationUnit,
    serviceMode: (initialData?.serviceMode as ServiceMode) ?? "",
    serviceArea: initialData?.serviceArea ?? "",
    imageFile: null,
    existingImage: initialData?.serviceImage ?? "",
  };
};
