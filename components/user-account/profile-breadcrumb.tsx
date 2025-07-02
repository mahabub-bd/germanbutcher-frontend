"use client";

import { User } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import { BreadcrumbItem, PageBreadcrumb } from "../ui/page-breadcrumb";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  description: string;
}

interface ProfileBreadcrumbProps {
  navItems: NavItem[];
}

const ProfileBreadcrumb: React.FC<ProfileBreadcrumbProps> = ({ navItems }) => {
  const pathname = usePathname();

  const getBreadcrumbItems = (pathname: string): BreadcrumbItem[] => {
    const baseItems: BreadcrumbItem[] = [
      {
        label: "My Account",
        href: "/profile",
        icon: <User className="h-2.5 w-2.5 sm:h-3 sm:w-3" />,
      },
    ];

    // Find current page info from navItems
    const currentPage = navItems.find((item) => pathname.startsWith(item.href));

    if (currentPage && pathname !== "/profile") {
      baseItems.push({
        label: currentPage.label,
        icon: React.cloneElement(currentPage.icon as React.ReactElement, {}),
        isActive: true,
      });
    } else if (pathname === "/profile") {
      baseItems[0].isActive = true;
    }

    return baseItems;
  };

  return <PageBreadcrumb items={getBreadcrumbItems(pathname)} />;
};

export default ProfileBreadcrumb;
