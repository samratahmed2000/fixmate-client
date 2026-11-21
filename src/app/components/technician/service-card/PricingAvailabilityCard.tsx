"use client";

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
import type { PricingAvailabilityCardProps } from "@/types/services";
import DurationField from "../service-details/DurationField";

const PricingAvailabilityCard = ({
  values,
  errors,
  isSubmitting,
  updateField,
}: PricingAvailabilityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing &amp; availability</CardTitle>
        <CardDescription>
          Set a starting price and where customers can meet you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FieldGroup className="gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={!!errors.basePrice}>
              <FieldLabel htmlFor="base-price">
                Base Price
                <span aria-hidden="true" className="text-destructive">
                  *
                </span>
              </FieldLabel>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground"
                >
                  ৳
                </span>
                <Input
                  id="base-price"
                  name="basePrice"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step={1}
                  placeholder="0"
                  value={values.basePrice}
                  disabled={isSubmitting}
                  aria-invalid={!!errors.basePrice}
                  onChange={(event) =>
                    updateField("basePrice", event.target.value)
                  }
                  className="h-10 pl-7"
                />
              </div>
              {errors.basePrice ? (
                <FieldError>{errors.basePrice}</FieldError>
              ) : (
                <FieldDescription>
                  Starting price customers will see on the listing.
                </FieldDescription>
              )}
            </Field>

            <DurationField
              id="estimated-duration"
              value={values.durationValue}
              unit={values.durationUnit}
              onValueChange={(value) => updateField("durationValue", value)}
              onUnitChange={(unit) => updateField("durationUnit", unit)}
              error={errors.durationValue}
              disabled={isSubmitting}
            />
          </div>

          <Field data-invalid={!!errors.serviceArea}>
            <FieldLabel htmlFor="service-area">
              Service Area
              <span aria-hidden="true" className="text-destructive">
                *
              </span>
            </FieldLabel>
            <Input
              id="service-area"
              name="serviceArea"
              placeholder="e.g. Gulshan, Dhaka"
              value={values.serviceArea}
              maxLength={40}
              disabled={isSubmitting}
              aria-invalid={!!errors.serviceArea}
              onChange={(event) =>
                updateField("serviceArea", event.target.value)
              }
              className="h-10"
            />
            {errors.serviceArea ? (
              <FieldError>{errors.serviceArea}</FieldError>
            ) : (
              <FieldDescription>
                The area you can reach for a home visit, or your shop location.
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
};

export default PricingAvailabilityCard;
