import { Badge } from "@/components/ui/badge";
import { formatCurrencyEnglish } from "@/lib/utils";
import { getBlurData } from "@/utils/blur-generator";
import type { Product } from "@/utils/types";
import { DiscountType } from "@/utils/types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "../cart/add-to-cart-button";

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

  return (
    <div className="relative group  transition-all duration-300 border border-gray-200 hover:bg-[#FDFBF4]  p-4 flex flex-col items-center rounded-lg shadow-sm hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="flex flex-col  w-full h-full"
      >
        {/* Image Container */}
        <div className="w-full h-[180px] bg-gray-100 rounded-md overflow-hidden relative mb-3">
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

        {/* Discount Badge */}
        {isDiscountActive && product.discountType && product.discountValue && (
          <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600 text-[10px] sm:text-xs">
            {product.discountType === DiscountType.PERCENTAGE
              ? `${product.discountValue}% Off`
              : `Save ${formatCurrencyEnglish(product.discountValue)}`}
          </Badge>
        )}

        <p className="font-bold text-start text-sm sm:text-base uppercase text-gray-800 mt-2">
          {product.name}
        </p>

        <div className=" flex justify-between items-center mt-4">
          <div className="flex items-center justify-center  gap-2">
            <p className="text-primary font-bold text-sm sm:text-base">
              {formatCurrencyEnglish(discountedPrice || product.sellingPrice)}
            </p>
            {discountedPrice && (
              <p className="line-through text-gray-400 text-xs sm:text-sm">
                {formatCurrencyEnglish(product.sellingPrice)}
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex justify-center items-center gap-2 ">
            <button
              size="icon"
              className=" bg-white w-6 h-6 flex shadow justify-center items-center rounded-sm border "
            >
              <Minus size={16} />
            </button>
            <span className="font-semibold text-lg ">1</span>
            <button
              size="icon"
              className=" bg-white w-6 h-6 flex shadow justify-center items-center rounded-sm border"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </Link>

      {/* Add to Cart */}
      <AddToCartButton product={product} disabled={!product?.stock} />
    </div>
  );
}
