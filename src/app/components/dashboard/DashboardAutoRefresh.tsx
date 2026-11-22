"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { dashboardDataUpdatedEvent } from "@/lib/dashboard/refresh";

const DashboardAutoRefresh = () => {
  const router = useRouter();

  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    };

    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener(dashboardDataUpdatedEvent, refresh);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener(dashboardDataUpdatedEvent, refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [router]);

  return null;
};

export default DashboardAutoRefresh;
