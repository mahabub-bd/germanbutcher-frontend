import { fetchData } from "@/utils/api-utils";
import type { Brand, Category, Product, Recipe } from "@/utils/types";
import { HeadingPrimary } from "../common/heading-primary";

import RecipeCard from "../recipe/recipe-card";
import ProductCard from "./product-card";

interface ProductListProps {
  endpoint: string;
  path: "brands" | "categories";
  searchParams?: {
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function CategoryBrandProductList({
  endpoint,
  path,
}: ProductListProps) {
  let title = "";
  let products: Product[] = [];
  let recipes: Recipe[] = [];

  try {
    const response = (await fetchData(endpoint)) as unknown;

    if (path === "brands" && Array.isArray(response)) {
      const brand = response[0] as Brand;
      title = brand?.name || "";
      products = brand?.products || [];
    } else {
      const category = Array.isArray(response)
        ? (response[0] as Category)
        : null;
      title = category?.name || "";
      products = category?.products || [];
      recipes = category?.recipes || [];
    }
  } catch (error) {
    console.error(`Error fetching ${path}:`, error);
  }

  return (
    <div className="container mx-auto py-4 sm:px-1 md:py-8 lg:py-10 md:px-0">
      <HeadingPrimary title={title} />

      {/* Products Section */}
      {products?.length > 0 ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6 md:py-10 py-5">
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {/* Recipes Section */}
      {recipes?.length > 0 && (
        <div className="mt-8">
          <div className="mb-8">
            <HeadingPrimary
              title="Related Recipes"
              subtitle={`Discover delicious recipes using our ${title.toLowerCase()}`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {recipes?.map((recipe: Recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
