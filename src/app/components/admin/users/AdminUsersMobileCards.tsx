import { Card, CardContent } from "@/components/ui/card";
import type { AdminUser } from "@/types/admin";
import AdminUserAvatar from "./AdminUserAvatar";
import AdminUserDate from "./AdminUserDate";
import AdminUserRoleBadge from "./AdminUserRoleBadge";
import AdminUserApplication from "./AdminUserApplication";

const AdminUsersMobileCards = ({
  users,
  approvingUserId,
  onApprove,
}: {
  users: AdminUser[];
  approvingUserId: string | null;
  onApprove: (userId: string) => void;
}) => (
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
          {user.technicianApplication?.status === "pending" &&
          user.role === "customer" ? (
            <div className="border-t pt-3">
              <AdminUserApplication
                user={user}
                isApproving={approvingUserId === user.id}
                onApprove={onApprove}
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    ))}
  </div>
);

export default AdminUsersMobileCards;
