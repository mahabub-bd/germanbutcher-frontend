"use client";

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

      {/* Table */}
      <div className="rounded-lg border overflow-x-auto">
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

      {/* Summary */}
      {monthlyData.length > 0 && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
       
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Total Months</p>
              <p className="text-lg font-bold">{monthlyData.length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Orders</p>
              <p className="text-lg font-bold">{totalOrders}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Value</p>
              <p className="text-lg font-bold">
                {formatCurrencyEnglish(totalValue)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Cancelled</p>
              <p className="text-lg font-bold">{totalCancelled}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Cancel Value</p>
              <p className="text-lg font-bold text-red-600">
                {formatCurrencyEnglish(totalCancelValue)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
