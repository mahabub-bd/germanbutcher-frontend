"use client";

import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";

const logos = [
  "/clients/c1.png",
  "/clients/c2.png",
  "/clients/c3.png",
  "/clients/c4.png",
  "/clients/c5.png",
  "/clients/c6.png",
  "/clients/c7.png",
  "/clients/c8.png",
  "/clients/c9.png",
  "/clients/c10.png",
];
const firstRowLogos = logos.slice(0, 5) 
const secondRowLogos = logos.slice(5, 10) 
interface ClientMarqueeProps {
  children?: React.ReactNode
}

export default function Client({ children }: ClientMarqueeProps) {
  return (
    <div className="w-full py-8 md:py-12">
      {children}
      <div className="container mx-auto">
        {/* First marquee - left to right */}
        <Marquee pauseOnHover className="[--duration:40s] mb-4 md:mb-6">
          {firstRowLogos.map((logo, i) => (
            <div
              key={`top-${i}`}
              className="flex h-12 w-20 items-center justify-center sm:h-16 sm:w-28 md:h-20 md:w-32 lg:h-24 lg:w-36"
            >
              <Image
                src={logo || "/placeholder.svg"}
                alt={`Client logo ${i + 1}`}
                width={144}
                height={96}
                className="h-full w-full object-contain  transition-opacity duration-300 hover:opacity-100 dark:brightness-0 dark:invert"
              />
            </div>
          ))}
        </Marquee>

        {/* Second marquee - right to left */}
        <Marquee reverse pauseOnHover className="[--duration:40s]">
          {secondRowLogos.map((logo, i) => (
            <div
              key={`bottom-${i}`}
              className="flex h-12 w-20 items-center justify-center sm:h-16 sm:w-28 md:h-20 md:w-32 lg:h-24 lg:w-36"
            >
              <Image
                src={logo || "/placeholder.svg"}
                alt={`Client logo ${i + 1}`}
                width={144}
                height={96}
                className="h-full w-full object-contain  transition-opacity duration-300 hover:opacity-100 dark:brightness-0 dark:invert"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}


