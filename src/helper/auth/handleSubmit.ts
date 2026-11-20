import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import type * as React from "react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  type: "sign-up" | "sign-in",
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  router?: AppRouterInstance,
  onSubmit?: (data: Record<string, FormDataEntryValue>) => void,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const user = Object.fromEntries(formData.entries());

  const isSignUp = type === "sign-up";
  const validationErrors: Record<string, string> = {};

  if (isSignUp) {
    const nameVal = String(user.name ?? "").trim();
    if (!nameVal) {
      validationErrors.name = "Full name is required.";
    }
  }

  const emailVal = String(user.email ?? "").trim();
  if (!emailVal) {
    validationErrors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    validationErrors.email = "Please enter a valid email address.";
  }

  const passwordVal = String(user.password ?? "");
  if (!passwordVal) {
    validationErrors.password = "Password is required.";
  } else if (isSignUp) {
    const missingCriteria: string[] = [];
    if (passwordVal.length < 6) missingCriteria.push("at least 6 characters");
    if (!/[A-Z]/.test(passwordVal)) missingCriteria.push("1 uppercase letter");
    if (!/[a-z]/.test(passwordVal)) missingCriteria.push("1 lowercase letter");
    if (!/[0-9]/.test(passwordVal)) missingCriteria.push("1 number");
    if (!/[^A-Za-z0-9]/.test(passwordVal)) {
      missingCriteria.push("1 special character");
    }

    if (missingCriteria.length > 0) {
      validationErrors.password = `Password must include: ${missingCriteria.join(", ")}.`;
    }
  }

  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    toast.add({
      title: "Validation Error",
      description: "Please check the highlighted fields and try again.",
      type: "warning",
    });
    return;
  }

  if (onSubmit) {
    onSubmit(user);
  }

  try {
    setIsLoading?.(true);

    if (isSignUp) {
      const res = await signUp.email({
        name: String(user.name),
        email: emailVal,
        password: passwordVal,
        role: (user.role as "customer" | "technician") || "customer",
      });

      if (res.error) {
        const errorMsg = res.error.message || "Failed to create your account.";
        setErrors({ general: errorMsg });
        toast.add({
          title: "Sign Up Failed",
          description: errorMsg,
          type: "error",
        });
        return;
      }

      toast.add({
        title: "Account Created Successfully!",
        description:
          "Welcome to FixMate! Please sign in with your credentials.",
        type: "success",
      });

      router?.push("/sign-in");
    } else {
      const res = await signIn.email({
        email: emailVal,
        password: passwordVal,
      });

      if (res.error) {
        const errorMsg = res.error.message || "Invalid email or password.";
        setErrors({ general: errorMsg });
        toast.add({
          title: "Sign In Failed",
          description: errorMsg,
          type: "error",
        });
        return;
      }

      toast.add({
        title: "Welcome Back!",
        description: "You have signed in successfully.",
        type: "success",
      });

      router?.push("/");
      router?.refresh();
    }
  } catch (err) {
    const errorMsg = "An unexpected error occurred. Please try again.";
    setErrors({ general: errorMsg });
    toast.add({
      title: "Something Went Wrong",
      description: errorMsg,
      type: "error",
    });
    console.error(err);
  } finally {
    setIsLoading?.(false);
  }
};
