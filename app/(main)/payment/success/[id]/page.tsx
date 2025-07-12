import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrencyEnglish } from "@/lib/utils";
import {
  CheckCircle,
  CreditCard,
  Download,
  Home,
  Mail,
  MapPin,
  Package,
  Phone,
} from "lucide-react";
import Link from "next/link";

const mockOrder = {
  id: "ord_12345",
  orderNo: "ORD-2025-001",
  totalValue: 2450.0,
  totalDiscount: 200.0,
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    mobileNumber: "+880 1712-345678",
  },
  address: {
    address: "123 Main Street, Apt 4B",
    area: "Dhanmondi",
    city: "Dhaka",
    division: "Dhaka",
  },
  paymentMethod: {
    name: "SSL Commerz",
  },
  shippingMethod: {
    name: "Express Delivery",
    cost: 150,
    deliveryTime: "2-3 business days",
  },
  items: [
    {
      id: "1",
      product: {
        name: "Wireless Bluetooth Headphones",
        sellingPrice: 1200.0,
      },
      quantity: 1,
    },
    {
      id: "2",
      product: {
        name: "USB-C Fast Charger",
        sellingPrice: 800.0,
      },
      quantity: 1,
    },
    {
      id: "3",
      product: {
        name: "Phone Case",
        sellingPrice: 500.0,
      },
      quantity: 1,
    },
  ],
};

const mockPayment = {
  transactionId: "TXN123456789",
  status: "Completed",
  validationId: "VAL987654321",
  dateTime: "January 15, 2025 at 2:30 PM",
};

// Helper function for currency formatting
const formatCurrency = (amount: number) => {
  return formatCurrencyEnglish(amount);
};

export default async function PaymentSuccessPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
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
          <p className="text-sm text-gray-500 mt-2">Order ID: {orderId}</p>
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
              <span className="font-semibold">#{mockOrder.orderNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-semibold">{mockPayment.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Status:</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                {mockPayment.status}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount Paid:</span>
              <span className="font-semibold text-green-600">
                {formatCurrency(mockOrder.totalValue)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-semibold">
                {mockOrder.paymentMethod.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-semibold">{mockPayment.dateTime}</span>
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
              {mockOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.product.name}</h4>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity} ×{" "}
                      {formatCurrency(item.product.sellingPrice)}
                    </p>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(item.product.sellingPrice * item.quantity)}
                  </span>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>
                    {formatCurrency(
                      mockOrder.totalValue -
                        mockOrder.shippingMethod.cost +
                        mockOrder.totalDiscount
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{formatCurrency(mockOrder.shippingMethod.cost)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-{formatCurrency(mockOrder.totalDiscount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{formatCurrency(mockOrder.totalValue)}</span>
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
                  <p className="font-medium">{mockOrder.user.name}</p>
                  <p>{mockOrder.address.address}</p>
                  <p>
                    {mockOrder.address.area}, {mockOrder.address.city}
                  </p>
                  <p>{mockOrder.address.division}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{mockOrder.user.mobileNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{mockOrder.user.email}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Shipping Method</h4>
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{mockOrder.shippingMethod.name}</p>
                  <p>{mockOrder.shippingMethod.deliveryTime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button size="lg" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href={`/orders/${mockOrder.id}`}
              className="flex items-center"
            >
              <Package className="w-4 h-4 mr-2" />
              Track Order
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
