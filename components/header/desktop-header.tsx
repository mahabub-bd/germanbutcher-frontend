import { GermanbutcherLogo } from "@/public/images";
import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "../homepage/search/search-bar";
import { NavLinks } from "./nav-links";
import UserActions from "./user-actions";

export function DesktopHeader() {
  return (
    <div className="hidden bg-primaryColor  lg:block  py-4 ">
      <div className="container mx-auto flex justify-between items-center  md:px-0 px-4 ">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-6">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 inline-block transition-all duration-300 group-hover:bg-white/15 group-hover:scale-105">
              <Image
                src={GermanbutcherLogo || "/placeholder.svg"}
                alt="PurePac logo"
                width={60}
                height={60}
                className="w-10 h-10 lg:w-15 lg:h-15"
              />
            </div>
          </Link>

          <nav className="flex items-center space-x-8 ml-20">
            <NavLinks />
          </nav>
        </div>
        <SearchBar />
        <div className="flex items-center space-x-6">

          <UserActions compact={false} />
        </div>
      </div>
    </div>
  );
}
