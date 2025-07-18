import Image from "next/image";
import Link from "next/link";

import { getUser } from "@/actions/auth";
import { GermanbutcherLogo } from "@/public/images";
import { SearchBar } from "../homepage/search/search-bar";
import { MobileMenu } from "./mobile-menu";

export async function MobileHeader() {
  const user = await getUser();
  return (
    <header className="lg:hidden sticky top-0 z-40 bg-primaryColor shadow-lg">
      <div className="flex items-center justify-between py-3 px-4">
        <div>
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
              width={60}
              height={60}
              className="max-w-full max-h-full object-contain"
              priority
            />
          </Link>
        </div>

        <SearchBar />
        <MobileMenu user={user} />
      </div>
    </header>
  );
}
