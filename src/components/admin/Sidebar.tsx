"use client";

import { LayoutDashboard, Users, LogOut, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin/auth")) {
    return null;
  }


  const navItems = [
    { 
      name: "Overview", 
      href: "/admin", 
      icon: <LayoutDashboard size={18} /> 
    },
    { 
      name: "Create Event", 
      href: "/admin/create-event", 
      icon: <PlusCircle size={18} /> 
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: <Users size={18} />
    }
  ];

  return (
    <aside className="fixed left-0 top-0 w-72 bg-[#2F3523] h-screen text-[#D7CEBC] flex flex-col border-r border-white/5 z-50">
      {/* Brand Header */}
      <div className="p-10 mb-6">
        <h1 className="text-2xl font-black tracking-tighter italic leading-none">
          Admin<span className="opacity-40">Hub</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30 mt-2">
          Management Portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.name} href={item.href} className="block">
              <div
                className={`group relative w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#D7CEBC] text-[#2F3523]"
                    : "text-[#D7CEBC] opacity-50 hover:opacity-100 hover:bg-white/5"
                }`}
              >
                
                <span className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                  {item.icon}
                </span>
                
                <span className="tracking-tight">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <button className="p-8 border-t border-white/5" onClick={() => {localStorage.removeItem("admin-auth"); window.location.href = "/";}}>
        <Link href="/"className="flex items-center gap-4 hover:cursor-pointer text-brand-primary font-bold text-sm p-4 w-full rounded-2xl group">
          <LogOut size={18}/> 
          Logout
        </Link>
      </button>
    </aside>
  );
};

export default Sidebar;