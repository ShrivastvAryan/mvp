"use client";

import { useState } from "react";

const Page = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className=" flex justify-center px-6 py-28">
      <main className="max-w-6xl w-full">

        {/* Breadcrumb */}
        <p className="text-sm text-brand-secondary/70 mb-10 font-medium tracking-wide">
          Home / Art & Craft /{" "}
          <span className="text-brand-secondary font-semibold">
            Handmade Wall Hanging
          </span>
        </p>

        {/* Layout */}
        <div className="grid grid-cols-2 gap-16">

          {/* LEFT: Image Section */}
          <div className="flex gap-6">

            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-20 h-20 bg-brand-accent/40 rounded-2xl cursor-pointer hover:scale-105 hover:bg-brand-accent/60 transition-all duration-300"
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-brand-accent/30 rounded-4xl shadow-xl flex items-center justify-center h-[520px] border border-brand-secondary/10">
              <span className="text-brand-secondary/50 font-medium">
                Product Image
              </span>
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="flex flex-col">

            {/* Title */}
            <h1 className="text-3xl font-bold text-brand-secondary leading-snug">
              Handmade Wall Hanging{" "}
              <span className="text-brand-accent font-medium">
                Natural Fibre
              </span>
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mt-6">
              <p className="text-2xl font-bold text-brand-secondary">
                Rs. 1,499
              </p>
              <p className="text-lg text-brand-secondary/50 line-through">
                Rs. 1,899
              </p>
              <span className="bg-brand-secondary text-brand-primary text-xs px-3 py-1 rounded-full font-semibold">
                21% OFF
              </span>
            </div>

            {/* Tagline */}
            <p className="mt-6 text-brand-secondary/80 italic">
              Handcrafted with love using sustainable natural fibres.
            </p>

            {/* Quantity */}
            <div className="mt-8">
              <p className="text-sm font-semibold mb-3 text-brand-secondary">
                Quantity
              </p>

              <div className="flex items-center w-fit border border-brand-secondary/30 rounded-xl overflow-hidden bg-brand-primary">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="px-4 py-2 hover:bg-brand-accent/40 transition"
                >
                  −
                </button>

                <span className="px-6 py-2 border-x border-brand-secondary/30 font-medium">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-brand-accent/40 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4">

              {/* Primary Action */}
              <button className="w-full bg-brand-secondary text-brand-primary py-3 rounded-2xl font-semibold tracking-wide hover:opacity-90 transition-all duration-300 shadow-lg">
                ADD TO CART
              </button>

              {/* Secondary */}
              <button className="w-full border border-brand-secondary text-brand-secondary py-3 rounded-2xl font-semibold tracking-wide hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300">
                BUY IT NOW
              </button>
            </div>

            {/* About Section */}
            <div className="mt-8 border-t border-brand-secondary/20 pt-8">
              <h3 className="text-lg font-semibold text-brand-secondary mb-4">
                About This Craft
              </h3>

              <p className="text-brand-secondary/80 leading-relaxed text-sm">
                This handmade wall decor is crafted by skilled artisans using
                natural fibers. Each piece is unique and adds warmth, texture,
                and an earthy aesthetic to your living space.
              </p>

              <ul className="mt-4 text-sm text-brand-secondary/80 space-y-2 list-disc pl-5">
                <li>100% Handmade</li>
                <li>Eco-friendly materials</li>
                <li>Perfect for living rooms & studios</li>
              </ul>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
