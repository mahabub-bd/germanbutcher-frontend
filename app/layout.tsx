import { getUser } from "@/actions/auth";
import { SearchModal } from "@/components/homepage/search/search-modal";
import { Toaster } from "@/components/ui/sonner";

import { CartProvider } from "@/providers/cart-provider";
import { fetchProtectedData } from "@/utils/api-utils";
import type { Cart } from "@/utils/types";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";

import { SearchProvider } from "@/providers/search-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "German Butcher - GB",
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
        url: "https://www.germanbutcherbd.com/img/logo/logo-black.png",
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
    images: ["https://www.germanbutcherbd.com/img/logo/logo-black.png"],
    creator: "@germanbutcherbd",
  },

  icons: {
    icon: "/img/logo/logo-black.png",
    shortcut: "/img/logo/logo-black.png",
    apple: "/img/logo/logo-black.png",
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
    <html lang="en">
      <body className={inter.className}>
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
