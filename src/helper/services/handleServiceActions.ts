import type { Dispatch, SetStateAction } from "react";
import { toast } from "@/components/ui/toast";
import { deleteService, toggleServiceStatus } from "@/lib/actions/services";
import type { Service } from "@/types/services";

export const handleServiceToggle = async (
  serviceId: string | undefined,
  isToggling: boolean,
  setIsToggling: Dispatch<SetStateAction<boolean>>,
  onAvailabilityChange: (isAvailable: boolean) => void,
) => {
  if (!serviceId || isToggling) return;

  setIsToggling(true);

  try {
    const result = await toggleServiceStatus(serviceId);
    onAvailabilityChange(result.isActive);
    toast.add({
      title: "Service availability updated",
      description: result.message,
      type: "success",
    });
  } catch (error) {
    toast.add({
      title: "Could not update service",
      description:
        error instanceof Error
          ? error.message
          : "Please try updating the service availability again.",
      type: "error",
    });
  } finally {
    setIsToggling(false);
  }
};

export const handleServiceDelete = async (
  service: Service,
  refresh: () => void,
): Promise<boolean> => {
  if (!service._id) {
    toast.add({
      title: "Could not delete service",
      description: "This service does not have a valid ID.",
      type: "error",
    });
    return false;
  }

  try {
    const result = await deleteService(service._id);
    if (!result.success) {
      throw new Error(result.message || "Failed to delete service");
    }

    toast.add({
      title: "Service deleted",
      description: result.message,
      type: "success",
    });
    refresh();
    return true;
  } catch (error) {
    toast.add({
      title: "Could not delete service",
      description:
        error instanceof Error ? error.message : "Please try again.",
      type: "error",
    });
    return false;
  }
};
