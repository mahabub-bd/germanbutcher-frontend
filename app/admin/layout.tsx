"use client";

import { getUser } from "@/actions/auth";
import { AdminHeader } from "@/components/admin/admin-header";

import { SidebarMenu } from "@/components/admin/sidebar-menu";
import type React from "react";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SidebarMenu user={user} mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <div className="transition-all duration-300 ease-in-out pt-1 md:pt-0 md:pl-[250px] lg:pl-[260px]">
        <AdminHeader user={user} onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
        <main className="md:p-4 p-2">{children}</main>
      </div>
    </div>
  );
}
