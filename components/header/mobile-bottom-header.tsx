"use client";

import { useCartContext } from "@/contexts/cart-context";
import { UserTypes } from "@/utils/types";
import { ChefHat, Grid3X3, Home, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  activePattern: string | RegExp;
  badge?: boolean;
}

interface MobileBottomHeaderProps {
  user: UserTypes;
}

export function MobileBottomHeader({ user }: MobileBottomHeaderProps) {
  const pathname = usePathname();
  const { getCartTotals } = useCartContext();
  const { itemCount } = getCartTotals();

  const navigationItems: NavigationItem[] = [
    {
      name: "Category",
      href: "/categories",
      icon: Grid3X3,
      activePattern: /^\/categories/,
    },
    {
      name: "Products",
      href: "/products",
      icon: ChefHat,
      activePattern: /^\/products/,
    },
    {
      name: "Home",
      href: "/",
      icon: Home,
      activePattern: "/",
    },
    {
      name: "Cart",
      href: "/cart",
      icon: ShoppingCart,
      activePattern: "/cart",
      badge: true,
    },
    {
      name: "Account",
      href: `/user/${user?.id}/profile`,
      icon: User,
      activePattern: /^\/user/,
    },
  ];

  const isActive = (item: NavigationItem): boolean => {
    if (typeof item.activePattern === "string") {
      return pathname === item.activePattern;
    }
    return item.activePattern.test(pathname);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100">
      <div className="flex items-center justify-around py-3 px-3 pb-safe">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          const showBadge = item.badge && itemCount > 0;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center py-1 px-2 min-w-0 flex-1 group"
              aria-label={`Navigate to ${item.name}${showBadge ? ` (${itemCount} items)` : ""}`}
            >
              {/* Icon container */}
              <div className="relative mb-1">
                <Icon
                  className={`w-6 h-6 transition-colors duration-200 ${
                    active
                      ? "text-primaryColor"
                      : "text-gray-400 group-hover:text-gray-600"
                  }`}
                />

                {/* Clean badge */}
                {showBadge && (
                  <div className="absolute -top-2 -right-2.5 bg-primaryColor text-white text-xs font-medium rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {itemCount > 99 ? "99+" : itemCount}
                  </div>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs transition-colors duration-200 ${
                  active
                    ? "text-primaryColor font-medium"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              >
                {item.name}
              </span>

              {/* Simple active indicator */}
              {active && (
                <div className="absolute bottom-0 w-12 h-1 bg-primaryColor rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
