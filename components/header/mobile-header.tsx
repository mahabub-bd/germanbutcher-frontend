import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { GermanbutcherLogo } from "@/public/images";
import { MobileMenu } from "./mobile-menu";

export function MobileHeader() {
  return (
    <header className="lg:hidden flex flex-col bg-primaryColor">
      <div className="flex items-center justify-between py-2 px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center w-16 h-16 rounded-md hover:bg-black/5 transition-colors"
          aria-label="Go to homepage"
        >
          <Image
            src={
              GermanbutcherLogo ||
              "/placeholder.svg?height=64&width=64&query=German Butcher logo"
            }
            alt="German Butcher logo"
            width={64}
            height={64}
            className="max-w-full max-h-full object-contain"
            priority
          />
        </Link>

        {/* Search Button */}
        <button
          className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-black/5 transition-colors"
          aria-label="Search products"
          type="button"
        >
          <Search className="w-6 h-6 text-white" />
        </button>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
