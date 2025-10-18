"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchDataPagination } from "@/utils/api-utils";
import type { Banner } from "@/utils/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";

interface PromotionalCarouselProps {
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  activeOnly?: boolean;
  imagesPerSlide?: number;
}

const CarouselSkeleton = memo(() => (
  <div className="relative overflow-hidden w-full h-[400px] bg-gray-100 animate-pulse rounded-lg">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="w-2 h-2 bg-gray-300 rounded-full" />
      ))}
    </div>
  </div>
));

CarouselSkeleton.displayName = "CarouselSkeleton";

const PromotionalCarousel = ({
  autoPlayInterval = 4000,
  showControls = true,
  showIndicators = true,
  activeOnly = true,
  imagesPerSlide = 2,
}: PromotionalCarouselProps) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch banners from API
  useEffect(() => {
    let isMounted = true;

    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = (await fetchDataPagination(
          "banners?type=promotional&position=middle"
        )) as {
          data: Banner[];
        };

        if (!isMounted) return;

        const filteredBanners = activeOnly
          ? response.data.filter((banner) => banner.isActive)
          : response.data;

        setBanners(filteredBanners);
      } catch (err) {
        if (!isMounted) return;
        console.error("Failed to fetch promotional banners:", err);
        setError("Failed to load promotional banners");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBanners();

    return () => {
      isMounted = false;
    };
  }, [activeOnly]);

  // Calculate total number of slides based on images per slide
  const totalSlides = Math.ceil(banners.length / imagesPerSlide);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || banners.length === 0 || index === currentIndex) return;

      setIsAnimating(true);
      setCurrentIndex(index);

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    },
    [isAnimating, banners.length, currentIndex]
  );

  const goToNextSlide = useCallback(() => {
    if (banners.length === 0) return;
    const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, banners.length, totalSlides]);

  const goToPrevSlide = useCallback(() => {
    if (banners.length === 0) return;
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, totalSlides]);

  // Auto-play
  useEffect(() => {
    if (isPaused || banners.length <= imagesPerSlide || isAnimating) return;

    const interval = setInterval(goToNextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [
    currentIndex,
    goToNextSlide,
    autoPlayInterval,
    isPaused,
    banners.length,
    isAnimating,
    imagesPerSlide,
  ]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevSlide();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNextSlide();
      } else if (event.key === " ") {
        event.preventDefault();
        setIsPaused(!isPaused);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, isPaused]);

  // Touch support
  useEffect(() => {
    let startX: number;
    let startY: number;

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as TouchEvent;
      startX = touchEvent.touches[0].clientX;
      startY = touchEvent.touches[0].clientY;
    };

    const handleTouchEnd = (e: Event) => {
      const touchEvent = e as TouchEvent;
      if (!startX || !startY) return;

      const endX = touchEvent.changedTouches[0].clientX;
      const endY = touchEvent.changedTouches[0].clientY;

      const diffX = startX - endX;
      const diffY = startY - endY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          goToNextSlide();
        } else {
          goToPrevSlide();
        }
      }
    };

    const carousel = document.querySelector("[data-promotional-carousel]");
    if (carousel) {
      carousel.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      carousel.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        carousel.removeEventListener("touchstart", handleTouchStart);
        carousel.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [goToNextSlide, goToPrevSlide]);

  // Loading state
  if (isLoading) {
    return <CarouselSkeleton />;
  }

  // Error or empty state
  if (error || banners.length === 0) {
    return (
      <div className="relative overflow-hidden w-full max-w-6xl h-[400px] bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="text-center p-8">
          <p className="text-gray-500 mb-4">
            {error || "No promotional banners available"}
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="text-sm"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Get banners for current slide
  const getCurrentBanners = () => {
    const startIndex = currentIndex * imagesPerSlide;
    return banners.slice(startIndex, startIndex + imagesPerSlide);
  };

  const currentBanners = getCurrentBanners();

  return (
    <div
      className="relative w-full mx-auto  container max-w-7xl px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      data-promotional-carousel
      role="region"
      aria-label="Promotional banners carousel"
    >
      {/* Carousel container */}
      <div className="relative overflow-hidden">
        <div
          className={cn(
            "grid gap-4 transition-all duration-500 ease-in-out",
            imagesPerSlide === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
          )}
        >
          {currentBanners.map((banner, idx) => (
            <div
              key={banner.id}
              className={cn(
                "relative overflow-hidden  shadow-lg h-[300px] md:h-[300px] transition-all duration-500",
                "transform hover:scale-[1.02]"
              )}
            >
              {banner.targetUrl ? (
                <Link href={banner.targetUrl} className="block w-full h-full">
                  <Image
                    src={
                      banner?.image?.url ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt={banner.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 550px) 100vw, 50vw"
                    quality={85}
                    loading={currentIndex === 0 && idx === 0 ? "eager" : "lazy"}
                  />
                </Link>
              ) : (
                <Image
                  src={
                    banner?.image?.url ||
                    "/placeholder.svg?height=400&width=600"
                  }
                  alt={banner.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 550px) 100vw, 50vw"
                  quality={85}
                  loading={currentIndex === 0 && idx === 0 ? "eager" : "lazy"}
                />
              )}

              {(banner.title || banner.description) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  {banner.title && (
                    <h3 className="text-white text-base md:text-lg font-semibold mb-1">
                      {banner.title}
                    </h3>
                  )}
                  {banner.description && (
                    <p className="text-white/90 text-xs md:text-sm line-clamp-2">
                      {banner.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Control buttons */}
      {showControls && totalSlides > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 rounded-full shadow-lg z-10 w-10 h-10"
            onClick={goToPrevSlide}
            disabled={isAnimating}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-0 rounded-full shadow-lg z-10 w-10 h-10"
            onClick={goToNextSlide}
            disabled={isAnimating}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primaryColor w-8 h-2"
                  : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
              )}
              aria-label={`Go to slide ${index + 1} of ${totalSlides}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      )}

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {totalSlides}
        {isPaused ? " (Paused)" : " (Auto-playing)"}
      </div>
    </div>
  );
};

export default PromotionalCarousel;
