import { formatDateTime } from "@/lib/utils";
import { GermanbutcherLogo } from "@/public/images";
import type { Order, OrderItem } from "@/utils/types";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const formatCurrency = (amount: number): string => {
  return `BDT ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 36,
    fontSize: 10,
    lineHeight: 1.3,
    color: "#333333",
    position: "relative",
    minHeight: "100%",
  },
  // Header Section
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#8B0000",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 12,
    objectFit: "contain",
  },
  companyInfo: {
    flexDirection: "column",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8B0000",
    marginBottom: 2,
  },
  companyTagline: {
    fontSize: 8,
    color: "#666666",
    fontStyle: "italic",
  },
  invoiceHeader: {
    alignItems: "flex-end",
  },
  invoiceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8B0000",
    marginBottom: 5,
  },
  orderDetails: {
    alignItems: "flex-end",
    paddingTop: 8,
    paddingBottom: 8,
  },
  orderNumber: {
    fontSize: 11,
    color: "#333333",
    fontWeight: "bold",
    marginBottom: 2,
    paddingTop: 4,
    paddingBottom: 4,
  },
  orderDate: {
    fontSize: 9,
    color: "#666666",
  },
  // Info Grid
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 15,
  },
  infoCard: {
    flex: 1,
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 4,
    borderLeftWidth: 1,
    borderLeftColor: "#8B0000",
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#8B0000",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 3,
    flexWrap: "wrap",
  },
  label: {
    fontSize: 8,
    color: "#666666",
    width: 70,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 9,
    color: "#333333",
    flex: 1,
    fontWeight: "500",
    flexWrap: "wrap",
  },
  // Order Status Section
  statusSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f8fafc",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    flexWrap: "wrap",
  },
  statusItem: {
    alignItems: "center",
    minWidth: "20%",
  },
  statusLabel: {
    fontSize: 8,
    color: "#64748b",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  statusValue: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1e293b",
  },
  // Table Section
  tableSection: {
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8B0000",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  table: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#8B0000",
    padding: 8,
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#ffffff",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    minHeight: 40,
  },
  tableRowAlt: {
    backgroundColor: "#f9fafb",
  },
  tableCell: {
    fontSize: 8,
    color: "#374151",
    flexWrap: "wrap",
  },
  productCell: {
    flex: 4,
    paddingRight: 8,
  },
  quantityCell: {
    flex: 1,
    textAlign: "center",
  },
  priceCell: {
    flex: 1.5,
    textAlign: "right",
  },
  totalCell: {
    flex: 1.5,
    textAlign: "right",
  },
  productName: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
    flexWrap: "wrap",
  },
  productSku: {
    fontSize: 7,
    color: "#6b7280",
    marginBottom: 2,
    flexWrap: "wrap",
  },
  discountBadge: {
    backgroundColor: "#dcfce7",
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  discountText: {
    fontSize: 6,
    color: "#16a34a",
    fontWeight: "bold",
  },
  // Summary Section
  summaryContainer: {
    alignSelf: "flex-end",
    width: "50%",
    marginTop: 15,
  },
  summaryCard: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    flexWrap: "wrap",
  },
  summaryLabel: {
    fontSize: 9,
    color: "#64748b",
    flex: 1,
  },
  summaryValue: {
    fontSize: 9,
    color: "#1e293b",
    fontWeight: "500",
    textAlign: "right",
  },
  discountValue: {
    color: "#059669",
    fontWeight: "bold",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#cbd5e1",
    marginVertical: 8,
  },
  summaryTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginTop: 5,
    backgroundColor: "#8B0000",
    borderRadius: 4,
  },
  totalLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#ffffff",
  },
  totalValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },
  dueAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 4,
    backgroundColor: "#fef2f2",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  dueLabel: {
    fontSize: 9,
    color: "#dc2626",
    fontWeight: "bold",
  },
  dueValue: {
    fontSize: 10,
    color: "#dc2626",
    fontWeight: "bold",
  },
  // Footer Section
  footerContainer: {
    position: "absolute",
    bottom: 36,
    left: 36,
    right: 36,
  },
  footerDivider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  footerLeft: {
    flex: 1,
  },
  thankYou: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#8B0000",
    marginBottom: 2,
  },
  contact: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 1,
    flexWrap: "wrap",
  },
  footerRight: {
    alignItems: "flex-end",
  },
  printDate: {
    fontSize: 7,
    color: "#9ca3af",
  },
  signature: {
    marginTop: 5,
    fontSize: 8,
    color: "#6b7280",
  },

  wordWrap: {
    wordWrap: "break-word",
    overflow: "hidden",
  },
  noBreak: {
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  image: {
    width: 45,
    height: 45,
    marginRight: 12,
  },
});

interface OrderPDFProps {
  order: Order;
}

export const OrderPDFDocument = ({ order }: OrderPDFProps) => {
  const calculateDiscountedPrice = (
    price: number,
    discountType: string | null | undefined,
    discountValue: string | number | null | undefined
  ): number => {
    if (!discountType || !discountValue) return price;

    const discount =
      typeof discountValue === "string"
        ? Number.parseFloat(discountValue)
        : discountValue;

    if (discountType === "percentage") {
      return price - price * (discount / 100);
    }
    return price - discount;
  };

  const calculateOrderSummary = () => {
    let originalSubtotal = 0;
    let productDiscountTotal = 0;

    order.items.forEach((item) => {
      const originalItemPrice = item.product.sellingPrice * item.quantity;
      originalSubtotal += originalItemPrice;

      if (item.product.discountValue && item.product.discountValue > 0) {
        let discountAmount = 0;
        if (item.product.discountType === "percentage") {
          discountAmount =
            originalItemPrice * (Number(item.product.discountValue) / 100);
        } else if (item.product.discountType === "fixed") {
          discountAmount = Number(item.product.discountValue) * item.quantity;
        }
        productDiscountTotal += discountAmount;
      }
    });

    const couponDiscount = order.coupon
      ? Number(order.totalDiscount || 0) - productDiscountTotal
      : 0;

    return {
      originalSubtotal,
      productDiscountTotal,
      couponDiscount,
      shippingCost: Number(order.shippingMethod?.cost || 0),
      total: Number(order.totalValue || 0),
      dueAmount: Math.max(
        0,
        Number(order.totalValue || 0) - Number(order.paidAmount || 0)
      ),
    };
  };

  const getStatusColor = (status: string | undefined): string => {
    if (!status) return "#4b5563"; // Darker gray for better print visibility

    const colors: Record<string, string> = {
      pending: "#b45309", // Darker amber - better print contrast
      processing: "#1d4ed8", // Darker blue - maintains visibility when printed
      shipped: "#7c3aed", // Darker purple - improved print readability
      delivered: "#059669", // Darker green - excellent print contrast
      cancelled: "#dc2626", // Darker red - maintains urgency in print
      paid: "#059669", // Darker green - consistent with delivered
      unpaid: "#dc2626", // Darker red - clear indication in print
    };

    return colors[status.toLowerCase()] || "#4b5563";
  };

  const orderSummary = calculateOrderSummary();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Image style={styles.logo} src={GermanbutcherLogo.src} />
          </View>
          <View style={styles.invoiceHeader}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <View style={styles.orderDetails}>
              <Text style={styles.orderNumber}>Order #{order.orderNo}</Text>
              <Text style={styles.orderDate}>
                {formatDateTime(order.createdAt)}
              </Text>
            </View>
          </View>
        </View>

        {/* Customer & Shipping Info Cards */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Customer Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{order.user?.name || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{order.user?.email || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>
                {order.user?.mobileNumber || "N/A"}
              </Text>
            </View>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Shipping Address</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>
                {order.address?.address || "N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Area/City:</Text>
              <Text style={styles.value}>
                {order.address?.area || "N/A"}, {order.address?.city || "N/A"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Division:</Text>
              <Text style={styles.value}>
                {order.address?.division || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Status Overview */}
        <View style={styles.statusSection}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Order Status</Text>
            <Text
              style={[
                styles.statusValue,
                { color: getStatusColor(order.orderStatus) },
              ]}
            >
              {(order.orderStatus || "PENDING").toUpperCase()}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Payment Status</Text>
            <Text
              style={[
                styles.statusValue,
                { color: getStatusColor(order.paymentStatus) },
              ]}
            >
              {(order.paymentStatus || "UNPAID").toUpperCase()}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Payment Method</Text>
            <Text style={styles.statusValue}>
              {order.paymentMethod?.name || "N/A"}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Total Items</Text>
            <Text style={styles.statusValue}>
              {order.items?.reduce(
                (sum, item) => sum + (item.quantity || 0),
                0
              ) || 0}
            </Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.tableSection}>
          <Text style={styles.tableTitle}>Order Items</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.productCell]}>
                Product Details
              </Text>
              <Text style={[styles.tableHeaderText, styles.quantityCell]}>
                Qty
              </Text>
              <Text style={[styles.tableHeaderText, styles.priceCell]}>
                Unit Price
              </Text>
              <Text style={[styles.tableHeaderText, styles.totalCell]}>
                Total
              </Text>
            </View>
            {order.items?.map((item: OrderItem, index: number) => {
              const discountedPrice = calculateDiscountedPrice(
                item.product?.sellingPrice || 0,
                item.product?.discountType,
                item.product?.discountValue
              );
              const totalPrice = discountedPrice * (item.quantity || 0);
              const hasDiscount =
                item.product?.discountValue && item.product.discountValue > 0;

              return (
                <View key={item.id || index} style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.productCell]}>
                    <Text style={styles.productName}>
                      {item.product?.name || "N/A"}
                    </Text>
                    <Text style={styles.productSku}>
                      SKU: {item.product?.productSku || "N/A"}
                    </Text>
                  </View>
                  <Text style={[styles.tableCell, styles.quantityCell]}>
                    {item.quantity || 0}
                  </Text>
                  <Text style={[styles.tableCell, styles.priceCell]}>
                    {hasDiscount && (
                      <Text
                        style={{
                          fontSize: 7,
                          color: "#9ca3af",
                          textDecoration: "line-through",
                        }}
                      >
                        {formatCurrency(item.product?.sellingPrice || 0)}
                        {"\n"}
                      </Text>
                    )}
                    {formatCurrency(discountedPrice)}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      styles.totalCell,
                      { fontWeight: "bold" },
                    ]}
                  >
                    {formatCurrency(totalPrice)}
                  </Text>
                </View>
              );
            }) || []}
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(orderSummary.originalSubtotal)}
              </Text>
            </View>
            {orderSummary.productDiscountTotal > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Product Discounts:</Text>
                <Text style={[styles.summaryValue, styles.discountValue]}>
                  -{formatCurrency(orderSummary.productDiscountTotal)}
                </Text>
              </View>
            )}
            {order.coupon && orderSummary.couponDiscount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>
                  Coupon ({order.coupon.code}):
                </Text>
                <Text style={[styles.summaryValue, styles.discountValue]}>
                  -{formatCurrency(orderSummary.couponDiscount)}
                </Text>
              </View>
            )}
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Shipping ({order.shippingMethod?.name || "Standard"}):
              </Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(orderSummary.shippingCost)}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
          </View>
          <View style={styles.summaryTotal}>
            <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(orderSummary.total)}
            </Text>
          </View>
          {orderSummary.dueAmount > 0 && (
            <View style={styles.dueAmount}>
              <Text style={styles.dueLabel}>AMOUNT DUE</Text>
              <Text style={styles.dueValue}>
                {formatCurrency(orderSummary.dueAmount)}
              </Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <View style={styles.footerDivider} />
          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              <Text style={styles.thankYou}>
                Thank you for choosing German Butcher
              </Text>
              <Text style={styles.contact}>
                Email: support@germanbutcherbd.com
              </Text>
              <Text style={styles.contact}>Phone: +8809666791991</Text>
              <Text style={styles.contact}>Web: www.germanbutcherbd.com</Text>
            </View>
            <View style={styles.footerRight}>
              <Text style={styles.printDate}>
                Generated: {new Date().toLocaleDateString()}{" "}
                {new Date().toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
