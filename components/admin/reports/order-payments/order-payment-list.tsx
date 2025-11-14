"use client";

import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrencyEnglish } from "@/lib/utils";
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Eye } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PaymentReportPDF } from "./PaymentReportPDF";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

interface PaymentMethod {
  name: string;
  code: string;
  description: string;
}
interface OrderSummary {
  orderNo: string;
  id: number;
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

export default function OrderPaymentList({
  payments,
  fromDate,
  toDate,
}: {
  payments: PaymentRecord[];
  fromDate?: string;
  toDate?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState<Date | undefined>(
    fromDate ? new Date(fromDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    toDate ? new Date(toDate) : undefined
  );
  const [quickRange, setQuickRange] = useState<string>("");

  // --- handle filter ---
  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (startDate) params.set("fromDate", format(startDate, "yyyy-MM-dd"));
    else params.delete("fromDate");

    if (endDate) params.set("toDate", format(endDate, "yyyy-MM-dd"));
    else params.delete("toDate");

    router.push(`?${params.toString()}`);
  };

  // --- quick range handler ---
  const handleQuickRange = (value: string) => {
    setQuickRange(value);
    const today = new Date();
    let from: Date | undefined;
    let to: Date | undefined;

    switch (value) {
      case "today":
        from = today;
        to = today;
        break;
      case "thisWeek":
        from = startOfWeek(today, { weekStartsOn: 6 }); // week starts on Saturday
        to = endOfWeek(today, { weekStartsOn: 6 });
        break;
      case "thisMonth":
        from = startOfMonth(today);
        to = endOfMonth(today);
        break;
      case "lastMonth":
        const prevMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        from = startOfMonth(prevMonth);
        to = endOfMonth(prevMonth);
        break;
      case "allTime":
        from = undefined;
        to = undefined;
        break;
      default:
        return;
    }

    setStartDate(from);
    setEndDate(to);

    const params = new URLSearchParams(searchParams.toString());
    if (from) params.set("fromDate", format(from, "yyyy-MM-dd"));
    else params.delete("fromDate");

    if (to) params.set("toDate", format(to, "yyyy-MM-dd"));
    else params.delete("toDate");

    router.push(`?${params.toString()}`);
  };

  // --- clear filter ---
  const handleClear = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setQuickRange("");
    router.push("?");
  };

  return (
    <div className="w-full">
      <PageHeader
        title="Order Payments"
        description="Filter, view, and export payment records"
      />

      {/* Filters + Export */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Range Dropdown */}
          <Select value={quickRange} onValueChange={handleQuickRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Quick Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="allTime">All Time</SelectItem>
            </SelectContent>
          </Select>

          {/* Manual Date Pickers */}
          <DatePicker
            value={startDate}
            onChange={(date) => setStartDate(date)}
            placeholder="From Date"
            className="w-[260px]"
          />
          <DatePicker
            value={endDate}
            onChange={(date) => setEndDate(date)}
            placeholder="To Date"
            className="w-[260px]"
          />

          <Button onClick={handleFilter} variant="default">
            Filter
          </Button>
          {(startDate || endDate) && (
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          )}
        </div>

        {payments.length > 0 && (
          <PDFDownloadLink
            document={<PaymentReportPDF payments={payments} />}
            fileName={`order-payments-${new Date().toISOString().split("T")[0]}.pdf`}
          >
            {({ loading }) => (
              <Button variant="secondary">
                {loading ? "Generating PDF..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </div>

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
                  No payments found
                </TableCell>
              </TableRow>
            ) : (
              payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.paymentNumber}</TableCell>
                  <TableCell>{p.paymentDate}</TableCell>
                  <TableCell>
                    {formatCurrencyEnglish(parseFloat(p.amount))}
                  </TableCell>
                  <TableCell>{p.paymentMethod.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {p.order.orderNo}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {p.createdBy ? p.createdBy.name : "System"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/order/${p.order.id}/payments`}>
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
