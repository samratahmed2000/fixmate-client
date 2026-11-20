"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import { isRole } from "@/lib/dashboard/MenuItemsByRole";
import { cn } from "@/lib/utils";
import { DashboardUser } from "@/types/dashboard";
import Logo from "../shared/Logo";

const getInitials = (name?: string | null, email?: string | null) => {
  const source = name?.trim() || email?.split("@")[0] || "";
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "FM";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const DashboardHeader = ({
  initialUser = null,
}: {
  initialUser?: DashboardUser | null;
}) => {
  const { state, isMobile } = useSidebar();
  const { data: session } = useSession();
  const user = session?.user ?? initialUser;

  const collapsed = state === "collapsed";

  const iconOnly = isMobile || collapsed;
  const role = isRole(user?.role) ? user.role : null;

  return (
    <header className="relative z-40 flex h-16 shrink-0 items-center border-b border-border/70 bg-background">
      <div
        className={cn(
          "flex h-full shrink-0 items-center overflow-hidden pl-3 md:pl-4",
          !isMobile &&
            (collapsed
              ? "md:w-(--sidebar-width-icon) md:pl-2"
              : "md:w-(--sidebar-width)"),
        )}
      >
        <Link
          href="/"
          aria-label="FixMate home"
          className="shrink-0 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Logo iconOnly={iconOnly} />
        </Link>
      </div>

      <div className="ml-auto flex min-w-0 items-center justify-end gap-0.5 pr-2 sm:gap-1 sm:pr-3 lg:pr-5">
        {user ? (
          <div className="flex min-w-0 items-center gap-2 p-1 pr-1.5 sm:gap-2.5 sm:pr-3">
            <Avatar size="lg" className="size-9 shrink-0">
              {user.image ? (
                <AvatarImage
                  src={user.image}
                  alt={user.name ?? "User avatar"}
                />
              ) : null}
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {getInitials(user.name, user.email)}
              </AvatarFallback>
            </Avatar>

            <span className="flex min-w-0 flex-col items-start leading-tight">
              <span className="max-w-24 truncate text-sm font-medium text-foreground sm:max-w-40">
                {user.name ?? "Account"}
              </span>
              {role ? (
                <span className="text-[10px] font-semibold tracking-wide text-primary uppercase">
                  {role}
                </span>
              ) : null}
            </span>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default DashboardHeader;
