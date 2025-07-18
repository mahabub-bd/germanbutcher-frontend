"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GermanbutcherLogo } from "@/public/images";
import { User } from "@/utils/types";
import MobileAuth from "../auth/mobile-auth";
import { CategoryLinks } from "./category-links";
import { NavLinks } from "./nav-links";

type TabType = "navigation" | "categories";

export function MobileMenu({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("categories");

  const handleClose = () => setIsOpen(false);

  const tabs = [
    { id: "navigation" as TabType, label: "Menu", count: 5 },
    { id: "categories" as TabType, label: "Categories", count: null },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-xl p-0 hover:bg-black/10 bg-black/5 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5 text-white" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[375px] p-0">
        {/* Hidden title for accessibility */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="border-b border-gray-100 p-4 bg-primaryColor/20">
            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="flex items-center justify-center size-16 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Go to homepage"
                onClick={handleClose}
              >
                <Image
                  src={
                    GermanbutcherLogo ||
                    "/placeholder.svg?height=32&width=32&query=German Butcher logo"
                  }
                  alt="German Butcher logo"
                  width={48}
                  height={48}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </Link>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-100">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id
                      ? "text-primaryColor bg-primaryColor/5"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="truncate">{tab.label}</span>
                    {tab.count && (
                      <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </div>

                  {/* Active indicator */}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primaryColor" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {activeTab === "categories" && (
                <CategoryLinks onCategoryClick={handleClose} />
              )}

              {activeTab === "navigation" && (
                <div className="space-y-2">
                  <NavLinks isMobile={true} onClick={handleClose} />
                </div>
              )}
            </div>
          </div>

          {/* Auth Section in Footer */}
          <div className=" p-4">
            <MobileAuth user={user} onClose={handleClose} />
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t-2 border-[#deb149] bg-gradient-to-r from-black/95 via-gray-900/95 to-black/95">
            <div className="text-center">
              <p className="text-xs text-gray-100 ">© 2025 German Butcher</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
