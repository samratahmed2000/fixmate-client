"use client";

import type { ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

const HideForAdminAndTechnician = ({ children }: { children: ReactNode }) => {
  const { data: session, isPending } = useSession();
  const role = session?.user?.role;

  if (isPending || role === "admin" || role === "technician") return null;

  return children;
};

export default HideForAdminAndTechnician;
