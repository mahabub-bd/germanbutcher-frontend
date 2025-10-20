"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { fetchDataPagination } from "@/utils/api-utils";
import type { Banner } from "@/utils/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface PromotionalCarouselProps {
  autoPlayInterval?: number;
  showControls?: boolean;
  activeOnly?: boolean;
}

const CarouselSkeleton = React.memo(() => (
  <div className="relative overflow-hidden w-full h-[250px] md:h-[300px] bg-gray-100 animate-pulse rounded-lg" />
));
CarouselSkeleton.displayName = "CarouselSkeleton";

const PromotionalCarousel = ({
  autoPlayInterval = 4000,
  showControls = true,
  activeOnly = true,
}: PromotionalCarouselProps) => {
  const [banners, setBanners] = React.useState<Banner[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // ✅ Fetch banners on mount
  React.useEffect(() => {
    let isMounted = true;

    const loadBanners = async () => {
      try {
        setIsLoading(true);
        const response = (await fetchDataPagination(
          "banners?type=promotional&position=middle"
        )) as { data: Banner[] };

        if (!isMounted) return;
        setBanners(
          activeOnly
            ? response.data.filter((banner) => banner.isActive)
            : response.data
        );
      } catch (err) {
        setError("Failed to load promotional banners");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBanners();

    return () => {
      isMounted = false;
    };
  }, [activeOnly]);

  if (isLoading) return <CarouselSkeleton />;

  if (error || banners.length === 0)
    return (
      <div className="h-[250px] md:h-[350px] flex items-center justify-center bg-gray-100 rounded-lg">
        No banners available
      </div>
    );

  return (
    <div className="relative w-full container md:max-w-6xl 2xl:max-w-6xl px-4 md:px-12 mx-auto">
      <Carousel
        opts={{ align: "start", loop: banners.length > 1 }}
        plugins={[Autoplay({ delay: autoPlayInterval })]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {banners.map((banner) => (
            <CarouselItem
              key={banner.id}
              className="pl-2 md:pl-4 md:basis-1/2 basis-full"
            >
              <div className="relative overflow-hidden  h-[250px] md:h-[250px] ">
                {banner.targetUrl ? (
                  <Link
                    href={banner.targetUrl}
                    className="block w-full h-full "
                  >
                    <Image
                      src={banner.image?.url || "/placeholder.svg"}
                      alt={banner.title}
                      fill
                      className="object-contain rounded-sm"
                    />
                  </Link>
                ) : (
                  <Image
                    src={banner.image?.url || "/placeholder.svg"}
                    alt={banner.title}
                    fill
                    className="object-contain rounded-sm"
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default PromotionalCarousel;
