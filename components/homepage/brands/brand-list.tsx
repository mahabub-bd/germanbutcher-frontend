import RecommendedProductCard from "@/components/products/RecommendedProductCard";
import { fetchData } from "@/utils/api-utils";
import { Product } from "@/utils/types";
import { ReactNode, Suspense } from "react";
import CustomViewAllButton from "../Category/CustomViewAllButton";
import BrandSkeleton from "./brand-skeleton";

export default async function BrandList({
  children,
  endpoint,
}: {
  children: ReactNode;
  endpoint: string;
}) {
  const products: Product[] = await fetchData(endpoint);
  console.log("Products fetched:", products);

  return (
    <div className="container mx-auto py-4 px-3 sm:px-1 md:py-8 lg:py-10">
      {children}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        <Suspense
          fallback={
            <div className="col-span-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4  xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {[...Array(6)].map((_, i) => (
                <BrandSkeleton key={i} />
              ))}
            </div>
          }
        >
          {products?.slice(0, 10)?.map((product: Product) => (
            <RecommendedProductCard key={product.id} product={product} />
          ))}
        </Suspense>
      </div>
      <div className=" pt-6">
        <CustomViewAllButton />
      </div>
    </div>
  );
}
