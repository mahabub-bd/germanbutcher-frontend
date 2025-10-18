"use client";

import { Button } from "@/components/ui/button";
import { fetchDataPagination } from "@/utils/api-utils";
import type { Banner } from "@/utils/types";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface AnimatedCarouselProps {
  autoPlayInterval?: number;
  showControls?: boolean;

  activeOnly?: boolean;
  priority?: boolean;
}

interface InnerSlider {
  state?: {
    autoplaying?: boolean;
  };
}

// Skeleton component for loading state
const CarouselSkeleton = memo(() => (
  <div className="relative overflow-hidden w-full h-[400px] sm:h-[400px] max-h-[400px] bg-gray-100 animate-pulse">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]" />
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-2 h-2 bg-gray-300 rounded-full" />
      ))}
    </div>
  </div>
));

CarouselSkeleton.displayName = "CarouselSkeleton";

// Control button component
const ControlButton = memo(
  ({
    direction,
    onClick,
    className,
  }: {
    direction: "prev" | "next";
    onClick: () => void;
    className: string;
  }) => (
    <Button
      variant="outline"
      size="icon"
      className={`backdrop-blur-sm border-white/20 rounded-full z-20 shadow-lg transition-all duration-200 bg-black/40 hover:bg-black/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50 w-10 h-10 sm:w-12 sm:h-12 ${className}`}
      onClick={onClick}
      aria-label={`${direction === "prev" ? "Previous" : "Next"} slide`}
    >
      {direction === "prev" ? (
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      ) : (
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      )}
    </Button>
  )
);

ControlButton.displayName = "ControlButton";

export const CarouselBanner = ({
  autoPlayInterval = 4000,
  showControls = true,
  activeOnly = true,
  priority = true,
}: AnimatedCarouselProps) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = (await fetchDataPagination(
          "banners?type=main&position=top"
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        sliderRef.current?.slickPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        sliderRef.current?.slickNext();
      } else if (event.key === " ") {
        event.preventDefault();
        if (sliderRef.current) {
          // Toggle autoplay
          const slider = sliderRef.current as Slider & {
            innerSlider?: InnerSlider;
          };
          if (slider.innerSlider?.state?.autoplaying) {
            sliderRef.current.slickPause();
          } else {
            sliderRef.current.slickPlay();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Loading state
  if (isLoading) {
    return <CarouselSkeleton />;
  }

  // Error state
  if (error || banners.length === 0) {
    return (
      <div className="relative overflow-hidden w-full h-[400px] sm:h-[400px] max-h-[400px] bg-gray-100 flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-gray-500 mb-4">
            {error || "No banners available"}
          </p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="text-sm min-w-[44px] min-h-[44px]"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoPlayInterval,
    pauseOnHover: true,
    pauseOnFocus: true,
    swipe: true,
    swipeToSlide: true,
    touchThreshold: 10,
    arrows: false,
    fade: true,
    cssEase: "ease-in-out",
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
  };

  return (
    <section
      className="relative w-full h-[400px] sm:h-[400px] max-h-[500px] 2xl:h-[500px] focus-within:outline-none"
      role="region"
      aria-label="Featured banners carousel"
      aria-live="polite"
      data-carousel
    >
      <style jsx global>{`
        .slick-dots li.slick-active button div {
          background-color: var(--primary-color, #000) !important;
          width: 32px !important;
          height: 12px !important;
        }
        .slick-dots {
          position: absolute !important;
          bottom: 1rem !important;
          left: 0 !important;
          right: 0 !important;
          transform: none !important;
          z-index: 20 !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }
        .slick-dots li {
          margin: 0 !important;
          display: inline-flex !important;
        }
        .slick-dots li button {
          padding: 0 !important;
        }
        .slick-list,
        .slick-track {
          height: 100% !important;
        }
        .slick-slide > div {
          height: 100% !important;
        }
        @media (min-width: 640px) {
          .slick-dots {
            bottom: 1.5rem !important;
          }
        }
      `}</style>

      {/* Preload next image for better performance */}
      {banners[currentSlide + 1] && (
        <link
          rel="preload"
          as="image"
          href={banners[currentSlide + 1].image?.url}
        />
      )}

      <Slider ref={sliderRef} {...settings}>
        {banners.map((slide, index) => (
          <div
            key={slide.id}
            className="relative w-full h-[400px] sm:h-[400px] max-h-[500px] 2xl:h-[500px]"
          >
            <div className="relative w-full h-full">
              <Image
                src={
                  slide?.image?.url ||
                  "/placeholder.svg?height=600&width=1200&query=banner"
                }
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={priority && index === 0}
                loading={priority && index === 0 ? "eager" : "lazy"}
                sizes="100vw"
                quality={index === 0 ? 85 : 70}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-0 left-0 p-3 sm:p-4 lg:p-6 xl:p-8 w-full h-full text-white">
                <div className="flex container items-center justify-center sm:justify-start h-full xl:px-24">
                  <div className="max-w-3xl text-center sm:text-left">
                    <h2 className="text-2xl font-castor sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl mb-1 sm:mb-2 gradient-text leading-tight">
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
            </div>
          </div>
        ))}
      </Slider>

      {/* Controls */}
      {showControls && banners.length > 1 && (
        <>
          <ControlButton
            direction="prev"
            onClick={() => sliderRef.current?.slickPrev()}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2"
          />
          <ControlButton
            direction="next"
            onClick={() => sliderRef.current?.slickNext()}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2"
          />
        </>
      )}

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentSlide + 1} of {banners.length}:{" "}
        {banners[currentSlide]?.title}
      </div>

      {/* Instructions for screen readers */}
      <div className="sr-only">
        Use arrow keys to navigate slides, or space bar to pause auto-play.
        Swipe left or right on touch devices.
      </div>
    </section>
  );
};

export default CarouselBanner;
