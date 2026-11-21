import { Suspense } from "react";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/app/components/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getSession } from "@/lib/core/server";
import { isRole } from "@/lib/dashboard/MenuItemsByRole";
import type { DashboardUser } from "@/types/dashboard";

async function HeaderWithUser() {
  const session = await getSession();
  const sessionUser = session?.user;
  const user: DashboardUser | null = sessionUser
    ? {
        name: sessionUser.name ?? null,
        email: sessionUser.email ?? null,
        image: sessionUser.image ?? null,
        role: isRole(sessionUser.role) ? sessionUser.role : null,
      }
    : null;
  return <DashboardHeader initialUser={user} />;
}

async function SidebarWithRole() {
  const session = await getSession();
  const role = session?.user.role;
  return <DashboardSidebar initialRole={isRole(role) ? role : null} />;
}

function HeaderFallback() {
  return (
    <header className="relative z-40 flex h-16 shrink-0 items-center border-b border-border/70 bg-background">
      <div className="flex h-full shrink-0 items-center pl-3 md:w-(--sidebar-width) md:pl-4" />
      <div className="ml-auto flex items-center gap-2 pr-2 sm:gap-2.5 sm:pr-3 lg:pr-5">
        <Skeleton className="size-9 rounded-full" />
        <div className="grid gap-1.5">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-2.5 w-12" />
        </div>
      </div>
    </header>
  );
}

function SidebarFallback() {
  return (
    <div
      aria-hidden="true"
      className="hidden h-full w-12 shrink-0 border-r border-sidebar-border/70 bg-sidebar md:block md:w-(--sidebar-width)"
    />
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-svh w-full flex-col overflow-hidden">
        <Suspense fallback={<HeaderFallback />}>
          <HeaderWithUser />
        </Suspense>

        <div className="flex min-h-0 flex-1 overflow-hidden">
          <Suspense fallback={<SidebarFallback />}>
            <SidebarWithRole />
          </Suspense>

          <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
