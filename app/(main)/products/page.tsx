import { ProductFilters } from "@/components/products/product-filters";
import ProductBarList from "@/components/products/product-grid";
import { SortBar } from "@/components/products/sort-bar";
import { formatSlugToTitle } from "@/lib/utils";
import { fetchData } from "@/utils/api-utils";
import type { Brand, Category } from "@/utils/types";
import { ProductsBreadcrumb } from "./product-breadcrumb";

// Combined data fetching
async function fetchInitialData() {
  try {
    const [categories, brands] = await Promise.all([
      fetchData<Category[]>("categories"),
      fetchData<Brand[]>("brands"),
    ]);
    return { categories, brands };
  } catch (error) {
    console.error("Error fetching initial data:", error);
    return { categories: [], brands: [] };
  }
}

const priceRanges = [
  { min: 0, max: 5000, label: "Under BDT 5,000" },
  { min: 5000, max: 10000, label: "BDT 5,000 - 10,000" },
  { min: 10000, max: 50000, label: "BDT 10,000 - 50,000" },
  { min: 50000, max: 100000, label: "BDT 50,000 - 100,000" },
  { min: 100000, max: Number.POSITIVE_INFINITY, label: "Above BDT 100,000" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    limit?: string;
    page?: string;
    category?: string;
    brand?: string;
    featured?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const { categories, brands } = await fetchInitialData();

  const filterParams = {
    limit: (await searchParams).limit || "12",
    page: (await searchParams).page || "1",
    category: (await searchParams).category,
    brand: (await searchParams).brand,
    featured: (await searchParams).featured,
    sort: (await searchParams).sort,
    minPrice: (await searchParams).minPrice,
    maxPrice: (await searchParams).maxPrice,
  };

  return (
    <div className="container mx-auto md:px-0 px-4">
      {/* Mobile Header */}
      <div className="mb-6 md:hidden">
        <ProductsBreadcrumb
          categoryName={
            (await searchParams).category
              ? formatSlugToTitle((await searchParams).category ?? "")
              : undefined
          }
          categorySlug={(await searchParams).category}
          brandName={
            (await searchParams).brand
              ? formatSlugToTitle((await searchParams).brand ?? "")
              : undefined
          }
          brandSlug={(await searchParams).brand}
        />
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex md:flex-row md:justify-between md:items-center mb-6">
        <ProductsBreadcrumb
          categoryName={
            (await searchParams).category
              ? formatSlugToTitle((await searchParams).category ?? "")
              : undefined
          }
          categorySlug={(await searchParams).category}
          brandName={
            (await searchParams).brand
              ? formatSlugToTitle((await searchParams).brand ?? "")
              : undefined
          }
          brandSlug={(await searchParams).brand}
        />
        <SortBar currentSort={(await searchParams).sort} />
      </div>

      {/* Mobile Filters */}
      <div className="flex flex-row justify-between items-center gap-4 mb-6 md:hidden">
        <ProductFilters
          categories={categories}
          brands={brands}
          priceRanges={priceRanges}
          currentCategory={(await searchParams).category}
          currentBrand={(await searchParams).brand}
          currentFeatured={(await searchParams).featured === "true"}
          currentPriceRange={{
            min: (await searchParams).minPrice,
            max: (await searchParams).maxPrice,
          }}
        />
        <SortBar currentSort={(await searchParams).sort} />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-row md:justify-between gap-6">
        <ProductFilters
          categories={categories}
          brands={brands}
          priceRanges={priceRanges}
          currentCategory={(await searchParams).category}
          currentBrand={(await searchParams).brand}
          currentFeatured={(await searchParams).featured === "true"}
          currentPriceRange={{
            min: (await searchParams).minPrice,
            max: (await searchParams).maxPrice,
          }}
        />
        <div className="flex-1">
          <ProductBarList filterParams={filterParams} />
        </div>
      </div>

      {/* Mobile Products */}
      <div className="md:hidden">
        <ProductBarList filterParams={filterParams} />
      </div>
    </div>
  );
}
