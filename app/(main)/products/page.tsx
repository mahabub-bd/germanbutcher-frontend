import { ProductFilters } from "@/components/products/product-filters";
import ProductBarList from "@/components/products/product-grid";

import { SortBar } from "@/components/products/sort-bar";
import { formatSlugToTitle } from "@/lib/utils";
import { fetchData } from "@/utils/api-utils";
import type { Brand, Category } from "@/utils/types";
import { ProductsBreadcrumb } from "./product-breadcrumb";

async function fetchCategories(): Promise<Category[]> {
  try {
    const data: Category[] = await fetchData("categories");
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function fetchBrands(): Promise<Brand[]> {
  try {
    const data: Brand[] = await fetchData("brands");
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

async function fetchCategoryById(id: string): Promise<Category | null> {
  try {
    const data: Category = await fetchData(`categories/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

async function fetchBrandById(id: string): Promise<Brand | null> {
  try {
    const data: Brand = await fetchData(`brands/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching brand:", error);
    return null;
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
  const resolvedSearchParams = await searchParams;

  const [categoriesResult, brandsResult] = await Promise.allSettled([
    fetchCategories(),
    fetchBrands(),
  ]);

  const categories =
    categoriesResult.status === "fulfilled" ? categoriesResult.value : [];
  const brands = brandsResult.status === "fulfilled" ? brandsResult.value : [];

  let categoryInfo = null;
  let brandInfo = null;
  if (resolvedSearchParams.category) {
    categoryInfo = await fetchCategoryById(resolvedSearchParams.category);
  }
  if (resolvedSearchParams.brand) {
    brandInfo = await fetchBrandById(resolvedSearchParams.brand);
  }

  const filterParams = {
    limit: resolvedSearchParams.limit || "12",
    page: resolvedSearchParams.page || "1",
    category: resolvedSearchParams.category,
    brand: resolvedSearchParams.brand,
    featured: resolvedSearchParams.featured,
    sort: resolvedSearchParams.sort,
    minPrice: resolvedSearchParams.minPrice,
    maxPrice: resolvedSearchParams.maxPrice,
  };

  return (
    <div className="container mx-auto md:px-0 px-4  py-5">
      {/* Mobile: Breadcrumb only */}
      <div className="mb-6 md:hidden">
        <ProductsBreadcrumb
          categoryName={
            categoryInfo?.name ||
            (resolvedSearchParams.category
              ? formatSlugToTitle(resolvedSearchParams.category)
              : undefined)
          }
          categorySlug={resolvedSearchParams.category}
          brandName={
            brandInfo?.name ||
            (resolvedSearchParams.brand
              ? formatSlugToTitle(resolvedSearchParams.brand)
              : undefined)
          }
          brandSlug={resolvedSearchParams.brand}
        />
      </div>

      {/* Desktop: Breadcrumb and Sort Bar in same row */}
      <div className="hidden md:flex md:flex-row md:justify-between md:items-center mb-6">
        <ProductsBreadcrumb
          categoryName={
            categoryInfo?.name ||
            (resolvedSearchParams.category
              ? formatSlugToTitle(resolvedSearchParams.category)
              : undefined)
          }
          categorySlug={resolvedSearchParams.category}
          brandName={
            brandInfo?.name ||
            (resolvedSearchParams.brand
              ? formatSlugToTitle(resolvedSearchParams.brand)
              : undefined)
          }
          brandSlug={resolvedSearchParams.brand}
        />
        <SortBar currentSort={resolvedSearchParams.sort} />
      </div>

      {/* Mobile: Filters and Sort Bar in same row */}
      <div className="flex flex-row justify-between items-center gap-4 mb-6 md:hidden">
        <ProductFilters
          categories={categories}
          brands={brands}
          priceRanges={priceRanges}
          currentCategory={resolvedSearchParams.category}
          currentBrand={resolvedSearchParams.brand}
          currentFeatured={resolvedSearchParams.featured === "true"}
          currentPriceRange={{
            min: resolvedSearchParams.minPrice,
            max: resolvedSearchParams.maxPrice,
          }}
        />
        <SortBar currentSort={resolvedSearchParams.sort} />
      </div>

      {/* Desktop: Filters and Products */}
      <div className="hidden md:flex md:flex-row md:justify-between gap-6">
        <ProductFilters
          categories={categories}
          brands={brands}
          priceRanges={priceRanges}
          currentCategory={resolvedSearchParams.category}
          currentBrand={resolvedSearchParams.brand}
          currentFeatured={resolvedSearchParams.featured === "true"}
          currentPriceRange={{
            min: resolvedSearchParams.minPrice,
            max: resolvedSearchParams.maxPrice,
          }}
        />
        <div className="flex-1">
          <ProductBarList filterParams={filterParams} />
        </div>
      </div>

      {/* Mobile Products - Full width */}
      <div className="md:hidden">
        <ProductBarList filterParams={filterParams} />
      </div>
    </div>
  );
}
