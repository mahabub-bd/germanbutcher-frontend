import { cn } from "@/lib/utils";
import type React from "react";

interface BadgeProps {
  children: React.ReactNode;
  color?: "success" | "warning" | "danger" | "info" | "default";
}

export function Badge({ children, color = "default" }: BadgeProps) {
  const colorClasses = {
    success:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    warning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
        colorClasses[color]
      )}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  count?: string;
  description?: string;
  badge?: {
    icon?: React.ComponentType<{ className?: string }>;
    text: string;
    color?: "success" | "warning" | "danger" | "info" | "default";
  };
  bgColor?:
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "pink"
    | "indigo"
    | "violet"
    | "amber"
    | "default";
  className?: string;
}

export default function StatsCard({
  icon: Icon,
  title,
  value,
  count,
  description,
  bgColor = "default",
  className,
}: StatCardProps) {
  const bgColorClasses = {
    blue: "from-blue-50 to-blue-100 dark:from-blue-950/15 dark:to-blue-900/5",
    green:
      "from-green-50 to-green-100 dark:from-green-950/15 dark:to-green-900/5",
    purple:
      "from-purple-50 to-purple-100 dark:from-purple-950/15 dark:to-purple-900/5",
    orange:
      "from-orange-50 to-orange-100 dark:from-orange-950/15 dark:to-orange-900/5",
    pink: "from-pink-50 to-pink-100 dark:from-pink-950/15 dark:to-pink-900/5",
    indigo:
      "from-indigo-50 to-indigo-100 dark:from-indigo-950/15 dark:to-indigo-900/5",
    violet:
      "from-violet-50 to-violet-100 dark:from-violet-950/15 dark:to-violet-900/5",
    amber:
      "from-amber-50 to-amber-100 dark:from-amber-950/15 dark:to-amber-900/5",
    default: "bg-white dark:bg-white/[0.03]",
  };

  const iconBgClasses = {
    blue: "bg-blue-100 dark:bg-blue-900/30",
    green: "bg-green-100 dark:bg-green-900/30",
    purple: "bg-purple-100 dark:bg-purple-900/30",
    orange: "bg-orange-100 dark:bg-orange-900/30",
    pink: "bg-pink-100 dark:bg-pink-900/30",
    indigo: "bg-indigo-100 dark:bg-indigo-900/30",
    violet: "bg-violet-100 dark:bg-violet-900/30",
    amber: "bg-amber-100 dark:bg-amber-900/30",
    default: "bg-gray-100 dark:bg-gray-800/30",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800",
        "p-3 sm:p-4",
        "bg-gradient-to-br",
        bgColorClasses[bgColor],
        "transition duration-200 hover:shadow-sm",
        className
      )}
    >
      {/* Faint Icon Background */}
      <div className="absolute -top-2 -right-2 opacity-[0.04] dark:opacity-[0.08]">
        <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-gray-800 dark:text-white" />
      </div>

      <div className="flex items-start justify-between">
        {/* Main Icon */}
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg shrink-0",
            iconBgClasses[bgColor]
          )}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 dark:text-white/90" />
        </div>
      </div>

      {/* Content */}
      <div className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1">
        <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight">
          {value}
        </p>

        {count !== undefined && (
          <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            {count}
          </p>
        )}

        {description && (
          <p className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
