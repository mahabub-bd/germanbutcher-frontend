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
          <div className=" border-b bg-golden-radial  p-2">
            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="flex items-center justify-center p-2 rounded-lg  transition-colors"
                onClick={handleClose}
                aria-label="Go to homepage"
              >
                <Image
                  src={
                    GermanbutcherLogo ||
                    "/placeholder.svg?height=80&width=80&query=German Butcher logo"
                  }
                  alt="German Butcher Logo"
                  width={60}
                  height={60}
                  className="object-contain"
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
