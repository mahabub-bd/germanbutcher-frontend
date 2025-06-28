import { fetchData } from '@/utils/api-utils';
import { Category } from '@/utils/types';
import { CategoryCard } from './category-card';

export default async function CategoryList({
  children,
  endpoint,
}: {
  children: React.ReactNode;
  endpoint: string;
}) {
  const categories: Category[] = await fetchData(endpoint);

  return (
    <div className=" pt-5 px-4 sm:px-6 md:pt-10 md:px-0">
      <div className="container mx-auto">{children}</div>
      <div className=" py-10 ">
        <div className=" container mx-auto grid grid-cols-3  md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-5 sm:gap-4 md:gap-6">
          {categories?.map((category: Category) => (
            <CategoryCard key={category?.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
