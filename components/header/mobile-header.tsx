import { GermanbutcherLogo } from '@/public/images';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from './mobile-menu';
import SearchBar from './search';
import UserActions from './user-actions';

interface MobileHeaderProps {
  isAdminUser: boolean;
}

export function MobileHeader({ isAdminUser }: MobileHeaderProps) {
  return (
    <div className="lg:hidden flex flex-col bg-primaryColor">
      <div className="flex items-center justify-between py-2 px-4">
        <div className=" flex items-center gap-3 ">
          <MobileMenu isAdmin={isAdminUser} />
          <Link href="/" className="flex items-center  w-8 h-8">
            <Image
              src={GermanbutcherLogo || '/placeholder.svg'}
              alt="PurePac logo"
              width={50}
              height={50}
              className="h-auto w-auto"
              priority
            />
          </Link>
        </div>

        <UserActions compact />
      </div>

      {!isAdminUser && (
        <div className="px-4 pb-2">
          <SearchBar />
        </div>
      )}
    </div>
  );
}
