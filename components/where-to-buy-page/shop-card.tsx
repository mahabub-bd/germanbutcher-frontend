import { Shop } from "@/utils/types";
import { Building2, MapPin } from "lucide-react";
import Image from "next/image";

interface ShopCardProps {
  shop: Shop;
  logoUrl?: string;
}

export function ShopCard({ shop, logoUrl }: ShopCardProps) {
  return (
    <div className="group relative overflow-hidden">
      {/* Modern Card with Border */}
      <div className="relative bg-white/90 backdrop-blur-sm rounded-md p-4 border-2  transition-all duration-300 ">
        {/* Shop Header */}
        <div className="relative z-10 flex flex-col items-center mb-4">
          {/* Logo Container */}
          {logoUrl && (
            <div className="relative mb-3">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3  transition-all duration-300">
                <Image
                  src={logoUrl}
                  alt={`${shop.shopName} logo`}
                  width={800}
                  height={800}
                  className="size-24 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}

          {/* Shop Name */}
          <h4 className="font-bold text-gray-900 text-lg mb-2 text-center group-hover:text-primaryColor transition-colors duration-300">
            {shop.shopName}
          </h4>
        </div>

        {/* Shop Details */}
        <div className="relative z-10 space-y-3">
          {/* Location Info */}
          <div className="grid grid-cols-2 gap-2">
            {/* Division */}
            <div className="bg-gradient-to-r from-primaryColor/10 to-primaryColor/5 rounded-lg p-2 ">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 text-primaryColor mr-2 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-medium text-gray-600">
                    Division:{" "}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {shop.division}
                  </span>
                </div>
              </div>
            </div>

            {/* District */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 rounded-lg p-2 ">
              <div className="flex items-center">
                <Building2 className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-medium text-gray-600">
                    District:{" "}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {shop.district}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/5 rounded-lg p-3  h-32">
            <div className="flex items-center justify-center h-full">
              <div className="min-w-0 flex-1">
                <span className="text-sm text-gray-800 leading-relaxed">
                  {shop.address}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Info */}
        </div>
      </div>
    </div>
  );
}
