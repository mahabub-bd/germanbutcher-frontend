"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartContext } from "@/contexts/cart-context";
import type { Product } from "@/utils/types";
import {
  Award,
  ChevronRight,
  Clock,
  Heart,
  Home,
  Loader2,
  Minus,
  Package,
  Plus,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.attachment.url);
  const { addItem } = useCartContext();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discountAmount =
    product.discountType === "fixed"
      ? Number.parseFloat(String(product.discountValue ?? "0"))
      : (product.sellingPrice *
          Number.parseFloat(String(product.discountValue ?? "0"))) /
        100;

  const finalPrice = product.sellingPrice - discountAmount;
  const discountPercentage = (
    (discountAmount / product.sellingPrice) *
    100
  ).toFixed(0);

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      for (let i = 0; i < quantity; i++) {
        await addItem(product);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Breadcrumb */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm">
            <Link
              href="/"
              className="flex items-center text-gray-500 hover:text-[#8a0000] transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link
              href={`/categories/${product.category.slug}`}
              className="text-gray-500 hover:text-[#8a0000] transition-colors"
            >
              {product.category.name}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="font-medium text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <div className="sticky top-16">
              <div className="relative w-full h-80 bg-white rounded-xl overflow-hidden shadow-md border">
                <Image
                  src={selectedImage || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                {discountAmount > 0 && (
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white font-semibold">
                    -{discountPercentage}% OFF
                  </Badge>
                )}
                {product.stock <= 5 && product.stock > 0 && (
                  <Badge className="absolute top-3 right-3 bg-orange-500 text-white">
                    Only {product.stock} left
                  </Badge>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === product.attachment.url
                      ? "border-[#8a0000] ring-2 ring-red-100"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(product.attachment.url)}
                >
                  <Image
                    src={product.attachment.url || "/placeholder.svg"}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>

                {product.gallery?.attachments?.map((image) => (
                  <div
                    key={image.id}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImage === image.url
                        ? "border-[#8a0000] ring-2 ring-red-100"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.originalName}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center space-x-2 mb-3">
                <Badge
                  variant="outline"
                  className="text-[#8a0000] border-[#8a0000] bg-red-50"
                >
                  {product.brand.name}
                </Badge>
                <Badge variant="outline" className="bg-gray-50">
                  {product.category.name}
                </Badge>
                <div className="flex items-center space-x-1 ml-auto">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.8)</span>
                </div>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-4">{product.description}</p>

              {/* Pricing Section */}
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-3xl font-bold text-[#8a0000]">
                  ৳{finalPrice.toFixed(2)}
                </span>
                {discountAmount > 0 && (
                  <span className="text-xl text-gray-400 line-through">
                    ৳{product.sellingPrice.toFixed(2)}
                  </span>
                )}
                {discountAmount > 0 && (
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Save ৳{discountAmount.toFixed(2)}
                  </Badge>
                )}
              </div>

              {/* Stock Information */}
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Package className="w-4 h-4 mr-1" />
                  Weight: {product.weight} {product.unit.name}
                </span>
                <span className="flex items-center">
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${
                      product.stock > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Purchase Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Purchase Options
              </h3>

              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="h-12 w-12 rounded-l-lg hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <div className="px-4 py-3 font-semibold text-lg min-w-[4rem] text-center bg-white border-x border-gray-200">
                        {quantity}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={incrementQuantity}
                        disabled={quantity >= product.stock}
                        className="h-12 w-12 rounded-r-lg hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="block">
                        Max: {product.stock} available
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Unit Price:</span>
                    <span className="font-medium">
                      ৳{finalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-[#8a0000]">
                      ৳{(finalPrice * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 grid grid-cols-2 gap-8">
                  <Button
                    className="w-full bg-gradient-to-r from-[#8a0000] to-[#c70909] hover:from-[#c70909] hover:to-[#8a0000] text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={product.stock === 0 || isAddingToCart}
                    onClick={handleAddToCart}
                  >
                    {isAddingToCart ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <ShoppingCart className="w-5 h-5 mr-2" />
                    )}
                    Add {quantity} to Cart
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="py-3 border-gray-300 hover:border-[#8a0000] hover:text-[#8a0000]"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Add to Wishlist
                    </Button>
                    <Button
                      variant="outline"
                      className="py-3 border-gray-300 hover:border-[#8a0000] hover:text-[#8a0000]"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Product
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Truck,
                  label: "Free Delivery",
                  desc: "On orders over ৳500",
                },
                {
                  icon: Shield,
                  label: "Quality Assured",
                  desc: "100% fresh guarantee",
                },
                {
                  icon: Clock,
                  label: "Fresh Daily",
                  desc: "Delivered within 24hrs",
                },
                {
                  icon: Award,
                  label: "Premium Quality",
                  desc: "Certified suppliers",
                },
              ].map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="bg-white rounded-lg p-4 shadow-sm border text-center hover:shadow-md transition-shadow"
                >
                  <Icon className="w-6 h-6 text-[#8a0000] mx-auto mb-2" />
                  <h4 className="font-medium text-sm text-gray-900">{label}</h4>
                  <p className="text-xs text-gray-500 mt-1">{desc}</p>
                </div>
              ))}
            </div>

            {/* Product Details */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-[#8a0000]" />
                  Product Details
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[
                    { label: "SKU", value: product.productSku },
                    {
                      label: "Weight",
                      value: `${product.weight} ${product.unit.name}`,
                    },
                    { label: "Brand", value: product.brand.name },
                    { label: "Category", value: product.category.name },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-600 font-medium">
                        {label}:
                      </span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description ||
                      "Premium quality meat, carefully selected and sourced from trusted suppliers. Perfect for various cooking methods. Fresh, tender, and full of natural flavor."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
