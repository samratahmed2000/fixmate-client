"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, LogOut, UserPen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { NavUser, UserMenuProps } from "@/types/navigation";

const roleLabels: Record<string, string> = {
  customer: "Customer",
  technician: "Technician",
  admin: "Admin",
};

const getInitials = (user: NavUser) => {
  const source = user.name?.trim() || user.email?.split("@")[0] || "";
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "FM";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const UserMenu = ({ user, compact = false, onNavigate }: UserMenuProps) => {
  const router = useRouter();
  const initials = getInitials(user);
  const role = user.role ?? "customer";
  const roleLabel = roleLabels[role] ?? role;

  const handleSignOut = async () => {
    onNavigate?.();

    const { error } = await signOut();

    if (error) {
      toast.add({
        title: "Sign Out Failed",
        description: error.message ?? "Something went wrong. Please try again.",
        type: "error",
      });
      return;
    }

    toast.add({
      title: "Signed Out",
      description: "You have been signed out successfully.",
      type: "success",
    });

    router.refresh();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        openOnHover
        delay={100}
        closeDelay={150}
        aria-label={`Open account menu for ${user.name ?? "your account"}`}
        className="group/account flex max-w-full items-center gap-2 rounded-full p-0.5 text-left outline-none transition-colors hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-muted/60"
      >
        <Avatar size="lg">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name ?? "User avatar"} />
          ) : null}
          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        <span
          className={cn(
            "truncate text-sm font-medium text-foreground",
            compact ? "hidden max-w-48 md:inline" : "max-w-60",
          )}
        >
          {user.name ?? "Account"}
        </span>

        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform group-data-popup-open/account:rotate-180",
            compact ? "hidden md:inline" : "inline",
          )}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-2.5 text-foreground">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                {user.image ? (
                  <AvatarImage
                    src={user.image}
                    alt={user.name ?? "User avatar"}
                  />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold leading-tight">
                  {user.name ?? "Account"}
                </p>
                <p className="truncate text-xs font-normal text-muted-foreground">
                  {user.email}
                </p>
                <Badge
                  variant="outline"
                  className="mt-1.5 border-primary/15 bg-primary/10 text-[10px] font-semibold tracking-wide text-primary uppercase"
                >
                  {roleLabel}
                </Badge>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            render={<Link href="/dashboard" onClick={onNavigate} />}
            className="cursor-pointer gap-2 px-2 py-2"
          >
            <LayoutDashboard aria-hidden="true" />
            Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem
            render={<Link href="/profile" onClick={onNavigate} />}
            className="cursor-pointer gap-2 px-2 py-2"
          >
            <UserPen aria-hidden="true" />
            Update Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={handleSignOut}
            className="cursor-pointer gap-2 px-2 py-2"
          >
            <LogOut aria-hidden="true" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
