"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavLinksProps {
  isAdmin?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

export function NavLinks({ isAdmin, isMobile, onClick }: NavLinksProps) {
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
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "block text-base font-medium transition-colors hover:text-primary",
            isMobile ? "block" : ""
          )}
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
