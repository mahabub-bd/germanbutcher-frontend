import { getUser } from "@/actions/auth";
import { SearchModal } from "@/components/homepage/search/search-modal";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/providers/cart-provider";
import { SearchProvider } from "@/providers/search-provider";
import { fetchProtectedData } from "@/utils/api-utils";
import type { Cart } from "@/utils/types";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import localFont from "next/font/local";
import type React from "react";
import "./globals.css";

// Google Font - Quicksand
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Local Font - CastorTwoW01
const castorTwoW01 = localFont({
  src: "../public/font/CastorTwoW01-Regular.woff2",
  variable: "--font-castor",
  display: "swap",
  weight: "400",
});

// Combine font variables
const fontVariables = `${quicksand.variable} ${castorTwoW01.variable}`;

export const metadata: Metadata = {
  title: {
    default: "German Butcher - Premium German Sausages & Meat Products",
    template: "%s | German Butcher",
  },
  description:
    "In 1991, Ferenz Georgy started German Butcher in Bangladesh with a love for sausages noticing the unavailability of such products in our country. Since then, German Butcher is the pioneer of authentic German Sausages in Bangladesh and became the icon of premium quality gourmet sausages, cold cuts, ham, bacon, meatloaf, salami, pepperoni and so many meat based products",
  keywords: [
    "german butcher",
    "German Butcher",
    "GB",
    "german-butcher",
    "German-Butcher",
    "germanbutcherbd",
    "german butcher bd",
    "beef",
    "fish",
    "steak",
    "offer",
    "meat",
    "meatball",
    "milk",
    "dairy",
    "gb product",
    "chicken",
    "sausages",
    "cold cuts",
    "ham",
    "bacon",
    "meatloaf",
    "salami",
    "pepperoni",
    "authentic german sausages",
    "premium quality",
    "gourmet",
    "bangladesh",
  ],
  authors: [{ name: "German Butcher Team" }],
  creator: "German Butcher",
  publisher: "German Butcher",

  openGraph: {
    title: "German Butcher - Premium German Sausages & Meat Products",
    description:
      "Pioneer of authentic German Sausages in Bangladesh since 1991. Premium quality gourmet sausages, cold cuts, ham, bacon, meatloaf, salami, pepperoni and meat based products.",
    url: "https://www.germanbutcherbd.com",
    siteName: "German Butcher",
    images: [
      {
        url: "https://www.germanbutcherbd.comhttps://test.germanbutcherbd.com/_next/image?url=%…t%2Fstatic%2Fmedia%2Flogo.54b71ef5.webp&w=96&q=75.png",
        width: 1200,
        height: 630,
        alt: "German Butcher - Premium German Sausages & Meat Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "German Butcher - Premium German Sausages & Meat Products",
    description:
      "Pioneer of authentic German Sausages in Bangladesh since 1991. Premium quality gourmet sausages, cold cuts, ham, bacon and meat products.",
    images: [
      "https://www.germanbutcherbd.comhttps://test.germanbutcherbd.com/_next/image?url=%…t%2Fstatic%2Fmedia%2Flogo.54b71ef5.webp&w=96&q=75.png",
    ],
    creator: "@germanbutcherbd",
  },

  icons: {
    icon: "https://test.germanbutcherbd.com/_next/image?url=%…t%2Fstatic%2Fmedia%2Flogo.54b71ef5.webp&w=96&q=75.png",
    shortcut:
      "https://test.germanbutcherbd.com/_next/image?url=%…t%2Fstatic%2Fmedia%2Flogo.54b71ef5.webp&w=96&q=75.png",
    apple:
      "https://test.germanbutcherbd.com/_next/image?url=%…t%2Fstatic%2Fmedia%2Flogo.54b71ef5.webp&w=96&q=75.png",
  },

  metadataBase: new URL("https://www.germanbutcherbd.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "food",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  const cart = user ? await fetchProtectedData<Cart>("cart") : null;

  return (
    <html lang="en" className={fontVariables}>
      <head>
        {/* Preload the local font for better performance */}
        <link
          rel="preload"
          href="/font/CastorTwoW01-Regular.woff"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={fontVariables}>
        <Toaster richColors />

        <CartProvider serverCart={cart ?? undefined} isLoggedIn={!!user}>
          <SearchProvider>
            {children}
            <SearchModal />
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}

export { castorTwoW01, quicksand };
