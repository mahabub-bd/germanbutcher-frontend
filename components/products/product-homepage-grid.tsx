import { fetchData } from "@/utils/api-utils";
import { Product } from "@/utils/types";
import ProductCard from "./product-card";

export default async function ProductGrid({ endpoint }: { endpoint: string }) {
  const products: Product[] = await fetchData(endpoint);

  if (!products?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:px-0 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 sm:gap-4 md:gap-5 lg:gap-6 gap-4">
      {products.slice(0, 10).map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
