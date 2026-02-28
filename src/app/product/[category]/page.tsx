"use client";

import React, { useState, useMemo } from "react";
import { Filter, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { Product, fetchProductByCategory } from "@/store/getProduct";
import Card from "@/components/cards/card";
import { useParams } from "next/navigation";

const Page = () => {
  const { category } = useParams<{ category: string }>();

  const { data: products = [], isLoading, error } = useQuery<Product[]>({
  queryKey: ["productsByCategory", category],
  queryFn: () => fetchProductByCategory(category),
  enabled: !!category,
});

  const [sortType, setSortType] = useState<
    "featured" | "low-high" | "high-low"
  >("featured");

  const sortedProducts = useMemo(() => {
    if (sortType === "low-high") {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (sortType === "high-low") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  }, [products, sortType]);

  const getSortLabel = () => {
    if (sortType === "low-high") return "Price: Low to High";
    if (sortType === "high-low") return "Price: High to Low";
    return "Sort: Featured";
  };

 if (isLoading) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-accent border-t-brand-secondary rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <main className="min-h-screen bg-brand-primary text-brand-secondary py-16 px-6 md:px-12">
      {/* Header */}
      <header className="max-w-[1440px] mx-auto text-center mb-20 mt-20">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 italic">
          {category} <span className="opacity-40">Collection</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.4em] font-black opacity-60">
          {products.length} products — Handcrafted with Heart
        </p>
      </header>

      {/* Utility Bar */}
      <div className="max-w-[1440px] mx-auto flex justify-between items-center mb-10 pb-4">
        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
          <Filter size={14} /> Filter
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity outline-none">
            {getSortLabel()} <ChevronDown size={14} />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="bg-[#dcd7c9] border-[#3d4432]/10 text-brand-secondary rounded-xl"
          >
            <DropdownMenuItem
              onClick={() => setSortType("featured")}
              className="text-[10px] font-black uppercase tracking-widest cursor-pointer"
            >
              Featured
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setSortType("low-high")}
              className="text-[10px] font-black uppercase tracking-widest cursor-pointer"
            >
              Price: Low to High
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setSortType("high-low")}
              className="text-[10px] font-black uppercase tracking-widest cursor-pointer"
            >
              Price: High to Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Grid */}
      <Card products={sortedProducts} />
    </main>
  );
};

export default Page;