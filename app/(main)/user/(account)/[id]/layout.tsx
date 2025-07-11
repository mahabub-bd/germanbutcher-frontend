import React from "react";

import { getUser } from "@/actions/auth";
import MobileSidebar from "@/components/common/MobileSidebar";
import Sidebar from "@/components/common/Sidebar";

import ProfileBreadcrumb from "@/components/user-account/profile-breadcrumb";
import {
  Headphones,
  Heart,
  MapPin,
  Shield,
  ShoppingBag,
  User,
} from "lucide-react";

interface UserProfileLayoutProps {
  children: React.ReactNode;
}

const UserProfileLayout: React.FC<UserProfileLayoutProps> = async ({
  children,
}) => {
  const user = await getUser();
  const navItems = [
    {
      icon: <User className="w-5 h-5" />,
      label: "Profile",
      href: `/user/${user.id}/profile`,
      description: "Manage your personal information",
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: "My Orders",
      href: `/user/${user.id}/orders`,
      description: "Track and manage your orders",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Addresses",
      href: `/user/${user.id}/addresses`,
      description: "Manage shipping addresses",
    },

    {
      icon: <Heart className="w-5 h-5" />,
      label: "Wishlist",
      href: `/user/${user.id}/wishlist`,
      description: "Your saved items",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: "Privacy & Security",
      href: `/user/${user.id}/security`,
      description: "Password and account security",
    },
  ];

  return (
    <div className=" bg-gray-50">
      <ProfileBreadcrumb navItems={navItems} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="lg:col-span-1">
            <div className="hidden lg:block">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* User Profile Header */}
                <div className="bg-gradient-to-br from-primaryColor via-[#6d0000] to-primaryColor p-6 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{user?.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Enhanced Sidebar */}
                <div className="p-2">
                  <Sidebar navItems={navItems} />
                </div>
              </div>
            </div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primaryColor via-[#6d0000] to-primaryColor rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>
                  </div>
                </div>
                <MobileSidebar navItems={navItems} />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-md shadow-sm border border-gray-200 min-h-[600px]">
              <main className="md:p-4 p-2">{children}</main>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Floating Button (Mobile) */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <Headphones className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default UserProfileLayout;
