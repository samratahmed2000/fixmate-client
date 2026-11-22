import { Card, CardContent } from "@/components/ui/card";
import type { AdminUser } from "@/types/admin";
import AdminUserAvatar from "./AdminUserAvatar";
import AdminUserDate from "./AdminUserDate";
import AdminUserRoleBadge from "./AdminUserRoleBadge";

const AdminUsersMobileCards = ({ users }: { users: AdminUser[] }) => (
  <div className="grid gap-3 md:hidden">
    {users.map((user) => (
      <Card key={user.id} size="sm" className="border-border shadow-xs">
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <AdminUserAvatar user={user} size="lg" />
            <div className="min-w-0">
              <p className="truncate font-semibold">
                {user.name || "Unnamed user"}
              </p>
              <p className="break-all text-[10px] text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t pt-3">
            <AdminUserRoleBadge role={user.role} />
            <div className="text-right text-xs text-muted-foreground">
              <p>Joined</p>
              <AdminUserDate value={user.createdAt} />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default AdminUsersMobileCards;
