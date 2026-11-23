import { getServerAuthContext } from "@/lib/auth/server-session";
import { redirect } from "next/navigation";

export const getSession = async () => {
  return (await getServerAuthContext())?.session ?? null;
};

export const requireCustomerAccess = async () => {
  const session = await getSession();
  const role = session?.user.role;

  if (role === "technician") {
    redirect("/dashboard/technician");
  }

  if (role === "admin") {
    redirect("/dashboard/admin");
  }
};

export const requireAdminAccess = async () => {
  const session = await getSession();
  const role = session?.user.role;

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (role !== "admin") {
    redirect(`/dashboard/${role ?? "customer"}`);
  }
};

export const requireDashboardRole = async (
  requiredRole: "customer" | "technician" | "admin",
) => {
  const session = await getSession();
  const role = session?.user.role;

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (role !== requiredRole) {
    redirect(`/dashboard/${role ?? "customer"}`);
  }

  return session.user;
};

export const requireAuthenticatedUser = async () => {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }
  return session.user;
};
