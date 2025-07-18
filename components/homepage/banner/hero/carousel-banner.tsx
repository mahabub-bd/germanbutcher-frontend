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
  priority?: boolean;
}

// Skeleton component for loading state
const CarouselSkeleton = () => (
  <div className="relative overflow-hidden w-full h-[400px] sm:h-[700px] bg-gray-100 animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-2 h-2 bg-gray-300 rounded-full" />
      ))}
    </div>
  </div>
);

const CarouselSlide = ({
  slide,
  index,
  currentIndex,
  priority,
}: {
  slide: Banner;
  index: number;
  currentIndex: number;
  priority?: boolean;
}) => {
  const isActive = index === currentIndex;
  const shouldLoad = index <= currentIndex + 1 && index >= currentIndex - 1;

  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out",
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      )}
      style={{
        transform: `translateX(${(index - currentIndex) * 100}%)`,
      }}
    >
      {shouldLoad && (
        <>
          <Image
            src={
              slide?.image?.url ||
              "/placeholder.svg?height=600&width=1200&query=banner"
            }
            alt={slide.title}
            fill
            className="object-cover"
            priority={priority && index === 0}
            loading={priority && index === 0 ? "eager" : "lazy"}
            sizes="100vw"
            quality={index === 0 ? 90 : 75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kcp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-0 left-0 p-3 sm:p-4 lg:p-6 xl:p-8 w-full h-full text-white">
            <div className="flex container items-center justify-center sm:justify-start h-full xl:px-24">
              <div className="max-w-3xl text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 sm:mb-2 gradient-text leading-tight">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium mb-3 sm:mb-4 lg:mb-6 text-gray-100">
                  {slide.description}
                </p>
                {slide.targetUrl && (
                  <Button
                    asChild
                    variant="secondary"
                    className="mt-2 sm:mt-4 lg:mt-6 py-1.5 sm:py-2 px-3 sm:px-4 lg:px-6 rounded-lg text-sm sm:text-base lg:text-lg font-semibold bg-primaryColor hover:bg-secondaryColor text-white transition-colors duration-200"
                  >
                    <Link
                      href={slide.targetUrl}
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 sm:gap-2"
                    >
                      Explore Products
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Indicators component
const CarouselIndicators = ({
  banners,
  currentIndex,
  onSlideClick,
}: {
  banners: Banner[];
  currentIndex: number;
  onSlideClick: (index: number) => void;
}) => (
  <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
    {banners.map((_, index) => (
      <button
        key={index}
        className={cn(
          "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50",
          index === currentIndex
            ? "bg-primaryColor w-6 sm:w-8"
            : "bg-white/50 hover:bg-white/80"
        )}
        onClick={() => onSlideClick(index)}
        aria-label={`Go to slide ${index + 1}`}
      />
    ))}
  </div>
);

export const CarouselBanner = ({
  autoPlayInterval = 3000,
  showControls = true,
  showIndicators = true,
  activeOnly = true,
  priority = true,
}: AnimatedCarouselProps) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = (await fetchDataPagination("banners")) as {
          data: Banner[];
        };

        if (!isMounted) return;

        const filteredBanners = activeOnly
          ? response.data.filter((banner) => banner.isActive)
          : response.data;

        setBanners(filteredBanners);
      } catch (err) {
        if (!isMounted) return;
        console.error("Failed to fetch banners:", err);
        setError("Failed to load banners");
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

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || banners.length === 0 || index === currentIndex) return;

      setIsAnimating(true);
      setCurrentIndex(index);

      requestAnimationFrame(() => {
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      });
    },
    [isAnimating, banners.length, currentIndex]
  );

  const goToNextSlide = useCallback(() => {
    if (banners.length === 0) return;
    const newIndex = currentIndex === banners.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, banners.length]);

  const goToPrevSlide = useCallback(() => {
    if (banners.length === 0) return;
    const newIndex = currentIndex === 0 ? banners.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide, banners.length]);

  useEffect(() => {
    if (isPaused || banners.length <= 1 || isAnimating) return;

    const interval = setInterval(goToNextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [
    currentIndex,
    goToNextSlide,
    autoPlayInterval,
    isPaused,
    banners.length,
    isAnimating,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevSlide();
      } else if (event.key === "ArrowRight") {
        goToNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  // Loading state
  if (isLoading) {
    return <CarouselSkeleton />;
  }

  // Error state
  if (error || banners.length === 0) {
    return (
      <div className="relative overflow-hidden w-full h-[400px] sm:h-[700px] bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-gray-500 mb-4">
            {error || "No banners available"}
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

  return (
    <section
      className="relative overflow-hidden w-full h-[400px] sm:h-[700px] focus-within:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Featured banners carousel"
      aria-live="polite"
    >
      {/* Preload next image */}
      {banners[currentIndex + 1] && (
        <link
          rel="preload"
          as="image"
          href={banners[currentIndex + 1].image?.url}
        />
      )}

      {/* Carousel container */}
      <div className="relative w-full h-full overflow-hidden">
        {banners.map((slide, index) => (
          <CarouselSlide
            key={slide.id}
            slide={slide}
            index={index}
            currentIndex={currentIndex}
            priority={priority}
          />
        ))}
      </div>

      {/* Controls */}
      {showControls && banners.length > 0 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 backdrop-blur-sm border-white/20 rounded-full z-20 shadow-lg w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex transition-all duration-200",
              "bg-black/40 hover:bg-black/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            )}
            onClick={goToPrevSlide}
            disabled={isAnimating}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 backdrop-blur-sm border-white/20 rounded-full z-20 shadow-lg w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex transition-all duration-200",
              "bg-black/40 hover:bg-black/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            )}
            onClick={goToNextSlide}
            disabled={isAnimating}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </Button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && banners.length > 1 && (
        <CarouselIndicators
          banners={banners}
          currentIndex={currentIndex}
          onSlideClick={goToSlide}
        />
      )}

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentIndex + 1} of {banners.length}:{" "}
        {banners[currentIndex]?.title}
      </div>
    </section>
  );
};

export default CarouselBanner;
