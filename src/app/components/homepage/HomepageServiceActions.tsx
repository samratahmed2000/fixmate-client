"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const HomepageServiceActions = () => {
  const { data: session, isPending } = useSession();
  const role = session?.user?.role;

  if (isPending || (role && role !== "customer")) return null;

  return (
    <Link
      href="/services"
      className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
    >
      View All Services
      <ArrowRight aria-hidden="true" />
    </Link>
  );
};

export default HomepageServiceActions;
