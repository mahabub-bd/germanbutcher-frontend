"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  isMobile?: boolean;
  onClick?: () => void;
}

export function NavLinks({ isMobile, onClick }: NavLinksProps) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/recipes", label: "Recipe" },
    { href: "/where-to-buy", label: "Where to Buy" },
    { href: "/our-brands", label: "Our Brands" },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClick}
            className={cn(
              "block rounded-xl text-base font-medium transition-colors",
              isMobile
                ? cn(
                    "text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3",
                    isActive && "text-primaryColor bg-primaryColor/10"
                  )
                : cn(
                    "text-white hover:text-white underline-active",
                    isActive && "active"
                  )
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
