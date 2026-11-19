import type { NavLink } from "@/types/type";
import { cn } from "@/lib/utils";

export const getNavLinks = (): NavLink[] => {
  return [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ];
};

export const isActivePath = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
};

export const navLinkClass = (active: boolean) =>
  cn(
    "rounded-lg text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
    active
      ? "bg-muted text-foreground"
      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
  );
