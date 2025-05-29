"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  isAdmin?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

export function NavLinks({ isAdmin, isMobile, onClick }: NavLinksProps) {
  const pathname = usePathname();

  const commonLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/recipe", label: "Recipe" },
    { href: "/where-to-buy", label: "Where to Buy" },
  ];

  const adminLinks = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/user/user-list", label: "Users" },
    { href: "/admin/order/order-list", label: "Orders" },
  ];

  const links = isAdmin ? [...commonLinks, ...adminLinks] : commonLinks;

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
              "relative block px-1 text-base font-medium transition-colors underline-active",
              isMobile ? "text-white" : "text-white/80 hover:text-white",
              isActive && "text-white active"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
