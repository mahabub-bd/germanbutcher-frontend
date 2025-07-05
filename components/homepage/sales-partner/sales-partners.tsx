import { fetchData } from "@/utils/api-utils";
import { SalesPartner } from "@/utils/types";
import Image from "next/image";
import type React from "react";

interface SalesPartnersProps {
  children?: React.ReactNode;
  className?: string;
}

async function getSalesPartners(): Promise<SalesPartner[]> {
  try {
    const response = await fetchData("sales-partners");
    if (Array.isArray(response)) {
      return response as SalesPartner[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching sales partners:", error);
    return [];
  }
}

export async function SalesPartnersCompact({
  children,
  className = "",
}: SalesPartnersProps) {
  const salesPartners = await getSalesPartners();

  if (salesPartners.length === 0) {
    return (
      <div className={`w-full py-6 md:py-8 ${className}`}>
        {children}
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500">
            <p>No sales partners available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full py-6 md:py-8 ${className}`}>
      {children}
      <div className="container mx-auto px-4">
        {/* Compact Horizontal Layout */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {salesPartners.map((partner, index) => (
            <div
              key={partner.Id}
              className="group flex items-center justify-center 
                         w-24 h-16 sm:w-32 sm:h-20 md:w-40 md:h-24 lg:w-48 lg:h-28
                         bg-white rounded-lg shadow-sm border border-primaryColor/20
                         hover:shadow-md hover:border-gray-200 
                         transition-all duration-300 hover:scale-105 p-3 sm:p-4"
            >
              <div className="relative w-full h-full">
                <Image
                  src={partner.Image?.url || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  fill
                  className="object-contain transition-all duration-300 
                           group-hover:scale-110 "
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                  loading={index < 8 ? "eager" : "lazy"}
                  priority={index < 8}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
