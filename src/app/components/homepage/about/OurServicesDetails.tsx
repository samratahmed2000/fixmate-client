import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { customerServices, technicianServices } from "@/lib/about/about";
import { ArrowRight, Check, HeartHandshake, House, Wrench } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HideForAdminAndTechnician from "../HideForAdminAndTechnician";

const OurServicesDetails = () => {
  return (
    <section className="border-b bg-muted/20 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <HeartHandshake aria-hidden="true" className="size-3.5" />
            What We Do
          </span>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Empowering Customers &amp; Technicians
          </h2>
          <p className="mt-2 text-sm text-pretty text-muted-foreground sm:text-base">
            FixMate is a comprehensive ecosystem with distinct benefits for
            everyone.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* For Customers */}
          <Card className="flex flex-col justify-between border-border bg-background p-2 sm:p-4">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary p-3"
                >
                  For Customers
                </Badge>
                <House
                  aria-hidden="true"
                  className="size-6 text-muted-foreground"
                />
              </div>
              <CardTitle className="font-heading text-2xl font-bold">
                Reliable Repairs at Your Doorstep
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                We take the hassle out of broken appliances and smart gadgets by
                bringing verified experts directly to your home with guaranteed
                quality.
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-4">
              <ul className="space-y-3">
                {customerServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3.5" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-normal">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>

              <HideForAdminAndTechnician>
                <div className="mt-8 pt-4">
                  <Link
                    href="/services"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "default" }),
                      "w-full sm:w-auto",
                    )}
                  >
                    Browse Our Services
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </HideForAdminAndTechnician>
            </CardContent>
          </Card>

          {/* For Technicians */}
          <Card className="flex flex-col justify-between border-border bg-background p-2 sm:p-4">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="border-primary/30 text-primary p-3"
                >
                  For Technicians
                </Badge>
                <Wrench
                  aria-hidden="true"
                  className="size-6 text-muted-foreground"
                />
              </div>
              <CardTitle className="font-heading text-2xl font-bold">
                Build Your Career &amp; Independent Income
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                We empower skilled technical professionals with regular local
                job opportunities, freedom over their working hours, and prompt
                earnings.
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-4">
              <ul className="space-y-3">
                {technicianServices.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="size-3.5" />
                    </div>
                    <span className="text-sm text-muted-foreground leading-normal">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>

              <HideForAdminAndTechnician>
                <div className="mt-8 pt-4">
                  <Link
                    href="/become-technician"
                    className={cn(
                      buttonVariants({ size: "default" }),
                      "w-full sm:w-auto",
                    )}
                  >
                    Join as a Technician
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </HideForAdminAndTechnician>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default OurServicesDetails;
