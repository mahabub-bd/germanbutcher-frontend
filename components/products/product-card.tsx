import { Badge } from "@/components/ui/badge";
import { formatCurrencyEnglish, formatWeight } from "@/lib/utils";
import type { Product } from "@/utils/types";
import { DiscountType } from "@/utils/types";
import { Weight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "../cart/add-to-cart-button";

export default async function ProductCard({ product }: { product: Product }) {
  const isDiscountActive =
    product.discountType &&
    product.discountValue &&
    product.discountStartDate &&
    product.discountEndDate &&
    new Date() >= new Date(product.discountStartDate) &&
    new Date() <= new Date(product.discountEndDate);

  const discountedPrice =
    isDiscountActive && product.discountType && product.discountValue
      ? product.discountType === DiscountType.PERCENTAGE
        ? product.sellingPrice -
          product.sellingPrice * (product.discountValue / 100)
        : product.sellingPrice - (product.discountValue || 0)
      : null;

  const isOutOfStock = !product?.stock;

  return (
    <div className="group relative bg-gray-100 rounded-sm border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 overflow-hidden">
      <Link href={`/product/${product?.slug}`} className="block">
        {/* Image Container */}
        <div className="w-full aspect-[16/9] bg-gray-100 overflow-hidden relative mb-3">
          {product?.attachment?.url && (
            <Image
              src={product.attachment.url}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                isOutOfStock ? "grayscale" : ""
              }`}
              loading="lazy"
              sizes="(max-width: 768px) 260px, (max-width: 1024px) 280px, 320px"
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Badge
                variant="destructive"
                className="text-sm font-semibold px-4 py-2 rounded-full"
              >
                Out of Stock
              </Badge>
            </div>
          )}

          {/* Discount Badge */}
          {isDiscountActive &&
            product.discountType &&
            product.discountValue && (
              <div className="absolute top-[2px] right-[2px] z-10">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-2 bg-primaryColor rounded-full"></div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="text-[10px] leading-none font-black">
                      {product.discountType === DiscountType.PERCENTAGE
                        ? `${product.discountValue % 1 === 0 ? product.discountValue : product.discountValue.toFixed(3)}%`
                        : formatCurrencyEnglish(product.discountValue)}
                    </div>
                    <span className="text-[10px] uppercase tracking-wide font-medium">
                      {product.discountType === DiscountType.PERCENTAGE
                        ? "OFF"
                        : "SAVE"}
                    </span>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Content Section */}
        <div className="p-1 md:p-2 lg:p-2 flex flex-col gap-2">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 md:text-base text-sm leading-tight line-clamp-2 group-hover:text-primaryColor transition-colors duration-200">
            {product.name}
          </h3>

          {/* Price and Weight Row */}
          <div className="flex items-center justify-between">
            {/* Price Section */}
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primaryColor">
                {formatCurrencyEnglish(discountedPrice || product.sellingPrice)}
              </span>
              {discountedPrice && (
                <span className="text-sm text-gray-600 line-through">
                  {formatCurrencyEnglish(product.sellingPrice)}
                </span>
              )}
            </div>

            {/* Weight Display */}
            {product?.weight && product?.unit?.name && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-full">
                <Weight size={12} className="text-gray-500" />
                <span className="text-xs font-medium text-gray-600">
                  {formatWeight(product.weight, product.unit.name)}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="lg:p-3 p-3">
        <AddToCartButton
          product={product}
          disabled={isOutOfStock}
          className="w-full"
        />
      </div>
    </div>
  );
}
