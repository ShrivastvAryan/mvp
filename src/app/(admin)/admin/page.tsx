"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  LogOut, 
  Search, 
  Bell,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';

const AdminPanel = () => {
  const stats = [
    { label: "Total Revenue", value: "₹ 4,25,000", change: "+12.5%", icon: <TrendingUp size={20} /> },
    { label: "Total Orders", value: "154", change: "+8.2%", icon: <ShoppingBag size={20} /> },
    { label: "Active Artisans", value: "42", change: "+2", icon: <Users size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#D7CEBC] text-[#2F3523] selection:bg-[#2F3523] selection:text-[#D7CEBC]">
      
      {/* 1. Sidebar - Deep Sage Green */}
      <aside className="w-72 bg-[#2F3523] text-[#D7CEBC] flex flex-col border-r border-white/5">
        <div className="p-10 mb-8">
          <h1 className="text-2xl font-black tracking-tighter italic">Admin<span className="opacity-40">Hub</span></h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30 mt-1">Management Portal</p>
        </div>

        <nav className="flex-1 px-6 space-y-2">
          {[
            { name: "Overview", icon: <LayoutDashboard size={18} />, active: true },
            { name: "Artisan List", icon: <Users size={18} />, active: false },
            { name: "Order History", icon: <ShoppingBag size={18} />, active: false },
          ].map((item) => (
            <button key={item.name} className={`w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all ${item.active ? 'bg-[#D7CEBC] text-[#2F3523] shadow-xl' : 'opacity-50 hover:opacity-100 hover:bg-white/5'}`}>
              {item.icon} {item.name}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button className="flex items-center gap-4 text-red-400 font-bold text-sm p-4 w-full rounded-2xl hover:bg-red-400/10 transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="h-24 border-b border-[#2F3523]/10 flex items-center justify-between px-10 bg-[#D7CEBC]/50 backdrop-blur-md sticky top-0 z-20">
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
        </header>

        {/* Dashboard Content */}
        <div className="p-10 space-y-10">
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/40 p-8 rounded-[2.5rem] border border-white/20 shadow-sm group hover:bg-[#2F3523] transition-all duration-500">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-[#2F3523]/5 text-[#2F3523] group-hover:bg-white/10 group-hover:text-[#D7CEBC] transition-colors">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-black text-green-600 bg-green-100 px-2 py-1 rounded-full group-hover:bg-green-500 group-hover:text-white transition-colors">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 group-hover:text-[#D7CEBC] group-hover:opacity-60 transition-all">{stat.label}</h3>
                <p className="text-3xl font-black tracking-tighter group-hover:text-white transition-colors">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Demo Table - Recent Activity */}
          <div className="bg-[#2F3523] text-[#D7CEBC] rounded-[3rem] p-10 shadow-2xl overflow-hidden border border-white/5">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black tracking-tighter italic">Recent <span className="opacity-40">Orders</span></h2>
              <button className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 flex items-center gap-2 transition-opacity">
                View All <ArrowUpRight size={14} />
              </button>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest opacity-40 border-b border-white/10">
                  <th className="pb-6">Product</th>
                  <th className="pb-6">Buyer</th>
                  <th className="pb-6 text-right">Price</th>
                  <th className="pb-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-bold">
                {[
                  { item: "Ceramic Bowl", user: "Justin Mason", price: "₹ 1,500" },
                  { item: "Linen Scarf", user: "Sarah Chen", price: "₹ 899" },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="py-6">{row.item}</td>
                    <td className="py-6 opacity-60 font-medium">{row.user}</td>
                    <td className="py-6 text-right font-black tracking-tight">{row.price}</td>
                    <td className="py-6 text-right">
                      <button className="p-2 opacity-20 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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