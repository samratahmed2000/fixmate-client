import { redirect } from "next/navigation";
import { requireAuthenticatedUser } from "@/lib/core/server";
import { isRole } from "@/lib/dashboard/MenuItemsByRole";

export default async function DashboardIndexPage() {
  const user = await requireAuthenticatedUser();
  const role = isRole(user.role) ? user.role : "customer";
  redirect(`/dashboard/${role}`);
}
