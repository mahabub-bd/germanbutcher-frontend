"use client";

import { PaymentsTable } from "@/app/admin/order/[id]/payments/payment-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@/components/ui/timeline";
import { formatCurrencyEnglish, formatDateTime } from "@/lib/utils";
import {
  getOrderStatusColor,
  getPaymentStatusColor,
  getStatusDotColor,
  getStatusIcon,
} from "@/utils/order-helper";
import { OrderStatus, type Order, type OrderItem } from "@/utils/types";
import { pdf } from "@react-pdf/renderer";
import {
  ArrowLeft,
  Clock,
  CreditCard,
  Download,
  FileText,
  MapPin,
  Package,
  Pencil,
  Printer,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { OrderPDFDocument } from "./order-pdf-document";

interface OrderViewProps {
  order: Order;
  onBack?: () => void;
}

export default function OrderView({ order, onBack }: OrderViewProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const blob = await pdf(<OrderPDFDocument order={order} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `German-Butcher-Invoice-${order.orderNo}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // You might want to show a toast notification here
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleThermalPrint = () => {
    setIsPrinting(true);
    try {
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
  <title>Order #${order.orderNo}</title>
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

  <div class="row"><span>Order #:</span><span class="bold">${order.orderNo}</span></div>
  <div class="row"><span>Date:</span><span>${formatDateTime(order.createdAt)}</span></div>

  <div class="separator"></div>

  <!-- Customer Info -->
  <div class="bold">CUSTOMER DETAILS</div>
  <div style="margin-top: 4px;">
  <div><strong>Name :</strong> ${order.user.name || ""}</div>
  <div><strong>Email :</strong> ${order.user.email || "N/A"}</div>
  <div><strong>Mobile Number :</strong> ${order.user.mobileNumber || "N/A"}</div>
  </div>

  ${
    order.address
      ? `
      <div class="small" style="margin-top: 3px;">
        <strong>Shipping Address:</strong><br>
      ${order.address.address},  ${order.address.area}, ${order.address.city}, 
      </div>
      `
      : ""
  }

  <div class="separator"></div>

  <!-- Order Items -->
  <div class="bold">ORDER ITEMS</div>

  ${order.items
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
    order.coupon && orderSummary.couponDiscount > 0
      ? `<div class="row"><span>Coupon (${order.coupon.code}):</span><span>-${formatCurrencyEnglish(orderSummary.couponDiscount)}</span></div>`
      : ""
  }

  <div class="row"><span>Shipping (${order.shippingMethod.name}):</span><span>${formatCurrencyEnglish(orderSummary.shippingCost)}</span></div>

  <div class="separator"></div>

  <div class="row bold" style="font-size:13px;"><span>TOTAL:</span><span>${formatCurrencyEnglish(orderSummary.total)}</span></div>

  ${
    order.paymentStatus === "pending"
      ? `<div class="row" style="color:#d00;"><span>DUE:</span><span class="bold">${formatCurrencyEnglish(order.totalValue - order.paidAmount)}</span></div>`
      : ""
  }

  <div class="row"><span>Payment:</span><span class="bold">${order.paymentStatus.toUpperCase()}</span></div>

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
    } catch (error) {
      console.error("Error printing:", error);
      // You might want to show a toast notification here
    } finally {
      setIsPrinting(false);
    }
  };

  const generateOrderTimeline = () => {
    // Create a map of all possible statuses
    const allStatuses = [
      OrderStatus.PENDING,
      OrderStatus.PROCESSING,
      OrderStatus.SHIPPED,
      OrderStatus.DELIVERED,
      OrderStatus.CANCELLED,
    ];

    // Get the current order status
    const currentStatus = order.orderStatus.toLowerCase();

    // If order is cancelled, only show statuses up to cancellation
    if (currentStatus === OrderStatus.CANCELLED) {
      return [OrderStatus.PENDING, OrderStatus.CANCELLED];
    }

    // For normal order flow, show all statuses up to the current one
    const statusIndex = allStatuses.findIndex(
      (status) => status === currentStatus
    );
    if (statusIndex >= 0) {
      return allStatuses.slice(0, statusIndex + 1);
    }

    // Fallback to just showing the current status
    return [currentStatus];
  };

  // Get the timestamp for a specific status from statusTracks
  const getStatusTimestamp = (status: string) => {
    const statusTrack = order.statusTracks.find(
      (track) => track.status.toLowerCase() === status.toLowerCase()
    );
    return statusTrack ? statusTrack.createdAt : null;
  };

  // Get the note for a specific status from statusTracks
  const getStatusNote = (status: string) => {
    const statusTrack = order.statusTracks.find(
      (track) => track.status.toLowerCase() === status.toLowerCase()
    );
    return statusTrack ? statusTrack.note : null;
  };

  // Get the user who updated a specific status
  const getStatusUpdatedBy = (status: string) => {
    const statusTrack = order.statusTracks.find(
      (track) => track.status.toLowerCase() === status.toLowerCase()
    );
    return statusTrack ? statusTrack.updatedBy : null;
  };

  // Check if a status is active (current or past)
  const isStatusActive = (status: string) => {
    const currentStatus = order.orderStatus.toLowerCase();
    // If order is cancelled, only pending and cancelled are active
    if (currentStatus === OrderStatus.CANCELLED) {
      return status === OrderStatus.PENDING || status === OrderStatus.CANCELLED;
    }

    // For normal flow, all statuses up to current are active
    const allStatuses = [
      OrderStatus.PENDING,
      OrderStatus.PROCESSING,
      OrderStatus.SHIPPED,
      OrderStatus.DELIVERED,
    ];
    const statusIndex = allStatuses.indexOf(status as OrderStatus);
    const currentIndex = allStatuses.indexOf(currentStatus as OrderStatus);
    return statusIndex <= currentIndex;
  };

  const timelineStatuses = generateOrderTimeline();

  const calculateOrderSummary = () => {
    const itemsSubtotal = order.items.reduce((sum, item) => {
      const itemTotal =
        Number(item.totalPrice) ||
        (Number(item.unitPrice) || 0) * item.quantity;
      return sum + itemTotal;
    }, 0);

    const productDiscountTotal = order.items.reduce((sum, item) => {
      const discountTotal = (item.unitDiscount || 0) * item.quantity;
      console.log(discountTotal);

      return sum + Number(discountTotal);
    }, 0);

    const originalSubtotal = itemsSubtotal + productDiscountTotal;

    const couponDiscount = Number(order.totalDiscount) - productDiscountTotal;

    const shippingCost = Number(order.shippingMethod.cost);

    const total = Number(order.totalValue);

    return {
      originalSubtotal,
      productDiscountTotal,
      couponDiscount,
      itemsSubtotal,
      shippingCost,
      total,
    };
  };

  const orderSummary = calculateOrderSummary();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="sm:hidden"
            >
              <ArrowLeft className="size-4" />
            </Button>
          )}

          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Order Details</h1>
            <p className="text-sm text-muted-foreground">
              Order #{order.orderNo}
            </p>
          </div>
        </div>

        {/* Buttons — ALWAYS IN ONE LINE */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Link href={`/admin/order/${order.id}/edit`}>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Pencil className="size-4 mr-2" />
              Edit
            </Button>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={handleThermalPrint}
            disabled={isPrinting}
            className="whitespace-nowrap"
          >
            {isPrinting ? (
              <>
                <Clock className="size-4 mr-2 animate-spin" />
                Printing...
              </>
            ) : (
              <>
                <Printer className="size-4 mr-2" />
                Print
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
            className="whitespace-nowrap"
          >
            {isGeneratingPDF ? (
              <>
                <Clock className="size-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="size-4 mr-2" />
                Download
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex gap-2">
        <Badge className={getOrderStatusColor(order.orderStatus)}>
          {getStatusIcon(order.orderStatus)}
          {order.orderStatus.charAt(0).toUpperCase() +
            order.orderStatus.slice(1)}
        </Badge>
        <Badge className={getPaymentStatusColor(order.paymentStatus)}>
          {getStatusIcon(order.paymentStatus)}
          {order.paymentStatus.charAt(0).toUpperCase() +
            order.paymentStatus.slice(1)}
        </Badge>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Items and Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="border rounded-lg p-4 bg-background">
            <div className="pb-3">
              <h3 className="text-base font-medium flex items-center">
                <Package className="size-5 mr-2" />
                Order Items
              </h3>
            </div>
            <div>
              <div className="space-y-4">
                {order.items.map((item: OrderItem) => {
                  // Use stored prices from OrderItem
                  const unitPrice =
                    Number(item.unitPrice) ||
                    Number(item.product.sellingPrice) ||
                    0;
                  const totalPrice =
                    Number(item.totalPrice) || unitPrice * item.quantity;
                  const unitDiscount = Number(item.unitDiscount) || 0;

                  return (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-3 rounded-lg border"
                    >
                      <div className="relative size-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={
                            item.product.attachment?.url || "/placeholder.svg"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-1">
                              {item.product.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="text-sm text-muted-foreground">
                                {formatCurrencyEnglish(unitPrice)} ×{" "}
                                {item.quantity} -{" "}
                                {parseInt(String(item.product.weight || 0))}{" "}
                                {item.product.unit?.name?.toLowerCase()}
                              </span>
                              {unitDiscount > 0 && (
                                <Badge variant="secondary" className="text-xs">
                                  -{formatCurrencyEnglish(unitDiscount)} off
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-sm">
                              {formatCurrencyEnglish(totalPrice)}
                            </p>
                            {unitDiscount > 0 && (
                              <p className="text-xs text-muted-foreground line-through">
                                {formatCurrencyEnglish(
                                  (unitPrice + unitDiscount) * item.quantity
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                        {item.product.supplier && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Supplier: {item.product.supplier.name}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="border rounded-lg p-4 bg-background">
            <div className="pb-3">
              <h3 className="text-base font-medium flex items-center">
                <Clock className="size-5 mr-2" />
                Order Timeline
              </h3>
            </div>
            <div>
              {order.statusTracks && order.statusTracks.length > 0 ? (
                <Timeline>
                  {timelineStatuses.map((status, index) => {
                    const isActive = isStatusActive(status);
                    const timestamp = getStatusTimestamp(status);
                    const note = getStatusNote(status);
                    const updatedBy = getStatusUpdatedBy(status);

                    return (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot
                            className={
                              isActive
                                ? getStatusDotColor(status)
                                : "bg-gray-300"
                            }
                          />
                          {index < timelineStatuses.length - 1 && (
                            <TimelineConnector
                              className={isActive ? "" : "bg-gray-300"}
                            />
                          )}
                        </TimelineSeparator>
                        <TimelineContent>
                          <div className="ml-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {isActive && getStatusIcon(status)}
                                <h4
                                  className={`text-sm font-medium ${!isActive ? "text-gray-400" : ""}`}
                                >
                                  {status.charAt(0).toUpperCase() +
                                    status.slice(1)}
                                </h4>
                              </div>
                              {timestamp ? (
                                <span className="text-xs text-muted-foreground">
                                  {formatDateTime(timestamp)}
                                </span>
                              ) : (
                                isActive && (
                                  <Badge variant="outline" className="text-xs">
                                    {status === order.orderStatus
                                      ? "Current"
                                      : ""}
                                  </Badge>
                                )
                              )}
                            </div>
                            {note && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {note}
                              </p>
                            )}
                            {updatedBy ? (
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <User className="h-3 w-3 mr-1" />
                                Updated by: {updatedBy.name || "User"}
                              </div>
                            ) : (
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <User className="h-3 w-3 mr-1" />
                                Created by: {order.user.name || "User"}
                              </div>
                            )}
                          </div>
                        </TimelineContent>
                      </TimelineItem>
                    );
                  })}
                </Timeline>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No status updates available.
                </p>
              )}
            </div>
          </div>

          {order.payments && (
            <div className="border rounded-lg p-4 bg-background">
              <div className="pb-3">
                <h3 className="text-base font-medium flex items-center">
                  <CreditCard className="size-5 mr-2" />
                  Payment History
                </h3>
              </div>
              <div>
                <PaymentsTable payments={order.payments} />
              </div>
            </div>
          )}
        </div>

        {/* Customer and Order Summary */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="border rounded-lg p-4 bg-background">
            <div className="pb-3">
              <h3 className="text-base font-medium flex items-center">
                <User className="size-5 mr-2" />
                Customer Information
              </h3>
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="size-10">
                  <AvatarImage
                    src={order.user.profilePhoto?.url || "/placeholder.svg"}
                    alt={order.user.name}
                  />
                  <AvatarFallback>{order.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium">{order.user.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {order.user.email}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span className="text-sm">{order.user.mobileNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border rounded-lg p-4 bg-background">
            <div className="pb-3">
              <h3 className="text-base font-medium flex items-center">
                <MapPin className="size-5 mr-2 text-muted-foreground" />
                Shipping Address
              </h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-sm text-muted-foreground">
                  Name: {order.user.name}
                </p>
              </div>
              <div>
                <p className="font-medium text-sm text-muted-foreground">
                  Address: {order.address.address}
                </p>
              </div>
              <div>
                <p className="font-medium text-sm text-muted-foreground">
                  Area / City: {order.address.area}, {order.address.city}
                </p>
              </div>
              <div>
                <p className="font-medium text-sm text-muted-foreground">
                  Division: {order.address.division}
                </p>
              </div>
              <div>
                <p className="font-medium text-sm text-muted-foreground">
                  Phone: {order.user.mobileNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-4 bg-background">
            <div className="pb-3">
              <h3 className="text-base font-medium flex items-center">
                <FileText className="size-5 mr-2" />
                Order Summary
              </h3>
            </div>
            <div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-sm">
                    {formatCurrencyEnglish(orderSummary.originalSubtotal)}
                  </span>
                </div>
                {orderSummary.productDiscountTotal > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center">
                      Product Discounts
                    </span>
                    <span className="text-sm text-green-600">
                      -
                      {formatCurrencyEnglish(orderSummary.productDiscountTotal)}
                    </span>
                  </div>
                )}
                {order.coupon && orderSummary.couponDiscount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center">
                      Coupon Discount ({order.coupon.code})
                    </span>
                    <span className="text-sm text-green-600">
                      -{formatCurrencyEnglish(orderSummary.couponDiscount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Shipping
                  </span>
                  <span className="text-sm">
                    {formatCurrencyEnglish(orderSummary.shippingCost)}
                  </span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-base">
                  <span>Total</span>
                  <span>{formatCurrencyEnglish(orderSummary.total)}</span>
                </div>
                {order.paymentStatus === "pending" && (
                  <div className="flex justify-between text-red-600 text-sm">
                    <span>Due Amount</span>
                    <span>
                      {formatCurrencyEnglish(
                        order.totalValue - order.paidAmount
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
