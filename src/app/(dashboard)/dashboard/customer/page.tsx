import {
  ActivityIcon,
  ClipboardListIcon,
  CircleCheckIcon,
} from "lucide-react";
import DashboardOverview from "@/app/components/dashboard/DashboardOverview";
import { requireDashboardRole } from "@/lib/core/server";
import {
  getDashboardHistory,
  getDashboardOverview,
} from "@/lib/dashboard/overview";

const CustomerDashboardPage = async () => {
  await requireDashboardRole("customer");
  const [counts, history] = await Promise.all([
    getDashboardOverview(),
    getDashboardHistory(),
  ]);
  const icons = [ClipboardListIcon, ActivityIcon, CircleCheckIcon];

  return (
    <DashboardOverview
      title="Customer Overview"
      description="Track your repair requests and completed jobs."
      historyTitle="Recent Requests"
      historyDescription="Your latest repair booking activity."
      history={history}
      stats={counts.map((stat, index) => ({
        ...stat,
        icon: icons[index],
      }))}
    />
  );
};

export default CustomerDashboardPage;
