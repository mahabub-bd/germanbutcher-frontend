"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { fetchProtectedData } from "@/utils/api-utils";
import {
  getOrderStatusColor,
  getPaymentStatusColor,
} from "@/utils/order-helper";
import { CustomerData } from "@/utils/types";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Mail,
  MapPin,
  MapPinned,
  Package,
  Phone,
  ShoppingBag,
  TrendingUp,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingIndicator } from "../loading-indicator";

export function CustomerDetail() {
  const params = useParams();
  const router = useRouter();
  const customerId = params?.id as string;

  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetchProtectedData<CustomerData>(
          `users/${customerId}`
        );
        setCustomer(response);
      } catch (error) {
        console.error("Error fetching customer details:", error);
        toast.error("Failed to load customer details. Please try again.");
        router.push("/admin/customers");
      } finally {
        setIsLoading(false);
      }
    };

    if (customerId) {
      fetchCustomerDetail();
    }
  }, [customerId, router]);

  const calculateOrderStats = () => {
    if (!customer?.orders) return { total: 0, totalSpent: 0, avgOrder: 0 };

    const totalSpent = customer.orders.reduce((sum, order) => {
      const numericValue =
        parseFloat(order.totalValue?.toString().replace(/[^\d.]/g, "")) || 0;
      return sum + numericValue;
    }, 0);

    return {
      total: customer.orders.length,
      totalSpent,
      avgOrder:
        customer.orders.length > 0 ? totalSpent / customer.orders.length : 0,
    };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingIndicator message="Loading customer details..." />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="rounded-full bg-muted p-6">
          <User className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Customer Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The customer you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/admin/customers">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Customers
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const orderStats = calculateOrderStats();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className=" mx-auto  space-y-6">
        {/* Enhanced Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight capitalize">
                {customer.name}
              </h1>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {formatDateTime(customer.createdAt)}
                </span>
              </p>
            </div>
          </div>
          <Button variant="default" asChild className="shrink-0">
            <Link href="/admin/customer/customer-list?page=1&limit=10">
              <ArrowLeft className="h-4 w-4" />
              Back Customer List
            </Link>
          </Button>
          {customer.isVerified && (
            <Badge variant="default" className="gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Verified Customer
            </Badge>
          )}
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Orders
                  </p>
                  <p className="text-3xl font-bold">{orderStats.total}</p>
                </div>
                <div className="rounded-full bg-blue-500/10 p-3">
                  <ShoppingBag className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Spent
                  </p>
                  <p className="text-3xl font-bold">
                    ৳{orderStats.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-full bg-green-500/10 p-3">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Order
                  </p>
                  <p className="text-3xl font-bold">
                    ৳
                    {orderStats.avgOrder.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div className="rounded-full bg-purple-500/10 p-3">
                  <CreditCard className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            {/* Compact Profile Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Horizontal Layout for Avatar + Info */}
                <div className="flex items-center gap-3 pb-3 border-b">
                  {customer.profilePhoto ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-background shadow-md shrink-0">
                      <Image
                        src={customer.profilePhoto.url}
                        alt={customer.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md shrink-0">
                      <User className="h-8 w-8 text-white" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold capitalize truncate">
                      {customer.name}
                    </h3>
                    <p className="text-xs text-muted-foreground capitalize">
                      {customer.role.rolename}
                    </p>
                    {customer.isVerified && (
                      <Badge variant="default" className="mt-1 text-xs h-5">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Compact Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 rounded-md bg-muted/40 hover:bg-muted/60 transition-colors">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium break-all leading-relaxed">
                        {customer.email}
                      </p>
                    </div>
                  </div>

                  {customer.mobileNumber && (
                    <div className="flex items-center gap-2 p-2 rounded-md bg-muted/40 hover:bg-muted/60 transition-colors">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <p className="text-xs font-medium">
                        {customer.mobileNumber}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 p-2 rounded-md bg-muted/40">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <div className="flex-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Last Login</span>
                      <span className="font-medium">
                        {customer.lastLoginAt
                          ? formatDateTime(customer.lastLoginAt)
                          : "Never"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Addresses Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPinned className="h-5 w-5" />
                  Saved Addresses
                </CardTitle>
                <CardDescription>
                  {customer.addresses.length} address
                  {customer.addresses.length !== 1 ? "es" : ""} on file
                </CardDescription>
              </CardHeader>
              <CardContent>
                {customer.addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-sm text-muted-foreground">
                      No addresses saved yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {customer.addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border rounded-lg p-4 hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge
                              variant={
                                address.type === "shipping"
                                  ? "default"
                                  : "secondary"
                              }
                              className="capitalize"
                            >
                              {address.type}
                            </Badge>
                            {address.isDefault && (
                              <Badge
                                variant="outline"
                                className="border-green-500 text-green-700"
                              >
                                Default
                              </Badge>
                            )}
                          </div>
                          <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                        </div>
                        <p className="font-medium text-sm capitalize mb-1">
                          {address.address}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {address.area}, {address.city}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {address.division}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Content - Orders */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Order History
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Complete purchase history and order details
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {customer.orders.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {customer.orders.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="rounded-full bg-muted p-6 w-fit mx-auto mb-4">
                      <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      No Orders Yet
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      This customer hasn't placed any orders. Once they make a
                      purchase, it will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customer.orders.map((order) => (
                      <Card
                        key={order.id}
                        className="border-2 hover:border-primary/50 transition-all"
                      >
                        <CardContent className="p-4 space-y-4">
                          {/* Order Header */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-lg">
                                  {order.orderNo}
                                </h4>
                                <Badge
                                  className={`${getOrderStatusColor(
                                    order.orderStatus
                                  )} capitalize`}
                                >
                                  {order.orderStatus}
                                </Badge>
                                <Badge
                                  className={`${getPaymentStatusColor(
                                    order.paymentStatus
                                  )} capitalize`}
                                >
                                  {order.paymentStatus}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4" />
                                {formatDateTime(order.createdAt)}
                              </div>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="text-sm text-muted-foreground">
                                Order Total
                              </p>
                              <p className="text-2xl font-bold">
                                ৳{order.totalValue.toLocaleString()}
                              </p>
                              {parseFloat(order.totalDiscount.toString()) >
                                0 && (
                                <p className="text-sm text-green-600 font-medium">
                                  Saved ৳
                                  {parseFloat(
                                    order.totalDiscount.toString()
                                  ).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Items Table */}
                          <div className="rounded-lg border overflow-hidden">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/50">
                                  <TableHead className="font-semibold">
                                    Product
                                  </TableHead>
                                  <TableHead className="font-semibold text-center">
                                    Quantity
                                  </TableHead>
                                  <TableHead className="font-semibold text-right">
                                    Unit Price
                                  </TableHead>
                                  <TableHead className="font-semibold text-right">
                                    Total
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {order.items.map((item) => (
                                  <TableRow key={item.id}>
                                    <TableCell className="font-medium capitalize">
                                      {item.product.name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {item.quantity}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      ৳{item.unitPrice}
                                    </TableCell>
                                    <TableCell className="text-right font-semibold">
                                      ৳{item.totalPrice}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>

                          {/* Order Details Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                            <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                              <p className="text-xs font-medium text-blue-700 mb-1">
                                Shipping Method
                              </p>
                              <p className="font-semibold capitalize">
                                {order.shippingMethod.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                ৳
                                {parseFloat(order.shippingMethod.cost).toFixed(
                                  2
                                )}
                              </p>
                            </div>

                            <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                              <p className="text-xs font-medium text-green-700 mb-1">
                                Payment Method
                              </p>
                              <p className="font-semibold capitalize">
                                {order.paymentMethod.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Paid: ৳{order.paidAmount}
                              </p>
                            </div>

                            <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                              <p className="text-xs font-medium text-purple-700 mb-1">
                                Delivery Address
                              </p>
                              <p className="font-semibold capitalize text-sm">
                                {order.address.address}, {order.address.area}
                              </p>
                              <p className="text-sm text-muted-foreground capitalize">
                                {order.address.city}, {order.address.division}
                              </p>
                            </div>
                          </div>

                          {/* View Details Button */}
                          <Button variant="outline" className="w-full" asChild>
                            <Link href={`/admin/order/${order.id}/view`}>
                              View Full Order Details
                              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
