import { Role } from "@/types/dashboard";
import { NavItem } from "@/types/navigation";
import {
  LayoutDashboardIcon,
  CalendarCheckIcon,
  CreditCardIcon,
  PlusCircleIcon,
  WrenchIcon,
  ClipboardListIcon,
  UsersIcon,
  LayersIcon,
  CalendarRangeIcon,
  ArrowLeftRightIcon,
} from "lucide-react";

export const menuItemsByRole: Record<Role, NavItem[]> = {
  customer: [
    {
      id: "dashboard",
      name: "Overview",
      url: "/dashboard/customer",
      icon: LayoutDashboardIcon,
    },
    {
      id: "bookings",
      name: "My Bookings",
      url: "/dashboard/customer/bookings",
      icon: CalendarCheckIcon,
    },
    {
      id: "payments",
      name: "Payments",
      url: "/dashboard/customer/payments",
      icon: CreditCardIcon,
    },
  ],

  technician: [
    {
      id: "dashboard",
      name: "Overview",
      url: "/dashboard/technician",
      icon: LayoutDashboardIcon,
    },
    {
      id: "add-service",
      name: "Add Service",
      url: "/dashboard/technician/add-service",
      icon: PlusCircleIcon,
    },
    {
      id: "my-services",
      name: "My Services",
      url: "/dashboard/technician/my-services",
      icon: WrenchIcon,
    },
    {
      id: "requests",
      name: "Manage Requests",
      url: "/dashboard/technician/requests",
      icon: ClipboardListIcon,
    },
  ],

  admin: [
    {
      id: "dashboard",
      name: "Overview",
      url: "/dashboard/admin",
      icon: LayoutDashboardIcon,
    },
    {
      id: "users",
      name: "Manage Users",
      url: "/dashboard/admin/users",
      icon: UsersIcon,
    },
    {
      id: "services",
      name: "Service Approval",
      url: "/dashboard/admin/services",
      icon: LayersIcon,
    },
    {
      id: "bookings",
      name: "All Bookings",
      url: "/dashboard/admin/bookings",
      icon: CalendarRangeIcon,
    },
    {
      id: "transactions",
      name: "Transactions",
      url: "/dashboard/admin/transactions",
      icon: ArrowLeftRightIcon,
    },
  ],
};

export const isRole = (value: string | null | undefined): value is Role =>
  value === "customer" || value === "technician" || value === "admin";
