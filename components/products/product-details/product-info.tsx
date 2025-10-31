import { Badge } from "@/components/ui/badge";
import type { Product } from "@/utils/types";
import {
  AlertTriangle,
  CheckCircle,
  Package,
  Star,
  Tag,
  XCircle,
} from "lucide-react";
import Link from "next/link";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  // Check if discount is currently valid
  const isDiscountValid = () => {
    if (!product.discountValue) {
      return false;
    }

    const now = new Date();
    const startDate = product.discountStartDate
      ? new Date(product.discountStartDate)
      : null;
    const endDate = product.discountEndDate
      ? new Date(product.discountEndDate)
      : null;

    // Check if current date is within discount period
    if (startDate && now < startDate) {
      return false; // Discount hasn't started yet
    }

    if (endDate && now > endDate) {
      return false; // Discount has expired
    }

    return true;
  };

  const hasValidDiscount = isDiscountValid();

  const discountAmount = hasValidDiscount
    ? product.discountType === "fixed"
      ? Number.parseFloat(String(product.discountValue ?? "0"))
      : (product.sellingPrice *
          Number.parseFloat(String(product.discountValue ?? "0"))) /
        100
    : 0;

  const finalPrice = product.sellingPrice - discountAmount;
  const discountPercentage =
    discountAmount > 0
      ? ((discountAmount / product.sellingPrice) * 100).toFixed(0)
      : "0";

  // Stock status logic
  const stockQuantity = product.stock || 0;
  const isOutOfStock = stockQuantity === 0;
  const isLowStock = stockQuantity > 0 && stockQuantity <= 5;

  const getStockStatus = () => {
    if (isOutOfStock) {
      return {
        label: "Out of Stock",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle,
        textColor: "text-red-600",
      };
    }
    if (isLowStock) {
      return {
        label: `Only ${stockQuantity} left in stock`,
        color: "bg-orange-100 text-orange-800 border-orange-200",
        icon: AlertTriangle,
        textColor: "text-orange-600",
      };
    }
    return {
      label: "In Stock",
      color: "bg-green-100 text-green-800 border-green-200",
      icon: CheckCircle,
      textColor: "text-green-600",
    };
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;

  return (
    <div className="bg-white rounded-md md:p-6 p-4 shadow-sm border">
      {/* Header Section with Brand and Category */}

      <div className="flex flex-wrap items-center gap-2 mb-4 sm:gap-3 sm:mb-6">
        <Link
          href={`/brands/${product.brand.slug}`}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-50 to-pink-50 px-2.5 py-1.5 rounded-full border border-red-200 hover:from-red-100 hover:to-pink-100 transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2"
        >
          <Tag className="w-3 h-3 text-primaryColor sm:w-4 sm:h-4" />
          <span className="text-xs font-medium text-primaryColor sm:text-sm">
            Brand:
          </span>
          <span className="text-xs font-semibold text-primaryColor sm:text-sm">
            {product.brand.name}
          </span>
        </Link>

        <Link
          href={`/categories/${product.category.slug}`}
          className="flex items-center gap-1.5 bg-gradient-to-r from-gray-50 to-slate-50 px-2.5 py-1.5 rounded-full border border-gray-200 hover:from-gray-100 hover:to-slate-100 transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2"
        >
          <Star className="w-3 h-3 text-gray-600 sm:w-4 sm:h-4" />
          <span className="text-xs font-medium text-gray-700 sm:text-sm">
            Category:
          </span>
          <span className="text-xs font-semibold text-gray-900 sm:text-sm">
            {product.category.name}
          </span>
        </Link>
      </div>

      {/* Product Title */}
      <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {product.name}
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
        {product.description}
      </p>

      {/* Stock Status Section */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${stockStatus.color}`}
          >
            <StockIcon className="w-4 h-4" />
            <span className="font-medium text-sm">{stockStatus.label}</span>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-3xl font-bold ${isOutOfStock ? "text-gray-400" : "text-primaryColor"}`}
            >
              ৳{finalPrice.toFixed(2)}
            </span>
            {discountAmount > 0 && (
              <span className="text-xl text-gray-500 line-through">
                ৳{product.sellingPrice.toFixed(2)}
              </span>
            )}
          </div>

          {discountAmount > 0 && !isOutOfStock && (
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

        {/* Out of stock overlay on price */}
        {isOutOfStock && (
          <p className="text-sm text-gray-500 mt-2 italic">
            Price shown for reference only
          </p>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-700">
          <Package className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Weight:</span>
          <span className="font-semibold text-gray-900">
            {product.weight} {product.unit.name}
          </span>
        </div>

        {/* Stock quantity as product detail - only show quantity for low stock */}
        <div className="flex items-center gap-2 text-gray-700">
          <div
            className={`w-3 h-3 rounded-full ${
              isOutOfStock
                ? "bg-red-400"
                : isLowStock
                  ? "bg-orange-400"
                  : "bg-green-400"
            }`}
          />
          <span className="font-medium">Stock Status:</span>
          <span className={`font-semibold ${stockStatus.textColor}`}>
            {isOutOfStock
              ? "Unavailable"
              : isLowStock
                ? `Low Stock (${stockQuantity})`
                : "Available"}
          </span>
        </div>
      </div>
    </div>
  );
}
