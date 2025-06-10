import { getUser } from '@/actions/auth';
import type { Metadata } from 'next';
import type React from 'react';
import { AdminLayoutClient } from './AdminLayoutClient';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Administration panel for managing the application',
  keywords: ['admin', 'dashboard', 'management'],
  robots: 'noindex, nofollow',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>;
}
