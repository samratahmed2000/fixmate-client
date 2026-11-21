"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import SelectField from "@/app/components/shared/SelectField";
import { durationUnitOptions } from "@/lib/services/service-options";
import type { DurationFieldProps } from "@/types/services";

const DurationField = ({
  id = "estimated-duration",
  value,
  unit,
  onValueChange,
  onUnitChange,
  error,
  disabled,
}: DurationFieldProps) => {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>
        Estimated Duration
        <span aria-hidden="true" className="text-destructive">
          *
        </span>
      </FieldLabel>

      <div className="flex items-start gap-2">
        <Input
          id={id}
          name="duration"
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          placeholder="e.g. 2"
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          onChange={(event) => onValueChange(event.target.value)}
          className="h-10 min-w-0 flex-1"
        />

        <SelectField
          id={`${id}-unit`}
          aria-label="Duration unit"
          value={unit}
          onValueChange={onUnitChange}
          options={durationUnitOptions}
          disabled={disabled}
          className="w-28 shrink-0 gap-0"
          triggerClassName="h-10 bg-background"
        />
      </div>

      {error ? (
        <FieldError>{error}</FieldError>
      ) : (
        <FieldDescription>How long a typical job takes.</FieldDescription>
      )}
    </Field>
  );
};

export default DurationField;
