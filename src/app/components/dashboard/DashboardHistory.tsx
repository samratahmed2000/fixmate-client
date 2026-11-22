import { HistoryIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHistoryEntry } from "@/types/dashboard-overview";
import { Separator } from "@/components/ui/separator";

const statusClassNames = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized === "approved" || normalized === "completed") {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
  }
  if (normalized === "rejected" || normalized === "cancelled") {
    return "border-destructive/30 bg-destructive/10 text-destructive";
  }
  if (normalized === "in-progress" || normalized === "accepted") {
    return "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400";
  }
  return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400";
};

const formatDate = (value: string | null) => {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

const DashboardHistory = ({
  title,
  description,
  entries,
}: {
  title: string;
  description: string;
  entries: DashboardHistoryEntry[];
}) => (
  <Card className="border-border shadow-xs">
    <CardHeader>
      <div className="flex items-center  gap-2">
        <HistoryIcon aria-hidden="true" className="size-4 text-primary" />
        <CardTitle>{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
      <Separator className="mt-2" />
    </CardHeader>
    <CardContent>
      {entries.length ? (
        <ul className="divide-y">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{entry.title}</p>
                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {entry.detail || "—"}
                </p>
                <time
                  dateTime={entry.createdAt ?? undefined}
                  className="mt-1 block text-xs text-muted-foreground"
                >
                  {formatDate(entry.createdAt)}
                </time>
              </div>
              <Badge
                variant="outline"
                className={`w-fit capitalize ${statusClassNames(entry.status)}`}
              >
                {entry.status.replaceAll("-", " ")}
              </Badge>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-4 text-sm text-muted-foreground">
          No history to show yet.
        </p>
      )}
    </CardContent>
  </Card>
);

export default DashboardHistory;
