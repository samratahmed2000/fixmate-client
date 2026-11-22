import { Badge } from "@/components/ui/badge";
import type { AdminUserRole } from "@/types/admin";

const roleClasses: Record<AdminUserRole, string> = {
  customer: "border-border bg-muted text-foreground",
  technician: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  admin: "border-primary/20 bg-primary/10 text-primary",
};

const AdminUserRoleBadge = ({ role }: { role: AdminUserRole }) => (
  <Badge variant="outline" className={roleClasses[role]}>
    {role.charAt(0).toUpperCase() + role.slice(1)}
  </Badge>
);

export default AdminUserRoleBadge;
