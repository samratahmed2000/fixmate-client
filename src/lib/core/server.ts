import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
  "use server";
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
};

export const requireCustomerAccess = async () => {
  const session = await getSession();
  const role = session?.user.role;

  if (role === "technician") {
    redirect("/dashboard/technician/my-services");
  }

  if (role === "admin") {
    redirect("/dashboard/admin/services");
  }
};
