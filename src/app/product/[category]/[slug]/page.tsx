"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// const Page = () => {
//   return (
//     <>
//       <div>Page</div>
//       <Button variant="default" className="font-semibold rounded-2xl">Default Button</Button>
//       <h1 className="text-2xl font-bold bg-brand-secondary text-brand-primary">Product Page</h1>
//     </>
//   );
// };

const Page = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full h-full flex items-center justify-center">
    <main className="w-5xl py-12">
      <p className="text-sm text-brand-secondary/80 mb-8 font-semibold">
      Home / Art & Craft / <span className="text-brand-secondary">Handmade Wall</span>
      </p>

    {/* Main layout */}
    <div className="flex flex-row gap-15 h-[480px] ">

    {/* Image 1 */}
      <div className="relative bg-gray-200 rounded-4xl h-full w-[45%] flex items-center justify-center">
        <span className="text-brand-secondary/50">Art & Craft Image</span>
      </div>

      {/* Details */}
      <div className=" p-2 w-full h-full">
        <h1 className="text-2xl font-semibold text-brand-secondary mb-3 ">
        Handmade Wall Hanging{" "}  
        <span className="text-brand-accent font-medium">
        Natural Fibre
        </span>
        </h1>

        {/* price */}
        <div className="flex items-center gap-4 mb-6">
          <p className="text-xl font-medium text-red-500">
          Rs. 1,499
          </p>
          <p className="text-black line-through font-medium">
          Rs. 1,899
          </p>
        </div>
        
        {/* tagline */}
        <p className="text-lg italic text-brand-secondary/85 mb-6 font-medium">
        Handcrafted with love using suitable materials
        </p>

        {/* Buttons */}
        <div className="mb-6">
        <button className="bg-brand-secondary text-white px-5 py-2 rounded-md text-sm tracking-wide uppercase">
        ♡ ADD TO WISHLIST
        </button>
        </div>
        
        {/* Quantity */}
        <div className="mb-8">
          <p className="text-base font-semibold text-black mb-2">
            Quantity
          </p>

          <div className="flex items-center gap-3">
            <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-base">
                −
              </button>

               <div
              className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-sm">
              {quantity}
              </div>

             <button onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-lg">
                  +
            </button>
          </div>
        </div>

        {/* Add to cart */}
        <button className="w-98 mb-3 border border-brand-secondary text-brand-secondary py-2 rounded-md text-sm tracking-widest uppercase hover:text-white hover:bg-black transition-all duration-300">
        ADD TO CART
        </button>

        <button className="w-98 mb-4 border border-brand-secondary text-brand-secondary py-2 rounded-md text-sm tracking-widest uppercase hover:text-white hover:bg-black transition-all duration-300">
          BUY IT NOW
        </button>

        {/* Craft Details */}
        <div className="border-t border-brand-secondary/30 pt-4 space-y-4">
          <h3 className="font-medium text-brand-secondary">
              About This Craft
            </h3>

           <p className="text-sm text-brand-secondary/90 leading-relaxed">
              This handmade wall decor is crafted by skilled artisans using
              natural fibers. Each piece is unique and adds warmth, texture,
              and an earthy aesthetic to your living space.
            </p>

             <ul className="text-sm text-brand-secondary/70 list-disc pl-5">
              <li>100% Handmade</li>
              <li>Eco-friendly materials</li>
              <li>Perfect for living rooms & studios</li>
            </ul>

        </div>
        </div>
    </div>
    </main>
    </div>
  )
}

export default Page;
