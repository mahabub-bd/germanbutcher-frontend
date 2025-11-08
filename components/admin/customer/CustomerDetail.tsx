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
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { fetchData } from "@/utils/api-utils";
import { Address, Order } from "@/utils/types";
import {
  ArrowLeft,
  Calendar,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingIndicator } from "../loading-indicator";

interface CustomerData {
  id: number;
  name: string;
  email: string;
  mobileNumber: string;
  isVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
  role: {
    id: number;
    rolename: string;
    description: string;
    isActive: boolean;
  };
  addresses: Address[];
  profilePhoto?: {
    id: number;
    fileName: string;
    url: string;
  };
  orders: Order[];
}

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
        const response = await fetchData<CustomerData>(`users/${customerId}`);
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

  const getOrderStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getPaymentStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      paid: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      refunded: "bg-gray-100 text-gray-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const calculateOrderStats = () => {
    if (!customer?.orders) return { total: 0, totalSpent: 0 };

    const totalSpent = customer.orders.reduce((sum, order) => {
      const numericValue =
        parseFloat(order.totalValue?.toString().replace(/[^\d.]/g, "")) || 0;

      return sum + numericValue;
    }, 0);

    return {
      total: customer.orders.length,
      totalSpent,
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
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Customer not found</p>
        <Button asChild className="mt-4">
          <Link href="/admin/customers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Customers
          </Link>
        </Button>
      </div>
    );
  }

  const orderStats = calculateOrderStats();

  return (
    <div className="w-full md:p-6 p-2">
      {/* Compact Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/customer/customer-list?page=1&limit=10">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Customer Details</h1>
          <p className="text-sm text-muted-foreground">{customer.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column - Compact */}
        <div className="lg:col-span-1 space-y-4">
          {/* Compact Profile Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                {customer.profilePhoto ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={customer.profilePhoto.url}
                      alt={customer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{customer.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {customer.role.rolename}
                  </p>
                  {customer.isVerified ? (
                    <Badge variant="default" className="mt-1 text-xs">
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Unverified
                    </Badge>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="break-all">{customer.email}</span>
                </div>
                {customer.mobileNumber && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                    <span>{customer.mobileNumber}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-1 border-t">
                  <span className="text-muted-foreground">Joined</span>
                  <span className="font-medium">
                    {formatDateTime(customer.createdAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Login</span>
                  <span className="font-medium">
                    {customer.lastLoginAt
                      ? formatDateTime(customer.lastLoginAt)
                      : "Never"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compact Stats */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{orderStats.total}</div>
                  <div className="text-xs text-muted-foreground">Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    ৳{orderStats.totalSpent.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">Spent</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compact Addresses */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">
                Addresses ({customer.addresses.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customer.addresses.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-2">
                  No addresses
                </p>
              ) : (
                <div className="space-y-3">
                  {customer.addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border rounded p-2 text-xs"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <Badge
                          variant={
                            address.type === "shipping"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs h-5"
                        >
                          {address.type}
                        </Badge>
                        {address.isDefault && (
                          <Badge variant="outline" className="text-xs h-5">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="font-medium">{address.address}</p>
                      <p className="text-muted-foreground">
                        {address.area}, {address.city}, {address.division}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Compact Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Order History</CardTitle>
              <CardDescription className="text-xs">
                {customer.orders.length} total orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customer.orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="font-medium">No orders yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This customer hasn't placed any orders.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {customer.orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded p-3 space-y-3"
                    >
                      {/* Compact Order Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold">{order.orderNo}</h4>
                            <Badge
                              className={`${getOrderStatusColor(
                                order.orderStatus
                              )} text-xs h-5`}
                            >
                              {order.orderStatus}
                            </Badge>
                            <Badge
                              className={`${getPaymentStatusColor(
                                order.paymentStatus
                              )} text-xs h-5`}
                            >
                              {order.paymentStatus}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            {formatDateTime(order.createdAt)}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xl font-bold">
                            ৳{order.totalValue.toLocaleString()}
                          </p>
                          {parseFloat(order.totalDiscount.toString()) > 0 && (
                            <p className="text-xs text-green-600">
                              -৳
                              {parseFloat(
                                order.totalDiscount.toString()
                              ).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Compact Items Table */}
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="text-xs h-8">
                                Product
                              </TableHead>
                              <TableHead className="text-xs h-8">Qty</TableHead>
                              <TableHead className="text-xs h-8">
                                Price
                              </TableHead>
                              <TableHead className="text-xs h-8 text-right">
                                Total
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="text-xs py-2">
                                  #{item.productId}
                                </TableCell>
                                <TableCell className="text-xs py-2">
                                  {item.quantity}
                                </TableCell>
                                <TableCell className="text-xs py-2">
                                  ৳{item.unitPrice}
                                </TableCell>
                                <TableCell className="text-xs py-2 text-right font-medium">
                                  ৳{item.totalPrice}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>

                      {/* Compact Order Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs pt-2 border-t">
                        <div>
                          <p className="font-medium">Shipping</p>
                          <p className="text-muted-foreground">
                            {order.shippingMethod.name}
                          </p>
                          <p className="text-muted-foreground">
                            ৳{parseFloat(order.shippingMethod.cost).toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Payment</p>
                          <p className="text-muted-foreground">
                            {order.paymentMethod.name}
                          </p>
                          <p className="text-muted-foreground">
                            Paid: ৳{order.paidAmount}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-muted-foreground">
                            {order.address.address}, {order.address.area}
                          </p>
                          <p className="text-muted-foreground">
                            {order.address.city}, {order.address.division}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs h-8"
                        asChild
                      >
                        <Link href={`/admin/order/${order.id}/view`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
