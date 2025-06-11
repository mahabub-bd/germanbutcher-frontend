'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function SortBar({ currentSort }: { currentSort?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  const handleSortChange = (value: string) => {
    router.push(`${pathname}?${createQueryString('sort', value)}`);
  };

  return (
    <div className="flex justify-center sm:justify-end w-full sm:w-auto">
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <span className="text-sm font-medium whitespace-nowrap">Sort by:</span>
        <Select
          value={currentSort || 'featured'}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-full sm:w-[180px] min-w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="name_asc">Name: A to Z</SelectItem>
            <SelectItem value="name_desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
