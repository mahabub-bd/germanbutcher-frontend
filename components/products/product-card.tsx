import { Badge } from '@/components/ui/badge';
import { formatCurrencyEnglish, formatWeight } from '@/lib/utils';
import { getBlurData } from '@/utils/blur-generator';
import type { Product } from '@/utils/types';
import { DiscountType } from '@/utils/types';
import { Weight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from '../cart/add-to-cart-button';

export default async function ProductCard({ product }: { product: Product }) {
  const { base64 } = await getBlurData(product?.attachment?.url);

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
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-gray-200 transition-all duration-500 overflow-hidden">
      <Link href={`/product/${product?.slug}`} className="block">
        {/* Image Container */}
        <div className="w-full h-[220px] md:h-[180px] lg:h-[220px] bg-gray-100  overflow-hidden relative md:mb-3 mb-1">
          {product?.attachment?.url && (
            <Image
              src={product.attachment.url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              sizes="100%"
              placeholder="blur"
              blurDataURL={base64}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center backdrop-blur-xs">
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
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg font-semibold px-3 py-1 rounded-full">
                {product.discountType === DiscountType.PERCENTAGE
                  ? `${product.discountValue}% OFF`
                  : `Save ${formatCurrencyEnglish(product.discountValue)}`}
              </Badge>
            )}
        </div>

        {/* Content Section */}
        <div className="p-1 md:p-3 lg:p-5 space-y-3">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 md:text-base  leading-tight line-clamp-2 group-hover:text-primaryColor transition-colors duration-200">
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
                <span className="text-sm text-gray-400 line-through">
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
      <div className="px-5 py-5">
        <AddToCartButton product={product} disabled={isOutOfStock} />
      </div>
    </div>
  );
}
