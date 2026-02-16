"use client";

import React, { useState } from "react";
import { Filter, ChevronDown, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Page = () => {
  // Initial products array
  const initialProducts = [
    { id: 1, name: "Handmade Ceramic Vase", price: 1500, category: "Pottery", image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600", inStock: true },
    { id: 2, name: "Cotton Artisan Scarf", price: 899, category: "Textiles", image: "/scaf.jpg", inStock: false },
    { id: 3, name: "Wooden Serving Tray", price: 2200, category: "Kitchen", image: "/tray.jpg", inStock: true },
    { id: 4, name: "Handcrafted Clay Bowl", price: 750, category: "Pottery", image: "https://images.unsplash.com/photo-1578898887932-dce23a595ad4?w=600", inStock: true },
    { id: 5, name: "Linen Table Runner", price: 1200, category: "Textiles", image: "/linen-table.jpg", inStock: true },
    { id: 6, name: "Bamboo Cutlery Set", price: 650, category: "Kitchen", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600", inStock: true },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [sortLabel, setSortLabel] = useState("Sort: Featured");

  // Sorting Function
  const handleSort = (type: "low-high" | "high-low" | "featured") => {
    let sortedArray = [...products];

    if (type === "low-high") {
      sortedArray.sort((a, b) => a.price - b.price);
      setSortLabel("Price: Low to High");
    } else if (type === "high-low") {
      sortedArray.sort((a, b) => b.price - a.price);
      setSortLabel("Price: High to Low");
    } else {
      setProducts(initialProducts);
      setSortLabel("Sort: Featured");
      return;
    }
    setProducts(sortedArray);
  };

  return (
    <main className="min-h-screen bg-brand-primary text-brand-secondary py-16 px-6 md:px-12">
      {/* Header */}
      <header className="max-w-[1440px] mx-auto text-center mb-20 mt-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 italic">
          Artisan <span className="opacity-40">Collection</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.4em] font-black opacity-60">
          {products.length} products — Handcrafted with Heart
        </p>
      </header>

      {/* Utility Bar with Functional Sort */}
      <div className="max-w-[1440px] mx-auto flex justify-between items-center mb-10  pb-4">
        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
          <Filter size={14} /> Filter
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity outline-none">
            {sortLabel} <ChevronDown size={14} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#dcd7c9] border-[#3d4432]/10 text-brand-secondary rounded-xl">
            <DropdownMenuItem onClick={() => handleSort("featured")} className="text-[10px] font-black uppercase tracking-widest cursor-pointer focus:bg-[#3d4432] focus:text-[#dcd7c9]">
              Featured
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("low-high")} className="text-[10px] font-black uppercase tracking-widest cursor-pointer focus:bg-[#3d4432] focus:text-[#dcd7c9]">
              Price: Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSort("high-low")} className="text-[10px] font-black uppercase tracking-widest cursor-pointer focus:bg-[#3d4432] focus:text-[#dcd7c9]">
              Price: High to Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Grid */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <Link href={`/product/cat/slug`} key={product.id}>
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-[4/5] bg-white/40 overflow-hidden mb-5 border border-white/20 rounded-sm">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              {!product.inStock && (
                <div className="absolute top-4 left-4 bg-brand-secondary text-brand-primary text-[9px] font-black px-2 py-1 tracking-widest uppercase">
                  Sold Out
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-brand-secondary backdrop-blur-sm py-4 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <button className="text-[10px] text-brand-primary font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 w-full">
                   <ShoppingBag size={14} /> View
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{product.category}</p>
              <h2 className="text-sm font-bold tracking-tight text-brand-secondary">{product.name}</h2>
              <p className="text-sm font-black tracking-tight">Rs. {product.price.toLocaleString()}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Page;