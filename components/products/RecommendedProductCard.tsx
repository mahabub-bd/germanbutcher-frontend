import { Badge } from "@/components/ui/badge";
import { formatCurrencyEnglish, formatWeight } from "@/lib/utils";
import { getBlurData } from "@/utils/blur-generator";
import type { Product } from "@/utils/types";
import { DiscountType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

import { Weight } from "lucide-react";
import { AddToCartButton } from "../cart/add-to-cart-button";

export default async function RecommendedProductCard({
  product,
}: {
  product: Product;
}) {
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

  return (
    <div className="relative group mt-20 mb-5  transition-all duration-300 border border-gray-200 hover:bg-[#FDFBF4]  p-4 flex flex-col items-center rounded-lg shadow-sm hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="flex flex-col  w-full h-full"
      >
        {/* Image Container */}
        <div className=" w-[180px] h-[140px] absolute -top-[90px] left-1/2 -translate-x-1/2 bg-gray-100 rounded-md overflow-hidden  mb-3">
          <div>
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
 {isDiscountActive &&
            product.discountType &&
            product.discountValue && (
              <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600 text-[10px] sm:text-xs">
                {product.discountType === DiscountType.PERCENTAGE
                  ? `${product.discountValue}% Off`
                  : `Save ${formatCurrencyEnglish(product.discountValue)}`}
              </Badge>
            )}
          </div>
          
          {/* {product?.stock === 0 ? (
          <Badge
            variant="destructive"
            className="absolute top-2 right-2 text-[10px] sm:text-xs"
          >
            Out of Stock
          </Badge>
        ) : (
          product.stock > 0 && (
            <Badge className="absolute top-2 right-2 bg-green-500 hover:bg-green-600 text-[10px] sm:text-xs">
              In Stock
            </Badge>
          )
        )} */}
        </div>
         <div className="p-5 pt-15 space-y-3">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2 group-hover:text-primaryColor transition-colors duration-200">
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

     <div>
         <h4 className=" text-base md:text-lg font-normal"><span className="font-semibold text-primaryColor">{Math.round(Number(product?.weight)) }</span> {product?.unit?.name}</h4>       
      </div>        
         
        </div>
      </Link>

      {/* Add to Cart */}
      <div className="w-full">
        <AddToCartButton product={product} disabled={!product?.stock} />
      </div>
    </div>
  );
}
