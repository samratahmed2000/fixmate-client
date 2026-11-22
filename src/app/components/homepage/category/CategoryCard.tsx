import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/category";
import Link from "next/link";
import {
  Smartphone,
  Laptop,
  AirVent,
  Refrigerator,
  Tv,
  WashingMachine,
  Zap,
  Wrench,
  LucideIcon,
} from "lucide-react";

const categoryIconMap: Record<string, LucideIcon> = {
  smartphone: Smartphone,
  laptop: Laptop,
  "air-vent": AirVent,
  refrigerator: Refrigerator,
  tv: Tv,
  "washing-machine": WashingMachine,
  zap: Zap,
};

const CategoryCard = ({ category }: { category: Category }) => {
  const IconComponent = categoryIconMap[category.icon] ?? Wrench;

  return (
    <Link
      href={`/services?category=${encodeURIComponent(category.slug)}`}
      className="group block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="h-full border-border py-0 bg-background transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm">
        <CardContent className="flex h-full flex-col items-center justify-center gap-2.5 p-3.5 text-center sm:p-4">
          <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-muted/40 text-foreground transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
            <IconComponent aria-hidden="true" className="size-6" />
          </div>

          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {category.title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
