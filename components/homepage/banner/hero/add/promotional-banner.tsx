"use client";

import { Button } from "@/components/ui/button";
import { fetchDataPagination } from "@/utils/api-utils";
import type { Banner } from "@/utils/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import Slider from "react-slick";

interface PromotionalCarouselProps {
  autoPlayInterval?: number;
  showControls?: boolean;
  activeOnly?: boolean;
}

const CarouselSkeleton = memo(() => (
  <div className="relative overflow-hidden w-full h-[250px] md:h-[300px] bg-gray-100 animate-pulse rounded-lg" />
));
CarouselSkeleton.displayName = "CarouselSkeleton";

const PromotionalCarousel = ({
  autoPlayInterval = 4000,
  showControls = true,
  activeOnly = true,
}: PromotionalCarouselProps) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<Slider>(null);

  // ✅ Fetch banners
  useEffect(() => {
    let isMounted = true;
    const fetchBanners = async () => {
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
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanners();
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoPlayInterval,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className="relative w-full container md:max-w-5xl 2xl:max-w-6xl px-4 md:px-12 mx-auto"
      data-promotional-carousel
    >
      <Slider ref={sliderRef} {...settings}>
        {banners.map((banner) => (
          <div key={banner.id} className="">
            <div className="relative overflow-hidden rounded-sm h-[260px] md:h-[260px]">
              {banner.targetUrl ? (
                <Link href={banner.targetUrl} className="block w-full h-full">
                  <Image
                    src={banner.image?.url || "/placeholder.svg"}
                    alt={banner.title}
                    fill
                    className="object-contain"
                  />
                </Link>
              ) : (
                <Image
                  src={banner.image?.url || "/placeholder.svg"}
                  alt={banner.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </Slider>

      {showControls && banners.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full z-10"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden md:flex absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full z-10"
            onClick={() => sliderRef.current?.slickNext()}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </>
      )}
    </div>
  );
};

export default PromotionalCarousel;
