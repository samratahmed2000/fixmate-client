import CustomerBookingsPageClient from "@/app/components/bookings/CustomerBookingsPageClient";
import { requireDashboardRole } from "@/lib/core/server";

export default async function CustomerBookingsPage() {
  await requireDashboardRole("customer");
  return <CustomerBookingsPageClient />;
}
