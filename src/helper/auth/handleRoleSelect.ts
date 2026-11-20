import type * as React from "react";
import type { AuthFormData, AuthRole } from "@/types/auth";

export const handleRoleSelect = (
  role: AuthRole,
  setFormData: React.Dispatch<React.SetStateAction<AuthFormData>>
) => {
  setFormData((prev) => ({
    ...prev,
    role,
  }));
};
