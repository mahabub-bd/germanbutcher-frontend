import { fetchData } from "@/utils/api-utils";
import { Product } from "@/utils/types";
import ProductCard from "./product-card";

interface ProductGridProps {
  endpoint: string;
  limit?: number;
  revalidateTime?: number;
}

export default async function ProductGrid({
  endpoint,
  limit = 10,
  revalidateTime = 3600, 
}: ProductGridProps) {
  try {
 
    const products: Product[] = await fetchData(endpoint);

    if (!products?.length) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:px-0 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-2 md:gap-5">
        {products.slice(0, limit).map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          Error loading products. Please try again later.
        </p>
      </div>
    );
  }
}
