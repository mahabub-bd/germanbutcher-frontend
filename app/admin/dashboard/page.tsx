export const dynamic = "force-dynamic";

import OrdersTable from "@/components/admin/dashboard/orders-table";
import { StatsCard } from "@/components/admin/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatCurrencyEnglish,
  getTopBrandByProductCount,
  getTopCategoryByProductCount,
} from "@/lib/utils";
import {
  fetchData,
  fetchDataPagination,
  fetchProtectedData,
} from "@/utils/api-utils";
import type {
  ApiResponseusers,
  Brand,
  Category,
  OrderResponse,
  OrderSummary,
  Product,
} from "@/utils/types";

import CombinedOrdersSalesChart from "@/components/admin/dashboard/combined-order-saleschart";
import { LowStockReport } from "@/components/admin/dashboard/low-stock-report";
import { TopCustomersList } from "@/components/admin/dashboard/top-customer-list";
import TopSaleProductsList from "@/components/admin/dashboard/top-sale-product-list";
import {
  Activity,
  DollarSign,
  Layers,
  Package,
  ShoppingCart,
  Tag,
  Users,
  XCircle,
} from "lucide-react";

export default async function DashboardPage() {
  const products = await fetchData<Product[]>("products?limit=300");

  const categories = await fetchData<Category[]>("categories");
  const brands = await fetchData<Brand[]>("brands");
  const response =
    await fetchDataPagination<ApiResponseusers>("users/customers");
  const orders = await fetchDataPagination<OrderResponse>(`orders`);
  const chartdata = await fetchProtectedData("orders/reports/monthly");

  const totalSales = (chartdata as { totalValue: number }[]).reduce(
    (sum, item) => sum + item.totalValue,
    0
  );
  const totalOrders = (chartdata as { orderCount: number }[]).reduce(
    (sum, item) => sum + item.orderCount,
    0
  );

  // Calculate total cancel statistics
  const totalCancelOrders = (
    chartdata as { cancelOrderCount?: number }[]
  ).reduce((sum, item) => sum + (item.cancelOrderCount || 0), 0);
  const totalCancelValue = (chartdata as { cancelValue?: number }[]).reduce(
    (sum, item) => sum + (item.cancelValue || 0),
    0
  );

  // Get last month's data (most recent month in the array)
  const lastMonthData = (chartdata as OrderSummary[])[0] || {
    totalValue: 0,
    orderCount: 0,
    cancelOrderCount: 0,
    cancelValue: 0,
  };
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <StatsCard
          title="Total Sales"
          value={formatCurrencyEnglish(totalSales)}
          description="+20.1% from last month"
          trend="up"
          icon={DollarSign}
          colorScheme="green"
        />
        <StatsCard
          title="Total Orders"
          value={String(totalOrders)}
          description="+12.2% from last month"
          trend="up"
          icon={ShoppingCart}
          colorScheme="purple"
        />
        <StatsCard
          title="Total Cancel Orders"
          value={String(totalCancelOrders)}
          description="All time cancelled orders"
          trend="down"
          icon={XCircle}
          colorScheme="amber"
        />
        <StatsCard
          title="Total Cancel Value"
          value={formatCurrencyEnglish(totalCancelValue)}
          description="All time cancelled value"
          trend="down"
          icon={DollarSign}
          colorScheme="amber"
        />

        <StatsCard
          title="Categories"
          value={categories?.length?.toString() || "0"}
          description={`${getTopCategoryByProductCount(categories)} is top`}
          trend="neutral"
          icon={Layers}
          colorScheme="indigo"
        />
        <StatsCard
          title="Brands"
          value={brands?.length?.toString() || "0"}
          description={`${getTopBrandByProductCount(brands)} is top`}
          trend="neutral"
          icon={Tag}
          colorScheme="violet"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <StatsCard
          title="Last Month Sales"
          value={formatCurrencyEnglish(lastMonthData.totalValue)}
          description={`${lastMonthData.month || "N/A"} ${lastMonthData.year || ""}`}
          trend="neutral"
          icon={DollarSign}
          colorScheme="green"
        />
        <StatsCard
          title="Last Month Orders"
          value={String(lastMonthData.orderCount)}
          description={`${lastMonthData.month || "N/A"} ${lastMonthData.year || ""}`}
          trend="neutral"
          icon={ShoppingCart}
          colorScheme="purple"
        />
        <StatsCard
          title="Last Month Cancel Orders"
          value={String(lastMonthData.cancelOrderCount || 0)}
          description={`${lastMonthData.month || "N/A"} ${lastMonthData.year || ""}`}
          trend="down"
          icon={XCircle}
          colorScheme="pink"
        />
        <StatsCard
          title="Last Month Cancel Value"
          value={formatCurrencyEnglish(lastMonthData.cancelValue || 0)}
          description={`${lastMonthData.month || "N/A"} ${lastMonthData.year || ""}`}
          trend="down"
          icon={DollarSign}
          colorScheme="pink"
        />
        <StatsCard
          title="Products"
          value={products?.length?.toString() || "0"}
          description="+5.4% from last month"
          trend="up"
          icon={Package}
          colorScheme="amber"
        />
        <StatsCard
          title="Customers"
          value={response.data.pagination.total.toString()}
          description="+3.1% from last month"
          trend="up"
          icon={Users}
          colorScheme="blue"
        />
      </div>

      <CombinedOrdersSalesChart chartData={chartdata as OrderSummary[]} />
      <OrdersTable />
      <LowStockReport />
      <TopCustomersList />
      <TopSaleProductsList />
      {/* Additional Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/20 border-none">
          <CardHeader className="pb-2">
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">3.2%</p>
                <p className="text-xs text-muted-foreground">
                  +0.5% from last week
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-700 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/20 border-none">
          <CardHeader className="pb-2">
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">$45.82</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-700 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 border-none">
          <CardHeader className="pb-2">
            <CardTitle>Top Selling Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">
                  {getTopCategoryByProductCount(categories)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Package className="h-6 w-6 text-amber-700 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
