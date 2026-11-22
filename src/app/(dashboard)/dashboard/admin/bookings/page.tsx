import AdminBookingsView from "@/app/components/admin/bookings/AdminBookingsView";
import { requireAdminAccess } from "@/lib/core/server";

const AdminBookingsViewPage = async () => {
  await requireAdminAccess();

  return (
    <section className="space-y-5">
      <header className="space-y-1">
        <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          Booking History
        </h1>
        <p className="text-sm text-muted-foreground">
          View all customer bookings and payment details.
        </p>
      </header>
      <AdminBookingsView />
    </section>
  );
};

export default AdminBookingsViewPage;
