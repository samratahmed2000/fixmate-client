"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const HomepageHeroActions = () => {
  const { data: session, isPending } = useSession();
  const role = session?.user?.role;
  const canBrowseOrApply = !isPending && (!role || role === "customer");

  if (!canBrowseOrApply) return null;

  return (
    <div className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-8 sm:w-auto sm:flex-row">
      <Link
        href="/services"
        className={cn(
          buttonVariants({ size: "lg" }),
          "pointer-events-auto w-full bg-background text-foreground hover:bg-background/90 sm:w-auto",
        )}
      >
        Repair Services
        <ArrowRight aria-hidden="true" />
      </Link>
      <Link
        href="/become-technician"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "pointer-events-auto w-full border-white/60 bg-white/10 text-white hover:bg-white/20 hover:text-white sm:w-auto",
        )}
      >
        Become a Technician
      </Link>
    </div>
  );
};

export default HomepageHeroActions;
