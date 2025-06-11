import { fetchData } from '@/utils/api-utils';
import type { Product } from '@/utils/types';
import type { ReactNode } from 'react';
import ViewAllButton from '../homepage/Category/CustomViewAllButton';
import ProductCard from './product-card';

export default async function ProductList({
  children,
  endpoint,
  isHomePage = false,
  href,
}: {
  children: ReactNode;
  endpoint: string;
  isHomePage?: boolean;
  href?: string;
}) {
  const products: Product[] = await fetchData(endpoint);

  return (
    <div className="container mx-auto py-4  sm:px-1 md:py-8 lg:py-10 md:px-2">
      {children}
      <div className="grid grid-cols-2 md:px-0 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  2xl:grid-cols-5 sm:gap-8 md:gap-5 lg:gap-6 gap-4">
        {products &&
          products
            ?.slice(0, 10)
            ?.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
      {isHomePage && (
        <div className=" pt-6">
          <ViewAllButton href={href || '/products'} variant="outline" />
        </div>
      )}
    </div>
  );
}
