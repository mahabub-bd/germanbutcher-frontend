import ProductsContent from "@/components/products/product-content";

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

  return <ProductsContent searchParams={resolvedSearchParams} />;
}
