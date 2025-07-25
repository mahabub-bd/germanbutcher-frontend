import ProductDetails from "@/components/products/product-details/product-details";
import { fetchData } from "@/utils/api-utils";

import { Product } from "@/utils/types";

export default async function ProductDetailspPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product: Product = await fetchData(`products/slug/${slug}`);

  return <ProductDetails product={product} />;
}
