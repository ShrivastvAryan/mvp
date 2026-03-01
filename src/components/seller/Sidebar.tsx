"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PlusCircle, 
  LogOut,
  ChevronRight,
  Store,
  Menu,
  X
} from 'lucide-react';
import { cn } from "@/lib/utils";

const SideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      href: "/seller",
      icon: <LayoutDashboard size={20} />,
    },
    { 
      name: "Add a Product", 
      href: "/seller/add-product", 
      icon: <PlusCircle size={20} /> 
    },
  ];

  const NavContent = () => (
    <>
      {/* Sidebar Header */}
      <div className="p-8 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#dcd7c9]/10 flex items-center justify-center text-[#dcd7c9]">
            <Store size={24} />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em]">Seller Dashboard</h2>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)} // Close on mobile link click
              className={cn(
                "group flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-[#dcd7c9] text-[#3d4432] shadow-xl" 
                  : "hover:bg-white/5 text-[#dcd7c9]/60 hover:text-[#dcd7c9]"
              )}
            >
              <div className="flex items-center gap-4">
                <span className={cn(
                  "transition-transform duration-300",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )}>
                  {item.icon}
                </span>
                <span className="text-sm font-bold tracking-tight">
                  {item.name}
                </span>
              </div>
              {isActive && <ChevronRight size={16} className="opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-white/5">
        <button className="flex items-center gap-4 w-full cursor-pointer p-4 rounded-2xl text-[#dcd7c9] hover:bg-white/5 transition-all font-bold text-sm">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header/Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#3d4432] border-b border-white/5 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-3 text-[#dcd7c9]">
          <Store size={20} />
          <span className="text-xs font-black uppercase tracking-widest">Seller</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#dcd7c9] p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-[#3d4432] text-[#dcd7c9] flex flex-col border-r border-white/5 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 w-72",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <NavContent />
      </aside>
    </>
  );
};

export default SideBar;