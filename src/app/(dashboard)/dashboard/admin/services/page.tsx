import AdminServicesView from "@/app/components/admin/services/AdminServicesView";
import { requireAdminAccess } from "@/lib/core/server";

const AdminServicesViewPage = async () => {
  await requireAdminAccess();

  return (
    <section className="space-y-5">
      <header className="space-y-1">
        <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Services Approval
        </h1>
        <p className="text-sm text-muted-foreground">
          Review technician services before publishing them.
        </p>
      </header>
      <AdminServicesView />
    </section>
  );
};

export default AdminServicesViewPage;
