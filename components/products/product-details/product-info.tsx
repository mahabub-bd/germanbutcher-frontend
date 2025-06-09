import { Badge } from "@/components/ui/badge";
import type { Product } from "@/utils/types";
import { Package } from "lucide-react";

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

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center space-x-2 mb-3">
        <Badge
          variant="outline"
          className="text-primaryColor border-primaryColor bg-red-50"
        >
          {product.brand.name}
        </Badge>
        <Badge variant="outline" className="bg-gray-50">
          {product.category.name}
        </Badge>
      </div>

      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        {product.name}
      </h1>
      <p className="text-gray-600 mb-4">{product.description}</p>

      {/* Pricing Section */}
      <div className="flex items-baseline space-x-3 mb-4">
        <span className="text-3xl font-bold text-primaryColor">
          ৳{finalPrice.toFixed(2)}
        </span>
        {discountAmount > 0 && (
          <span className="text-xl text-gray-400 line-through">
            ৳{product.sellingPrice.toFixed(2)}
          </span>
        )}
        {discountAmount > 0 && (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            Save ৳{discountAmount.toFixed(2)}
          </Badge>
        )}
      </div>

      {/* Stock Information */}
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <span className="flex items-center">
          <Package className="w-4 h-4 mr-1" />
          Weight: {product.weight} {product.unit.name}
        </span>
      </div>
    </div>
  );
}
