import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ViewAllButtonProps {
  href: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

const buttonVariants = {
  primary:
    'bg-gradient-to-r from-primaryColor to-secondaryColor hover:from-primaryColor/90 hover:to-secondaryColor/90 text-white shadow-lg hover:shadow-xl border-0',
  secondary:
    'bg-white hover:bg-gray-50 text-primaryColor border border-gray-200 shadow-sm hover:shadow-md',
  outline:
    'border-2 border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white bg-transparent',
  ghost: 'bg-transparent hover:bg-primaryColor/10 text-primaryColor border-0',
};

const sizeVariants = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-2.5 text-base gap-2',
  lg: 'px-8 py-3 text-lg gap-2.5',
};

function ViewAllButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children = 'View All',
}: ViewAllButtonProps) {
  return (
    <div className="flex justify-center items-center mt-8">
      <Link href={href} className="group">
        <Button
          className={cn(
            'relative overflow-hidden transition-all duration-300 ease-out',
            'hover:scale-105 active:scale-95',
            'font-semibold tracking-wide rounded-full',
            'focus:outline-none focus:ring-2 focus:ring-primaryColor/50 focus:ring-offset-2',
            buttonVariants[variant],
            sizeVariants[size],
            className
          )}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
            <ArrowRight
              className={cn(
                'transition-transform duration-300 ease-out',
                'group-hover:translate-x-1',
                size === 'sm'
                  ? 'h-4 w-4'
                  : size === 'lg'
                    ? 'h-6 w-6'
                    : 'h-5 w-5'
              )}
            />
          </span>

          {/* Animated background effect */}
          <div
            className={cn(
              'absolute inset-0 -z-10 bg-gradient-to-r opacity-0',
              'transition-opacity duration-300 ease-out group-hover:opacity-100',
              variant === 'primary' && 'from-secondaryColor to-primaryColor',
              variant === 'secondary' && 'from-gray-100 to-gray-50',
              variant === 'outline' &&
                'from-primaryColor/20 to-secondaryColor/20'
            )}
          />
        </Button>
      </Link>
    </div>
  );
}

// Export additional variants for convenience
export const ViewAllButtonSecondary = (
  props: Omit<ViewAllButtonProps, 'variant'>
) => <ViewAllButton {...props} variant="secondary" />;

export const ViewAllButtonOutline = (
  props: Omit<ViewAllButtonProps, 'variant'>
) => <ViewAllButton {...props} variant="outline" />;

export const ViewAllButtonGhost = (
  props: Omit<ViewAllButtonProps, 'variant'>
) => <ViewAllButton {...props} variant="ghost" />;

export default ViewAllButton;
