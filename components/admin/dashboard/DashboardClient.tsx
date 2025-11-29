"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardStatsGrid from "./DashboardStatsGrid";
import { OrderStatsGrid } from "./OrderStatsGrid";
import type { Brand, Category, OrderSummary } from "@/utils/types";

interface DashboardClientProps {
  initialChartData: OrderSummary[];
  initialStatsData: {
    totalOrders: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    pendingValue: number;
    processingValue: number;
    shippedValue: number;
    deliveredValue: number;
    cancelledValue: number;
  };
  productsCount: number;
  customersCount: number;
  categories: Category[];
  brands: Brand[];
}

export default function DashboardClient({
  initialChartData,
  initialStatsData,
  productsCount,
  customersCount,
  categories,
  brands,
}: DashboardClientProps) {
  const router = useRouter();

  useEffect(() => {
    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      router.refresh();
    }, 10000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <>
      <DashboardStatsGrid
        chartData={initialChartData}
        productsCount={productsCount}
        customersCount={customersCount}
        categories={categories}
        brands={brands}
      />
      <OrderStatsGrid data={initialStatsData} />
    </>
  );
}
