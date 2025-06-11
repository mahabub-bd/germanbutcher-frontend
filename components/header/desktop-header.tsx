import { GermanbutcherLogo } from '@/public/images';
import Image from 'next/image';
import Link from 'next/link';
import { SearchBar } from '../homepage/search/search-bar';
import { NavLinks } from './nav-links';
import UserActions from './user-actions';

export function DesktopHeader() {
  return (
    <div className="hidden bg-primaryColor  lg:block  py-4 ">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 lg:px-12">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-6">
            <Image
              src={GermanbutcherLogo || '/placeholder.svg'}
              alt="PurePac logo"
              width={60}
              height={60}
              className="w-10 h-10 lg:w-[60px] lg:h-[60px]"
            />
          </Link>

          <nav className="flex items-center space-x-8 ml-20">
            <NavLinks />
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <SearchBar />
          <UserActions compact={false} />
        </div>
      </div>
    </div>
  );
}
