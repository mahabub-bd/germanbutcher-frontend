"use client";

import { Button } from "@/components/ui/button";
import { fetchProtectedData } from "@/utils/api-utils";
import { Order } from "@/utils/types";
import { CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";

interface PayNowProps {
  order: Order;
  className?: string;
}

export default function PayNow({ order, className }: PayNowProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(order);

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetchProtectedData("payment/init");

      console.log(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Payment failed";
      setError(errorMessage);
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handlePayment}
        disabled={isProcessing}
        className={className || "w-full"}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay Now
          </>
        )}
      </Button>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
          {error}
        </div>
      )}
    </div>
  );
}
