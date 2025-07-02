"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/utils";
import { Order } from "@/utils/types";
import { ChevronRight, Eye, Package } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface MyorderProps {
  orders: Order[];
}

export default function Myorder({ orders }: MyorderProps) {
  console.log(orders);
  const params = useParams();
  const userId = params.id;

  // Helper function to format status
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Helper function to get status styling
  const getStatusStyle = (status: string) => {
    const statusStyles: { [key: string]: string } = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      processing: "bg-blue-50 text-blue-700 border-blue-200",
      shipped: "bg-indigo-50 text-indigo-700 border-indigo-200",
      delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
    };
    return (
      statusStyles[status.toLowerCase()] ||
      "bg-gray-50 text-gray-700 border-gray-200"
    );
  };

  // Helper function to get payment status styling
  const getPaymentStatusStyle = (status: string) => {
    const statusStyles: { [key: string]: string } = {
      paid: "bg-green-50 text-green-700 border-green-200",
      pending: "bg-orange-50 text-orange-700 border-orange-200",
      failed: "bg-red-50 text-red-700 border-red-200",
    };
    return (
      statusStyles[status.toLowerCase()] ||
      "bg-gray-50 text-gray-700 border-gray-200"
    );
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
        <p className="text-gray-600 mt-1">
          Track and manage your order history
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto px-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-b border-gray-200">
                <TableHead className="font-semibold text-gray-700">
                  Order ID
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Date & Time
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">
                  Amount
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-right">
                  Shipping
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  Payment
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-center">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders && orders.length > 0 ? (
                orders.map((order: Order) => (
                  <TableRow
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="text-gray-900">{order.orderNo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">
                        {formatDateTime(order.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${getStatusStyle(order.orderStatus)} border font-medium`}
                      >
                        {formatStatus(order.orderStatus)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-semibold text-gray-900">
                        ৳ {order.totalValue.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm text-gray-600">
                        ৳{" "}
                        {order.shippingMethod?.cost
                          ? parseFloat(order.shippingMethod.cost).toFixed(2)
                          : "0.00"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${getPaymentStatusStyle(order.paymentStatus)} border text-xs`}
                      >
                        {formatStatus(order.paymentStatus)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link href={`/user/${userId}/orders/${order.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-gray-100 hover:text-gray-900 transition-all group"
                        >
                          <Eye className="w-4 h-4 mr-1.5 group-hover:scale-110 transition-transform" />
                          View
                          <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-40">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Package className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="text-xl font-semibold text-gray-700 mb-2">
                        No Orders Yet
                      </p>
                      <p className="text-sm text-gray-500 text-center max-w-sm">
                        When you place orders, they will appear here. Start
                        shopping to see your order history.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
