import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/utils/types";
import {
  Building2,
  FileText,
  Hash,
  Info,
  Package,
  Tag,
  Weight,
} from "lucide-react";

interface ProductDetailsCardProps {
  product: Product;
}

export function ProductDetailsCard({ product }: ProductDetailsCardProps) {
  const details = [
    {
      label: "SKU",
      value: product.productSku,
      icon: Hash,
      color: "text-primaryColor",
    },
    {
      label: "Weight",
      value: `${product.weight} ${product.unit.name}`,
      icon: Weight,
      color: "text-primaryColor",
    },
    {
      label: "Brand",
      value: product.brand.name,
      icon: Building2,
      color: "text-primaryColor",
    },
    {
      label: "Category",
      value: product.category.name,
      icon: Tag,
      color: "text-primaryColor",
    },
  ];

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="p-3 bg-primaryColor/10 rounded-xl shadow-lg border border-primaryColor/20">
            <Package className="w-6 h-6 text-primaryColor" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-gray-900">Product Details</h3>
            <p className="text-sm text-gray-500">
              Comprehensive product information
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {details.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors`}
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-full">
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Description Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-primaryColor/10 rounded-lg border border-primaryColor/20">
              <FileText className="w-4 h-4 text-primaryColor" />
            </div>
            <h4 className="ml-3 text-lg font-semibold text-gray-900">
              Description
            </h4>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100">
            <p className="text-gray-700 leading-relaxed">
              {product.description ||
                "Premium quality meat, carefully selected and sourced from trusted suppliers. Perfect for various cooking methods. Fresh, tender, and full of natural flavor."}
            </p>
          </div>
        </div>

        {/* Detailed Information Section */}
        {product.productDetails && (
          <>
            <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div>
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primaryColor/10 rounded-lg border border-primaryColor/20">
                  <Info className="w-4 h-4 text-primaryColor" />
                </div>
                <h4 className="ml-3 text-lg font-semibold text-gray-900">
                  Detailed Information
                </h4>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100">
                <div
                  className="prose prose-sm max-w-none text-gray-700 prose-headings:text-gray-900 prose-links:text-primaryColor prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{
                    __html: product.productDetails,
                  }}
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
