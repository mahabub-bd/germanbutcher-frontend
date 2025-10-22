"use client";

import { Badge } from "@/components/ui/badge";
import { useCartContext } from "@/contexts/cart-context";
import { formatCurrencyEnglish } from "@/lib/utils";
import type { CartItem } from "@/utils/types";
import { AlertCircle, Loader2, Minus, Plus, Tag, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export function CartItemProduct({ item }: { item: CartItem }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const { updateItemQuantity, removeItem, getDiscountedPrice } =
    useCartContext();

  const itemId = item.id || item.product.id;

  // Stock check
  const isOutOfStock = (item.product.stock || 0) === 0;
  const isLowStock =
    (item.product.stock || 0) > 0 && (item.product.stock || 0) < 10;
  const hasInsufficientStock = localQuantity > (item.product.stock || 0);

  // Discount calculations
  const now = new Date();
  const discountStart = new Date(item.product?.discountStartDate || 0);
  const discountEnd = new Date(item.product?.discountEndDate || 0);
  const hasActiveDiscount =
    item.product.discountType &&
    item.product.discountValue &&
    now >= discountStart &&
    now <= discountEnd;

  const discountedPrice = getDiscountedPrice(item.product);
  const hasDiscount = discountedPrice < item.product.sellingPrice;
  const totalPrice = discountedPrice * localQuantity;

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 99) return;
    if (isUpdating || isOutOfStock) return;

    // Check if requested quantity exceeds stock
    if (newQuantity > (item.product.stock || 0)) {
      toast.error("Insufficient stock", {
        description: `Only ${item.product.stock} items available`,
      });
      return;
    }

    // Optimistic update
    const previousQuantity = localQuantity;
    setLocalQuantity(newQuantity);
    setIsUpdating(true);

    try {
      await updateItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.error(error);
      setLocalQuantity(previousQuantity);

      // Check if error is due to stock issues
      if (error instanceof Error && error.message.includes("stock")) {
        toast.error("Stock unavailable", {
          description: `${item.product.name} is out of stock`,
        });
      } else {
        toast.error("Failed to update quantity");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleIncrement = () => {
    if (localQuantity >= (item.product.stock || 0)) {
      toast.error("Maximum stock reached", {
        description: `Only ${item.product.stock} items available`,
      });
      return;
    }
    handleUpdateQuantity(localQuantity + 1);
  };

  const handleDecrement = () => handleUpdateQuantity(localQuantity - 1);

  const handleRemoveItem = async () => {
    if (isRemoving) return;

    setIsRemoving(true);
    try {
      await removeItem(itemId);
      toast.success("Item removed", {
        description: `${item.product.name} has been removed from your cart`,
      });
    } catch (error) {
      console.error(error);
      setIsRemoving(false);
      toast.error("Failed to remove item");
    }
  };

  const handleMoveToWishlist = () => {
    // Add wishlist functionality here
    toast.info("Added to wishlist", {
      description: "We'll notify you when it's back in stock",
    });
  };

  return (
    <div className={`flex gap-3 ${isOutOfStock ? "opacity-60" : ""}`}>
      {/* Product Image */}
      <div className="relative aspect-[16/9] w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={item.product.attachment?.url || "/placeholder.svg"}
          alt={item.product.name}
          fill
          className={`object-cover ${isOutOfStock ? "grayscale" : ""}`}
          sizes="96px"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Badge variant="destructive" className="text-[8px] px-1 py-0">
              Out
            </Badge>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        {/* Header Row */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <h3
                className={`text-sm font-medium line-clamp-1 ${isOutOfStock ? "text-muted-foreground" : ""}`}
              >
                {item.product.name}
              </h3>
              {hasActiveDiscount && !isOutOfStock && (
                <Tag className="h-3 w-3 text-green-600 flex-shrink-0" />
              )}
            </div>

            {/* Status Badges */}
            <div className="flex items-center gap-1 flex-wrap mb-1">
              {isOutOfStock && (
                <Badge variant="destructive" className="text-[10px] h-4">
                  Out of Stock
                </Badge>
              )}
              {isLowStock && !isOutOfStock && (
                <Badge
                  variant="outline"
                  className="text-[10px] h-4 text-orange-600 border-orange-600"
                >
                  Low Stock ({item.product.stock})
                </Badge>
              )}
              {hasActiveDiscount && !isOutOfStock && (
                <Badge
                  variant="secondary"
                  className="text-[10px] h-4 text-green-600 bg-green-50"
                >
                  Sale
                </Badge>
              )}
            </div>

            {/* Stock Warnings */}
            {hasInsufficientStock && !isOutOfStock && (
              <div className="flex items-center gap-1 text-red-600 text-[11px] mb-1">
                <AlertCircle className="h-2.5 w-2.5 flex-shrink-0" />
                <span>Only {item.product.stock} available</span>
              </div>
            )}

            {/* Out of Stock Message */}
            {isOutOfStock && (
              <div className="flex items-center gap-1 text-red-600 text-[11px] mb-1">
                <AlertCircle className="h-2.5 w-2.5 flex-shrink-0" />
                <span className="line-clamp-1">
                  Out of stock. Restocking soon!
                </span>
              </div>
            )}
          </div>

          {/* Remove/Wishlist Button */}
          <div className="flex items-center gap-1 ml-2">
            {isOutOfStock && (
              <button
                onClick={handleMoveToWishlist}
                className="text-muted-foreground hover:text-blue-600 p-1"
                aria-label="Move to wishlist"
                title="Move to wishlist"
              >
                <Tag className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              onClick={handleRemoveItem}
              disabled={isRemoving}
              className="text-muted-foreground hover:text-destructive p-1"
              aria-label="Remove item"
            >
              {isRemoving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Controls Row */}
        <div className="mt-1 flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleDecrement}
              disabled={isUpdating || localQuantity <= 1 || isOutOfStock}
              className="h-5 w-5 rounded-full border flex items-center justify-center text-xs disabled:opacity-50 hover:bg-muted transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="text-xs w-5 text-center">
              {isUpdating ? (
                <Loader2 className="h-3 w-3 mx-auto animate-spin" />
              ) : (
                localQuantity
              )}
            </span>
            <button
              onClick={handleIncrement}
              disabled={
                isUpdating ||
                isOutOfStock ||
                localQuantity >= (item.product.stock || 0)
              }
              className="h-5 w-5 rounded-full border flex items-center justify-center text-xs disabled:opacity-50 hover:bg-muted transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>

            {/* Stock Info */}
            {!isOutOfStock && (
              <span className="text-[10px] text-muted-foreground ml-1">
                {item.product.stock} left
              </span>
            )}
          </div>

          {/* Price Section */}
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <div
                className={`text-sm font-medium ${isOutOfStock ? "text-muted-foreground" : ""}`}
              >
                {formatCurrencyEnglish(totalPrice)}
              </div>
            </div>
            {hasDiscount && !isOutOfStock && (
              <div className="text-xs text-muted-foreground line-through">
                {formatCurrencyEnglish(
                  item.product.sellingPrice * localQuantity
                )}
              </div>
            )}
            {isOutOfStock && (
              <div className="text-[10px] text-red-600">Unavailable</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
