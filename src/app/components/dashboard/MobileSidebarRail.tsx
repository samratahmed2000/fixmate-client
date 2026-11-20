import { Skeleton } from "@/components/ui/skeleton";
import { isActivePath } from "@/lib/navigation/nav-links";
import { cn } from "@/lib/utils";
import { MobileSidebarRailProps } from "@/types/dashboard";
import {
  ArrowLeftIcon,
  LogOutIcon,
  PanelLeftIcon,
  Settings,
} from "lucide-react";
import Link from "next/link";

const railButtonClass =
  "flex size-8 shrink-0 items-center justify-center rounded-md text-sidebar-foreground/70 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring";

const MobileSidebarRail = ({
  pathname,
  items,
  isPending,
  onExpand,
  onSignOut,
  onNavigate,
}: MobileSidebarRailProps) => {
  return (
    <nav
      aria-label="Dashboard navigation"
      className="flex h-full w-12 shrink-0 flex-col items-center gap-1 border-r border-sidebar-border/70 bg-sidebar py-2 md:hidden"
    >
      <Link
        href="/"
        aria-label="Back to Home"
        title="Back to Home"
        onClick={onNavigate}
        className={railButtonClass}
      >
        <ArrowLeftIcon className="size-4" />
      </Link>

      <button
        type="button"
        aria-label="Expand sidebar"
        title="Expand sidebar"
        onClick={onExpand}
        className={railButtonClass}
      >
        <PanelLeftIcon className="size-4" />
      </button>

      <span aria-hidden="true" className="my-1 h-px w-8 bg-sidebar-border" />

      <div className="flex w-full flex-col items-center gap-1">
        {isPending
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={`rail-skeleton-${index}`}
                className="size-8 rounded-md bg-sidebar-accent/60"
              />
            ))
          : items.map((item) => {
              const Icon = item.icon;
              if (!item.url || !Icon) {
                return null;
              }

              const active = isActivePath(pathname, item.url);

              return (
                <Link
                  key={item.id}
                  href={item.url}
                  aria-label={item.name}
                  aria-current={active ? "page" : undefined}
                  title={item.name}
                  onClick={onNavigate}
                  className={cn(
                    railButtonClass,
                    active &&
                      "bg-sidebar-accent font-medium text-sidebar-primary",
                  )}
                >
                  <Icon className="size-4" />
                </Link>
              );
            })}
      </div>

      <div className="mt-auto flex w-full flex-col items-center gap-1">
        <button
          type="button"
          aria-label="Sign Out"
          title="Sign Out"
          onClick={onSignOut}
          className={railButtonClass}
        >
          <LogOutIcon className="size-4" />
        </button>

        <Link
          href="/dashboard/profile"
          aria-label="Settings"
          title="Settings"
          onClick={onNavigate}
          className={railButtonClass}
        >
          <Settings className="size-4" />
        </Link>
      </div>
    </nav>
  );
};

export default MobileSidebarRail;
