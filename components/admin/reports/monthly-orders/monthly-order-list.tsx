"use client";

import { StatusCard } from "@/components/admin/dashboard/status-card";
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
import { DollarSign, ShoppingCart, TrendingDown, XCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MonthlyOrderPDF } from "./MonthlyOrderPDF";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

interface MonthlyData {
  year: number;
  month: string;
  orderCount: number;
  totalValue: number;
  cancelOrderCount: number;
  cancelValue: number;
}

interface Props {
  monthlyData: MonthlyData[];
}

export default function MonthlyOrderReportList({ monthlyData }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalOrders = monthlyData.reduce((sum, item) => sum + item.orderCount, 0);
  const totalValue = monthlyData.reduce((sum, item) => sum + item.totalValue, 0);
  const totalCancelled = monthlyData.reduce(
    (sum, item) => sum + item.cancelOrderCount,
    0
  );
  const totalCancelValue = monthlyData.reduce(
    (sum, item) => sum + item.cancelValue,
    0
  );

  return (
    <div className="w-full">
      <PageHeader
        title="Monthly Order Summary"
        description="View monthly order statistics and trends"
      />

      {/* Actions */}
      <div className="flex justify-end gap-2 mb-6">
        {monthlyData.length > 0 && mounted && (
          <PDFDownloadLink
            document={<MonthlyOrderPDF monthlyData={monthlyData} />}
            fileName={`monthly-order-report-${new Date().toISOString().split("T")[0]}.pdf`}
          >
            {({ loading, error }) => (
              <Button variant="secondary" disabled={!!error}>
                {error ? "PDF Error" : loading ? "Generating PDF..." : "Download PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        )}
      </div>

      {/* Summary */}
      {monthlyData.length > 0 && (
        <div className="mb-4 grid grid-cols-2 2xl:grid-cols-4 gap-3">
          
          <StatusCard
            title="Total Orders"
            value={totalOrders}
            icon={ShoppingCart}
            href="#"
            color="text-green-600 dark:text-green-400"
            gradient="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20"
          />
          <StatusCard
            title="Total Value"
            value={formatCurrencyEnglish(totalValue)}
            icon={DollarSign}
            href="#"
            color="text-purple-600 dark:text-purple-400"
            gradient="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
          />
          <StatusCard
            title="Total Cancelled"
            value={totalCancelled}
            icon={XCircle}
            href="#"
            color="text-red-600 dark:text-red-400"
            gradient="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20"
          />
          <StatusCard
            title="Total Cancel Value"
            value={formatCurrencyEnglish(totalCancelValue)}
            icon={TrendingDown}
            href="#"
            color="text-orange-600 dark:text-orange-400"
            gradient="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20"
          />
        </div>
      )}

      {/* Table */}
      <div className=" overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Month</TableHead>
              <TableHead className="text-right">Total Orders</TableHead>
              <TableHead className="text-right">Total Value</TableHead>
              <TableHead className="text-right">Cancelled Orders</TableHead>
              <TableHead className="text-right">Cancelled Value</TableHead>
              <TableHead className="text-right">Cancel Rate (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthlyData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-muted-foreground"
                >
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              monthlyData.map((item, index) => {
                const cancelRate =
                  item.orderCount > 0
                    ? ((item.cancelOrderCount / item.orderCount) * 100).toFixed(1)
                    : "0.0";
                return (
                  <TableRow key={`${item.year}-${item.month}-${index}`}>
                    <TableCell>{item.year}</TableCell>
                    <TableCell className="capitalize">{item.month}</TableCell>
                    <TableCell className="text-right">{item.orderCount}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrencyEnglish(item.totalValue)}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.cancelOrderCount}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrencyEnglish(item.cancelValue)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          parseFloat(cancelRate) > 10
                            ? "text-red-600 font-semibold"
                            : parseFloat(cancelRate) > 5
                            ? "text-orange-600 font-semibold"
                            : "text-green-600 font-semibold"
                        }
                      >
                        {cancelRate}%
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
