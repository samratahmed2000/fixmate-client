import { UsersIcon, WrenchIcon, Clock3Icon } from "lucide-react";
import DashboardOverview from "@/app/components/dashboard/DashboardOverview";
import { requireDashboardRole } from "@/lib/core/server";
import {
  getDashboardHistory,
  getDashboardOverview,
} from "@/lib/dashboard/overview";

const AdminDashboardPage = async () => {
  await requireDashboardRole("admin");
  const [counts, history] = await Promise.all([
    getDashboardOverview(),
    getDashboardHistory(),
  ]);
  const icons = [UsersIcon, WrenchIcon, Clock3Icon];

  return (
    <DashboardOverview
      title="Admin Overview"
      description="Monitor registered users and service approvals."
      historyTitle="Recent Service Submissions"
      historyDescription="Latest technician services and their review status."
      history={history}
      stats={counts.map((stat, index) => ({
        ...stat,
        icon: icons[index],
      }))}
    />
  );
};

export default AdminDashboardPage;
