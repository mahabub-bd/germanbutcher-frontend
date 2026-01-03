import StatsCard from "@/components/admin/dashboard/stats-card";
import { formatCurrencyEnglish } from "@/lib/utils";
import type { OrderSummary } from "@/utils/types";
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
}

/**
 * Month → index map
 */
const MONTH_INDEX: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const EMPTY_MONTH: OrderSummary = {
  year: 0,
  month: "",
  totalValue: 0,
  orderCount: 0,
  cancelOrderCount: 0,
  cancelValue: 0,
};

/**
 * Helpers
 */
const formatMonthLabel = (month: string, year: number) =>
  month && year ? `${month} ${year}` : "N/A";

const calculateGrowth = (current: number, previous: number) => {
  if (!previous) return 0;
  return ((current - previous) / previous) * 100;
};

export default function DashboardStatsGrid({
  chartData,
  productsCount,
  customersCount,
}: DashboardStatsGridProps) {
  /**
   * Sort by date
   */
  const sortedData = [...chartData].sort((a, b) => {
    const aDate = new Date(a.year, MONTH_INDEX[a.month]);
    const bDate = new Date(b.year, MONTH_INDEX[b.month]);
    return aDate.getTime() - bDate.getTime();
  });

  const currentMonthData = sortedData.at(-1) ?? EMPTY_MONTH;
  const lastMonthData = sortedData.at(-2) ?? EMPTY_MONTH;

  /**
   * Dynamic labels
   */
  const currentMonthLabel = formatMonthLabel(
    currentMonthData.month,
    currentMonthData.year
  );

  const lastMonthLabel = formatMonthLabel(
    lastMonthData.month,
    lastMonthData.year
  );

  /**
   * Aggregates
   */
  const totalSales = chartData.reduce((sum, item) => sum + item.totalValue, 0);

  const totalOrders = chartData.reduce((sum, item) => sum + item.orderCount, 0);

  const totalCancelOrders = chartData.reduce(
    (sum, item) => sum + (item.cancelOrderCount ?? 0),
    0
  );

  const totalCancelValue = chartData.reduce(
    (sum, item) => sum + (item.cancelValue ?? 0),
    0
  );

  /**
   * MoM Growth
   */
  const salesGrowth = calculateGrowth(
    currentMonthData.totalValue,
    lastMonthData.totalValue
  );

  const cancelGrowth = calculateGrowth(
    currentMonthData.cancelValue ?? 0,
    lastMonthData.cancelValue ?? 0
  );

  const isSalesUp = salesGrowth >= 0;
  const isCancelUp = cancelGrowth >= 0;

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Sales */}
      <StatsCard
        title="Total Sales"
        value={formatCurrencyEnglish(totalSales)}
        count={String(totalOrders)}
        description="All-time revenue"
        icon={TrendingUp}
        bgColor="green"
      />

      {/* Total Cancel */}
      <StatsCard
        title="Total Cancel"
        value={formatCurrencyEnglish(totalCancelValue)}
        count={String(totalCancelOrders)}
        description="All-time cancellations"
        icon={XCircle}
        bgColor="amber"
      />

      {/* Sales - Current Month */}
      <StatsCard
        title={`Sales (${currentMonthLabel})`}
        value={formatCurrencyEnglish(currentMonthData.totalValue)}
        count={String(currentMonthData.orderCount)}
        description={` ${isSalesUp ? "▲" : "▼"} ${Math.abs(salesGrowth).toFixed(
          2
        )}%`}
        icon={isSalesUp ? TrendingUp : TrendingDown}
        bgColor={isSalesUp ? "green" : "red"}
      />

      {/* Cancel - Current Month */}
      <StatsCard
        title={`Cancel (${currentMonthLabel})`}
        value={formatCurrencyEnglish(currentMonthData.cancelValue ?? 0)}
        count={String(currentMonthData.cancelOrderCount ?? 0)}
        description={` ${isCancelUp ? "▲" : "▼"} ${Math.abs(
          cancelGrowth
        ).toFixed(2)}%`}
        icon={isCancelUp ? TrendingUp : TrendingDown}
        bgColor={isCancelUp ? "orange" : "pink"}
      />

      {/* Sales - Last Month */}
      <StatsCard
        title={`Sales (${lastMonthLabel})`}
        value={formatCurrencyEnglish(lastMonthData.totalValue)}
        count={String(lastMonthData.orderCount)}
        description="Previous month revenue"
        icon={Calendar}
        bgColor="blue"
      />

      {/* Cancel - Last Month */}
      <StatsCard
        title={`Cancel (${lastMonthLabel})`}
        value={formatCurrencyEnglish(lastMonthData.cancelValue ?? 0)}
        count={String(lastMonthData.cancelOrderCount ?? 0)}
        description="Previous month cancellations"
        icon={TrendingDown}
        bgColor="pink"
      />

      {/* Products */}
      <StatsCard
        title="Products"
        value={productsCount.toString()}
        description="Total inventory count"
        icon={Package}
        bgColor="indigo"
      />

      {/* Customers */}
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
