import { HeadingPrimary } from "@/components/common/heading-primary";
import CategoriesListHomePage from "@/components/homepage/category/categories-list";

export default function CategoryPage() {
  return (
    <section className="md:py-10 py-5 bg-gray-50">
      <div className="container mx-auto px-4">
        <CategoriesListHomePage endpoint="categories">
          <HeadingPrimary
            title="FEATURED CATEGORIES"
            subtitle="Get your desired product from featured category"
          />
        </CategoriesListHomePage>
      </div>
    </section>
  );
}
