"use client";

import Link from "next/link";
import { MoveLeft, Home, Search, LifeBuoy } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-brand-secondary text-brand-primary flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-2xl w-full text-center z-10">
        {/* The Large "404" or Visual */}
        <h1 className="text-[12rem] font-black leading-none tracking-tighter opacity-10 select-none">
          404
        </h1>
        
        <div className="mt-[-4rem]">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Lost in space?
          </h2>
          <p className="text-lg opacity-70 mb-10 max-w-md mx-auto leading-relaxed">
            The page you're looking for has vanished or never existed. Don't worry, even the best explorers get lost sometimes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-brand-secondary font-bold rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
            >
              <MoveLeft size={20} />
              Go Back
            </button>
            
            <Link
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-primary/20 font-bold rounded-2xl hover:bg-brand-primary/5 transition-all"
            >
              <Home size={20} />
              Back to Home
            </Link>
          </div>
        </div>

        {/* Helpful Links Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-brand-primary/10 pt-10">
          <Link href="/products" className="group p-4 rounded-xl hover:bg-brand-primary/5 transition-colors">
            <Search className="mx-auto mb-2 opacity-50 group-hover:opacity-100 transition-opacity" size={24} />
            <h3 className="font-semibold text-sm">Browse Products</h3>
          </Link>
          <Link href="/contact" className="group p-4 rounded-xl hover:bg-brand-primary/5 transition-colors">
            <LifeBuoy className="mx-auto mb-2 opacity-50 group-hover:opacity-100 transition-opacity" size={24} />
            <h3 className="font-semibold text-sm">Get Support</h3>
          </Link>
          <Link href="/about" className="group p-4 rounded-xl hover:bg-brand-primary/5 transition-colors">
            <div className="mx-auto mb-2 w-6 h-6 rounded-full border-2 border-brand-primary/50 flex items-center justify-center text-[10px] font-bold">?</div>
            <h3 className="font-semibold text-sm">Learn About Us</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}