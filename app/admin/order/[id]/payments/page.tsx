"use client";

import { LoadingIndicator } from "@/components/admin/loading-indicator";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { formatCurrencyEnglish } from "@/lib/utils";
import { fetchData } from "@/utils/api-utils";
import { Order } from "@/utils/types";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PaymentsTable } from "./payment-table";

export default function OrderPaymentsListPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const response = await fetchData<Order>(`orders/${orderId}`);
        setOrder(response);
      } catch (error) {
        console.error("Error fetching order data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  if (loading) {
    return <LoadingIndicator message="Loading Order Payments" />;
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Order not found</p>
      </div>
    );
  }

  const remainingAmount = order.totalValue - order.paidAmount;

  return (
    <div className="w-full  border rounded-sm">
      <div className="md:p-4 p-2">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <PageHeader
              title={`Payments for Order #${order.orderNo}`}
              description={`Total: ${formatCurrencyEnglish(
                order.totalValue
              )} | Paid: ${formatCurrencyEnglish(
                order.paidAmount
              )} | Remaining: ${formatCurrencyEnglish(remainingAmount)}`}
            />
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" asChild>
              <Link href="/admin/orders" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Orders</span>
              </Link>
            </Button>

            {remainingAmount > 0 && (
              <Button asChild>
                <Link
                  href={`/admin/order/${orderId}/payment`}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Payment</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="md:p-6 p-2">
        <PaymentsTable payments={order.payments ?? []} />
      </div>
    </div>
  );
}
