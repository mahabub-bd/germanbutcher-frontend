import { LoadingIndicator } from '@/components/admin/loading-indicator';
import { HeadingPrimary } from '@/components/common/heading-primary';
import { AnimatedCarousel } from '@/components/homepage/banner/hero/animated-carousel';
import CategorySlide from '@/components/racipe/CategorySlide';
import RacipeList from '@/components/racipe/RacipeList';
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

      <section className=" ">
        <Suspense
          fallback={<LoadingIndicator message="Loading Categories..." />}
        >
          <RacipeList endpoint="recipes?isPublished=true">
            <HeadingPrimary title="All Recipe" />
          </RacipeList>
        </Suspense>
      </section>
    </div>
  );
}
