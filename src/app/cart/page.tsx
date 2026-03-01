"use client";

import React, { useEffect, useState } from "react";
import {
  Trash2,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      const updatedCart = localStorage.getItem("cart");
      setCartItems(updatedCart ? JSON.parse(updatedCart) : []);
    };
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));
      return updated;
    });
  };

  const removeItem = (productId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.productId !== productId);
      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));
      return updated;
    });
  };

  const handleCheckout = () => {
    setProcessing(true);
    setTimeout(() => {
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      setCartItems([]);
      setProcessing(false);
      setOrderPlaced(true);
    }, 2000);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!loaded) return null;

  // Loading & Success States
  if (processing || orderPlaced || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#D7CEBC] text-[#2F3523] px-6">
        <div className="text-center space-y-8 max-w-md">
          {processing ? (
            <>
              <div className="w-16 h-16 border-4 border-[#2F3523]/20 border-t-[#2F3523] rounded-full animate-spin mx-auto"></div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">Processing Your Order...</h1>
            </>
          ) : orderPlaced ? (
            <>
              <CheckCircle2 size={72} className="mx-auto text-green-600" />
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">Order Placed Successfully</h1>
              <p className="opacity-60">Thank you for supporting Conscious India.</p>
              <Link href="/" className="inline-flex items-center gap-3 bg-[#2F3523] text-[#D7CEBC] px-8 py-4 rounded-2xl font-bold uppercase text-sm w-full justify-center md:w-auto">
                Continue Shopping <ArrowRight size={16} />
              </Link>
            </>
          ) : (
            <>
              <ShoppingBag size={48} className="mx-auto opacity-20" />
              <p className="text-sm font-black uppercase tracking-[0.4em] opacity-40">Your cart is empty</p>
              <Link href="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition">
                <ChevronLeft size={14} /> Continue Shopping
              </Link>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#D7CEBC] text-[#2F3523] pt-24 pb-12 px-4 md:px-8 lg:px-12">
      <main className="max-w-7xl mx-auto mt-12">
        <header className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
          <h1 className="text-4xl md:text-6xl font-black italic">
            Your <span className="opacity-30">Selection</span>
          </h1>
          <div className="text-xs font-black uppercase opacity-40">
            {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Items List */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-2">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row gap-6 py-8 border-t border-[#2F3523]/10"
              >
                {/* Image Container */}
                <div className="w-full sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white/40 rounded-3xl overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details Container */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl md:text-2xl font-black uppercase leading-tight max-w-[80%]">
                      {item.name}
                    </h2>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
                    {/* Quantity Toggle */}
                    <div className="flex items-center border border-[#2F3523]/20 rounded-xl overflow-hidden bg-[#D7CEBC]">
                      <button
                        onClick={() => updateQuantity(item.productId, -1)}
                        className="p-3 hover:bg-[#2F3523]/10 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-4 md:px-6 font-bold text-sm md:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="p-3 hover:bg-[#2F3523]/10 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-xl md:text-2xl font-black">
                      ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-[#2F3523] text-[#D7CEBC] rounded-[2.5rem] p-8 md:p-10 sticky top-24">
              <div className="flex justify-between items-end mb-10">
                <span className="uppercase text-[10px] tracking-widest font-bold opacity-60">Total Amount</span>
                <span className="text-3xl md:text-4xl font-black">
                  ₹ {subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#D7CEBC] text-[#2F3523] py-5 rounded-2xl font-black uppercase text-sm hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 cursor-pointer"
              >
                Checkout Now
              </button>
              
              <p className="text-[10px] text-center mt-6 opacity-40 uppercase tracking-tighter">
                Shipping & taxes calculated at next step
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;