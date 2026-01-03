import {
  Ban,
  CheckCircle2,
  Clock,
  ListChecks,
  Loader2,
  Truck,
} from "lucide-react";
import { StatusCard } from "./status-card";

interface OrderStatsGridProps {
  data: {
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
}

export function OrderStatsGrid({ data }: OrderStatsGridProps) {
  const getOrderUrl = (status?: string) => {
    if (!status) return "/admin/orders?page=1&limit=10";
    return `/admin/orders/${status}?page=1&limit=10&orderStatus=${status}`;
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-6">
      {/* All Orders */}
      <StatusCard
        title="All Orders"
        value={data.totalOrders}
        icon={ListChecks}
        color="text-sky-500"
        href={getOrderUrl()}
      />
      {/* Delivered */}
      <StatusCard
        title="Delivered"
        value={data.delivered}
        icon={CheckCircle2}
        color="text-green-500"
        href={getOrderUrl("delivered")}
      />
      {/* Pending */}
      <StatusCard
        title="Pending"
        value={data.pending}
        icon={Clock}
        color="text-yellow-500"
        href={getOrderUrl("pending")}
      />

      {/* Processing */}
      <StatusCard
        title="Processing"
        value={data.processing}
        icon={Loader2}
        color="text-blue-500"
        href={getOrderUrl("processing")}
      />

      {/* Shipped */}
      <StatusCard
        title="Shipped"
        value={data.shipped}
        icon={Truck}
        color="text-purple-500"
        href={getOrderUrl("shipped")}
      />

      {/* Cancelled */}
      <StatusCard
        title="Cancelled"
        value={data.cancelled}
        icon={Ban}
        color="text-red-500"
        href={getOrderUrl("cancelled")}
      />
    </div>
  );
}
