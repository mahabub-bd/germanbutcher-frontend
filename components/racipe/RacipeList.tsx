import { fetchData } from '@/utils/api-utils';
import type { Product } from '@/utils/types';
import type { ReactNode } from 'react';
import RacipeCard from './RacipeCard';

export default async function RacipeList({
  children,
  endpoint,
}: {
  children: ReactNode;
  endpoint: string;
}) {
  const Recipe: Product[] = await fetchData(endpoint);

  return (
    <div className="container mx-auto py-4  sm:px-1 md:py-8 lg:py-10 md:px-2">
      {children}
      <div className="grid grid-cols-1 md:px-0 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3   sm:gap-8 md:gap-5 lg:gap-6 gap-4">
        {Recipe &&
          Recipe?.map((racipe: Product) => (
            <RacipeCard key={racipe.id} racipe={racipe} />
          ))}
      </div>
    </div>
  );
}
