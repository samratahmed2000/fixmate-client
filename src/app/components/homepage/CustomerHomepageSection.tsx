"use client";

import type { ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

const CustomerHomepageSection = ({ children }: { children: ReactNode }) => {
  const { data: session, isPending } = useSession();
  const role = session?.user?.role;

  if (isPending || (role && role !== "customer")) return null;

  return children;
};

export default CustomerHomepageSection;
