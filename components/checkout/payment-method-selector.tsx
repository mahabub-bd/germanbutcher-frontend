"use client";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { cashOnDelivery, SSLcomarz } from "@/public/images";
import { PaymentMethod } from "@/utils/types";
import { CreditCard } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  selectedMethod: string;
  onSelectMethod: (methodCode: string) => void;
}

type PaymentMethodImages = {
  [key: string]: StaticImageData;
};

const PAYMENT_METHOD_IMAGES: PaymentMethodImages = {
  SSLCOMMERZ: SSLcomarz,
  "Cash on Delivery": cashOnDelivery,
};

export function PaymentMethodSelector({
  paymentMethods,
  selectedMethod,
  onSelectMethod,
}: PaymentMethodSelectorProps) {
  return (
    <div className="bg-white rounded-lg border p-4 md:p-6 space-y-4">
      <div className="flex items-center gap-2 border-b pb-3">
        <CreditCard className="h-5 w-5 text-primary" />
        <div>
          <h2 className="text-lg font-semibold">Payment Method</h2>
          <p className="text-sm text-muted-foreground">
            How would you like to pay?
          </p>
        </div>
      </div>

      <RadioGroup
        value={selectedMethod}
        onValueChange={onSelectMethod}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4"
      >
        {paymentMethods.map((method) => {
          const imageSrc = PAYMENT_METHOD_IMAGES[method.name];

          return (
            <div
              key={method.id}
              className={cn(
                "flex items-center justify-between rounded-lg border p-4",
                selectedMethod === method.code && "border-primary bg-primary/1"
              )}
            >
              <div className="flex items-center space-x-4">
                <RadioGroupItem
                  value={method.code}
                  id={`payment-${method.id}`}
                />
                <Label
                  htmlFor={`payment-${method.id}`}
                  className="flex flex-col cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        width={1600}
                        height={800}
                        className="w-40 h-auto"
                        alt={method.name}
                      />
                    ) : (
                      <span className="font-medium">{method.name}</span>
                    )}
                  </div>
                </Label>
              </div>
              {!method.isActive && (
                <Badge variant="outline" className="bg-yellow-50 text-xs">
                  Inactive
                </Badge>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
