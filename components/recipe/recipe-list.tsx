import { fetchData } from '@/utils/api-utils';
import type { Recipe } from '@/utils/types';
import type { ReactNode } from 'react';
import RecipeCard from './recipe-card';

export default async function RecipeList({
  children,
  endpoint,
}: {
  children: ReactNode;
  endpoint: string | null;
}) {
  if (endpoint === null) {
    return (
      <div className="container mx-auto py-4 sm:px-1 md:py-8 lg:py-10 md:px-2">
        {children}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="M8 11h8" />
              <path d="M12 15V7" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No recipes to display
          </h3>
          <p className="text-gray-500 max-w-md">
            Please select a category or search for recipes to get started
          </p>
        </div>
      </div>
    );
  }

  const recipes: Recipe[] = await fetchData(endpoint);

  if (!recipes || recipes.length === 0) {
    return (
      <div className="container mx-auto py-4 sm:px-1 md:py-8 lg:py-10 md:px-2">
        {children}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-1.5" />
              <path d="M22 6H2" />
              <path d="M20 12v4" />
              <path d="M16 12v4" />
              <path d="M4 12h10" />
              <path d="M4 16h10" />
              <path d="M4 20h6" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No recipes found
          </h3>
          <p className="text-gray-500 max-w-md">
            Try adjusting your search or selecting a different category
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 sm:px-1 md:py-8 lg:py-10 md:px-2">
      {children}
      <div className="grid grid-cols-1 md:px-0 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 sm:gap-8 md:gap-5 lg:gap-6 gap-4">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
