import { LoadingIndicator } from '@/components/admin/loading-indicator';
import { HeadingPrimary } from '@/components/common/heading-primary';
import { AnimatedCarousel } from '@/components/homepage/banner/hero/animated-carousel';
import CategorySlide from '@/components/racipe/CategorySlide';
import { Suspense } from 'react';

export default function RecipePage() {
  return (
    <div>
      <AnimatedCarousel />
      <section className="md:pt-18 pt-5 ">
        <Suspense
          fallback={<LoadingIndicator message="Loading Categories..." />}
        >
          <CategorySlide endpoint="categories?isMainCategory=true">
            <HeadingPrimary title="All Category" />
          </CategorySlide>
        </Suspense>
      </section>
      <h1>hello</h1>
    </div>
  );
}
