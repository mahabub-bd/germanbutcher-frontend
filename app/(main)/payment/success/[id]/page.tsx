import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrencyEnglish, formatDateTime } from "@/lib/utils";
import { fetchProtectedData } from "@/utils/api-utils";
import { Order, OrderItem } from "@/utils/types";
import {
  CheckCircle,
  CreditCard,
  Home,
  Mail,
  MapPin,
  Package,
  Phone,
  Tag,
} from "lucide-react";
import Link from "next/link";

export default async function PaymentSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await fetchProtectedData<Order>(`orders/${id}`);

  const calculateOrderSummary = () => {
    let originalSubtotal = 0;
    let productDiscountTotal = 0;

    order.items.forEach((item) => {
      const originalItemPrice = item.product.sellingPrice * item.quantity;
      originalSubtotal += originalItemPrice;

      if (item.product.discountValue) {
        let discountAmount = 0;
        if (item.product.discountType === "percentage") {
          discountAmount =
            originalItemPrice * (Number(item.product.discountValue) / 100);
        } else if (item.product.discountType === "fixed") {
          discountAmount = Number(item.product.discountValue) * item.quantity;
        }
        productDiscountTotal += discountAmount;
      }
    });

    const couponDiscount = order.coupon
      ? Number(order.totalDiscount || 0) - productDiscountTotal
      : 0;

    return {
      originalSubtotal,
      productDiscountTotal,
      couponDiscount,
      shippingCost: Number(order.shippingMethod?.cost ?? 0),
      total: order.totalValue,
    };
  };

  const orderSummary = calculateOrderSummary();

  const calculateDiscountedPrice = (
    price: number,
    discountType: string,
    discountValue: string
  ) => {
    if (discountType === "percentage") {
      return price - price * (Number.parseFloat(discountValue) / 100);
    }
    return price - Number.parseFloat(discountValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="container mx-auto py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. Your payment has been processed
            successfully.
          </p>
          <p className="text-sm text-gray-500 mt-2">Order ID: {id}</p>
        </div>

        {/* Payment Details */}
        <Card className="border-green-200 bg-green-50/50 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-semibold">#{order.orderNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-semibold">{order.orderNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status:</span>
              <Badge className="bg-green-100 text-green-800 border-green-200 ca">
                <CheckCircle className="w-3 h-3 mr-1 capitalize" />
                {order.paymentStatus}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-semibold text-green-600">
                {formatCurrencyEnglish(order.paidAmount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-semibold">{order.paymentMethod.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-semibold">
                {formatDateTime(order.updatedAt)}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item: OrderItem) => {
                const discountedPrice = calculateDiscountedPrice(
                  item.product.sellingPrice,
                  item.product.discountType ?? "",
                  (item.product.discountValue ?? 0).toString()
                );
                const hasDiscount =
                  item.product.discountValue && item.product.discountValue > 0;

                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-start"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>Qty: {item.quantity}</span>
                        <span>×</span>
                        {hasDiscount ? (
                          <div className="flex items-center gap-1">
                            <span className="line-through">
                              {formatCurrencyEnglish(item.product.sellingPrice)}
                            </span>
                            <span className="text-green-600 font-medium">
                              {formatCurrencyEnglish(discountedPrice)}
                            </span>
                          </div>
                        ) : (
                          <span>
                            {formatCurrencyEnglish(item.product.sellingPrice)}
                          </span>
                        )}
                      </div>
                      {hasDiscount && (
                        <Badge
                          variant="outline"
                          className="mt-1 text-[0.7rem] bg-green-100 text-green-800 border-green-200"
                        >
                          {item.product.discountType === "percentage"
                            ? `${item.product.discountValue}% OFF`
                            : `${formatCurrencyEnglish(item.product.discountValue ?? 0)} OFF`}
                        </Badge>
                      )}
                    </div>
                    <span className="font-semibold">
                      {formatCurrencyEnglish(discountedPrice * item.quantity)}
                    </span>
                  </div>
                );
              })}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>
                    {formatCurrencyEnglish(orderSummary.originalSubtotal)}
                  </span>
                </div>

                {orderSummary.productDiscountTotal > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 flex items-center">
                      <Tag className="w-3 h-3 mr-1" />
                      Product Discounts:
                    </span>
                    <span className="text-green-600">
                      -
                      {formatCurrencyEnglish(orderSummary.productDiscountTotal)}
                    </span>
                  </div>
                )}

                {order.coupon && orderSummary.couponDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 flex items-center">
                      <Tag className="w-3 h-3 mr-1" />
                      Coupon Discount ({order.coupon.code}):
                    </span>
                    <span className="text-green-600">
                      -{formatCurrencyEnglish(orderSummary.couponDiscount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>
                    {formatCurrencyEnglish(orderSummary.shippingCost)}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatCurrencyEnglish(orderSummary.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Delivery Address</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium">{order.user.name}</p>
                  <p>{order.address.address}</p>
                  <p>
                    {order.address.area}, {order.address.city}
                  </p>
                  <p>{order.address.division}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{order.user.mobileNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{order.user.email}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Shipping Method</h4>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{order.shippingMethod.name}</p>
                  <p>{order.shippingMethod.deliveryTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button variant="outline" size="lg" asChild>
            <Link href={`/orders/${id}`} className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              View Order
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/" className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
