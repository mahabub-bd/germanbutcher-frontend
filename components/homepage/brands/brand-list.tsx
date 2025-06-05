import RecommendedProductCard from "@/components/products/RecommendedProductCard";
import { fetchData } from "@/utils/api-utils";
import { Product } from "@/utils/types";
import { ReactNode, Suspense } from "react";
import CustomViewAllButton from "../Category/CustomViewAllButton";
import BrandSkeleton from "./brand-skeleton";
import ProductSlide from "./ProductSlide";

export default async function BrandList({
  children,
  endpoint,
}: {
  children: ReactNode;
  endpoint: string;
}) {
  const products: Product[] = await fetchData(endpoint);


  return (
    <div className="container mx-auto py-4 px-3 sm:px-1 md:py-8 lg:py-10">
      {children}
     <ProductSlide product={products}/>
      
    </div>
  );
}
