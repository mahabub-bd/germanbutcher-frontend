"use client";

import { formatCurrencyEnglish } from "@/lib/utils";
import {
  getDiscountedPrice,
  getStockStatus,
  hasActiveDiscount,
} from "@/utils/product-utils";
import type { Product } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

interface ProductSearchItemProps {
  product: Product;
  onClose: () => void;
}

export function ProductSearchItem({
  product,
  onClose,
}: ProductSearchItemProps) {
  const isDiscounted = hasActiveDiscount(product);
  const currentPrice = getDiscountedPrice(product);
  const originalPrice = product.sellingPrice;

  const stockStatus = getStockStatus(product.stock);

  return (
    <Link
      href={`/product/${product.slug}`}
      onClick={onClose}
      className="flex items-center space-x-4 p-3 border-b rounded-lg hover:bg-gray-50 transition-all duration-200 group border border-transparent hover:border-gray-200"
    >
      <div className="relative size-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={product.attachment?.url || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate group-hover:text-primaryColor transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center space-x-2 mt-1">
          <span className="font-semibold text-primaryColor">
            {formatCurrencyEnglish(currentPrice)}
          </span>
          {isDiscounted && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrencyEnglish(originalPrice)}
            </span>
          )}
        </div>
        {stockStatus && (
          <p className={`text-xs mt-1 font-medium ${stockStatus.className}`}>
            {stockStatus.message}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end space-y-1 flex-shrink-0">
        {product.isFeatured && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
            ⭐ Featured
          </span>
        )}
        {isDiscounted && (
          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
            🏷️ Sale
          </span>
        )}
      </div>
    </Link>
  );
}
