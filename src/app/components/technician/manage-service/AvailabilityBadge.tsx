import { Badge } from "@/components/ui/badge";

interface AvailabilityBadgeProps {
  availability?: string;
  isActive?: boolean;
}

const AvailabilityBadge = ({
  availability,
  isActive = true,
}: AvailabilityBadgeProps) => {
  const active =
    availability === "Active" || (availability === undefined && isActive);

  if (active) {
    return (
      <Badge
        variant="outline"
        className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 gap-1.5 font-medium"
      >
        <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Active
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="border-muted-foreground/30 bg-muted/60 text-muted-foreground gap-1.5 font-medium"
    >
      <span className="size-1.5 rounded-full bg-muted-foreground/50" />
      Not-Active
    </Badge>
  );
};

export default AvailabilityBadge;
