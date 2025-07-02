"use client";

import type React from "react";

import { useCartContext } from "@/contexts/cart-context";
import { ChefHat, Grid3X3, Home, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  activePattern: string | RegExp;
}

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
  },
  {
    name: "Account",
    href: "/account",
    icon: User,
    activePattern: /^\/account/,
  },
];

export function MobileBottomHeader() {
  const pathname = usePathname();
  const { getCartTotals } = useCartContext();

  const { itemCount } = getCartTotals();

  const isActive = (item: NavigationItem): boolean => {
    if (typeof item.activePattern === "string") {
      return pathname === item.activePattern;
    }
    return item.activePattern.test(pathname);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around py-2 px-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          const isCartItem = item.name === "Cart";

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 relative ${
                active
                  ? "text-primaryColor bg-primaryColor/10"
                  : "text-gray-600 hover:text-primaryColor hover:bg-gray-50"
              }`}
              aria-label={`Go to ${item.name}${isCartItem && itemCount > 0 ? ` (${itemCount} items)` : ""}`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 mb-1 ${active ? "text-primaryColor" : "text-gray-600"}`}
                />
                {isCartItem && itemCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1 border-2 border-white shadow-sm">
                    {itemCount > 99 ? "99+" : itemCount}
                  </div>
                )}
              </div>
              <span
                className={`text-xs font-medium truncate ${active ? "text-primaryColor" : "text-gray-600"}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
