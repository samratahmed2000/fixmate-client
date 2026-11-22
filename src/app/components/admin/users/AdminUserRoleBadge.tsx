import { Badge } from "@/components/ui/badge";
import { getRoleBadgeClassName } from "@/lib/dashboard/role-badge";
import type { AdminUserRole } from "@/types/admin";

const AdminUserRoleBadge = ({ role }: { role: AdminUserRole }) => (
  <Badge variant="outline" className={getRoleBadgeClassName(role)}>
    {role.charAt(0).toUpperCase() + role.slice(1)}
  </Badge>
);

export default AdminUserRoleBadge;
