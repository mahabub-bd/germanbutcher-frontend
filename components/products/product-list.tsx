import { ReactNode, Suspense } from "react";
import ViewAllButton from "../homepage/Category/view-all-button";
import ProductGrid from "./product-homepage-grid";
import { ProductGridSkeleton } from "./product-skeleton";

interface ProductListProps {
  children: ReactNode;
  endpoint: string;
  isHomePage?: boolean;
  href?: string;
}

export default function ProductList({
  children,
  endpoint,
  isHomePage = false,
  href,
}: ProductListProps) {
  return (
    <div className="container mx-auto py-4 sm:px-1 md:py-8 lg:py-10 md:px-2">
      {children}

      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductGrid endpoint={endpoint} />
      </Suspense>

      {isHomePage && (
        <div className="pt-6">
          <ViewAllButton href={href || "/products"} />
        </div>
      )}
    </div>
  );
}
