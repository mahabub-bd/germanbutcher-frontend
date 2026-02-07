"use client";

import { Button } from "@/components/ui/button";
import type { Order } from "@/utils/types";
import { ArrowLeft, Clock, Download, Pencil, Printer } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface OrderActionsProps {
  order: Order;
  onGeneratePDF: () => Promise<void>;
  onThermalPrint: () => void;
  onBack?: () => void;
}

export function OrderActions({
  order,
  onGeneratePDF,
  onThermalPrint,
  onBack,
}: OrderActionsProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="sm:hidden hover:bg-primary/10"
          >
            <ArrowLeft className="size-4" />
          </Button>
        )}

        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Order Details</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
            Order #{order.orderNo}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Link href={`/admin/order/${order.id}/edit`} className="group">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs hover:bg-primary hover:text-primary-foreground"
          >
            <Pencil className="size-3.5 mr-1.5" />
            Edit
          </Button>
        </Link>

        <Button
          variant="outline"
          size="sm"
          onClick={handleThermalPrint}
          disabled={isPrinting}
          className="h-8 text-xs hover:bg-primary hover:text-primary-foreground"
        >
          {isPrinting ? (
            <>
              <Clock className="size-3.5 mr-1.5 animate-spin" />
              Printing...
            </>
          ) : (
            <>
              <Printer className="size-3.5 mr-1.5" />
              Print
            </>
          )}
        </Button>

        <Button
          variant="default"
          size="sm"
          onClick={handleGeneratePDF}
          disabled={isGeneratingPDF}
          className="h-8 text-xs"
        >
          {isGeneratingPDF ? (
            <>
              <Clock className="size-3.5 mr-1.5 animate-spin" />
              PDF...
            </>
          ) : (
            <>
              <Download className="size-3.5 mr-1.5" />
              PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
