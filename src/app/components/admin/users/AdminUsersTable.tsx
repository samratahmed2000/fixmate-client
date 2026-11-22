import type { AdminUser } from "@/types/admin";
import AdminUsersDesktopTable from "./AdminUsersDesktopTable";
import AdminUsersMobileCards from "./AdminUsersMobileCards";

const AdminUsersTable = ({ users }: { users: AdminUser[] }) => (
  <>
    <AdminUsersDesktopTable users={users} />
    <AdminUsersMobileCards users={users} />
  </>
);

export default AdminUsersTable;
