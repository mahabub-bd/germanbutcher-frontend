"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddToWishlistButton } from "@/components/wishlist/add-to-wishlist-button";
import { useCartContext } from "@/contexts/cart-context";
import type { Product } from "@/utils/types";
import {
  Facebook,
  Linkedin,
  Loader2,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
} from "lucide-react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "next-share";
import { useState } from "react";

interface ProductPurchaseSectionProps {
  product: Product;
}

export function ProductPurchaseSection({
  product,
}: ProductPurchaseSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartContext();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const discountAmount =
    product.discountType === "fixed"
      ? Number.parseFloat(String(product.discountValue ?? "0"))
      : (product.sellingPrice *
          Number.parseFloat(String(product.discountValue ?? "0"))) /
        100;

  const finalPrice = product.sellingPrice - discountAmount;

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

  // Share functionality
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/products/${product.slug}`
      : "";
  const shareTitle = `Check out ${product.name} on Our Store`;
  const shareBody = `${product.name} - ${product.description}`;

  return (
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
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Unit Price:</span>
            <span className="font-medium">৳{finalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Quantity:</span>
            <span className="font-medium">{quantity}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-900">Total:</span>
            <span className="text-xl font-bold text-primaryColor">
              ৳{(finalPrice * quantity).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 grid md:grid-cols-2 grid-cols-1 gap-8">
          <Button
            className="w-full bg-gradient-to-r from-primaryColor to-secondaryColor hover:from-secondaryColor hover:to-primaryColor text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
            disabled={product.stock === 0 || isAddingToCart}
            onClick={handleAddToCart}
          >
            {isAddingToCart ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <ShoppingCart className="w-5 h-5 mr-2" />
            )}
            Add to Cart
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <AddToWishlistButton
              product={product}
              variant="outline"
              className="py-3 border-gray-300 hover:border-primaryColor hover:text-primaryColor"
            />

            <div className="relative">
              <Button
                variant="outline"
                className="py-3 border-gray-300 hover:border-primaryColor hover:text-primaryColor w-full"
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Product
              </Button>

              {showShareOptions && (
                <div className="absolute z-10 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 right-0">
                  <div className="p-2 space-y-1  flex  gap-4">
                    <FacebookShareButton
                      url={shareUrl}
                      quote={shareTitle}
                      className="w-full"
                    >
                      <div className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                        <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                      </div>
                    </FacebookShareButton>

                    <WhatsappShareButton
                      url={shareUrl}
                      title={shareTitle}
                      className="w-full"
                    >
                      <div className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                        <MessageCircle className="w-4 h-4 mr-2 text-green-500" />
                      </div>
                    </WhatsappShareButton>

                    <LinkedinShareButton url={shareUrl} className="w-full">
                      <div className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                        <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                      </div>
                    </LinkedinShareButton>

                    <EmailShareButton
                      url={shareUrl}
                      subject={shareTitle}
                      body={shareBody}
                      className="w-full"
                    >
                      <div className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                        <Mail className="w-4 h-4 mr-2 text-gray-600" />
                      </div>
                    </EmailShareButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
