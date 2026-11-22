import type { AdminUser } from "@/types/admin";
import AdminUsersDesktopTable from "./AdminUsersDesktopTable";
import AdminUsersMobileCards from "./AdminUsersMobileCards";

const AdminUsersTable = ({
  users,
  approvingUserId,
  onApprove,
}: {
  users: AdminUser[];
  approvingUserId: string | null;
  onApprove: (userId: string) => void;
}) => (
  <>
    <AdminUsersDesktopTable
      users={users}
      approvingUserId={approvingUserId}
      onApprove={onApprove}
    />
    <AdminUsersMobileCards
      users={users}
      approvingUserId={approvingUserId}
      onApprove={onApprove}
    />
  </>
);

export default AdminUsersTable;
