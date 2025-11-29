import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface BadgeProps {
  children: React.ReactNode;
  color?: "success" | "warning" | "danger" | "info" | "default";
}

function Badge({ children, color = "default" }: BadgeProps) {
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
        "flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-medium",
        colorClasses[color]
      )}
    >
      {children}
    </div>
  );
}

interface StatusCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  href?: string;
  color?: string;
  badge?: {
    icon?: LucideIcon;
    text: string;
    color?: "success" | "warning" | "danger" | "info" | "default";
  };
}

export function StatusCard({
  title,
  value,
  icon: Icon,
  href = "#",
  color = "text-gray-700 dark:text-gray-300",
  badge,
}: StatusCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center justify-between gap-3 p-4 rounded-lg transition border",
        "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
        "hover:bg-gray-100 dark:hover:bg-gray-700",
        "hover:shadow-sm"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("w-5 h-5", color)} />
        <h4 className="text-base font-medium text-gray-800 dark:text-gray-200">
          {title}
        </h4>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-gray-900 dark:text-white">
          {value}
        </span>

        {badge && <Badge color={badge.color}>{badge.text}</Badge>}
      </div>
    </a>
  );
}
