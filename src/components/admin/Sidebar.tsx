"use client";

import { LayoutDashboard, Users, LogOut, PlusCircle, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar automatically when the route changes (on mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    window.location.href = "/";
  };

  return (
    <>
      {/* --- MOBILE HEADER --- */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#2F3523] text-[#D7CEBC] flex items-center justify-between px-6 z-[60] border-b border-white/5">
        <h1 className="text-xl font-black tracking-tighter italic">
          Admin<span className="opacity-40">Hub</span>
        </h1>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/5 rounded-xl transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- MOBILE OVERLAY --- */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR ASIDE --- */}
      <aside className={`
        fixed left-0 top-0 w-72 bg-[#2F3523] h-screen text-[#D7CEBC] flex flex-col border-r border-white/5 z-50
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Brand Header */}
        <div className="p-10 mb-6 hidden lg:block">
          <h1 className="text-2xl font-black tracking-tighter italic leading-none">
            Admin<span className="opacity-40">Hub</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30 mt-2">
            Management Portal
          </p>
        </div>

        {/* Navigation - Added top margin for mobile to avoid header overlap */}
        <nav className="flex-1 px-6 space-y-1.5 mt-20 lg:mt-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.name} href={item.href} className="block">
                <div
                  className={`group relative w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#D7CEBC] text-[#2F3523] shadow-lg"
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
        <div className="p-8 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 text-[#D7CEBC] opacity-50 hover:opacity-100 font-bold text-sm p-4 w-full rounded-2xl hover:bg-white/5 transition-all group"
          >
            <LogOut size={18}/> 
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;