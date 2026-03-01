"use client";

import React from 'react';
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 

} from 'lucide-react';
import EventManage from '@/components/admin/ManageEvent';

const AdminPanel = () => {
  const stats = [
    { label: "Total Sellers", value: "₹ 4,25,000", icon: <TrendingUp size={20} /> },
    { label: "Total Products", value: "154", icon: <ShoppingBag size={20} /> },
    { label: "Total Buyers", value: "42", icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#D7CEBC] text-[#2F3523] selection:bg-[#2F3523] selection:text-[#D7CEBC]">

      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Top Navbar */}
        {/* <header className="h-24 border-b border-[#2F3523]/10 flex items-center justify-between px-10 bg-[#D7CEBC]/50 backdrop-blur-md sticky top-0 z-20">
          <div className="relative group w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
            <input type="text" placeholder="Search orders, artisans..." className="w-full bg-[#2F3523]/5 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#2F3523]/10 outline-none" />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 opacity-50 hover:opacity-100 transition-opacity">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#D7CEBC]" />
            </button>
            <div className="h-10 w-10 rounded-xl bg-[#2F3523] text-[#D7CEBC] flex items-center justify-center font-black text-xs">AD</div>
          </div>
        </header> */}

        {/* Dashboard Content */}
        <div className="p-10 space-y-10">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/40 p-8 rounded-[2.5rem] border border-white/20 shadow-sm group">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-[#2F3523]/5 text-[#2F3523]">
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 ">{stat.label}</h3>
                <p className="text-3xl font-black tracking-tighter ">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Demo Table - Recent Activity */}
          <EventManage />
        </div>
      </main>

      {/* Demo Credentials Floating Label */}
      <div className="fixed bottom-10 right-10 bg-[#2F3523] text-[#D7CEBC] p-6 rounded-3xl border border-white/20 shadow-2xl z-50">
        <h4 className="text-[10px] uppercase tracking-widest font-black mb-3 opacity-40">Demo Access</h4>
        <div className="space-y-1 text-sm font-bold">
          <p className="opacity-70">User: <span className="text-white">admin@artisan.com</span></p>
          <p className="opacity-70">Pass: <span className="text-white">demo1234</span></p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;