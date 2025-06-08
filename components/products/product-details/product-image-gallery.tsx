"use client";

import { Badge } from "@/components/ui/badge";
import type { Product } from "@/utils/types";
import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  product: Product;
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(product.attachment.url);

  const discountAmount =
    product.discountType === "fixed"
      ? Number.parseFloat(String(product.discountValue ?? "0"))
      : (product.sellingPrice *
          Number.parseFloat(String(product.discountValue ?? "0"))) /
        100;

  const discountPercentage = (
    (discountAmount / product.sellingPrice) *
    100
  ).toFixed(0);

  return (
    <div className="sticky top-16">
      <div className="relative w-full h-80 bg-white rounded-xl overflow-hidden shadow-md border">
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        {discountAmount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 text-white font-semibold">
            -{discountPercentage}% OFF
          </Badge>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
            Only {product.stock} left
          </Badge>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
        <div
          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
            selectedImage === product.attachment.url
              ? "border-primaryColor ring-2 ring-red-100"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setSelectedImage(product.attachment.url)}
        >
          <Image
            src={product.attachment.url || "/placeholder.svg"}
            alt={product.name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>

        {product.gallery?.attachments?.map((image) => (
          <div
            key={image.id}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              selectedImage === image.url
                ? "border-primaryColor ring-2 ring-red-100"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedImage(image.url)}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.originalName}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
