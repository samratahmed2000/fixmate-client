import { WrenchIcon, CircleCheckIcon, Clock3Icon } from "lucide-react";
import DashboardOverview from "@/app/components/dashboard/DashboardOverview";
import { requireDashboardRole } from "@/lib/core/server";
import {
  getDashboardHistory,
  getDashboardOverview,
} from "@/lib/dashboard/overview";

const TechnicianDashboardPage = async () => {
  await requireDashboardRole("technician");
  const [counts, history] = await Promise.all([
    getDashboardOverview(),
    getDashboardHistory(),
  ]);
  const icons = [WrenchIcon, CircleCheckIcon, Clock3Icon];

  return (
    <DashboardOverview
      title="Technician Overview"
      description="Review your service listings and approval progress."
      historyTitle="Recent Services"
      historyDescription="Your latest service submissions and approval status."
      history={history}
      stats={counts.map((stat, index) => ({
        ...stat,
        icon: icons[index],
      }))}
    />
  );
};

export default TechnicianDashboardPage;
