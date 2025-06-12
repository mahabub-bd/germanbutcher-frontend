'use client';

import { useCartContext } from '@/contexts/cart-context';
import { cn } from '@/lib/utils';
import type { Product } from '@/utils/types';
import { Loader2, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
  className?: string;
}

export function AddToCartButton({
  product,
  disabled,
  className,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { addItem } = useCartContext();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addItem(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (disabled) {
    return (
      <Button
        className={cn(
          'w-full md:py-3 py-0 border-primaryColor border px-4 bg-gray-100 text-gray-800 rounded-md font-semibold cursor-not-allowed transition-all duration-200',
          className
        )}
        disabled
      >
        <span className="flex items-center justify-center gap-2 text-primaryColor">
          <ShoppingCart size={16} />
          Out of Stock
        </span>
      </Button>
    );
  }

  return (
    <Button
      className={cn(
        'w-full md:py-3 py-0 px-4 bg-primaryColor hover:bg-primaryColor/90 text-white rounded-sm font-semibold transition-all duration-200 transform  hover:shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group md:text-md cursor-pointer',
        className
      )}
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 size={16} className="animate-spin" />
          Adding to Cart...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <Plus
            size={16}
            className="group-hover:rotate-90 transition-transform duration-200"
          />
          Add to Cart
        </span>
      )}
    </Button>
  );
}
