"use client";

import { AlertCircle, Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/cart-context";
import { formatCurrencyEnglish } from "@/lib/utils";
import type { CartItem } from "@/utils/types";

export function CartItemProductPage({ item }: { item: CartItem }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const { updateItemQuantity, removeItem, getDiscountedPrice } =
    useCartContext();

  const itemId = item.id || item.product.id;

  // Stock check
  const isOutOfStock = (item.product.stock || 0) === 0;
  const isLowStock =
    (item.product.stock || 0) > 0 && (item.product.stock || 0) < 5;
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
  const discountAmount = item.product.sellingPrice - discountedPrice;

  let originalPriceDisplay = null;

  if (hasActiveDiscount) {
    originalPriceDisplay = (
      <span className="line-through text-muted-foreground text-sm">
        {formatCurrencyEnglish(item.product.sellingPrice)}
      </span>
    );
  }

  const handleUpdateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity === localQuantity) return;
    if (isUpdating || isOutOfStock) return;

    // Check if requested quantity exceeds stock
    if (newQuantity > (item.product.stock || 0)) {
      toast.error("Insufficient stock", {
        description: `Only ${item.product.stock} items available`,
      });
      return;
    }

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

  const handleRemove = async () => {
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

  return (
    <div
      className={`flex items-start gap-4 border-b pb-6 ${isOutOfStock ? "opacity-60" : ""}`}
    >
      <div className="aspect-square w-24 flex-shrink-0 overflow-hidden rounded-md border bg-muted relative">
        <Image
          src={item.product.attachment?.url || "/placeholder.svg"}
          alt={item.product.name}
          width={160}
          height={160}
          className={`h-full w-full object-cover ${isOutOfStock ? "grayscale" : ""}`}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3
                className={`font-medium text-sm ${isOutOfStock ? "text-muted-foreground" : ""}`}
              >
                {item.product.name}
              </h3>
              {isOutOfStock && (
                <Badge variant="destructive" className="text-xs hidden md:flex">
                  Out of Stock
                </Badge>
              )}
              {isLowStock && !isOutOfStock && (
                <Badge
                  variant="outline"
                  className="text-xs hidden md:flex text-orange-600 border-orange-600"
                >
                  Low Stock ({item.product.stock} left)
                </Badge>
              )}
            </div>

            {/* Stock Warning */}
            {hasInsufficientStock && !isOutOfStock && (
              <div className="flex items-center gap-1 text-red-600 text-xs">
                <AlertCircle className="h-3 w-3" />
                <span>Only {item.product.stock} items available</span>
              </div>
            )}

            {/* Out of Stock Message */}
            {isOutOfStock && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>Out of stock</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              {originalPriceDisplay}
              <span
                className={`text-sm font-medium ${isOutOfStock ? "text-muted-foreground" : ""}`}
              >
                {formatCurrencyEnglish(discountedPrice)}
              </span>
              {hasActiveDiscount && !isOutOfStock && (
                <span className="text-xs text-green-600">
                  (Save {formatCurrencyEnglish(discountAmount)})
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p
              className={`font-medium ${isOutOfStock ? "text-muted-foreground" : ""}`}
            >
              {formatCurrencyEnglish(discountedPrice * localQuantity)}
            </p>
            {isOutOfStock && (
              <p className="text-xs text-red-600 mt-1">Unavailable</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleDecrement}
                disabled={isUpdating || localQuantity === 1 || isOutOfStock}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-6 text-center">
                {isUpdating ? (
                  <Loader2 className="h-4 w-4 mx-auto animate-spin" />
                ) : (
                  localQuantity
                )}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleIncrement}
                disabled={
                  isUpdating ||
                  isOutOfStock ||
                  localQuantity >= (item.product.stock || 0)
                }
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>

            {/* Stock info display */}
            {!isOutOfStock && (
              <span className="text-xs text-muted-foreground">
                {item.product.stock} in stock
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              disabled={isRemoving}
              className="h-8 text-sm text-muted-foreground hover:text-destructive disabled:opacity-50"
            >
              {isRemoving ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-1 h-4 w-4" />
              )}
              {isRemoving ? "Removing..." : "Remove"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
