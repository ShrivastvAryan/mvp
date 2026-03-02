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

  const navItems = [
    { 
      name: "Overview", 
      href: "/admin/home", 
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
      {/* Visible only on small screens. Fixed to top. */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#2F3523] text-[#D7CEBC] flex items-center justify-between px-6 z-[60] border-b border-white/10 shadow-md">
        <h1 className="text-xl font-black tracking-tighter italic">
          Admin<span className="opacity-40">Hub</span>
        </h1>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/10 rounded-xl transition-colors active:scale-90"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* --- MOBILE OVERLAY --- */}
      {/* Smooth fade-in overlay when sidebar is open */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* --- SIDEBAR ASIDE --- */}
      <aside className={`
        fixed left-0 top-0 w-72 bg-[#2F3523] h-full text-[#D7CEBC] flex flex-col border-r border-white/5 z-50
        transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        
        {/* Brand Header - Hidden on mobile because it's in the Mobile Header */}
        <div className="p-10 mb-2 hidden lg:block">
          <h1 className="text-2xl font-black tracking-tighter italic leading-none">
            Admin<span className="opacity-40">Hub</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30 mt-2">
            Management Portal
          </p>
        </div>

        {/* Navigation */}
        {/* mt-20 on mobile to start below the fixed mobile header */}
        <nav className="flex-1 px-6 space-y-2 mt-24 lg:mt-0 overflow-y-auto hide-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.name} href={item.href} className="block group">
                <div
                  className={`relative w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-[#D7CEBC] text-[#2F3523] shadow-xl shadow-black/20 translate-x-1"
                      : "text-[#D7CEBC] opacity-50 hover:opacity-100 hover:bg-white/5 hover:translate-x-1"
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
        <div className="p-6 lg:p-8 border-t border-white/5 bg-[#2F3523]">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 text-[#D7CEBC] opacity-50 hover:opacity-100 font-bold text-sm p-4 w-full rounded-2xl hover:bg-red-500/10 hover:text-red-400 transition-all group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform"/> 
            Logout
          </button>
        </div>
      </aside>

      {/* Spacer for Main Content - Only needed on mobile to push content below header */}
      <div className="h-16 lg:hidden" />
    </>
  );
};

export default Sidebar;