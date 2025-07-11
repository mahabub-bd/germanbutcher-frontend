"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  navItems: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }) => {
  const pathname = usePathname();

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="w-full">
      {/* Sidebar container */}
      <div
        className={`
          flex flex-col
          bg-white 
          shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
          rounded-lg
          p-3 sm:p-4 lg:p-5 
          w-full 
          overflow-y-auto
          min-h-0
        `}
      >
        <div className="flex-1">
          <div className="space-y-1 sm:space-y-2">
            {/* Navigation Items */}
            {navItems.map((item: NavItem) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    flex items-center group 
                    gap-2 sm:gap-3  flex-wrap
                    px-2 sm:px-3 
                    py-2 sm:py-2.5 lg:py-3 
                    rounded-lg 
                    hover:bg-primaryColor/10
                    transition-colors duration-200
                    ${active ? "bg-primaryColor/10" : ""}
                  `}
                >
                  {/* Icon */}
                  <div
                    className={`
                      w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px]
                      flex justify-center items-center flex-shrink-0 rounded-full
                      text-lg sm:text-xl font-medium
                      ${
                        active
                          ? "text-primaryColor"
                          : "text-descriptionColor group-hover:text-primaryColor"
                      }
                    `}
                  >
                    {item.icon}
                  </div>

                  {/* Label - Hidden on small screens, visible on sm+ */}
                  <span
                    className={`
                      hidden sm:block
                      text-sm sm:text-base font-medium 
                      truncate
                      ${
                        active
                          ? "text-primaryColor"
                          : "text-descriptionColor group-hover:text-primaryColor"
                      }
                    `}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
