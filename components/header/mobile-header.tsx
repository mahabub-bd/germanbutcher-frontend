import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GermanbutcherLogo } from "@/public/images";
import { Button } from "../ui/button";
import { MobileMenu } from "./mobile-menu";

export function MobileHeader() {
  return (
    <header className="lg:hidden flex flex-col bg-primaryColor">
      <div className="flex items-center justify-between py-2 px-4">
        {/* Mobile Menu */}
        <MobileMenu />

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center w-16 h-16 rounded-md border shadow-2xl border-white/20 hover:bg-white/10 transition-colors"
          aria-label="Go to homepage"
        >
          <Image
            src={
              GermanbutcherLogo ||
              "/placeholder.svg?height=64&width=64&query=German Butcher logo"
            }
            alt="German Butcher logo"
            width={48}
            height={48}
            className="max-w-full max-h-full object-contain"
            priority
          />
        </Link>

        {/* Search Button */}
        <Button
          className="flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 shadow-2xl transition-colors"
          aria-label="Search products"
          type="button"
        >
          <Search className="size-4 text-white" />
        </Button>
      </div>
    </header>
  );
}
