import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStatCardProps } from "@/types/dashboard-overview";

const DashboardStatCard = ({
  title,
  value,
  icon: Icon,
}: DashboardStatCardProps) => (
  <Card className="gap-4 border-border shadow-xs">
    <CardHeader className="flex-row items-center justify-between gap-3">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="flex justify-between items-center">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <p className="font-heading text-4xl font-bold tracking-tight tabular-nums px-6">
        {value.toLocaleString()}
      </p>
    </CardContent>
  </Card>
);

export default DashboardStatCard;
