"use client";

import React, { useState } from "react";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

const CartPage = () => {
  // Mock cart state based on your trending items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Dessert Bowls (Set of 2) Green",
      price: 2100,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400",
      category: "Kitchen & Dining",
    },
    {
      id: 2,
      name: "Handmade Ceramic Vase",
      price: 1500,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400",
      category: "Pottery",
    },
  ]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    // BG: #D7CEBC (Warm Stone) | TEXT: #2F3523 (Deep Sage)
    <div className="min-h-screen mt-12 bg-[#D7CEBC] text-[#2F3523] py-20 px-6 selection:bg-[#2F3523] selection:text-[#D7CEBC]">
      <main className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <Link href="/products" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-50 hover:opacity-100 transition-all mb-4">
              <ChevronLeft size={14} /> Back to Collection
            </Link>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic">
              Your <span className="opacity-30">Selection</span>
            </h1>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
            Summary / {cartItems.length} Items
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-28">
          
          {/* Cart Items List */}
          <div className="w-[60%] space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="group flex flex-col sm:flex-row gap-8 py-10 border-t border-[#2F3523]/10 first:border-t-0">
                {/* Product Image: Mix-blend to sit on the stone background */}
                <div className="relative aspect-square w-full sm:w-48 bg-white/40 rounded-[2.5rem] overflow-hidden border border-[#2F3523]/5 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2">
                        {item.category}
                      </p>
                      <h2 className="text-xl md:text-3xl font-black tracking-tighter leading-tight uppercase">
                        {item.name}
                      </h2>
                    </div>
                    <button className="text-[#2F3523]/20 hover:text-red-600 transition-colors p-2">
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-8">
                    {/* Quantity Selector: Deep Sage borders */}
                    <div className="flex items-center bg-[#2F3523]/5 border border-[#2F3523]/10 rounded-2xl p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#2F3523] hover:text-[#D7CEBC] transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <div className="w-10 text-center text-sm font-black">{item.quantity}</div>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#2F3523] hover:text-[#D7CEBC] transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-2xl font-black tracking-tighter">
                      ₹ {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary Side Card */}
          <div className="w-[40%]">
            <div className="bg-[#2F3523] text-[#D7CEBC] rounded-[3rem] p-10 sticky top-24 shadow-2xl">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-10 pb-4 border-b border-white/10 opacity-80">
                Order Total
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                  <span>Subtotal</span>
                  <span>₹ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                  <span>Shipping</span>
                  <span className="italic">Standard</span>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-10">
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Total</span>
                    <span className="text-4xl font-black tracking-tighter">
                      ₹ {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <button className="w-full bg-[#D7CEBC] text-[#2F3523] py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-[0.98]">
                    Checkout Now <ArrowRight size={18} />
                  </button>
                  
                  <div className="mt-8 flex items-center justify-center gap-4 opacity-30">
                    <ShoppingBag size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Secure Artisan Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CartPage;