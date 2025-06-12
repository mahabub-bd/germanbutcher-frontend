'use client';

import { Category } from '@/utils/types';
import Image from 'next/image';

interface CategoryCardProps {
  category: Category;
  isActive?: boolean;
  onClick?: (slug: string) => void;
}

export function CategoryCard({
  category,
  isActive = false,
  onClick,
}: CategoryCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(category.slug || '');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group block rounded-lg overflow-hidden transition-all duration-300 cursor-pointer`}
    >
      <div className="flex w-full items-center justify-center">
        <div
          className={`relative md:w-[100px] md:h-[100px] w-[100px] h-[100px] rounded-full p-2 flex items-center justify-center  border-2 border-dashed transition-all duration-300 ${
            isActive
              ? 'border-secondaryColor'
              : 'border-primaryColor group-hover:border-secondaryColor'
          }`}
        >
          <Image
            src={category?.attachment?.url || '/category-placeholder.svg'}
            alt={`${category?.name} category icon`}
            width={600}
            height={600}
            className="object-cover w-full h-full rounded-full transition-transform duration-300 group-hover:scale-105"
            priority={true}
            loading="eager"
          />
        </div>
      </div>

      {/* Category Name */}
      <div className="p-2 text-center">
        <h3
          className={`text-md sm:text-lg font-semibold md:text-xl transition-colors line-clamp-2 h-[50px] flex items-center justify-center ${
            isActive ? 'text-secondaryColor' : 'text-primaryColor '
          }`}
        >
          {category?.name}
        </h3>
      </div>
    </div>
  );
}
