import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import type * as React from "react";
import type { AuthFormData } from "@/types/auth";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  type: "sign-up" | "sign-in",
  formData: AuthFormData,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  router?: AppRouterInstance,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  e.preventDefault();

  const isSignUp = type === "sign-up";
  const validationErrors: Record<string, string> = {};

  if (isSignUp) {
    const nameVal = formData.name.trim();
    if (!nameVal) {
      validationErrors.name = "Full name is required.";
    }
  }

  const emailVal = formData.email.trim();
  if (!emailVal) {
    validationErrors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    validationErrors.email = "Please enter a valid email address.";
  }

  const passwordVal = formData.password;
  if (!passwordVal) {
    validationErrors.password = "Password is required.";
  } else if (isSignUp) {
    const allMet =
      passwordVal.length >= 6 &&
      /[A-Z]/.test(passwordVal) &&
      /[a-z]/.test(passwordVal) &&
      /[0-9]/.test(passwordVal) &&
      /[^A-Za-z0-9]/.test(passwordVal);

    if (!allMet) {
      validationErrors.password =
        "Password does not meet all requirements below.";
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

  try {
    setIsLoading?.(true);

    if (isSignUp) {
      const res = await signUp.email({
        name: formData.name.trim(),
        email: emailVal,
        password: passwordVal,
        role: formData.role || "customer",
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
        description: "Welcome to FixMate! Please sign in with your credentials.",
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
