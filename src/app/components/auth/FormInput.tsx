"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleInputChange } from "@/helper/auth/handleInputChange";
import { handleSubmit } from "@/helper/auth/handleSubmit";
import type { AuthFormData, AuthFormProps } from "@/types/auth";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import PasswordStrengthBar from "./PasswordStrengthBar";

const FormInput = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const isSignUp = type === "sign-up";
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [formData, setFormData] = React.useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, type, formData, setErrors, router, setIsLoading)
      }
      noValidate
      className="space-y-4"
    >
      {/* General Error Alert */}
      {errors.general && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
          {errors.general}
        </div>
      )}

      {/* Role selection card (Only on Sign Up) */}
      {isSignUp && (
        <Field className="gap-2">
          <div className="flex items-center justify-center gap-10">
            {/* Customer Role Card */}
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "customer" }))
              }
              className={cn(
                "w-fit flex flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring",
                formData.role === "customer"
                  ? "border-primary bg-primary/5 text-primary shadow-2xs font-semibold"
                  : "border-border bg-card text-muted-foreground hover:bg-muted/40 hover:text-foreground",
              )}
            >
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg border",
                  formData.role === "customer"
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-muted/40 text-muted-foreground",
                )}
              >
                <User className="size-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold leading-none">Customer</p>
              </div>
            </button>

            {/* Technician Role Card */}
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "technician" }))
              }
              className={cn(
                "w-fit flex flex-col items-center justify-center gap-2 rounded-xl border p-3 text-center transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring",
                formData.role === "technician"
                  ? "border-primary bg-primary/5 text-primary shadow-2xs font-semibold"
                  : "border-border bg-card text-muted-foreground hover:bg-muted/40 hover:text-foreground",
              )}
            >
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg border",
                  formData.role === "technician"
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-border bg-muted/40 text-muted-foreground",
                )}
              >
                <Wrench className="size-4" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold leading-none">Technician</p>
              </div>
            </button>
          </div>
        </Field>
      )}

      <FieldGroup className="gap-3.5">
        {/* Full Name (Sign Up only) */}
        {isSignUp && (
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="name">Full Name</FieldLabel>
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Samrat Ahmed"
              value={formData.name}
              maxLength={isSignUp ? 32 : undefined}
              onChange={(e) => handleInputChange(e, setFormData, setErrors)}
              aria-invalid={!!errors.name}
              className="h-10"
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </Field>
        )}

        {/* Email */}
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="me@mail.com"
            value={formData.email}
            maxLength={isSignUp ? 32 : undefined}
            onChange={(e) => handleInputChange(e, setFormData, setErrors)}
            aria-invalid={!!errors.email}
            className="h-10"
          />
          {errors.email && <FieldError>{errors.email}</FieldError>}
        </Field>

        {/* Password */}
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              placeholder="••••••••"
              maxLength={isSignUp ? 32 : undefined}
              value={formData.password}
              onChange={(e) => handleInputChange(e, setFormData, setErrors)}
              aria-invalid={!!errors.password}
              className="h-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {/* Live password strength bar — sign-up only */}
          {isSignUp && <PasswordStrengthBar password={formData.password} />}

          {/* Error only shows when form is submitted with unmet criteria */}
          {errors.password && <FieldError>{errors.password}</FieldError>}
        </Field>
      </FieldGroup>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="w-full h-10 mt-2 font-semibold cursor-pointer"
      >
        {isLoading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
      </Button>
    </form>
  );
};

export default FormInput;
