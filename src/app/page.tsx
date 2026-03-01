'use client'

import { useEffect, useState } from "react";
import Caraousel from "@/components/home/caraousel";
import Categories from "@/components/home/Categories";
import TrendingProducts from "@/components/home/Shop";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { hasHydrated } = useAuth();
  const [loading, setLoading] = useState(true);

  // Fake loader delay (1.2 sec)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!hasHydrated || loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#D7CEBC]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-14 h-14 border-4 border-[#2F3523]/30 border-t-[#2F3523] rounded-full animate-spin"></div>
          <p className="text-xs font-black uppercase tracking-[0.4em] opacity-40">
            Loading Conscious India
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-18">
      <Caraousel />
      <div className="mt-12">
        <Categories />
      </div>
      <TrendingProducts />
    </div>
  );
}