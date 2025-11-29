export const dynamic = "force-dynamic";

import CombinedOrdersSalesChart from "@/components/admin/dashboard/combined-order-saleschart";
import DashboardClient from "@/components/admin/dashboard/DashboardClient";

import OrdersTable from "@/components/admin/dashboard/orders-table";
import { StockReportTabs } from "@/components/admin/dashboard/StockReportTabs";
import { TopCustomersList } from "@/components/admin/dashboard/top-customer-list";
import TopSaleProductsList from "@/components/admin/dashboard/top-sale-product-list";

import {
  fetchData,
  fetchDataPagination,
  fetchProtectedData,
} from "@/utils/api-utils";
import type {
  ApiResponseusers,
  Brand,
  Category,
  OrderSummary,
  Product,
} from "@/utils/types";

export default async function DashboardPage() {
  const products = await fetchData<Product[]>("products?limit=300");
  const categories = await fetchData<Category[]>("categories");
  const brands = await fetchData<Brand[]>("brands");
  const response =
    await fetchDataPagination<ApiResponseusers>("users/customers");
  const chartdata = await fetchProtectedData("orders/reports/monthly");
  const statsData = await fetchProtectedData<{
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
  }>("orders/reports/statistics");
  return (
    <div className="space-y-6">
      <DashboardClient
        initialChartData={chartdata as OrderSummary[]}
        initialStatsData={statsData}
        productsCount={products?.length || 0}
        customersCount={response.data.pagination.total}
        categories={categories}
        brands={brands}
      />
      <CombinedOrdersSalesChart chartData={chartdata as OrderSummary[]} />
      <OrdersTable />
      <StockReportTabs />
      <TopCustomersList />
      <TopSaleProductsList />
    </div>
  );
}
