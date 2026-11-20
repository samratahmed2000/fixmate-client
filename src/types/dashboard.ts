import { NavItem } from "./navigation";

export type Role = "customer" | "technician" | "admin";

/**
 * Narrow, serializable copy of the signed-in user. The server layout resolves
 * it once so the dashboard chrome can render the right menu on first paint.
 */
export interface DashboardUser {
  name: string | null;
  email: string | null;
  image: string | null;
  role: Role | null;
}

export interface MobileSidebarRailProps {
  pathname: string;
  items: NavItem[];
  isPending: boolean;
  onExpand: () => void;
  onSignOut: () => void;
  onNavigate: () => void;
}
