"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectOption } from "@/lib/services/service-options";
import { cn } from "@/lib/utils";

type SelectFieldProps<T extends string> = {
  id: string;
  value: T | "";
  onValueChange: (value: T) => void;
  options: SelectOption<T>[];
  label?: string;
  placeholder?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  triggerClassName?: string;
  "aria-label"?: string;
};

function SelectField<T extends string>({
  id,
  value,
  onValueChange,
  options,
  label,
  placeholder = "Select an option",
  description,
  error,
  disabled,
  required,
  className,
  triggerClassName,
  "aria-label": ariaLabel,
}: SelectFieldProps<T>) {
  return (
    <Field data-invalid={!!error} className={className}>
      {label ? (
        <FieldLabel htmlFor={id}>
          {label}
          {required ? (
            <span aria-hidden="true" className="text-destructive">
              *
            </span>
          ) : null}
        </FieldLabel>
      ) : null}

      <Select<string>
        value={value || null}
        onValueChange={(next) => onValueChange((next ?? "") as T)}
        items={options}
        disabled={disabled}
        required={required}
      >
        <SelectTrigger
          id={id}
          aria-label={ariaLabel ?? label ?? placeholder}
          aria-invalid={!!error}
          className={cn("h-10 w-full", triggerClassName)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false} sideOffset={6}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error ? (
        <FieldError>{error}</FieldError>
      ) : description ? (
        <FieldDescription>{description}</FieldDescription>
      ) : null}
    </Field>
  );
}

export default SelectField;
