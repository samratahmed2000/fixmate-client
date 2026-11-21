import { Category } from "@/types/category";
import { getDashboardUser } from "@/lib/dashboard/getDashboardUser";
import getCategories from "@/lib/api/getCategories";
import ServiceForm from "./ServiceForm";

const AddServiceSection = async () => {
  const [user, categories] = await Promise.all([
    getDashboardUser().catch(() => null),
    getCategories().catch(() => []),
  ]);

  const allCategories: Category[] = Array.isArray(categories)
    ? categories
    : (categories?.data ?? []);

  return (
    <ServiceForm
      categories={allCategories}
      mode="add"
      technicianName={user?.name ?? ""}
      technicianEmail={user?.email ?? ""}
    />
  );
};

export default AddServiceSection;
