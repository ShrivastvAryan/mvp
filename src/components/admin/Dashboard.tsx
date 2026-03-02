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
    /* Responsive loader container */
    <main className="w-full lg:pl-72 min-h-screen bg-[#D7CEBC] flex items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-[#2F3523]/5 flex items-center justify-center border border-[#2F3523]/10 animate-pulse">
          <Loader2 className="animate-spin opacity-40" size={40} strokeWidth={1} />
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter italic mb-2">
            Curating <span className="opacity-40">Admin Panel</span>
          </h2>
        </div>
      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-[#D7CEBC] text-[#2F3523] selection:bg-[#2F3523] selection:text-[#D7CEBC]">
      {/* lg:pl-72 matches the sidebar width. 
        pt-28 ensures content starts below the mobile header.
      */}
      <main className="w-full lg:pl-72 mx-auto px-4 md:px-8 lg:px-12 py-12 pt-28 lg:pt-16 space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-[#2F3523]/10 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 opacity-60">
              <LayoutDashboard size={14} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Internal Management</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Admin <span className="opacity-50 italic font-medium tracking-normal">Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#2F3523]/5 rounded-full border border-[#2F3523]/10">
            <Clock size={14} className="opacity-60" />
            <span className="text-[10px] md:text-xs font-bold opacity-60 uppercase tracking-widest">
              Live Overview
            </span>
          </div>
        </div>

        {/* Stats Grid - 1 col on mobile, 3 on tablet+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-white/30 backdrop-blur-md p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/20 shadow-sm transition-all hover:bg-white/40 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="p-3 md:p-3.5 rounded-2xl bg-[#2F3523] text-[#D7CEBC] shadow-lg">
                  {stat.icon}
                </div>
              </div>
              <div>
                <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-black opacity-40 mb-1">
                  {stat.label}
                </h3>
                <p className="text-3xl md:text-4xl font-black tracking-tighter">
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

          {/* Wrapper to ensure internal table doesn't break the dashboard layout */}
          <div className="w-full">
            <EventManage />
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;