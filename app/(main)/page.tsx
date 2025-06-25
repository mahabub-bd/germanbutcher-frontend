import { HeadingPrimary } from "@/components/common/heading-primary";
import { CarouselBanner } from "@/components/homepage/banner/hero/carousel-banner";
import BrandList from "@/components/homepage/brands/brand-list";

import Client from "@/components/homepage/clients/Clients";
import { NewsletterSection } from "@/components/homepage/subscriber/newsletter";
import { TestimonialSection } from "@/components/homepage/testimonial/testimonial-section";
import ProductList from "@/components/products/product-list";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div>
        <CarouselBanner />
      </div>

      {/* Categories Section */}
      {/* <section className="md:pt-18 pt-5 bg-bgsecondColor">
        <CategoryList endpoint="categories?isMainCategory=true">
          <HeadingPrimary title="All Category" />
        </CategoryList>
      </section> */}

      {/* Features Products Section */}
      <section className="md:py-10 py-5 bg-gray-50">
        <div className="container mx-auto ">
          <ProductList
            endpoint="products?featured=true"
            isHomePage
            href="products/featured/"
          >
            <HeadingPrimary title="Featured Products" className="mb-8" />
          </ProductList>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="md:py-10 py-5 bg-bgsecondColor">
        <div className="container mx-auto ">
          <ProductList endpoint="products" isHomePage href="products/popular">
            <HeadingPrimary title="Popular Products" className="mb-10" />
          </ProductList>
        </div>
      </section>

      {/* Brands Section */}
      <section className="lg:py-10 py-5 bg-gray-50">
        <div className="container mx-auto ">
          <BrandList endpoint="products">
            <HeadingPrimary title="Recommended for you" className="mb-10" />
          </BrandList>
        </div>
      </section>

      <section className="lg:py-10 py-5 bg-gray-50">
        <div className="container mx-auto ">
          <ProductList
            endpoint="products/discounted?page=1&limit=20"
            isHomePage
            href="products/special-offers"
          >
            <HeadingPrimary title="SPECIAL OFFERS" className="mb-10" />
          </ProductList>
        </div>
      </section>
      {/* Subscribe Section */}
      <section className="md:py-10 lg:py-24 py-5 bg-whiteColor">
        <Client>
          <HeadingPrimary title="Our Prominent Clients" className="mb-10" />
        </Client>
      </section>

      <NewsletterSection />

      <TestimonialSection />
    </main>
  );
}
