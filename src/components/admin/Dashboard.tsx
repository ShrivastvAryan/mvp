"use client";
import { 
  ShoppingBag, 
  Users, 
  TrendingUp,
  LayoutDashboard,
  Clock,
  Loader2
} from 'lucide-react';
import EventManage from '@/components/admin/ManageEvent';
import { useQuery } from '@tanstack/react-query';
import { Product, fetchProducts } from '@/store/getProduct';


interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const Dashboard = () => {
  // Queries
  const { data: users, isLoading: uLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/user');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      return data.users;
    },
  });

  const { data: products, isLoading: pLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const isLoading = uLoading || pLoading;

  // Stats Logic
  const totalSellers = users?.filter(user => user.role === 'seller').length || 0;
  const totalBuyers = users?.filter(user => user.role === 'buyer').length || 0;
  const totalProducts = products?.length || 0;

  const stats = [
    { label: "Total Sellers", value: totalSellers, icon: <TrendingUp size={22} /> },
    { label: "Total Products", value: totalProducts, icon: <ShoppingBag size={22} /> },
    { label: "Total Users", value: totalBuyers, icon: <Users size={22} /> },
  ];

  if (isLoading) return (
      <main className="max-w-7xl mx-auto px-6 ml-24 y-12 space-y-12">
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#D7CEBC] text-[#2F3523]">
        <div className="relative">
          {/* Pulsing artisan-style loader */}
          <div className="w-24 h-24 rounded-[2rem] bg-[#2F3523]/5 flex items-center justify-center border border-[#2F3523]/10 animate-pulse">
            <Loader2 className="animate-spin opacity-40" size={40} strokeWidth={1} />
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-black tracking-tighter italic mb-2">Curating <span className="opacity-40">Admin Panel</span></h2>
        </div>
      </div>
      </main>
  );

  return (
    <div className="min-h-screen bg-[#D7CEBC] text-[#2F3523] selection:bg-[#2F3523] selection:text-[#D7CEBC]">
      <main className="w-full ml-36 mx-auto px-6 py-12 space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#2F3523]/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 opacity-60">
              <LayoutDashboard size={14} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Internal Management</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter">
              Admin <span className="opacity-50 italic font-medium tracking-normal">Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#2F3523]/5 rounded-full border border-[#2F3523]/10">
            <Clock size={14} className="opacity-60" />
            <span className="text-xs font-bold opacity-60 uppercase tracking-widest">
              Live Overview
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-white/30 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 shadow-sm transition-all hover:bg-white/40"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3.5 rounded-2xl bg-[#2F3523] text-[#D7CEBC] shadow-lg transition-transform ">
                  {stat.icon}
                </div>
              </div>
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.25em] font-black opacity-40 mb-1">
                  {stat.label}
                </h3>
                <p className="text-4xl font-black tracking-tighter">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Events Section */}
        <div className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">
              Manage <span className="opacity-50">Events</span>
            </h2>
            <p className="text-sm opacity-60 font-medium italic">
              Unified control for all marketplace listings
            </p>
          </div>

          <div >
            <EventManage />
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;

