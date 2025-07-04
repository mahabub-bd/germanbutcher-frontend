"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchDataPagination } from "@/utils/api-utils";
import type { Banner } from "@/utils/types";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface AnimatedCarouselProps {
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  activeOnly?: boolean;
}

export function CarouselBanner({
  autoPlayInterval = 3000,
  showControls = true,
  showIndicators = true,
  activeOnly = true,
}: AnimatedCarouselProps) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = (await fetchDataPagination("banners")) as {
          data: Banner[];
        };

        const filteredBanners = activeOnly
          ? response.data.filter((banner) => banner.isActive)
          : response.data;

        setBanners(filteredBanners);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      }
    };

    fetchBanners();
  }, [activeOnly]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || banners.length === 0) return;

      setIsAnimating(true);
      setCurrentIndex(index);

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    },
    [isAnimating, banners.length]
  );

  const goToNextSlide = useCallback(() => {
    if (banners.length === 0 || currentIndex === banners.length - 1) return;
    const newIndex = currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, banners.length]);

  const goToPrevSlide = useCallback(() => {
    if (banners.length === 0 || currentIndex === 0) return;
    const newIndex = currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, banners.length]);

  useEffect(() => {
    if (isPaused || banners.length <= 1) return;

    const interval = setInterval(() => {
      const newIndex =
        currentIndex === banners.length - 1 ? 0 : currentIndex + 1;
      goToSlide(newIndex);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, goToSlide, autoPlayInterval, isPaused, banners.length]);

  const getSlideTransform = (index: number) => {
    if (index === currentIndex) {
      return "translate-x-0";
    } else if (index < currentIndex) {
      return "-translate-x-full";
    } else {
      return "translate-x-full";
    }
  };

  return (
    <div
      className="relative overflow-hidden w-full h-[400px] sm:h-[700px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel container */}
      <div className="relative w-full h-full overflow-hidden">
        {banners &&
          banners.length > 0 &&
          banners.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 w-full h-full transition-all duration-500 ease-in-out",
                getSlideTransform(index),
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              <Image
                src={
                  slide?.image?.url ||
                  "/placeholder.svg?height=600&width=1200&query=banner"
                }
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-0 left-0 p-3 sm:p-4 lg:p-6 xl:p-8 w-full h-full text-white">
                <div className="flex container items-center justify-center sm:justify-start h-full xl:px-24">
                  <div className="max-w-3xl text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 animate-fadeIn text-secondColor leading-tight">
                      {slide.title}
                    </h2>
                    <p className="animate-fadeIn text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium animation-delay-200 mb-3 sm:mb-4 lg:mb-6">
                      {slide.description}
                    </p>
                    {slide.targetUrl && (
                      <Button
                        asChild
                        variant="secondary"
                        className="mt-2 sm:mt-4 lg:mt-6 !py-1.5 sm:!py-2 px-3 sm:px-4 lg:px-6 rounded-[8px] cursor-pointer text-sm sm:text-base lg:text-lg font-semibold bg-primaryColor hover:bg-secondaryColor text-white animate-fadeIn animation-delay-400 inline-flex"
                      >
                        <Link
                          href={slide.targetUrl}
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 sm:gap-2"
                        >
                          Explore Products{" "}
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {showControls && banners.length > 0 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 backdrop-blur-sm border-white/20 rounded-full z-20 shadow-lg w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex",
              currentIndex === 0
                ? "bg-black/20 text-white/40 cursor-not-allowed"
                : "bg-black/40 hover:bg-black/60 text-white"
            )}
            onClick={goToPrevSlide}
            disabled={isAnimating || currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 backdrop-blur-sm border-white/20 rounded-full z-20 shadow-lg w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex",
              currentIndex === banners.length - 1
                ? "bg-black/20 text-white/40 cursor-not-allowed"
                : "bg-black/40 hover:bg-black/60 text-white"
            )}
            onClick={goToNextSlide}
            disabled={isAnimating || currentIndex === banners.length - 1}
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}

      {showIndicators && banners.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primaryColor w-6 sm:w-8"
                  : "bg-white/50 hover:bg-white/80"
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default CarouselBanner;
