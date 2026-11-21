import type * as React from "react";

import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
} from "@/lib/services/service-options";
import type { ServiceFormErrors, ServiceFormValues } from "@/types/services";

export const validateServiceForm = (
  values: ServiceFormValues,
  options?: { isUpdate?: boolean; existingImage?: string },
): ServiceFormErrors => {
  const errors: ServiceFormErrors = {};

  const title = values.title.trim();
  if (!title) {
    errors.title = "Service title is required.";
  } else if (title.length < 5) {
    errors.title = "Use at least 5 characters.";
  } else if (title.length > 80) {
    errors.title = "Keep the title under 80 characters.";
  }

  if (!values.category) {
    errors.category = "Please choose a category.";
  }

  const description = values.description.trim();
  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length < 20) {
    errors.description = "Add at least 20 characters describing the service.";
  } else if (description.length > 2000) {
    errors.description = "Keep the description under 2000 characters.";
  }

  const price = Number(values.basePrice);
  if (!values.basePrice.trim()) {
    errors.basePrice = "Base price is required.";
  } else if (Number.isNaN(price) || price <= 0) {
    errors.basePrice = "Enter a price greater than 0.";
  } else if (price > 1_000_000) {
    errors.basePrice = "That price looks too high.";
  }

  const duration = Number(values.durationValue);
  if (!values.durationValue.trim()) {
    errors.durationValue = "Estimated duration is required.";
  } else if (!Number.isInteger(duration) || duration <= 0) {
    errors.durationValue = "Use a whole number greater than 0.";
  }

  if (!values.serviceMode) {
    errors.serviceMode = "Choose how you deliver this service.";
  }

  const area = values.serviceArea.trim();
  if (!area) {
    errors.serviceArea = "Service area is required.";
  } else if (area.length > 80) {
    errors.serviceArea = "Keep the area under 80 characters.";
  }

  const hasImage = Boolean(
    values.imageFile || options?.existingImage || values.existingImage,
  );
  if (!hasImage) {
    errors.imageFile = "A service image is required.";
  } else if (values.imageFile) {
    if (!ALLOWED_IMAGE_TYPES.includes(values.imageFile.type)) {
      errors.imageFile = "Use a PNG, JPG or WebP image.";
    } else if (values.imageFile.size > MAX_IMAGE_BYTES) {
      errors.imageFile = "Image must be 5 MB or smaller.";
    }
  }

  return errors;
};

/**
 * Updates a single form field and clears its previous error, so a corrected
 * field never keeps a stale message.
 */
export const handleServiceFieldChange = <K extends keyof ServiceFormValues>(
  key: K,
  value: ServiceFormValues[K],
  setValues: React.Dispatch<React.SetStateAction<ServiceFormValues>>,
  setErrors: React.Dispatch<React.SetStateAction<ServiceFormErrors>>,
) => {
  setValues((prev) => ({ ...prev, [key]: value }));

  setErrors((prev) => {
    if (!prev[key]) return prev;

    const next = { ...prev };
    delete next[key];
    return next;
  });
};
