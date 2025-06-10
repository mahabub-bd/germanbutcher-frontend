import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header";
import { MobileBottomHeader } from "@/components/header/mobile-bottom-header";

import type React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="flex-1">{children}</main>
      <MobileBottomHeader />
      <Footer />
    </div>
  );
}
