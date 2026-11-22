import { Category } from "./category";

export interface ServicesExplorerProps {
  categories: Category[];
  search: string;
  selectedCategories: string[];
  selectedModes: string[];
  sort: string;
  children: React.ReactNode;
}
