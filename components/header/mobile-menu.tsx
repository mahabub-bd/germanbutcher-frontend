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
import { CategoryLinks } from "./category-links";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-10 rounded-lg p-0 hover:bg-black/5 bg-black/10  transition-colors shadow-2xl"
          aria-label="Open navigation menu"
        >
          <Menu className="size-5 text-white" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[375px] p-0">
        {/* Hidden title for accessibility */}
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <div className="flex flex-col h-full bg-primaryColor">
          {/* Header Section */}
          <div className=" border-b  p-2">
            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="flex items-center justify-center size-16 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 shadow-lg"
                aria-label="Go to homepage"
              >
                <Image
                  src={
                    GermanbutcherLogo ||
                    "/placeholder.svg?height=48&width=48&query=German Butcher logo" ||
                    "/placeholder.svg" ||
                    "/placeholder.svg"
                  }
                  alt="German Butcher logo"
                  width={80}
                  height={80}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </Link>
            </div>
          </div>

          {/* Navigation Content */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              <CategoryLinks onCategoryClick={handleClose} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
