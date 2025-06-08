import type { Product } from "@/utils/types";
import { ChevronRight, Home, Package2, Tag } from "lucide-react";
import Link from "next/link";

interface ProductBreadcrumbProps {
  product: Product;
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  return (
    <div className="bg-gradient-to-r from-white to-gray-50/50 border-b border-gray-200/60 sticky top-0 z-10 shadow-sm backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center text-sm bg-white/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-100 shadow-sm">
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-primaryColor hover:bg-primaryColor/5 transition-all duration-200 rounded-md px-2 py-1 group"
          >
            <div className="p-1 rounded-md bg-gray-100 group-hover:bg-primaryColor/10 transition-colors mr-2">
              <Home className="h-3 w-3" />
            </div>
            <span className="font-medium">Home</span>
          </Link>

          <div className="flex items-center mx-2">
            <ChevronRight className="h-4 w-4 text-gray-300" />
          </div>

          <Link
            href={`/categories/${product.category.slug}`}
            className="flex items-center text-gray-600 hover:text-primaryColor hover:bg-primaryColor/5 transition-all duration-200 rounded-md px-2 py-1 group"
          >
            <div className="p-1 rounded-md bg-gray-100 group-hover:bg-primaryColor/10 transition-colors mr-2">
              <Tag className="h-3 w-3" />
            </div>
            <span className="font-medium">{product.category.name}</span>
          </Link>

          <div className="flex items-center mx-2">
            <ChevronRight className="h-4 w-4 text-gray-300" />
          </div>

          <div className="flex items-center text-gray-900 px-2 py-1">
            <div className="p-1 rounded-md bg-primaryColor/10 mr-2">
              <Package2 className="h-3 w-3 text-primaryColor" />
            </div>
            <span className="font-semibold text-gray-900">{product.name}</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
