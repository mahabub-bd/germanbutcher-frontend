"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface RouteLoadingBarProps {
  height?: string;
  position?: "top" | "bottom";
  color?: string;
  showOnRouteChange?: boolean;
  delay?: number;
  speed?: number;
}

export default function RouteLoadingBar({
  height = "3px",
  position = "top",
  color = "linear-gradient(270deg, #d29835, #f9ecc0 53.12%, #d29835)",
  showOnRouteChange = true,
  delay = 100,
  speed = 200,
}: RouteLoadingBarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Track route changes
  useEffect(() => {
    if (!showOnRouteChange) return;

    const handleStart = () => {
      setIsLoading(true);
      setProgress(0);

      // Simulate progress
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressTimer);
            return 90;
          }
          return prev + Math.random() * 30;
        });
      }, speed);

      // Cleanup function
      return () => clearInterval(progressTimer);
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);
      }, 200);
    };

    // Start loading after delay
    const startTimer = setTimeout(handleStart, delay);

    // Complete loading when route change is done
    const completeTimer = setTimeout(handleComplete, 100);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, [pathname, searchParams, showOnRouteChange, delay, speed]);

  // Override router methods to detect navigation
  useEffect(() => {
    const originalPush = router.push;
    const originalReplace = router.replace;
    const originalBack = router.back;
    const originalForward = router.forward;

    const handleRouteStart = () => {
      setIsLoading(true);
      setProgress(10);
    };

    router.push = (...args) => {
      handleRouteStart();
      return originalPush.apply(router, args);
    };

    router.replace = (...args) => {
      handleRouteStart();
      return originalReplace.apply(router, args);
    };

    router.back = () => {
      handleRouteStart();
      return originalBack();
    };

    router.forward = () => {
      handleRouteStart();
      return originalForward();
    };

    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
      router.back = originalBack;
      router.forward = originalForward;
    };
  }, [router]);

  if (!isLoading) return null;

  const positionClass = position === "top" ? "top-0" : "bottom-0";

  return (
    <>
      <div
        className={`fixed left-0 right-0 ${positionClass} z-[9999] overflow-hidden bg-gray-200/30 dark:bg-gray-700/30`}
        style={{ height }}
      >
        <div
          className="h-full transition-all duration-300 ease-out relative"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: color,
          }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              animation: "shimmer 1.5s infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </>
  );
}
