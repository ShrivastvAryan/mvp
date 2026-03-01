import { LayoutDashboard, ShoppingBag, Users, TrendingUp, LogOut} from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const Sidebar = () => {
  return (
      <aside className="w-72 bg-[#2F3523] h-screen text-[#D7CEBC] flex flex-col border-r border-white/5">
        <div className="p-10 mb-8">
          <h1 className="text-2xl font-black tracking-tighter italic">Admin<span className="opacity-40">Hub</span></h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30 mt-1">Management Portal</p>
        </div>

        <nav className="flex-1 px-6 space-y-2">
  {[
    { name: "Overview", href: "/admin", icon: <LayoutDashboard size={18} />, active: true },
    { name: "Create Event", href: "/admin/create-event", icon: <Users size={18} />, active: false },
  ].map((item) => (
    <Link key={item.name} href={item.href}>
      <div
        className={`w-full flex items-center gap-4 p-4 rounded-2xl text-sm font-bold transition-all cursor-pointer ${
          item.active
            ? "bg-[#D7CEBC] text-[#2F3523] shadow-xl"
            : "opacity-50 hover:opacity-100 hover:bg-white/5"
        }`}
      >
        {item.icon} {item.name}
      </div>
    </Link>
  ))}
</nav>

        <div className="p-8 border-t border-white/5">
          <button className="flex items-center gap-4 text-red-400 font-bold text-sm p-4 w-full rounded-2xl hover:bg-red-400/10 transition-all">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>
  )
}

export default Sidebar