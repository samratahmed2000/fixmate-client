import { LucideIcon } from "lucide-react";

export type LogoProps = {
  className?: string;
  /** Hide the "FixMate" wordmark and keep only the wrench mark. */
  iconOnly?: boolean;
};

export interface NavLink {
  label: string;
  href: string;
}

export interface NavUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
}

export interface NavItem {
  id: string;
  name?: string;
  url?: string;
  icon?: LucideIcon;
}

export interface SocialLink {
  label: string;
  href: string;
  path: string;
}

export interface AuthActionsProps {
  variant?: "desktop" | "sheet";
  onNavigate?: () => void;
}

export interface UserMenuProps {
  user: NavUser;
  compact?: boolean;
  onNavigate?: () => void;
}
