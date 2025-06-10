'use client';

import { AdminHeader } from '@/components/admin/admin-header';
import { SidebarMenu } from '@/components/admin/sidebar-menu';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';

// Create a client wrapper component to handle state
export function AdminLayoutClient({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Optional: Persist collapsed state in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setCollapsed(savedState === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(collapsed));
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-background">
      <SidebarMenu
        user={user}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div
        className={`transition-all duration-300 ease-in-out pt-1 md:pt-0 ${
          collapsed
            ? 'md:pl-[100px] lg:pl-[100px]'
            : 'md:pl-[250px] lg:pl-[250px]'
        }`}
      >
        <AdminHeader user={user} />
        <main className="md:p-8 p-2">{children}</main>
      </div>
    </div>
  );
}
