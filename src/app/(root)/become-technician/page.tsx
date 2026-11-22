import TechnicianApplicationForm from "@/app/components/technician/TechnicianApplicationForm";
import getCategories from "@/lib/api/getCategories";
import { getSession } from "@/lib/core/server";
import type { Category } from "@/types/category";
import { redirect } from "next/navigation";

const BecomeTechnicianPage = async () => {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in?redirect=%2Fbecome-technician");
  }

  if (session.user.role !== "customer") {
    redirect(`/dashboard/${session.user.role}`);
  }

  const categoryResponse = await getCategories();
  const categories: Category[] = Array.isArray(categoryResponse)
    ? categoryResponse
    : Array.isArray(categoryResponse?.data)
      ? categoryResponse.data
      : [];

  return (
    <section className="mx-auto w-full max-w-3xl space-y-6 px-4 py-10 sm:px-6 lg:py-14">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Join FixMate</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Become a Technician
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Submit your details for admin review. Your account will become a
          technician account after approval.
        </p>
      </header>
      <TechnicianApplicationForm
        name={session.user.name ?? ""}
        email={session.user.email}
        categories={categories}
      />
    </section>
  );
};

export default BecomeTechnicianPage;
