"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PageHeader } from "../page-header";
import { LowStockReport } from "./low-stock-report";
import { OutOfStockReport } from "./OutOfStockReport";

export function StockReportTabs() {
  return (
    <div className="w-full">
      <PageHeader
        title="Stock Reports"
        description="View inventory stock status"
      />

      <Tabs defaultValue="low-stock" className="mt-4">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="low-stock" className="flex-1">
            Low Stock
          </TabsTrigger>
          <TabsTrigger value="out-of-stock" className="flex-1">
            Out of Stock
          </TabsTrigger>
        </TabsList>

        <TabsContent value="low-stock" className="mt-4">
          <LowStockReport />
        </TabsContent>

        <TabsContent value="out-of-stock" className="mt-4">
          <OutOfStockReport />
        </TabsContent>
      </Tabs>
    </div>
  );
}
