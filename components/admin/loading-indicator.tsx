import { GermanbutcherLogo } from "@/public/images";
import Image from "next/image";

interface LoadingIndicatorProps {
  message?: string;
  className?: string;
  iconSize?: number;
  containerClassName?: string;
}

export function LoadingIndicator({
  message = "Loading...",
  className = "",
  iconSize = 4,
  containerClassName = "py-12",
}: LoadingIndicatorProps) {
  const iconClasses = `h-${iconSize} w-${iconSize} animate-spin text-primary`;

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${containerClassName}`}
    >
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <Image src={GermanbutcherLogo} alt="logo" width={40} height={40} />

        {/* Loading Message */}
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
