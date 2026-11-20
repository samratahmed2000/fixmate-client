import type * as React from "react";
import type { AuthFormData } from "@/types/auth";

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<AuthFormData>>,
  setErrors?: React.Dispatch<React.SetStateAction<Record<string, string>>>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Clear error for the field once user starts typing
  if (setErrors) {
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }
};
