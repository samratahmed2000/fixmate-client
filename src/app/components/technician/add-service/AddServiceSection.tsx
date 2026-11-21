import { Category } from "@/types/category";
import getCategories from "@/lib/api/getCategories";
import { getSession } from "@/lib/core/server";
import ServiceForm from "./ServiceForm";

const AddServiceSection = async () => {
  const [session, categories] = await Promise.all([
    getSession(),
    getCategories().catch(() => []),
  ]);
  const user = session?.user;

  const allCategories: Category[] = Array.isArray(categories)
    ? categories
    : (categories?.data ?? []);

  return (
    <ServiceForm
      categories={allCategories}
      mode="add"
      technicianId={user?.id ?? ""}
      technicianName={user?.name ?? ""}
      technicianEmail={user?.email ?? ""}
    />
  );
};

export default AddServiceSection;
