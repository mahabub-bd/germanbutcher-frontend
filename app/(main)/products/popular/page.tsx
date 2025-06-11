import { HeadingPrimary } from '@/components/common/heading-primary';
import ProductList from '@/components/products/product-list';

export default function PopularPage() {
  return (
    <div className="container mx-auto ">
      <ProductList endpoint="products/discounted?page=1&limit=20">
        <HeadingPrimary
          title="SPECIAL OFFERS"
          subtitle="Limited-time deals just for you"
          className="mb-10"
          titleClassName="text-green-600"
        />
      </ProductList>
    </div>
  );
}
