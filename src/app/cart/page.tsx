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

  /* ---------------- Load Cart ---------------- */
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setLoaded(true);
  }, []);

  /* ---------------- Listen Cart Updates ---------------- */
  useEffect(() => {
    const handleCartUpdate = () => {
      const updatedCart = localStorage.getItem("cart");
      if (updatedCart) {
        setCartItems(JSON.parse(updatedCart));
      } else {
        setCartItems([]);
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  /* ---------------- Update Quantity ---------------- */
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

  /* ---------------- Remove Item ---------------- */
  const removeItem = (productId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter(
        (item) => item.productId !== productId
      );

      localStorage.setItem("cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("cartUpdated"));
      return updated;
    });
  };

  /* ---------------- Checkout ---------------- */
  const handleCheckout = () => {
  setProcessing(true);

  setTimeout(() => {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    setCartItems([]);
    setProcessing(false);
    setOrderPlaced(true);
  }, 2000); // fake 2 sec payment processing
};
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (!loaded) return null;

  if (processing) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#D7CEBC] text-[#2F3523]">
      <div className="text-center space-y-8">
        <div className="w-16 h-16 border-4 border-[#2F3523]/20 border-t-[#2F3523] rounded-full animate-spin mx-auto"></div>

        <h1 className="text-3xl font-black tracking-tight">
          Processing Your Order...
        </h1>

        <p className="opacity-60 text-sm">
          Securing payment & preparing confirmation
        </p>
      </div>
    </div>
  );
}

  /* ---------------- SUCCESS SCREEN ---------------- */
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#D7CEBC] text-[#2F3523]">
        <div className="text-center space-y-8">
          <CheckCircle2 size={72} className="mx-auto text-green-600" />
          <h1 className="text-4xl font-black tracking-tight">
            Order Placed Successfully
          </h1>
          <p className="opacity-60">
            Thank you for supporting Conscious India.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-3 bg-[#2F3523] text-[#D7CEBC] px-8 py-4 rounded-2xl font-bold uppercase text-sm"
          >
            Continue Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- EMPTY CART ---------------- */
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#D7CEBC] text-[#2F3523]">
        <div className="text-center space-y-6">
          <ShoppingBag size={48} className="mx-auto opacity-20" />
          <p className="text-sm font-black uppercase tracking-[0.4em] opacity-40">
            Your cart is empty
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition"
          >
            <ChevronLeft size={14} /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------- MAIN CART ---------------- */
  return (
    <div className="min-h-screen mt-12 bg-[#D7CEBC] text-[#2F3523] py-20 px-6">
      <main className="max-w-7xl mx-auto">

        <header className="flex justify-between mb-16">
          <h1 className="text-5xl font-black italic">
            Your <span className="opacity-30">Selection</span>
          </h1>
          <div className="text-xs font-black uppercase opacity-40">
            {cartItems.length} Items
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-28">

          {/* Items */}
          <div className="lg:w-[60%] space-y-2">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex gap-8 py-10 border-t border-[#2F3523]/10"
              >
                <div className="w-40 h-40 bg-white/40 rounded-3xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-black uppercase">
                      {item.name}
                    </h2>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center border rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.productId, -1)}
                        className="px-4 py-2 cursor-pointer hover:bg-[#2F3523]/10 rounded-l-xl"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-6 font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="px-4 py-2 cursor-pointer hover:bg-[#2F3523]/10 rounded-r-xl"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="text-2xl font-black">
                      ₹ {(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-[40%]">
            <div className="bg-[#2F3523] text-[#D7CEBC] rounded-3xl p-10">
              <div className="flex justify-between mb-10">
                <span className="uppercase text-xs">Total</span>
                <span className="text-4xl font-black">
                  ₹ {subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#D7CEBC] text-[#2F3523] py-5 rounded-2xl font-black uppercase text-sm cursor-pointer"
              >
                Checkout Now
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CartPage;