"use client";

import {
  CancelOrderModal,
  canCancelOrder,
} from "@/components/admin/orders/cancel-order-modal";
import { Button } from "@/components/ui/button";
import type { Order } from "@/utils/types";
import {
  ArrowLeft,
  Clock,
  Download,
  FileEdit,
  Printer,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface OrderActionsProps {
  order: Order;
  onGeneratePDF: () => Promise<void>;
  onThermalPrint: () => void;
  onBack?: () => void;
  onCancelSuccess?: () => void;
}

export function OrderActions({
  order,
  onGeneratePDF,
  onThermalPrint,
  onBack,
  onCancelSuccess,
}: OrderActionsProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const canCancel = canCancelOrder(order);

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await onGeneratePDF();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleThermalPrint = () => {
    setIsPrinting(true);
    try {
      onThermalPrint();
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <div className="w-full border rounded-lg bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 flex-wrap">

          {onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="size-5" />
            </Button>
          )}

          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl font-bold whitespace-nowrap">
              Order #{order.orderNo}
            </h1>


          </div>
        </div>

        {/* RIGHT SECTION - ALL ACTIONS IN ONE LINE */}
        <div className="flex items-center gap-2 flex-wrap justify-end">

          {/* Cancel */}
          {canCancel ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowCancelModal(true)}
              className="gap-2"
            >
              <X className="size-4" />
              Cancel
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="gap-2 opacity-50"
            >
              <X className="size-4" />
              {order.orderStatus}
            </Button>
          )}

          {/* Edit */}
          <Link href={`/admin/order/${order.id}/edit`}>
            <Button size="sm" className="gap-2">
              <FileEdit className="size-4" />
              Edit
            </Button>
          </Link>

          {/* Print */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleThermalPrint}
            disabled={isPrinting}
            className="gap-2"
          >
            {isPrinting ? (
              <>
                <Clock className="size-4 animate-spin" />
                Printing...
              </>
            ) : (
              <>
                <Printer className="size-4" />
                Print
              </>
            )}
          </Button>

          {/* PDF */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
            className="gap-2"
          >
            {isGeneratingPDF ? (
              <>
                <Clock className="size-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="size-4" />
                PDF
              </>
            )}
          </Button>
        </div>
      </div>

      <CancelOrderModal
        order={order}
        open={showCancelModal}
        onOpenChange={setShowCancelModal}
        onCancelSuccess={() => {
          onCancelSuccess?.();
          setShowCancelModal(false);
        }}
      />
    </div>
  );

}
