"use client";

import { PaymentsTable } from "@/app/admin/order/[id]/payments/payment-table";
import { CustomerInfo } from "@/components/admin/orders/customer-info";
import { DeliveryManSection } from "@/components/admin/orders/delivery-man-section";
import { OrderActions } from "@/components/admin/orders/order-actions";
import { OrderItems } from "@/components/admin/orders/order-items";
import { OrderStatusBadges } from "@/components/admin/orders/order-status-badges";
import { OrderSummary } from "@/components/admin/orders/order-summary";
import { OrderTimeline } from "@/components/admin/orders/order-timeline";
import { ShippingAddress } from "@/components/admin/orders/shipping-address";
import { formatCurrencyEnglish, formatDateTime } from "@/lib/utils";
import { fetchOrderById } from "@/utils/api-utils";
import type { Order, OrderItem } from "@/utils/types";
import { pdf } from "@react-pdf/renderer";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { OrderPDFDocument } from "./order-pdf-document";

interface OrderViewProps {
  order: Order;
  onBack?: () => void;
}

export default function OrderView({ order, onBack }: OrderViewProps) {
  const [currentOrder, setCurrentOrder] = useState<Order>(order);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCancelSuccess = async () => {
    setIsRefreshing(true);
    try {
      // Refetch the order to get updated status
      const updatedOrder = await fetchOrderById(order.id.toString());
      setCurrentOrder(updatedOrder as Order);
    } catch (error) {
      console.error("Failed to refresh order:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleGeneratePDF = async () => {
    const blob = await pdf(<OrderPDFDocument order={currentOrder} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `German-Butcher-Invoice-${currentOrder.orderNo}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleThermalPrint = () => {
    // Create a new window for printing
    const printWindow = window.open("", "", "width=300,height=600");
    if (!printWindow) {
      throw new Error("Failed to open print window");
    }

    const orderSummary = calculateOrderSummary();

    const printContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order #${currentOrder.orderNo}</title>
  <style>
    @media print {
      @page {
        size: 80mm auto;
        margin: 0;
      }
      body { margin: 0; padding: 0; }
    }

    body {
      font-family: 'Courier New', monospace;
      font-size: 11px;
      line-height: 1.4;
      color: #000;
      width: 80mm;
      margin: 0 auto;
      padding: 5mm;
      background: white;
    }

    .center { text-align: center; }
    .bold { font-weight: bold; }
    .large { font-size: 14px; font-weight: bold; }
    .small { font-size: 10px; color: #333; }

    img.logo {
      width: 50px;
      height: auto;
      display: block;
      margin: 0 auto 4px;
    }

    .separator {
      border-top: 1px dashed #000;
      margin: 6px 0;
    }

    .double-separator {
      border-top: 2px solid #000;
      margin: 8px 0;
    }

    .row {
      display: flex;
      justify-content: space-between;
      margin: 2px 0;
    }

    .item-row {
      margin: 4px 0;
    }

    .item-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .item-name {
      flex: 1;
      font-weight: bold;
      text-transform: capitalize;
    }

    .item-qty {
      flex: 0 0 30%;
      text-align: right;
    }

    .item-price {
      flex: 0 0 25%;
      text-align: right;
    }

    .footer {
      margin-top: 10px;
      font-size: 10px;
      text-align: center;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div class="center">
    <img class="logo" src="/images/logo3.png" alt="Logo" />
    <div class="large">GERMAN BUTCHER</div>
    <div class="small">House-56/B, Road-132, Gulshan-1, Dhaka</div>
    <div class="small">Mobile: 01404-009000 | support@germanbutcher.com</div>
    <div class="separator"></div>
    <div>Invoice</div>
  </div>

  <div class="separator"></div>

  <div class="row"><span>Order #:</span><span class="bold">${currentOrder.orderNo}</span></div>
  <div class="row"><span>Date:</span><span>${formatDateTime(currentOrder.createdAt)}</span></div>

  <div class="separator"></div>

  <!-- Customer Info -->
  <div class="bold">CUSTOMER DETAILS</div>
  <div style="margin-top: 4px;">
  <div><strong>Name :</strong> ${currentOrder.user.name || ""}</div>
  <div><strong>Email :</strong> ${currentOrder.user.email || "N/A"}</div>
  <div><strong>Mobile Number :</strong> ${currentOrder.user.mobileNumber || "N/A"}</div>
  </div>

  ${
    currentOrder.address
      ? `
      <div class="small" style="margin-top: 3px;">
        <strong>Shipping Address:</strong><br>
      ${currentOrder.address.address},  ${currentOrder.address.area}, ${currentOrder.address.city},
      </div>
      `
      : ""
  }

  <div class="separator"></div>

  <!-- Order Items -->
  <div class="bold">ORDER ITEMS</div>

  ${currentOrder.items
    .map((item: OrderItem) => {
      const unitPrice =
        Number(item.unitPrice) || Number(item.product.sellingPrice) || 0;
      const totalPrice = Number(item.totalPrice) || unitPrice * item.quantity;
      const unitDiscount = Number(item.unitDiscount) || 0;
      const weight =
        item.product.weight &&
        Number(item.product.weight).toString().replace(/\.0+$/, "");
      const unitName = item.product.unit?.name?.toLowerCase() || "";

      return `
        <div class="item-row">
          <div class="item-line">
            <span class="item-name">${item.product.name}</span>
            <span class="item-qty">${item.quantity} × ${weight} ${unitName}</span>
            <span class="item-price">${formatCurrencyEnglish(totalPrice)}</span>
          </div>

        </div>
      `;
    })
    .join("")}

  <div class="separator"></div>

  <!-- Summary -->
  <div class="row"><span>Subtotal:</span><span>${formatCurrencyEnglish(orderSummary.originalSubtotal)}</span></div>

  ${
    orderSummary.productDiscountTotal > 0
      ? `<div class="row"><span>Product Discounts:</span><span>-${formatCurrencyEnglish(orderSummary.productDiscountTotal)}</span></div>`
      : ""
  }

  ${
    currentOrder.coupon && orderSummary.couponDiscount > 0
      ? `<div class="row"><span>Coupon (${currentOrder.coupon.code}):</span><span>-${formatCurrencyEnglish(orderSummary.couponDiscount)}</span></div>`
      : ""
  }

  <div class="row"><span>Shipping (${currentOrder.shippingMethod.name}):</span><span>${formatCurrencyEnglish(orderSummary.shippingCost)}</span></div>

  <div class="separator"></div>

  <div class="row bold" style="font-size:13px;"><span>TOTAL:</span><span>${formatCurrencyEnglish(orderSummary.total)}</span></div>

  ${
    currentOrder.paymentStatus === "pending"
      ? `<div class="row" style="color:#d00;"><span>DUE:</span><span class="bold">${formatCurrencyEnglish(currentOrder.totalValue - currentOrder.paidAmount)}</span></div>`
      : ""
  }

  <div class="row"><span>Payment:</span><span class="bold">${currentOrder.paymentStatus.toUpperCase()}</span></div>

  <div class="separator"></div>

  <!-- Footer -->
  <div class="footer">
    Thank you for your order!<br>
    Visit again at <strong>germanbutcherbd.com</strong>
  </div>

  <div class="footer" style="margin-top: 10mm;">
    ...............................................<br>
    <span>Customer Signature</span>
  </div>

</body>
</html>
`;

    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    };
  };

  const calculateOrderSummary = () => {
    const itemsSubtotal = currentOrder.items.reduce((sum, item) => {
      const itemTotal =
        Number(item.totalPrice) ||
        (Number(item.unitPrice) || 0) * item.quantity;
      return sum + itemTotal;
    }, 0);

    const productDiscountTotal = currentOrder.items.reduce((sum, item) => {
      const discountTotal = (item.unitDiscount || 0) * item.quantity;
      return sum + Number(discountTotal);
    }, 0);

    const originalSubtotal = itemsSubtotal + productDiscountTotal;

    const couponDiscount = Number(currentOrder.totalDiscount) - productDiscountTotal;

    const shippingCost = Number(currentOrder.shippingMethod.cost);

    const total = Number(currentOrder.totalValue);

    return {
      originalSubtotal,
      productDiscountTotal,
      couponDiscount,
      itemsSubtotal,
      shippingCost,
      total,
    };
  };

  return (
    <div className="container mx-auto py-4 space-y-6">
      <OrderActions
        order={currentOrder}
        onGeneratePDF={handleGeneratePDF}
        onThermalPrint={handleThermalPrint}
        onBack={onBack}
        onCancelSuccess={handleCancelSuccess}
      />

      <OrderStatusBadges
        orderStatus={currentOrder.orderStatus}
        paymentStatus={currentOrder.paymentStatus}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          <OrderItems items={currentOrder.items} />

          <OrderTimeline order={currentOrder} />

          {currentOrder.payments && currentOrder.payments.length > 0 && (
            <div className="border rounded-lg bg-card shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b">
                <h3 className="text-sm font-semibold flex items-center">
                  <CreditCard className="size-4 mr-1.5 text-primary" />
                  Payment History
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({currentOrder.payments.length})
                  </span>
                </h3>
              </div>
              <div className="p-4">
                <PaymentsTable payments={currentOrder.payments} />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <CustomerInfo
            user={{
              ...currentOrder.user,
              mobileNumber: currentOrder.user.mobileNumber,
            }}
          />

          <DeliveryManSection
            order={currentOrder}
            onDeliveryManChange={(deliveryMan) => {
              setCurrentOrder({ ...currentOrder, deliveryMan });
            }}
          />

          <ShippingAddress
            address={currentOrder.address}
            userName={currentOrder.user.name}
            userMobileNumber={currentOrder.user.mobileNumber}
          />

          <OrderSummary
            items={currentOrder.items}
            shippingMethod={currentOrder.shippingMethod}
            coupon={currentOrder.coupon}
            totalDiscount={currentOrder.totalDiscount}
            totalValue={currentOrder.totalValue}
            paidAmount={currentOrder.paidAmount}
            paymentStatus={currentOrder.paymentStatus}
          />
        </div>
      </div>
    </div>
  );
}
