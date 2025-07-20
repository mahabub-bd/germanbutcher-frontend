"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";

interface NavLinksProps {
  isMobile?: boolean;
  onClick?: () => void;
}

export function NavLinks({ isMobile, onClick }: NavLinksProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/recipes", label: "Recipe" },
    { href: "/where-to-buy", label: "Where to Buy" },
    { href: "/our-brands", label: "Our Brands" },
  ];

  const handleClick = useCallback(
    (href: string) => {
      return (e: React.MouseEvent) => {
        e.preventDefault();

        onClick?.();

        startTransition(() => {
          router.push(href);
        });
      };
    },
    [onClick, router]
  );

  const handleMouseEnter = useCallback(
    (href: string) => {
      return () => {
        router.prefetch(href);
      };
    },
    [router]
  );

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={handleClick(link.href)}
            onMouseEnter={handleMouseEnter(link.href)}
            className={cn(
              "block rounded-xl text-base font-medium transition-colors duration-150",
              isMobile
                ? cn(
                    "text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3",
                    isActive && "text-primaryColor bg-primaryColor/10",
                    isPending && "opacity-70"
                  )
                : cn(
                    "text-white  underline-active",
                    isActive && "active",
                    isPending && "opacity-70"
                  )
            )}
            prefetch={true}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
