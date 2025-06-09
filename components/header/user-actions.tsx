import { getUser } from '@/actions/auth';
import { cn } from '@/lib/utils';

import { Search } from 'lucide-react';
import AuthBtn from '../auth/auth-button';

import Link from 'next/link';
import { CartButtonHeaderWrapper } from '../cart/cart-button-header-wrapper';

interface UserActionsProps {
  compact?: boolean;
  className?: string;
}

export default async function UserActions({
  compact = false,
  className,
}: UserActionsProps) {
  const user = await getUser();
  // const cart = user ? await fetchProtectedData<Cart>("cart") : null;

  // const wishlistItemCount = 5;

  return (
    <div
      className={cn(
        'flex items-center text-white',
        compact ? 'gap-3' : 'gap-5',
        className
      )}
    >
      {/* {!compact && (
        <IconButton
          icon={
            <HeartIcon className="size-[18px] text-gray-700 group-hover:text-primary transition-colors duration-200" />
          }
          label="Wishlist"
          count={wishlistItemCount}
        />
      )} */}
      <AuthBtn user={user} compact={compact} />
      <CartButtonHeaderWrapper compact={compact} />
      {/* Auth Button */}

      <div className=" hidden lg:block">
        <Search className="lg:h-6 w-5 h-5 lg:w-6 flex justify-center items-center" />
      </div>

      <div>
        <Link
          href="/auth/sign-up"
          className="md:py-2 md:px-6 py-1.5 px-3 border font-semibold text-sm sm:text-base lg:text-lg border-white rounded-[8px]"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
