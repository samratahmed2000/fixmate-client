"use client";

import * as React from "react";
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServicesExplorerProps } from "@/types/filtered";

const serviceModes = ["Home Visit", "Shop Drop Off"];

const ServicesExplorer = ({
  categories,
  search,
  selectedCategories,
  selectedModes,
  sort,
  children,
}: ServicesExplorerProps) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = React.useState(search);
  const searchTimeoutRef = React.useRef<number | null>(null);

  const updateUrl = React.useCallback(
    (updates: {
      search?: string;
      category?: string[];
      mode?: string[];
      sort?: string;
    }) => {
      const params = new URLSearchParams();
      const nextSearch = updates.search ?? search;
      const nextCategories = updates.category ?? selectedCategories;
      const nextModes = updates.mode ?? selectedModes;
      const nextSort = updates.sort ?? sort;

      if (nextSearch.trim()) params.set("search", nextSearch.trim());
      if (nextCategories.length)
        params.set("category", nextCategories.join(","));
      if (nextModes.length) params.set("mode", nextModes.join(","));
      if (nextSort) params.set("sort", nextSort);

      router.replace(`/services${params.size ? `?${params.toString()}` : ""}`, {
        scroll: false,
      });
    },
    [router, search, selectedCategories, selectedModes, sort],
  );

  React.useEffect(
    () => () => {
      if (searchTimeoutRef.current !== null) {
        window.clearTimeout(searchTimeoutRef.current);
      }
    },
    [],
  );

  const selectCategory = (slug: string) => {
    updateUrl({ category: slug ? [slug] : [] });
  };

  const selectMode = (mode: string) => {
    updateUrl({ mode: mode ? [mode] : [] });
  };

  const clearFilters = () => {
    if (searchTimeoutRef.current !== null) {
      window.clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
    setSearchValue("");
    router.replace("/services", { scroll: false });
  };

  const hasFilters =
    Boolean(search) ||
    selectedCategories.length > 0 ||
    selectedModes.length > 0 ||
    Boolean(sort);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form
          className="relative w-full sm:max-w-md"
          onSubmit={(event) => {
            event.preventDefault();
            if (searchTimeoutRef.current !== null) {
              window.clearTimeout(searchTimeoutRef.current);
              searchTimeoutRef.current = null;
            }
            updateUrl({ search: searchValue });
          }}
        >
          <SearchIcon
            aria-hidden="true"
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            value={searchValue}
            onChange={(event) => {
              event.preventDefault();
              const value = event.target.value;
              setSearchValue(value);
              if (searchTimeoutRef.current !== null) {
                window.clearTimeout(searchTimeoutRef.current);
              }
              if (!value) {
                searchTimeoutRef.current = null;
                updateUrl({ search: "" });
                return;
              }
              searchTimeoutRef.current = window.setTimeout(() => {
                searchTimeoutRef.current = null;
                updateUrl({ search: value });
              }, 350);
            }}
            placeholder="Search by title or category"
            className="h-10 pl-9"
          />
        </form>

        <div className="flex items-center gap-2 sm:ml-auto">
          <label
            htmlFor="service-sort"
            className="text-sm text-muted-foreground"
          >
            Sort
          </label>
          <select
            id="service-sort"
            value={sort}
            onChange={(event) => updateUrl({ sort: event.target.value })}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="rounded-xl border bg-card p-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2 font-heading font-semibold">
              <SlidersHorizontalIcon className="size-4" />
              Filters
            </div>
            {hasFilters ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
              >
                Clear
              </Button>
            ) : null}
          </div>

          <fieldset className="mt-4 space-y-3">
            <legend className="mb-2 text-sm font-semibold">Category</legend>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="category-filter"
                checked={selectedCategories.length === 0}
                onChange={() => selectCategory("")}
                className="size-4 accent-primary"
              />
              All categories
            </label>
            {categories.map((category) => (
              <label
                key={category._id}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  name="category-filter"
                  checked={
                    selectedCategories.length === 1 &&
                    selectedCategories[0] === category.slug
                  }
                  onChange={() => selectCategory(category.slug)}
                  className="size-4 accent-primary"
                />
                {category.title}
              </label>
            ))}
          </fieldset>

          <fieldset className="mt-5 space-y-3 border-t pt-4">
            <legend className="mb-2 text-sm font-semibold">Service mode</legend>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="mode-filter"
                checked={selectedModes.length === 0}
                onChange={() => selectMode("")}
                className="size-4 accent-primary"
              />
              All modes
            </label>
            {serviceModes.map((mode) => (
              <label
                key={mode}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  name="mode-filter"
                  checked={
                    selectedModes.length === 1 && selectedModes[0] === mode
                  }
                  onChange={() => selectMode(mode)}
                  className="size-4 accent-primary"
                />
                {mode}
              </label>
            ))}
          </fieldset>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
};

export default ServicesExplorer;
