"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { LoadingIndicator } from "@/components/admin/loading-indicator";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrencyEnglish } from "@/lib/utils";
import { fetchProtectedData } from "@/utils/api-utils";

interface PaymentMethod {
  name: string;
  code: string;
  description: string;
}

interface OrderSummary {
  orderNo: string;
  orderStatus: string;
  paymentStatus: string;
  totalValue: string;
  paidAmount: string;
}

interface UserInfo {
  name: string;
  email: string;
  mobileNumber: string;
}

interface PaymentRecord {
  id: number;
  paymentNumber: string;
  amount: string;
  paymentDate: string;
  sslPaymentId: string | null;
  order: OrderSummary;
  paymentMethod: PaymentMethod;
  createdBy: UserInfo | null;
  updatedBy: UserInfo | null;
}

export default function OrderPaymentList({ orderId }: { orderId: string }) {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const data = await fetchProtectedData<PaymentRecord[]>(
          `orders/${orderId}/payments/all`
        );
        setPayments(data || []);
      } catch (error) {
        console.error("Error fetching payments:", error);
        toast.error("Failed to load order payments");
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchPayments();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <LoadingIndicator message="Loading payment records..." />
      </div>
    );
  }

  return (
    <div className="w-full md:p-6 p-2">
      <PageHeader
        title="Order Payments"
        description={`All payments linked to Order #${orderId}`}
      />

      {/* Table */}
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-xs">#</TableHead>
              <TableHead className="text-xs">Payment No</TableHead>
              <TableHead className="text-xs">Date</TableHead>
              <TableHead className="text-xs">Amount</TableHead>
              <TableHead className="text-xs">Method</TableHead>
              <TableHead className="text-xs hidden md:table-cell">
                Order
              </TableHead>
              <TableHead className="text-xs hidden lg:table-cell">
                Created By
              </TableHead>
              <TableHead className="text-right text-xs">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-muted-foreground"
                >
                  <p className="font-medium">No payments found</p>
                </TableCell>
              </TableRow>
            ) : (
              payments.map((p, idx) => (
                <TableRow key={p.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{p.paymentNumber}</TableCell>
                  <TableCell>{p.paymentDate}</TableCell>
                  <TableCell>
                    {formatCurrencyEnglish(parseFloat(p.amount))}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {p.paymentMethod.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {p.paymentMethod.description}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-col text-xs">
                      <span className="font-medium">{p.order.orderNo}</span>
                      <span className="text-muted-foreground">
                        {p.order.orderStatus} / {p.order.paymentStatus}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="hidden lg:table-cell text-xs">
                    {p.createdBy ? (
                      <div>
                        <span className="font-medium">{p.createdBy.name}</span>
                        <p className="text-muted-foreground">
                          {p.createdBy.mobileNumber}
                        </p>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">System</span>
                    )}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      asChild
                    >
                      <Link href={`/admin/payments/${p.id}`}>
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      {payments.length > 0 && (
        <div className="mt-3 p-3 bg-muted rounded-lg text-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-muted-foreground">Payments</p>
              <p className="text-lg font-bold">{payments.length}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Amount</p>
              <p className="text-lg font-bold">
                {formatCurrencyEnglish(
                  payments.reduce((sum, p) => sum + parseFloat(p.amount), 0)
                )}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Completed Orders</p>
              <p className="text-lg font-bold">
                {
                  payments.filter((p) => p.order.paymentStatus === "completed")
                    .length
                }
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Methods Used</p>
              <p className="text-lg font-bold">
                {[...new Set(payments.map((p) => p.paymentMethod.name))].length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
