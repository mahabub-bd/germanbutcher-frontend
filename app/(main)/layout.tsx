import { getUser } from "@/actions/auth";
import Copyright from "@/components/footer/copyright";
import Footer from "@/components/footer/Footer";
import { Header } from "@/components/header";
import { MobileBottomHeader } from "@/components/header/mobile-bottom-header";
import { GoToTop } from "@/components/ui/go-to-top";

import type React from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return (
    <div>
      <Header />
      <main className="flex-1">{children}</main>
      <GoToTop />
      <MobileBottomHeader user={user} />
      <Footer />
      <Copyright />
    </div>
  );
}
