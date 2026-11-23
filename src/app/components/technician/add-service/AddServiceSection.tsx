import { Category } from "@/types/category";
import getCategories from "@/lib/api/getCategories";
import { getSession } from "@/lib/core/server";
import ServiceForm from "./ServiceForm";
import { Card, CardContent } from "@/components/ui/card";

const AddServiceSection = async () => {
  const [session, categories] = await Promise.all([
    getSession(),
    getCategories(),
  ]);
  const user = session?.user;

  const allCategories: Category[] = Array.isArray(categories)
    ? categories
    : (categories?.data ?? []);

  if (allCategories.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-10 text-center">
          <p className="font-medium">No service categories available</p>
          <p className="mt-2 text-sm text-muted-foreground">
            A service category is required before you can publish a repair
            service. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

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
