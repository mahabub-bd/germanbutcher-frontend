import StatsCard from "@/components/admin/dashboard/stats-card";
import { formatCurrencyEnglish } from "@/lib/utils";
import type { Brand, Category, OrderSummary } from "@/utils/types";
import {
  Calendar,
  Package,
  TrendingDown,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

interface DashboardStatsGridProps {
  chartData: OrderSummary[];
  productsCount: number;
  customersCount: number;
  categories: Category[];
  brands: Brand[];
}

export default function DashboardStatsGrid({
  chartData,
  productsCount,
  customersCount,
  categories,
  brands,
}: DashboardStatsGridProps) {
  // Calculate total sales and orders
  const totalSales = chartData.reduce((sum, item) => sum + item.totalValue, 0);
  const totalOrders = chartData.reduce((sum, item) => sum + item.orderCount, 0);

  // Calculate total cancel statistics
  const totalCancelOrders = chartData.reduce(
    (sum, item) => sum + (item.cancelOrderCount || 0),
    0
  );
  const totalCancelValue = chartData.reduce(
    (sum, item) => sum + (item.cancelValue || 0),
    0
  );

  // Get current month's data (most recent month in the array)
  const currentMonthData = chartData[1] || {
    totalValue: 0,
    orderCount: 0,
    cancelOrderCount: 0,
    cancelValue: 0,
  };

  // Get last month's data (second most recent month in the array)
  const lastMonthData = chartData[0] || {
    totalValue: 0,
    orderCount: 0,
    cancelOrderCount: 0,
    cancelValue: 0,
  };

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
      {/* Total Sales - Green (Success/Money) */}
      <StatsCard
        title="Total Sales"
        value={formatCurrencyEnglish(totalSales)}
        count={String(totalOrders)}
        description="All-time revenue"
        icon={TrendingUp}
        bgColor="green"
      />

      {/* Total Cancel - Red/Amber (Warning/Loss) */}
      <StatsCard
        title="Total Cancel"
        value={formatCurrencyEnglish(totalCancelValue)}
        count={String(totalCancelOrders)}
        description="All-time cancellations"
        icon={XCircle}
        bgColor="amber"
      />

      {/* Sales Current Month - Green (Current/Active) */}
      <StatsCard
        title="Sales (This Month)"
        value={formatCurrencyEnglish(currentMonthData.totalValue)}
        count={String(currentMonthData.orderCount)}
        description="This month's revenue"
        icon={TrendingUp}
        bgColor="green"
      />

      {/* Cancel Current Month - Orange (Current Alert) */}
      <StatsCard
        title="Cancel (This Month)"
        value={formatCurrencyEnglish(currentMonthData.cancelValue || 0)}
        count={String(currentMonthData.cancelOrderCount || "0")}
        description="This month's cancellations"
        icon={XCircle}
        bgColor="orange"
      />

      {/* Sales Last Month - Blue (Recent/Time-based) */}
      <StatsCard
        title="Sales (Last Month)"
        value={formatCurrencyEnglish(lastMonthData.totalValue)}
        count={String(lastMonthData.orderCount)}
        description="Previous month revenue"
        icon={Calendar}
        bgColor="blue"
      />

      {/* Cancel Last Month - Pink (Alert/Attention) */}
      <StatsCard
        title="Cancel (Last Month)"
        value={formatCurrencyEnglish(lastMonthData.cancelValue || 0)}
        count={String(lastMonthData.cancelOrderCount || "0")}
        description="Previous month cancellations"
        icon={TrendingDown}
        bgColor="pink"
      />

      {/* Products - Indigo (Inventory/Items) */}
      <StatsCard
        title="Products"
        value={productsCount.toString()}
        description="Total inventory count"
        icon={Package}
        bgColor="indigo"
      />

      {/* Customers - Blue (People/Users) */}
      <StatsCard
        title="Customers"
        value={customersCount.toString()}
        description="Total registered users"
        icon={Users}
        bgColor="blue"
      />
    </div>
  );
}
