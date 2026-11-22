"use client";

import SelectField from "@/app/components/shared/SelectField";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { serviceModeOptions } from "@/lib/services/service-options";
import type { ServiceDetailsCardProps, ServiceMode } from "@/types/services";
import ServiceImageUpload from "../service-details/ServiceImageUpload";

const ServiceDetailsCard = ({
  isUpdate = false,
  values,
  errors,
  categories,
  categoryOptions,
  isSubmitting,
  updateField,
  initialImageUrl,
}: ServiceDetailsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isUpdate ? "Edit Service Details" : "Service Details"}
        </CardTitle>
        <CardDescription>
          {isUpdate
            ? "Update the details for your repair service."
            : "Describe the repair so customers know exactly what they are booking."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FieldGroup className="gap-5">
          <Field data-invalid={!!errors.title}>
            <FieldLabel htmlFor="service-title">
              Title
              <span aria-hidden="true" className="text-destructive">
                *
              </span>
            </FieldLabel>
            <Input
              id="service-title"
              name="title"
              placeholder="e.g. Washing Machine Repair"
              value={values.title}
              maxLength={30}
              disabled={isSubmitting}
              aria-invalid={!!errors.title}
              onChange={(event) => updateField("title", event.target.value)}
              className="h-10"
            />
            {errors.title ? (
              <FieldError>{errors.title}</FieldError>
            ) : (
              <FieldDescription>
                A short, specific name customers will search for.
              </FieldDescription>
            )}
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              id="service-category"
              label="Category"
              required
              placeholder="Select a category"
              value={values.category}
              onValueChange={(value) => updateField("category", value)}
              options={categoryOptions}
              error={errors.category}
              description={
                categories.length === 0
                  ? "No categories available right now. Refresh the page to try again."
                  : undefined
              }
              disabled={isSubmitting || categories.length === 0}
            />

            <SelectField
              id="service-mode"
              label="Service Mode"
              required
              placeholder="How do you deliver it?"
              value={values.serviceMode}
              onValueChange={(value: ServiceMode) =>
                updateField("serviceMode", value)
              }
              options={serviceModeOptions}
              error={errors.serviceMode}
            />
          </div>

          <Field data-invalid={!!errors.description}>
            <div className="flex items-center justify-between gap-3">
              <FieldLabel htmlFor="service-description">
                Description
                <span aria-hidden="true" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                {values.description.length}/2000
              </span>
            </div>
            <Textarea
              id="service-description"
              name="description"
              rows={4}
              maxLength={2000}
              placeholder="What is included, what you need from the customer, and anything that affects the price…"
              value={values.description}
              disabled={isSubmitting}
              aria-invalid={!!errors.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              className="min-h-24"
            />
            {errors.description ? (
              <FieldError>{errors.description}</FieldError>
            ) : (
              <FieldDescription>
                Minimum 20 characters. Clear descriptions get more bookings.
              </FieldDescription>
            )}
          </Field>

          <ServiceImageUpload
            id="service-image"
            file={values.imageFile}
            existingImageUrl={initialImageUrl || values.existingImage}
            onFileChange={(file) => updateField("imageFile", file)}
            error={errors.imageFile}
            disabled={isSubmitting}
          />
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

export default ServiceDetailsCard;
