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
      href: '/profile',
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
    <div className="w-full  bg-gray-100 relative py-10 lg:py-20 ">
      <div className="relative max-w-[1240px] lg:mx-auto lg:flex h-full gap-8 mx-2.5 ">
        <div
          className={`w-[300px] hidden lg:block z-30 bg-white  shadow-[-1px_2px_5.5px_4px_rgba(0,0,0,0.06)]  rounded-md
            transition-transform duration-300 ease-in-out `}
        >
          <Sidebar navItems={navItems} />
        </div>
        <div className="lg:hidden mb-6">
          <MobileSidebar navItems={navItems} />
        </div>

        <div className="flex-1 w-full h-full  flex flex-col  ">
          <main className="h-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;
