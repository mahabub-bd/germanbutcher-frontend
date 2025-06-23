import React from 'react';

import MobileSidebar from '@/components/common/MobileSidebar';
import Sidebar from '@/components/common/Sidebar';
import { ShoppingBag, Store, UserRound } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const UserAdmin: React.FC<AdminLayoutProps> = ({ children }) => {
  const navItems = [
    {
      icon: <UserRound />,
      label: 'User Account',
      href: '/user-account',
    },
    {
      icon: <Store />,
      label: 'My Address',
      href: '/my-address',
    },
    {
      icon: <ShoppingBag />,
      label: 'Order',
      href: '/my-order',
    },
  ];
  return (
    <div className="w-full   relative my-10 ">
      <div className="relative max-w-[1240px] lg:mx-auto lg:flex h-full border border-primaryColor mx-2.5 ">
        <div
          className={`w-[300px] hidden lg:block z-30 bg-white border-r border-primaryColor
            transition-transform duration-300 ease-in-out `}
        >
          <Sidebar navItems={navItems} />
        </div>
        <div className="lg:hidden ">
          <MobileSidebar navItems={navItems} />
        </div>

        <div className="flex-1 w-full h-full  flex flex-col">
          <main className="flex-1 overflow-y-auto  p-4 lg:pl-6 lg:pt-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;
