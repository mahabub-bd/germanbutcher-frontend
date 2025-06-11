import {
  PageBreadcrumb,
  type BreadcrumbItem,
} from '@/components/ui/page-breadcrumb';
import { Package2 } from 'lucide-react';

interface ProductsBreadcrumbProps {
  categoryName?: string;
  categorySlug?: string;
  brandName?: string;
  brandSlug?: string;
}

export function ProductsBreadcrumb({
  categoryName,
  categorySlug,
  brandName,
  brandSlug,
}: ProductsBreadcrumbProps) {
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Products',
      icon: (
        <Package2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primaryColor" />
      ),
      isActive: !categoryName && !brandName,
    },
  ];

  if (categoryName && categorySlug) {
    breadcrumbItems.push({
      label: categoryName,
      href: `/categories/${categorySlug}`,
      icon: <Package2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />,
      isActive: true,
    });
  }

  if (brandName && brandSlug) {
    breadcrumbItems.push({
      label: brandName,
      href: `/brands/${brandSlug}`,
      icon: <Package2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />,
      isActive: true,
    });
  }

  return <PageBreadcrumb items={breadcrumbItems} />;
}
