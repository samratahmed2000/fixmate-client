export type LogoProps = {
  className?: string;
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
