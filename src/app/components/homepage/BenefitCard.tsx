import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BenefitCardProps } from "@/types/cards";

const BenefitCard = ({
  title,
  description,
  icon: Icon,
  className,
}: BenefitCardProps) => {
  return (
    <Card
      className={cn(
        "h-full transition-shadow duration-200 hover:shadow-md",
        className,
      )}
    >
      <CardContent className="flex h-full flex-col gap-4">
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary"
        >
          <Icon className="size-5" />
        </span>

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

export default BenefitCard;
