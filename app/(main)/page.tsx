import { LoadingIndicator } from "@/components/admin/loading-indicator";
import { HeadingPrimary } from "@/components/common/heading-primary";
import { AnimatedCarousel } from "@/components/homepage/banner/hero/animated-carousel";
import BrandList from "@/components/homepage/brands/brand-list";
import CategoriesList from "@/components/homepage/Category/categories-list";
import { NewsletterSection } from "@/components/homepage/subscriber/newsletter";
import ProductList from "@/components/products/product-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnimatedCarousel />
      {/* Categories Section */}
      <section className="md:pt-18 pt-5 bg-gray-50">
        <div className=" ">
          <Suspense
            fallback={<LoadingIndicator message="Loading Categories..." />}
          >
            <HeadingPrimary title="All Category" className="" />
            <CategoriesList endpoint="categories"></CategoriesList>
          </Suspense>
        </div>
      </section>

      {/* Best Selling Products Section */}
      <section className="md:py-10 py-5 bg-gray-50">
        <div className="container mx-auto ">
          <ProductList endpoint="products">
            <HeadingPrimary title="Featured Products" className="mb-8" />
          </ProductList>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="md:py-10 py-5 bg-gray-50">
        <div className="container mx-auto ">
          <ProductList endpoint="products">
            <HeadingPrimary
              title="FEATURED PRODUCTS"
              subtitle="Discover our most popular items"
              className="mb-8"
            />
          </ProductList>
        </div>
      </section>

      {/* Brands Section */}
      <section className="md:py-10 py-5 bg-gray-50">
        <div className="container mx-auto ">
          <BrandList endpoint="brands">
            <HeadingPrimary
              title="OUR BRANDS"
              subtitle="Shop from trusted brands you love"
              className="mb-8"
            />
          </BrandList>
        </div>
      </section>

      <section className="md:py-10 py-5 bg-gray-50">
        <div className="container mx-auto ">
          <ProductList endpoint="products/discounted?page=1&limit=20">
            <HeadingPrimary
              title="SPECIAL OFFERS"
              subtitle="Limited-time deals just for you"
              className="mb-8"
              titleClassName="text-green-600"
            />
          </ProductList>
        </div>
      </section>
      {/* Subscribe Section */}
      <section className="md:py-10 py-5 ">
        <div className="container mx-auto ">
          <NewsletterSection />
        </div>
      </section>
    </main>
  );
}
