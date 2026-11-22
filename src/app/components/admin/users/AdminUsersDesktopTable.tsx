import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminUser } from "@/types/admin";
import AdminUserAvatar from "./AdminUserAvatar";
import AdminUserDate from "./AdminUserDate";
import AdminUserRoleBadge from "./AdminUserRoleBadge";

const AdminUsersDesktopTable = ({ users }: { users: AdminUser[] }) => (
  <div className="hidden overflow-hidden rounded-xl border bg-card shadow-xs md:block">
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead className="w-[38%]">User</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Joined</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="hover:bg-muted/40">
            <TableCell>
              <div className="flex items-center gap-3">
                <AdminUserAvatar user={user} size="lg" />
                <span className="font-medium">
                  {user.name || "Unnamed user"}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground text-sm">
              {user.email}
            </TableCell>
            <TableCell>
              <AdminUserRoleBadge role={user.role} />
            </TableCell>
            <TableCell className="text-muted-foreground">
              <AdminUserDate value={user.createdAt} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default AdminUsersDesktopTable;
