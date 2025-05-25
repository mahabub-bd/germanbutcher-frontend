import { ProductFilters } from "@/components/products/product-filters";
import ProductBarList from "@/components/products/product-grid";
import { SortBar } from "@/components/products/sort-bar";
import { fetchData } from "@/utils/api-utils";
import type { Brand, Category } from "@/utils/types";

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

const priceRanges = [
  { min: 0, max: 5000, label: "Under BDT 5,000" },
  { min: 5000, max: 10000, label: "BDT 5,000 - 10,000" },
  { min: 10000, max: 50000, label: "BDT 10,000 - 50,000" },
  { min: 50000, max: 100000, label: "BDT 50,000 - 100,000" },
  { min: 100000, max: Number.POSITIVE_INFINITY, label: "Above BDT 100,000" },
];

interface ProductsContentProps {
  searchParams: {
    limit?: string;
    page?: string;
    category?: string;
    brand?: string;
    featured?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function ProductsContent({
  searchParams,
}: ProductsContentProps) {
  const [categories, brands] = await Promise.all([
    fetchCategories(),
    fetchBrands(),
  ]);

  const filterParams = {
    limit: searchParams.limit || "12",
    page: searchParams.page || "1",
    category: searchParams.category,
    brand: searchParams.brand,
    featured: searchParams.featured,
    sort: searchParams.sort,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <SortBar currentSort={searchParams.sort} />
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <ProductFilters
          categories={categories}
          brands={brands}
          priceRanges={priceRanges}
          currentCategory={searchParams.category}
          currentBrand={searchParams.brand}
          currentFeatured={searchParams.featured === "true"}
          currentPriceRange={{
            min: searchParams.minPrice,
            max: searchParams.maxPrice,
          }}
        />
        <ProductBarList filterParams={filterParams} />
      </div>
    </div>
  );
}
