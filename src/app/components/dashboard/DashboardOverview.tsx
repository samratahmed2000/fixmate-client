import DashboardAutoRefresh from "./DashboardAutoRefresh";
import DashboardHistory from "./DashboardHistory";
import DashboardStatCard from "./DashboardStatCard";
import { DashboardOverviewProps } from "@/types/dashboard-overview";

const DashboardOverview = ({
  title,
  description,
  stats,
  historyTitle,
  historyDescription,
  history,
}: DashboardOverviewProps) => (
  <>
    <DashboardAutoRefresh />
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <DashboardStatCard key={stat.title} {...stat} />
        ))}
      </div>

      <DashboardHistory
        title={historyTitle}
        description={historyDescription}
        entries={history}
      />
    </section>
  </>
);

export default DashboardOverview;
