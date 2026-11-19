import BenefitCard from "@/app/components/homepage/BenefitCard";
import { benefits } from "@/lib/extra-section/benefits";
import { UserStar } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section aria-labelledby="why-choose-us" className="border-t bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex gap-1 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <UserStar aria-hidden="true" className="size-3.5" />
            Why Choose Us
          </span>
          <h2
            id="why-choose-us"
            className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            You Can Trust From Start To Finish
          </h2>
          <p className="mt-2 text-sm text-pretty text-muted-foreground sm:text-base">
            Best pricing, verified experts, and quality services are what make
            FixMate different.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {benefits.map((benefit) => (
            <li key={benefit.title} className="h-full">
              <BenefitCard
                title={benefit.title}
                description={benefit.description}
                icon={benefit.icon}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhyChooseUs;
