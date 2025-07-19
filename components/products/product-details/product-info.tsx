import { Badge } from "@/components/ui/badge";
import type { Product } from "@/utils/types";
import { Package, Star, Tag } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const discountAmount =
    product.discountType === "fixed"
      ? Number.parseFloat(String(product.discountValue ?? "0"))
      : (product.sellingPrice *
          Number.parseFloat(String(product.discountValue ?? "0"))) /
        100;

  const finalPrice = product.sellingPrice - discountAmount;
  const discountPercentage = (
    (discountAmount / product.sellingPrice) *
    100
  ).toFixed(0);

  return (
    <div className="bg-white rounded-md  md:p-6 p-4 shadow-sm border">
      {/* Header Section with Brand and Category */}

      <div className="flex flex-wrap items-center gap-2 mb-4 sm:gap-3 sm:mb-6">
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-red-50 to-pink-50 px-2.5 py-1.5 rounded-full border border-red-200 sm:gap-2 sm:px-4 sm:py-2">
          <Tag className="w-3 h-3 text-primaryColor sm:w-4 sm:h-4" />
          <span className="text-xs font-medium text-primaryColor sm:text-sm">
            Brand:
          </span>
          <span className="text-xs font-semibold text-primaryColor sm:text-sm">
            {product.brand.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-gradient-to-r from-gray-50 to-slate-50 px-2.5 py-1.5 rounded-full border border-gray-200 sm:gap-2 sm:px-4 sm:py-2">
          <Star className="w-3 h-3 text-gray-600 sm:w-4 sm:h-4" />
          <span className="text-xs font-medium text-gray-700 sm:text-sm">
            Category:
          </span>
          <span className="text-xs font-semibold text-gray-900 sm:text-sm">
            {product.category.name}
          </span>
        </div>
      </div>
      {/* Product Title */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {product.name}
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
        {product.description}
      </p>

      {/* Pricing Section */}
      <div className=" mb-6 ">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primaryColor">
              ৳{finalPrice.toFixed(2)}
            </span>
            {discountAmount > 0 && (
              <span className="text-xl text-gray-500 line-through">
                ৳{product.sellingPrice.toFixed(2)}
              </span>
            )}
          </div>

          {discountAmount > 0 && (
            <div className="flex gap-2">
              <Badge className="bg-primaryColor text-white hover:bg-primaryColor/90 px-3 py-1 text-sm font-semibold">
                {discountPercentage}% OFF
              </Badge>
              <Badge className="bg-green-500 text-white hover:bg-green-600 px-3 py-1 text-sm font-semibold">
                Save ৳{discountAmount.toFixed(2)}
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}

      <div className="flex items-center gap-2 text-gray-700">
        <Package className="w-5 h-5 text-gray-500" />
        <span className="font-medium">Weight:</span>
        <span className="font-semibold text-gray-900">
          {product.weight} {product.unit.name}
        </span>
      </div>
    </div>
  );
}
