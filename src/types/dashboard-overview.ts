import { LucideIcon } from "lucide-react";

export interface DashboardStatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

export interface DashboardHistoryEntry {
  id: string;
  title: string;
  detail: string;
  status: string;
  createdAt: string | null;
}

export interface DashboardOverviewProps {
  title: string;
  description: string;
  stats: {
    title: string;
    value: number;
    icon: LucideIcon;
  }[];
  historyTitle: string;
  historyDescription: string;
  history: DashboardHistoryEntry[];
}
