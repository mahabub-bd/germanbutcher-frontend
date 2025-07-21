"use client";

import { formatCurrencyEnglish, formatDateTime } from "@/lib/utils";
import type { Order } from "@/utils/types";

interface PrintOrderProps {
  order: Order;
}

export function PrintOrder({ order }: PrintOrderProps) {
  const calculateSubtotal = () => {
    return order.items.reduce((total, item) => {
      return total + item.product.sellingPrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = Number(order.shippingMethod?.cost || 0);
  const total = order.totalValue;
  const paidAmount = order.paidAmount || 0;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-600";
      case "processing":
        return "text-blue-600";
      case "shipped":
        return "text-purple-600";
      case "delivered":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="print-container">
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            font-family: Arial, sans-serif;
          }
          .print-container {
            max-width: 100%;
            margin: 0;
            padding: 10mm;
            font-size: 10px;
            line-height: 1.3;
          }
          .no-print {
            display: none !important;
          }
          .page-break {
            page-break-before: always;
          }
          .avoid-break {
            page-break-inside: avoid;
          }
          .print-header {
            margin-bottom: 15px;
          }
          .print-section {
            margin-bottom: 12px;
          }
          .print-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
          }
          .print-table th,
          .print-table td {
            border: 1px solid #ddd;
            padding: 4px;
            text-align: left;
            font-size: 9px;
          }
          .print-table th {
            background-color: #f5f5f5;
            font-weight: bold;
          }
          .print-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          .print-flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .print-right {
            text-align: right;
          }
          .print-bold {
            font-weight: bold;
          }
          .print-small {
            font-size: 8px;
            color: #666;
          }
        }

        @media screen {
          .print-container {
            max-width: 210mm;
            margin: 20px auto;
            padding: 20mm;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            font-size: 11px;
          }
          .print-header {
            margin-bottom: 20px;
          }
          .print-section {
            margin-bottom: 16px;
          }
          .print-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12px;
          }
          .print-table th,
          .print-table td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: left;
            font-size: 10px;
          }
          .print-table th {
            background-color: #f5f5f5;
            font-weight: bold;
          }
          .print-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .print-flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .print-right {
            text-align: right;
          }
          .print-bold {
            font-weight: bold;
          }
          .print-small {
            font-size: 9px;
            color: #666;
          }
        }
      `}</style>

      {/* Header */}
      <div className="print-header">
        <div className="print-flex">
          <div>
            <h1
              className="print-bold"
              style={{ fontSize: "16px", margin: "0 0 4px 0" }}
            >
              German Butcher
            </h1>
            <p className="print-small" style={{ margin: 0 }}>
              Order Invoice
            </p>
          </div>
          <div className="print-right">
            <div className="print-bold">Order #{order.orderNo}</div>
            <div className="print-small">{formatDateTime(order.createdAt)}</div>
            <div className={`print-bold ${getStatusColor(order.orderStatus)}`}>
              {order.orderStatus.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Customer & Shipping Info */}
      <div className="print-grid print-section">
        <div>
          <h3
            className="print-bold"
            style={{ margin: "0 0 6px 0", fontSize: "12px" }}
          >
            Customer Information
          </h3>
          <div>{order.user.name}</div>
          <div className="print-small">{order.user.email}</div>
          <div className="print-small">{order.user.mobileNumber}</div>
        </div>
        <div>
          <h3
            className="print-bold"
            style={{ margin: "0 0 6px 0", fontSize: "12px" }}
          >
            Shipping Address
          </h3>
          <div>{order.address.address}</div>
          <div>
            {order.address.area}, {order.address.city}
          </div>
          <div>{order.address.division}</div>
        </div>
      </div>

      {/* Order Items */}
      <div className="print-section avoid-break">
        <h3
          className="print-bold"
          style={{ margin: "0 0 8px 0", fontSize: "12px" }}
        >
          Order Items
        </h3>
        <table className="print-table">
          <thead>
            <tr>
              <th style={{ width: "40%" }}>Product</th>
              <th style={{ width: "15%", textAlign: "center" }}>Qty</th>
              <th style={{ width: "20%", textAlign: "right" }}>Price</th>
              <th style={{ width: "25%", textAlign: "right" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="print-bold">{item.product.name}</div>
                  <div className="print-small">
                    SKU: {item.product.productSku}
                  </div>
                </td>
                <td style={{ textAlign: "center" }}>{item.quantity}</td>
                <td style={{ textAlign: "right" }}>
                  {formatCurrencyEnglish(item.product.sellingPrice)}
                </td>
                <td style={{ textAlign: "right" }} className="print-bold">
                  {formatCurrencyEnglish(
                    item.product.sellingPrice * item.quantity
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Summary */}
      <div className="print-section avoid-break">
        <div style={{ marginLeft: "auto", width: "250px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td style={{ padding: "3px 0", borderBottom: "1px solid #eee" }}>
                Subtotal:
              </td>
              <td
                style={{
                  padding: "3px 0",
                  textAlign: "right",
                  borderBottom: "1px solid #eee",
                }}
              >
                {formatCurrencyEnglish(subtotal)}
              </td>
            </tr>
            {order.totalDiscount > 0 && (
              <tr>
                <td
                  style={{
                    padding: "3px 0",
                    borderBottom: "1px solid #eee",
                    color: "#dc2626",
                  }}
                >
                  Discount:
                </td>
                <td
                  style={{
                    padding: "3px 0",
                    textAlign: "right",
                    borderBottom: "1px solid #eee",
                    color: "#dc2626",
                  }}
                >
                  -{formatCurrencyEnglish(order.totalDiscount)}
                </td>
              </tr>
            )}
            <tr>
              <td style={{ padding: "3px 0", borderBottom: "1px solid #eee" }}>
                Shipping ({order.shippingMethod?.name}):
              </td>
              <td
                style={{
                  padding: "3px 0",
                  textAlign: "right",
                  borderBottom: "1px solid #eee",
                }}
              >
                {formatCurrencyEnglish(shippingCost)}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: "6px 0",
                  fontWeight: "bold",
                  borderTop: "2px solid #333",
                }}
              >
                Total:
              </td>
              <td
                style={{
                  padding: "6px 0",
                  textAlign: "right",
                  fontWeight: "bold",
                  borderTop: "2px solid #333",
                }}
              >
                {formatCurrencyEnglish(total)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "3px 0", borderBottom: "1px solid #eee" }}>
                Paid Amount:
              </td>
              <td
                style={{
                  padding: "3px 0",
                  textAlign: "right",
                  borderBottom: "1px solid #eee",
                }}
              >
                {formatCurrencyEnglish(paidAmount)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: "3px 0" }}>Due Amount:</td>
              <td
                style={{
                  padding: "3px 0",
                  textAlign: "right",
                  color: paidAmount >= total ? "#16a34a" : "#dc2626",
                  fontWeight: "bold",
                }}
              >
                {formatCurrencyEnglish(Math.max(0, total - paidAmount))}
              </td>
            </tr>
          </table>
        </div>
      </div>

      {/* Payment Information */}
      <div className="print-grid print-section">
        <div>
          <h3
            className="print-bold"
            style={{ margin: "0 0 6px 0", fontSize: "12px" }}
          >
            Payment Details
          </h3>
          <div>Method: {order.paymentMethod?.name || "N/A"}</div>
          <div>
            Status:{" "}
            <span className={getStatusColor(order.paymentStatus)}>
              {order.paymentStatus}
            </span>
          </div>
        </div>
        <div>
          <h3
            className="print-bold"
            style={{ margin: "0 0 6px 0", fontSize: "12px" }}
          >
            Order Summary
          </h3>
          <div>
            Items: {order.items.length} product
            {order.items.length !== 1 ? "s" : ""}
          </div>
          <div>
            Total Quantity:{" "}
            {order.items.reduce((sum, item) => sum + item.quantity, 0)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="print-section"
        style={{
          marginTop: "20px",
          paddingTop: "10px",
          borderTop: "1px solid #ddd",
        }}
      >
        <div className="print-flex">
          <div className="print-small">
            Printed on: {new Date().toLocaleDateString()} at{" "}
            {new Date().toLocaleTimeString()}
          </div>
          <div className="print-small">
            German Butcher - Premium Quality Meats
          </div>
        </div>
      </div>

      {/* Print Button (hidden when printing) */}
      <div
        className="no-print"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        <button
          onClick={() => window.print()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Print Order
        </button>
      </div>
    </div>
  );
}
