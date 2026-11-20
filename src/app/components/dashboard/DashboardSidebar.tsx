"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { signOut, useSession } from "@/lib/auth-client";
import { isRole, menuItemsByRole } from "@/lib/dashboard/MenuItemsByRole";
import { cn } from "@/lib/utils";
import { Role } from "@/types/dashboard";
import { NavItem } from "@/types/navigation";
import { ArrowLeftIcon, LogOutIcon, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import MobileSidebarRail from "./MobileSidebarRail";

const isActivePath = (pathname: string, url: string) => {
  if (url === "/") {
    return pathname === "/";
  }

  const isDashboardHome = /^\/dashboard\/[^/]+$/.test(url);

  return isDashboardHome
    ? pathname === url
    : pathname === url || pathname.startsWith(`${url}/`);
};

const DashboardSidebar = ({
  initialRole = null,
}: {
  initialRole?: Role | null;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile } = useSidebar();

  const { data: session, isPending } = useSession();
  const sessionRole = session?.user?.role;

  const role = isRole(sessionRole)
    ? sessionRole
    : isRole(initialRole)
      ? initialRole
      : null;

  const items = role ? menuItemsByRole[role] : [];
  const isResolvingRole = isPending && !role;

  const handleSignOut = async () => {
    setOpenMobile(false);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const handleNavigate = () => {
    setOpenMobile(false);
  };

  const renderNavItem = (item: NavItem) => {
    if (!item.url) {
      return null;
    }

    const active = isActivePath(pathname, item.url);
    const Icon = item.icon;

    return (
      <SidebarMenuItem key={item.id}>
        {active && (
          <span
            aria-hidden="true"
            className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-sidebar-primary group-data-[collapsible=icon]:hidden"
          />
        )}
        <SidebarMenuButton
          isActive={active}
          tooltip={item.name}
          render={
            <Link
              href={item.url}
              onClick={handleNavigate}
              aria-current={active ? "page" : undefined}
            />
          }
        >
          {Icon && <Icon />}
          <span>{item.name}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <TooltipProvider>
      <MobileSidebarRail
        pathname={pathname}
        items={items}
        isPending={isResolvingRole}
        onExpand={() => setOpenMobile(true)}
        onSignOut={handleSignOut}
        onNavigate={handleNavigate}
      />

      <Sidebar collapsible="icon" className="pt-16">
        <SidebarHeader className="border-b border-sidebar-border/70 p-2">
          <div
            className={cn(
              "flex items-center justify-between gap-1",
              "group-data-[collapsible=icon]:flex-col",
              isMobile && "flex-col items-stretch",
            )}
          >
            <SidebarMenuButton
              tooltip="Back to Home"
              className="min-w-0"
              render={
                <Link
                  href="/"
                  aria-label="Back to Home"
                  onClick={handleNavigate}
                />
              }
            >
              <ArrowLeftIcon />
              <span
                className={cn(
                  "truncate transition-opacity",
                  "group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:duration-0",
                  "group-data-[state=expanded]:delay-200 group-data-[state=expanded]:duration-150",
                )}
              >
                Back to Home
              </span>
            </SidebarMenuButton>

            <SidebarTrigger
              size="icon"
              aria-label={isMobile ? "Close sidebar" : "Toggle sidebar"}
              className="shrink-0 text-sidebar-foreground/70 group-data-[collapsible=icon]:mx-auto hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            />
          </div>
        </SidebarHeader>

        <SidebarContent className="gap-1">
          <SidebarGroup className="p-2">
            <SidebarMenu>
              {isResolvingRole
                ? Array.from({ length: 4 }).map((_, index) => (
                    <SidebarMenuItem key={`menu-skeleton-${index}`}>
                      <Skeleton className="h-8 w-full rounded-md" />
                    </SidebarMenuItem>
                  ))
                : items.map(renderNavItem)}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border/70 p-2">
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center justify-between gap-1 group-data-[collapsible=icon]:flex-col">
              <SidebarMenuButton
                tooltip="Log out"
                onClick={handleSignOut}
                className="min-w-0 text-sidebar-foreground/70 hover:text-destructive"
              >
                <LogOutIcon />
                <span>Sign Out</span>
              </SidebarMenuButton>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Settings"
                className="shrink-0 text-sidebar-foreground/70 group-data-[collapsible=icon]:mx-auto hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                nativeButton={false}
                render={<Link href="/dashboard/profile" />}
              >
                <Settings className="size-4" aria-hidden="true" />
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
};

export default DashboardSidebar;
