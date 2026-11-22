import type { Role } from "@/types/dashboard";

const roleBadgeColors: Record<Role, string> = {
  customer:
    "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300",
  technician:
    "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  admin:
    "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300",
};

export const getRoleBadgeClassName = (role: string) =>
  role === "customer"
    ? roleBadgeColors.customer
    : role === "technician"
      ? roleBadgeColors.technician
      : role === "admin"
        ? roleBadgeColors.admin
        : "border-border bg-muted text-foreground";
