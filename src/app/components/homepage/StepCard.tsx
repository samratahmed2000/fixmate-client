import { Card, CardContent } from "@/components/ui/card";
import { StepCardProps } from "@/types/cards";
import { cn } from "@/lib/utils";

const StepCard = ({
  step,
  title,
  description,
  icon: Icon,
  className,
}: StepCardProps) => {
  return (
    <Card
      className={cn(
        "h-full transition-shadow duration-200 hover:shadow-md",
        className,
      )}
    >
      <CardContent className="flex h-full flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
          >
            <Icon className="size-5" />
          </span>
          <span className="font-heading text-sm font-semibold tabular-nums text-muted-foreground/60">
            {String(step).padStart(2, "0")}
          </span>
        </div>

        <div className="space-y-1.5">
          <h3 className="font-heading text-base font-semibold leading-snug">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StepCard;
