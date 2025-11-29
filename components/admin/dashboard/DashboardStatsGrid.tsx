import StatsCard from "@/components/admin/dashboard/stats-card";
import {
  formatCurrencyEnglish,
  getTopBrandByProductCount,
  getTopCategoryByProductCount,
} from "@/lib/utils";
import type { Brand, Category, OrderSummary } from "@/utils/types";
import {
  Award,
  Calendar,
  FolderTree,
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

  // Get last month's data (most recent month in the array)
  const lastMonthData = chartData[0] || {
    totalValue: 0,
    orderCount: 0,
    cancelOrderCount: 0,
    cancelValue: 0,
  };

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-8">
      {/* Total Sales - Green (Success/Money) */}
      <StatsCard
        title="Total Sales"
        value={formatCurrencyEnglish(totalSales)}
        count={String(totalOrders)}
        icon={TrendingUp}
        bgColor="green"
      />

      {/* Total Cancel - Red/Amber (Warning/Loss) */}
      <StatsCard
        title="Total Cancel"
        value={formatCurrencyEnglish(totalCancelValue)}
        count={String(totalCancelOrders)}
        icon={XCircle}
        bgColor="amber"
      />

      {/* Sales Last Month - Blue (Recent/Time-based) */}
      <StatsCard
        title="Sales (Last Month)"
        value={formatCurrencyEnglish(lastMonthData.totalValue)}
        count={String(lastMonthData.orderCount)}
        icon={Calendar}
        bgColor="blue"
      />

      {/* Cancel Last Month - Pink (Alert/Attention) */}
      <StatsCard
        title="Cancel (Last Month)"
        value={formatCurrencyEnglish(lastMonthData.cancelValue || 0)}
        count={String(lastMonthData.cancelOrderCount || "No")}
        icon={TrendingDown}
        bgColor="pink"
      />

      {/* Products - Indigo (Inventory/Items) */}
      <StatsCard
        title="Products"
        value={productsCount.toString()}
        icon={Package}
        bgColor="indigo"
      />

      {/* Customers - Blue (People/Users) */}
      <StatsCard
        title="Customers"
        value={customersCount.toString()}
        icon={Users}
        bgColor="blue"
      />

      {/* Categories - Purple (Taxonomy/Organization) */}
      <StatsCard
        title="Categories"
        value={categories?.length?.toString() || "0"}
        description={`${getTopCategoryByProductCount(categories)} is top`}
        icon={FolderTree}
        bgColor="purple"
      />

      {/* Brands - Violet (Brand/Premium) */}
      <StatsCard
        title="Brands"
        value={brands?.length?.toString() || "0"}
        description={`${getTopBrandByProductCount(brands)} is top`}
        icon={Award}
        bgColor="violet"
      />
    </div>
  );
}
