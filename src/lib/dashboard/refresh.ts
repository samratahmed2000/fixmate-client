export const dashboardDataUpdatedEvent = "fixmate:dashboard-data-updated";

export const notifyDashboardDataUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(dashboardDataUpdatedEvent));
  }
};
