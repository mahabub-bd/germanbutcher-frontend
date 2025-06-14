import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header";
import { MobileBottomHeader } from "@/components/header/mobile-bottom-header";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "User Dashboard",
  description: "User panel for managing the application",
  keywords: ["admin", "dashboard", "management"],
  robots: "noindex, nofollow",
};

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className=" flex flex-col">
        <div className="flex-1 md:p-8 p-2">{children}</div>
        <Footer />
      </main>

      <div className="md:hidden">
        <MobileBottomHeader />
      </div>
    </div>
  );
}
