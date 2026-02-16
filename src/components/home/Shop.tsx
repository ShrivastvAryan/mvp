"use client";

import React from 'react';
import { Heart, Ticket, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TrendingProducts = () => {
  const products = [
    { id: 1, name: "Dessert Bowls (Set of 2) Green", price: "Rs. 2,100.00", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=500", inStock: true },
    { id: 2, name: "Squiggle Cushion Cover", price: "Rs. 999.00", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=500", inStock: true },
    { id: 3, name: "Flowerbed Beaded Potli Bag", price: "Rs. 6,800.00", image: "/pic-2.jpg", inStock: true },
    { id: 4, name: "Pulse of the Unknown", price: "Rs. 18,000.00", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=500", inStock: true },
    { id: 5, name: "Cotton Blanket - Single Dohar", price: "Rs. 1,250.00", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=500", inStock: true },
    { id: 6, name: "Handcrafted Ceramic Vase", price: "Rs. 3,500.00", image: "/pic-3.jpg", inStock: true },
  ];

  return (
    <section className="bg-brand-primary py-24 text-brand-secondary overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-brand-secondary mb-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.5em] mb-4">
            Editor's Choice
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-brand-secondary mb-6">
            Shop <span className="italic font-serif font-light text-brand-secondary">Trending</span>
          </h2>
          <Link 
            href="/products" 
            className="group flex items-center gap-2 text-xs uppercase tracking-widest font-bold border-b border-brand-secondary/20 pb-1 hover:border-brand-secondary transition-all"
          >
            View All Collections
          </Link>
        </div>

        {/* Carousel Logic */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full relative"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4 xl:basis-1/5">
                <div className="group cursor-pointer">
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] bg-white/5 border border-white/5 overflow-hidden rounded-sm transition-all duration-500">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                    
                    {/* Minimalist In-Stock Indicator */}
                    {product.inStock && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-brand-secondary/90 backdrop-blur-md text-brand-primary text-[9px] font-black px-2 py-1 tracking-[0.2em]">
                        <span className="w-1 h-1 bg-brand-primary rounded-full animate-pulse" />
                        AVAILABLE
                      </div>
                    )}

                    {/* Quick Buy Slider */}
                    <div className="absolute bottom-0 left-0 right-0 bg-brand-secondary text-brand-primary py-4 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">VIEW</span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="mt-6 space-y-1">
                    <h3 className="text-xs font-bold opacity-60 group-hover:opacity-100 transition-opacity leading-tight line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm font-semibold text-brand-secondary">
                      {product.price}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Minimalist Navigation Controls */}
          <div className="flex justify-center md:justify-end gap-3 mt-12">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-full border border-white/10 bg-transparent text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300" />
            <CarouselNext className="static translate-y-0 h-12 w-12 rounded-full border border-white/10 bg-transparent text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TrendingProducts;