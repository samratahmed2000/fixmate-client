import type * as React from "react";
import { toast } from "@/components/ui/toast";
import { addNewService, updateService } from "@/lib/actions/services";
import { imageUpload } from "@/lib/actions/upload";
import type { Service, ServiceSubmitOptions } from "@/types/services";
import { validateServiceForm } from "./handleServiceForm";

export const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  {
    mode = "add",
    serviceId,
    values,
    existingImageUrl,
    technicianName,
    technicianEmail,
    setErrors,
    setIsSubmitting,
    router,
    onSubmit,
    onSuccess,
  }: ServiceSubmitOptions,
) => {
  event.preventDefault();

  const isUpdate = mode === "update";
  const currentExistingImage = existingImageUrl || values.existingImage;

  const validationErrors = validateServiceForm(values, {
    isUpdate,
    existingImage: currentExistingImage,
  });
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    toast.add({
      title: "Validation Error",
      description: "Please check the highlighted fields and try again.",
      type: "warning",
    });
    return;
  }

  try {
    setIsSubmitting(true);

    let finalImageUrl = currentExistingImage || "";

    // If user provided a new file, upload it
    if (values.imageFile) {
      const uploaded = await imageUpload(values.imageFile);

      if (!uploaded?.imageUrl) {
        throw new Error("Image upload failed. Please try again.");
      }
      finalImageUrl = uploaded.imageUrl;
    }

    if (!finalImageUrl) {
      throw new Error("A service image is required.");
    }

    const serviceData: Service = {
      title: values.title.trim(),
      category: values.category,
      description: values.description.trim(),
      basePrice: values.basePrice.trim(),
      estimatedDuration: `${values.durationValue.trim()} ${values.durationUnit.toLowerCase()}`,
      serviceMode: values.serviceMode,
      serviceArea: values.serviceArea.trim(),
      serviceImage: finalImageUrl,
      technicianName,
      technicianEmail,
    };

    if (onSubmit) {
      await onSubmit(serviceData);
    } else if (isUpdate && serviceId) {
      await updateService(serviceId, serviceData);
    } else {
      await addNewService(serviceData);
    }

    toast.add({
      title: isUpdate ? "Service Updated" : "Service Added",
      description: isUpdate
        ? "Your service has been updated successfully."
        : "Your service is now live and visible to customers.",
      type: "success",
    });

    onSuccess?.();

    if (router) {
      router.push("/dashboard/technician/my-services");
      router.refresh?.();
    }
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Something went wrong. Please try again.";

    setErrors({ general: message });
    toast.add({
      title: isUpdate ? "Could Not Update Service" : "Could Not Add Service",
      description: message,
      type: "error",
    });
  } finally {
    setIsSubmitting(false);
  }
};
