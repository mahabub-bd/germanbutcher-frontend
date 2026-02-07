import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";
import { OrderStatus } from "./types";

const getOrderStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case OrderStatus.PENDING:
      return "bg-yellow-100 text-yellow-800";
    case OrderStatus.PROCESSING:
      return "bg-blue-100 text-blue-800";
    case OrderStatus.SHIPPED:
      return "bg-purple-100 text-purple-800";
    case OrderStatus.DELIVERED:
      return "bg-green-100 text-green-800";
    case OrderStatus.CANCELLED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
    case OrderStatus.DELIVERED:
    case "completed":
      return <CheckCircle className="size-4 mr-1" />;
    case OrderStatus.PENDING:
      return <Clock className="size-4 mr-1" />;
    case OrderStatus.PROCESSING:
      return <Package className="size-4 mr-1" />;
    case OrderStatus.CANCELLED:
    case "failed":
      return <XCircle className="size-4 mr-1" />;
    case OrderStatus.SHIPPED:
      return <Truck className="size-4 mr-1" />;
    default:
      return null;
  }
};

const getStatusDotColor = (status: string) => {
  switch (status.toLowerCase()) {
    case OrderStatus.PENDING:
      return "bg-yellow-500";
    case OrderStatus.PROCESSING:
      return "bg-blue-500";
    case OrderStatus.SHIPPED:
      return "bg-purple-500";
    case OrderStatus.DELIVERED:
      return "bg-green-500";
    case OrderStatus.CANCELLED:
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};
const getPaymentMethodColor = (method: string) => {
  if (!method) return "bg-gray-100 text-gray-800";

  switch (method.toLowerCase()) {
    case "cash on delivery":
    case "cod":
      return "bg-gray-100 text-gray-800";

    case "sslcommerz":
    case "ssl_commarz":
    case "ssl commerz":
      return "bg-blue-100 text-blue-800";

    case "bkash":
      return "bg-pink-100 text-pink-800";

    case "nagad":
      return "bg-orange-100 text-orange-800";

    case "rocket":
      return "bg-purple-100 text-purple-800";

    default:
      return "bg-gray-100 text-gray-800";
  }
};

export {
  getOrderStatusColor,
  getPaymentMethodColor,
  getPaymentStatusColor,
  getStatusDotColor,
  getStatusIcon,
};
