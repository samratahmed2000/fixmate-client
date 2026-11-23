import getCategories from "@/lib/api/getCategories";
import { Category } from "@/types/category";
import CategoryCard from "./CategoryCard";
import { LayoutGrid } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PopularCategories = async () => {
  const categories = await getCategories();
  const allData: Category[] = Array.isArray(categories)
    ? categories
    : (categories?.data ?? []);

  return (
    <section
      aria-labelledby="popular-categories"
      className="border-t bg-muted/20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <LayoutGrid aria-hidden="true" className="size-3.5" />
            Popular Categories
          </span>
          <h2
            id="popular-categories"
            className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Browse Services By Category
          </h2>
          <p className="mt-2 text-sm text-pretty text-muted-foreground sm:text-base">
            Select a category to find verified technicians ready to help with
            your repair needs.
          </p>
        </div>

        {allData.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 sm:gap-5 lg:mt-12 lg:grid-cols-7 lg:gap-6">
            {allData.map((category) => (
              <li key={category._id} className="h-full">
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
        ) : (
          <Card className="mt-10 border-dashed">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              No service categories are available yet. Please check back soon.
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default PopularCategories;
