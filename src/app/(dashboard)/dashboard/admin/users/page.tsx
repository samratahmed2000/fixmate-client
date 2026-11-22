import AdminUsersView from "@/app/components/admin/users/AdminUsersView";
import { requireAdminAccess } from "@/lib/core/server";

const AdminUsersViewPage = async () => {
  await requireAdminAccess();

  return (
    <section className="space-y-5">
      <header className="space-y-1">
        <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Manage Users
        </h1>
        <p className="text-sm text-muted-foreground">
          View every account registered on FixMate.
        </p>
      </header>

      <AdminUsersView />
    </section>
  );
};

export default AdminUsersViewPage;
