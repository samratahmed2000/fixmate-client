import { Award } from "lucide-react";
import { platformBenefits } from "@/lib/about/about";

const BenefitsToJoinUs = () => {
  return (
    <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Award aria-hidden="true" className="size-3.5" />
            Our Advantages
          </span>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Benefits of Choosing FixMate
          </h2>
          <p className="mt-2 text-sm text-pretty text-muted-foreground sm:text-base">
            Why thousands of homeowners and certified technicians trust us.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platformBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-2xs transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
              >
                <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-muted/40 text-foreground">
                  <Icon aria-hidden="true" className="size-5 text-primary" />
                </div>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsToJoinUs;
