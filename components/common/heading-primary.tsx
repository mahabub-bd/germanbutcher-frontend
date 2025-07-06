import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type HeadingProps = {
  title: string;
  subtitle?: string | ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg" | "xl";
};

const sizeVariants = {
  sm: {
    title: "text-base md:text-lg lg:text-xl",
    subtitle: "text-xs md:text-sm",
  },
  md: {
    title: "text-lg md:text-xl lg:text-2xl",
    subtitle: "text-sm md:text-base",
  },
  lg: {
    title: "text-xl md:text-2xl lg:text-3xl",
    subtitle: "text-sm md:text-base",
  },
  xl: {
    title: "text-2xl md:text-3xl lg:text-4xl",
    subtitle: "text-base md:text-lg",
  },
};

const alignVariants = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function HeadingPrimary({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  align = "center",
  size = "lg",
}: HeadingProps) {
  const sizeClasses = sizeVariants[size];
  const alignClass = alignVariants[align];

  return (
    <div className={cn(alignClass, "space-y-2", className)}>
      <h2
        className={cn(
          "  font-extrabold text-primaryColor ",
          sizeClasses.title,
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground leading-relaxed max-w-2xl",
            align === "center" && "mx-auto",
            sizeClasses.subtitle,
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
