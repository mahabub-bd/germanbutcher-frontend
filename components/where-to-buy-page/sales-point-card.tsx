import { SalesPoint, Shop } from "@/utils/types";
import { Store } from "lucide-react";
import { ShopCard } from "./shop-card";

interface SalesPointCardProps {
  salesPoint: SalesPoint;
}

export function SalesPointCard({ salesPoint }: SalesPointCardProps) {
  return (
    <div className="rounded-md   overflow-hidden  transition-shadow duration-300">
      {/* Shops/Branches */}
      {salesPoint.shops && salesPoint.shops.length > 0 && (
        <div className="p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-primaryColor mb-6 flex items-center">
              {salesPoint.name}
            </h1>
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Store className="w-5 h-5 mr-2 text-primaryColor" />
              Branches ({salesPoint.shops.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {salesPoint.shops.map((shop: Shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                logoUrl={salesPoint.logoAttachment?.url}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
