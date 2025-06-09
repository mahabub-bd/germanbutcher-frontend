import { HeadingPrimary } from "@/components/common/heading-primary";
import type { Product } from "@/utils/types";
import ProductList from "../product-list";
import { ProductBreadcrumb } from "./product-breadcrumb";
import { ProductDetailsCard } from "./product-details-card";
import { ProductFeatures } from "./product-features";
import { ProductImageGallery } from "./product-image-gallery";
import { ProductInfo } from "./product-info";
import { ProductPurchaseSection } from "./product-purchase-section";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProductBreadcrumb product={product} />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <ProductImageGallery product={product} />
          </div>

          {/* Product Information */}
          <div className="lg:col-span-2 space-y-6">
            <ProductInfo product={product} />
            <ProductPurchaseSection product={product} />
            <ProductFeatures />
            <ProductDetailsCard product={product} />
          </div>
        </div>
        <ProductList
          endpoint={`products?page=1&limit=8&category=${product?.category?.id}`}
        >
          <HeadingPrimary title="Related Products" className="mb-8" />
        </ProductList>
      </div>
    </div>
  );
}
