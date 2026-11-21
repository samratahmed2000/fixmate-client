import { Badge } from "@/components/ui/badge";

export const normalizeBookingStatus = (status: string) => {
  const value = status.toLowerCase().replaceAll("_", "-");
  if (value === "pending") return "requested";
  if (value === "on-progress") return "in-progress";
  if (value === "canceled") return "cancelled";
  return value;
};

const statusLabels: Record<string, string> = {
  requested: "Requested",
  accepted: "Accepted",
  "in-progress": "In-Progress",
  cancelled: "Cancelled",
  completed: "Completed",
  rejected: "Rejected",
};

const statusStyles: Record<string, string> = {
  requested:
    "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200",
  accepted:
    "border-sky-300 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200",
  "in-progress":
    "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200",
  completed:
    "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
  cancelled: "border-destructive/30 bg-destructive/10 text-destructive",
  rejected: "border-destructive/30 bg-destructive/10 text-destructive",
};

export const BookingStatusBadge = ({ status }: { status: string }) => {
  const normalized = normalizeBookingStatus(status);

  return (
    <Badge
      variant="outline"
      className={`font-medium ${statusStyles[normalized] ?? "text-muted-foreground"}`}
    >
      {statusLabels[normalized] ?? status}
    </Badge>
  );
};

export const PaymentStatusBadge = ({ status }: { status?: string }) => {
  const isPaid = status?.toLowerCase() === "paid";

  return (
    <Badge
      variant="outline"
      className={
        isPaid
          ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
          : "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200"
      }
    >
      {isPaid ? "Paid" : "Unpaid"}
    </Badge>
  );
};
