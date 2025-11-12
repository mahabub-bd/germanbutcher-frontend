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
import { OrderReportPDF } from "./order-report-pdf";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

interface Customer {
  name: string;
  mobileNumber: string;
  email: string;
}
interface ShippingAddress {
  address: string;
  area: string;
  city: string;
  division: string;
}
interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
interface Order {
  orderNo: string;
  orderStatus: string;
  paymentStatus: string;
  totalValue: number;
  totalDiscount: number;
  paidAmount: number;
  orderDate: string;
  customer: Customer;
  shippingAddress: ShippingAddress;
  shippingMethod: string;
  paymentMethod: string;
  items: OrderItem[];
}
interface OrderReportProps {
  orders: Order[];
  fromDate?: string;
  toDate?: string;
  totalOrders: number;
  totalValue: number;
  totalDiscount: number;
  totalPaid: number;
}

export default function OrderReportList({
  orders,
  fromDate,
  toDate,
  totalOrders,
  totalValue,
  totalDiscount,
  totalPaid,
}: OrderReportProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState<Date | undefined>(
    fromDate ? new Date(fromDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    toDate ? new Date(toDate) : undefined
  );
  const [quickRange, setQuickRange] = useState<string>("");

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (startDate) params.set("fromDate", format(startDate, "yyyy-MM-dd"));
    else params.delete("fromDate");
    if (endDate) params.set("toDate", format(endDate, "yyyy-MM-dd"));
    else params.delete("toDate");
    router.push(`?${params.toString()}`);
  };

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
        from = startOfWeek(today, { weekStartsOn: 6 });
        to = endOfWeek(today, { weekStartsOn: 6 });
        break;
      case "thisMonth":
        from = startOfMonth(today);
        to = endOfMonth(today);
        break;
      case "lastMonth":
        const prev = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        from = startOfMonth(prev);
        to = endOfMonth(prev);
        break;
      case "allTime":
        from = undefined;
        to = undefined;
        break;
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

  const handleClear = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setQuickRange("");
    router.push("?");
  };

  return (
    <div className="w-full">
      <PageHeader
        title="Order Reports"
        description="Filter, view, and export order reports"
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
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

          <Button onClick={handleFilter}>Filter</Button>
          {(startDate || endDate) && (
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          )}
        </div>

        {orders.length > 0 && (
          <PDFDownloadLink
            document={<OrderReportPDF orders={orders} />}
            fileName={`order-report-${new Date().toISOString().split("T")[0]}.pdf`}
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
              <TableHead>#</TableHead>
              <TableHead>Order No</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-muted-foreground"
                >
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((o, i) => (
                <TableRow key={o.orderNo}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{o.orderNo}</TableCell>
                  <TableCell>{o.orderStatus}</TableCell>
                  <TableCell>{o.paymentStatus}</TableCell>
                  <TableCell>{format(new Date(o.orderDate), "PPpp")}</TableCell>
                  <TableCell>{formatCurrencyEnglish(o.totalValue)}</TableCell>
                  <TableCell>{formatCurrencyEnglish(o.paidAmount)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/orders/${o.orderNo}`}>
                        <Eye className="h-4 w-4" />
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
      {orders.length > 0 && (
        <div className="mt-4 p-3 bg-muted rounded-lg grid grid-cols-2 md:grid-cols-4 text-center text-xs">
          <div>
            <p>Total Orders</p>
            <p className="font-bold text-lg">{totalOrders}</p>
          </div>
          <div>
            <p>Total Value</p>
            <p className="font-bold text-lg">
              {formatCurrencyEnglish(totalValue)}
            </p>
          </div>
          <div>
            <p>Total Discount</p>
            <p className="font-bold text-lg">
              {formatCurrencyEnglish(totalDiscount)}
            </p>
          </div>
          <div>
            <p>Total Paid</p>
            <p className="font-bold text-lg">
              {formatCurrencyEnglish(totalPaid)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
