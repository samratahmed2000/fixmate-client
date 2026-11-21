"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CircleAlertIcon, PlusIcon, SaveIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { handleSubmit } from "@/helper/services/handleSubmit";
import { handleServiceFieldChange } from "@/helper/services/handleServiceForm";
import { useSession } from "@/lib/auth-client";
import { getInitialServiceFormValues } from "@/lib/services/service-options";
import type {
  ServiceFormErrors,
  ServiceFormProps,
  ServiceFormValues,
} from "@/types/services";

import PricingAvailabilityCard from "../service-card/PricingAvailabilityCard";
import TechnicianInfoCard from "../service-card/TechnicianInfoCard";
import ServiceDetailsCard from "../service-card/ServiceDetailsCard";

const ServiceForm = ({
  categories,
  mode = "add",
  initialData,
  serviceId,
  technicianId: propTechnicianId,
  technicianName: propTechnicianName,
  technicianEmail: propTechnicianEmail,
  submitButtonText,
  onSuccess,
  onSubmit,
}: ServiceFormProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  // Prefer session info, fallback to props or initialData
  const technicianId =
    session?.user?.id || propTechnicianId || initialData?.technicianId || "";
  const technicianName =
    session?.user?.name ||
    propTechnicianName ||
    initialData?.technicianName ||
    "";
  const technicianEmail =
    session?.user?.email ||
    propTechnicianEmail ||
    initialData?.technicianEmail ||
    "";

  const isUpdate = mode === "update";

  const [values, setValues] = React.useState<ServiceFormValues>(() =>
    getInitialServiceFormValues(initialData),
  );
  const [errors, setErrors] = React.useState<ServiceFormErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Simple and modern: direct mapping without useMemo
  const categoryOptions = categories.map((category) => ({
    value: category.title,
    label: category.title,
  }));

  const updateField = <K extends keyof ServiceFormValues>(
    key: K,
    value: ServiceFormValues[K],
  ) => handleServiceFieldChange(key, value, setValues, setErrors);

  const resetForm = () => {
    setValues(getInitialServiceFormValues(initialData));
    setErrors({});
  };

  return (
    <form
      noValidate
      onSubmit={(event) =>
        handleSubmit(event, {
          mode,
          serviceId: serviceId || initialData?._id,
          values,
          existingImageUrl: initialData?.serviceImage || values.existingImage,
          technicianName,
          technicianEmail,
          technicianId,
          setErrors,
          setIsSubmitting,
          router,
          onSubmit,
          onSuccess: () => {
            if (!isUpdate) {
              resetForm();
            }
            onSuccess?.();
          },
        })
      }
      className="space-y-5"
    >
      {errors.general ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <CircleAlertIcon
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0"
          />
          <span>{errors.general}</span>
        </div>
      ) : null}

      {/* Service Details Card */}
      <ServiceDetailsCard
        isUpdate={isUpdate}
        values={values}
        errors={errors}
        categories={categories}
        categoryOptions={categoryOptions}
        isSubmitting={isSubmitting}
        updateField={updateField}
        initialImageUrl={initialData?.serviceImage}
      />

      {/* Pricing & Availability Card */}
      <PricingAvailabilityCard
        values={values}
        errors={errors}
        isSubmitting={isSubmitting}
        updateField={updateField}
      />

      {/* Technician Info Card */}
      <TechnicianInfoCard
        technicianName={technicianName}
        technicianEmail={technicianEmail}
      />

      {/* Actions */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="sm:min-w-40"
        >
          {isSubmitting ? (
            <>
              <Spinner data-icon="inline-start" />
              {isUpdate ? "Updating…" : "Publishing…"}
            </>
          ) : (
            <>
              {isUpdate ? (
                <SaveIcon data-icon="inline-start" />
              ) : (
                <PlusIcon data-icon="inline-start" />
              )}
              {submitButtonText ??
                (isUpdate ? "Update Service" : "Add Service")}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
