"use client";

import { cn } from "@/lib/utils";
import type { AuthFormProps } from "@/types/auth";
import { FieldSeparator } from "@/components/ui/field";
import GoogleButton from "./GoogleButton";
import FormInput from "./FormInput";
import AuthLink from "./AuthLink";

const AuthForm = ({ type, className }: AuthFormProps) => {
  return (
    <div className={cn("w-full space-y-5", className)}>
      {/* Form Inputs & Submit */}
      <FormInput type={type} />

      {/* Separator */}
      <FieldSeparator className="my-3">Or</FieldSeparator>

      {/* Social login: Google button */}
      <GoogleButton />

      {/* Link up with other auth page */}
      <AuthLink type={type} />
    </div>
  );
};

export default AuthForm;
