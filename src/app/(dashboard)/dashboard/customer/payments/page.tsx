import CustomerPaymentsView from "@/app/components/bookings/CustomerPaymentsView";
import { requireDashboardRole } from "@/lib/core/server";

const PaymentsPage = async () => {
  await requireDashboardRole("customer");
  return <CustomerPaymentsView />;
};

export default PaymentsPage;
