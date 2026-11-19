import StepCard from "@/app/components/homepage/StepCard";
import { steps } from "@/lib/extra-section/steps";
import { CircleFadingCheck } from "lucide-react";

const HowFixMateWorks = () => {
  return (
    <section
      aria-labelledby="how-fixmate-works"
      className="border-t bg-muted/20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <CircleFadingCheck aria-hidden="true" className="size-3.5" />
            How FixMate Works
          </span>
          <h2
            id="how-fixmate-works"
            className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Make Repairs Simple In 4 Steps
          </h2>
          <p className="mt-3 text-sm text-pretty text-muted-foreground sm:text-base">
            What needs fixing that will fix a verified FixMate technician & pay
            after completion.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.title} className="h-full">
              <StepCard
                step={index + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default HowFixMateWorks;
