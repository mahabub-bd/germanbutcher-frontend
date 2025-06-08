import { ReactNode } from "react";

type HeadingProps = {
  title: string;
  subtitle?: string | ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export function HeadingPrimary({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}: HeadingProps) {
  return (
    <div className={`text-center  ${className}`}>
      <h2
        className={`font-semibold text-primaryColor capitalize text-lg md:text-2xl lg:text-[36px] ${titleClassName}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm md:text-base mt-2 ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
