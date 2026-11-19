import { Badge } from "@/components/ui/badge";
import { keyFeatures } from "@/lib/about/about";
import { Sparkles } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const KeyPillars = () => {
  return (
    <section className="border-b bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Core Highlights
          </span>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            The Principles That Drive FixMate
          </h2>
          <p className="mt-2 text-sm text-pretty text-muted-foreground sm:text-base">
            Explore to ensure ultimate customer satisfaction and trusted
            technician partnerships.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {keyFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.tag}
                className="group flex flex-col justify-between border-border transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-muted/40 text-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                      <Icon aria-hidden="true" className="size-5" />
                    </div>
                    <Badge
                      variant="secondary"
                      className="font-normal text-[11px] p-2"
                    >
                      {feature.tag}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 font-heading text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyPillars;
