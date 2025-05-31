import { LoadingIndicator } from "@/components/admin/loading-indicator";
import ProductsContent from "@/components/products/product-content";
import { Suspense } from "react";

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

  return (
    <Suspense
      fallback={<LoadingIndicator fullHeight message="Loading Products..." />}
    >
      <ProductsContent searchParams={resolvedSearchParams} />
    </Suspense>
  );
}
