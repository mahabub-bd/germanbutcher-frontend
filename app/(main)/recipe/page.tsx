import { LoadingIndicator } from '@/components/admin/loading-indicator';
import { AnimatedCarousel } from '@/components/homepage/banner/hero/animated-carousel';
import CategorySlide from '@/components/racipe/CategorySlide';
import RacipeSearch from '@/components/racipe/RacipeSearch';
import { Suspense } from 'react';

export default function RecipePage() {
  return (
    <div>
      <AnimatedCarousel />
      <RacipeSearch />
      <section className=" ">
        <Suspense
          fallback={<LoadingIndicator message="Loading Categories..." />}
        >
          <CategorySlide endpoint="categories?isMainCategory=true" />
        </Suspense>
      </section>
      <h1>hello</h1>
    </div>
  );
}
