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
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel container */}
      <div className="relative h-[650px] w-full overflow-hidden">
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
              <div className="absolute top-0 left-0 p-6 w-full h-full text-white">
                <div className="flex container items-center h-full xl:px-24">
                  <div>
                    <h2 className="lg:text-5xl text-3xl font-bold mb-2 animate-fadeIn text-white leading-[130%] lg:leading-[150%]">
                      {slide.title}
                    </h2>
                    <p className="animate-fadeIn text-base md:text-lg xl:text-2xl font-medium animation-delay-200">
                      {slide.description}
                    </p>
                    {slide.targetUrl && (
                      <Button
                        asChild
                        variant="secondary"
                        className="mt-10 !py-2 px-6 rounded-[8px] cursor-pointer text-base font-semibold bg-primaryColor text-white animate-fadeIn animation-delay-400"
                      >
                        <Link
                          href={slide.targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          Explore Products <ArrowRight />
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
              "absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-sm border-white/20 rounded-full z-20 shadow-lg",
              currentIndex === 0
                ? "bg-black/20 text-white/40 cursor-not-allowed"
                : "bg-black/40 hover:bg-black/60 text-white"
            )}
            onClick={goToPrevSlide}
            disabled={isAnimating || currentIndex === 0}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-sm border-white/20 rounded-full z-20 shadow-lg",
              currentIndex === banners.length - 1
                ? "bg-black/20 text-white/40 cursor-not-allowed"
                : "bg-black/40 hover:bg-black/60 text-white"
            )}
            onClick={goToNextSlide}
            disabled={isAnimating || currentIndex === banners.length - 1}
          >
            <ChevronRight className="h-6 w-6 text-white" />
            <span className="sr-only">Next slide</span>
          </Button>
        </>
      )}

      {showIndicators && banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primaryColor w-8"
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
