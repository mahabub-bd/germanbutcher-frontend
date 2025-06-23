'use client';
import { GermanbutcherLogo } from '@/public/images';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
interface NavItem {
  icon: any;
  label: string;
  href: string;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems }: NavItem) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="  ">
      {/* Sidebar container */}
      <div
        className={`
          flex flex-col
         
          bg-white 
          shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
          lg:rounded-[12px] 
          p-5 w-full overflow-y-auto
        `}
      >
        <div className=" ">
          <div className=" space-y-2">
            <Link href="/" className="flex items-center mr-6">
              <div className="p-2 pb-3 bg-white/10 backdrop-blur-sm mx-auto rounded-2xl border border-white/20 inline-block transition-all duration-300 group-hover:bg-white/15 group-hover:scale-105">
                <Image
                  src={GermanbutcherLogo || '/placeholder.svg'}
                  alt="PurePac logo"
                  width={60}
                  height={60}
                  className="w-10 h-10 lg:w-15 lg:h-15"
                />
              </div>
            </Link>
            {navItems.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={`
        flex items-center justify-between group gap-3 px-3 py-2.5 lg:py-3 rounded-lg  hover:bg-primaryColor/10
        transition-colors duration-200
        ${active ? 'bg-primaryColor/10' : ''}
      `}
                >
                  <div className="flex gap-2 items-center">
                    <div
                      className={`
            w-[30px] h-[30px] flex justify-center items-center flex-shrink-0 rounded-full
            text-xl font-medium
            ${
              active
                ? 'text-primaryColor'
                : 'text-descriptionColor group-hover:text-primaryColor'
            }
          `}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`
            text-base font-medium 
            ${
              active
                ? 'text-primaryColor'
                : 'text-descriptionColor group-hover:text-primaryColor'
            }
          `}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
