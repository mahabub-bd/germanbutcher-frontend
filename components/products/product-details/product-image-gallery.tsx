"use client";

import { Badge } from "@/components/ui/badge";
import type { Attachment, Product } from "@/utils/types";
import Image from "next/image";
import { useRef, useState, type MouseEvent } from "react";

interface ProductImageGalleryProps {
  product: Product;
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(product.attachment.url);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  return (
    <div className="sticky top-16">
      <div
        ref={imageRef}
        className="relative w-full aspect-video bg-white rounded-md overflow-hidden shadow-md border cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Image */}
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 aspect-video"
        />

        {/* Zoomed Image Overlay */}
        {isZoomed && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `url(${selectedImage || "/placeholder.svg"}) no-repeat`,
              backgroundSize: "200%",
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              opacity: 0.8,
            }}
          />
        )}

        {/* Zoom Lens */}
        {isZoomed && (
          <div
            className="absolute w-32 h-32 border-2 border-white rounded-full pointer-events-none shadow-lg"
            style={{
              left: `calc(${zoomPosition.x}% - 64px)`,
              top: `calc(${zoomPosition.y}% - 64px)`,
              background: `url(${selectedImage || "/placeholder.svg"}) no-repeat`,
              backgroundSize: "400%",
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              transform: "translate(0, 0)",
            }}
          />
        )}

        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="absolute top-3 right-3 bg-orange-500 text-white z-10">
            Only {product.stock} left
          </Badge>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
        <div
          className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
            selectedImage === product.attachment.url
              ? "border-primaryColor ring-2 ring-red-100"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => setSelectedImage(product.attachment.url)}
        >
          <Image
            src={product.attachment.url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {product.gallery?.attachments?.map((image: Attachment) => (
          <div
            key={image.id}
            className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              selectedImage === image.url
                ? "border-primaryColor ring-2 ring-red-100"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedImage(image.url)}
          >
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.fileName}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
