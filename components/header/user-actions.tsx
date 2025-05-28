import { getUser } from "@/actions/auth";
import { cn } from "@/lib/utils";

import { Search } from "lucide-react";
import AuthBtn from "../auth/auth-button";

import Link from "next/link";
import { CartButtonHeaderWrapper } from "../cart/cart-button-header-wrapper";

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

  const wishlistItemCount = 5;

  return (
    <div
      className={cn(
        "flex items-center text-white",
        compact ? "gap-1" : "gap-5",
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
      <Search />
      <div>
        <Link
          href="/auth/sign-up"
          className="py-2 px-6 border font-semibold text-base lg:text-lg border-white rounded-[8px]"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
