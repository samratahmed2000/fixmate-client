import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Wrench } from "lucide-react";
import Link from "next/link";
import HideForAdminAndTechnician from "../HideForAdminAndTechnician";

const HeroIntroduction = () => {
  return (
    <section className="relative overflow-hidden border-b bg-muted/20 py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1 text-xs font-medium text-muted-foreground shadow-xs">
            <Wrench aria-hidden="true" className="size-3.5 text-primary" />
            About FixMate
          </span>

          <h1 className="mt-5 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            FixMate
          </h1>

          <p className="mt-2 font-heading text-lg font-semibold text-primary sm:text-xl lg:text-2xl">
            Smart Device &amp; Home Appliance Repair Service Platform
          </p>

          <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            FixMate is built to eliminate the stress of equipment breakdowns. We
            seamlessly connect homeowners and gadget users with vetted,
            certified technicians for fast, honest, and reliable doorstep
            repairs. With transparent pricing, genuine replacement parts, and
            zero upfront payments, we make repairs effortless from start to
            finish.
          </p>

          <HideForAdminAndTechnician>
            <div className="my-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                Our Services
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/become-technician"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-auto",
                )}
              >
                Join as Technician
              </Link>
            </div>
          </HideForAdminAndTechnician>
        </div>
      </div>
    </section>
  );
};

export default HeroIntroduction;
