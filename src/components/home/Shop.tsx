"use client";

import React from 'react';
import { Heart, Ticket, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product, fetchProducts } from "@/store/getProduct";
import { useQuery } from "@tanstack/react-query";

const TrendingProducts = () => {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <section className="bg-brand-primary py-12 md:py-24 text-brand-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section - Responsive alignment and scaling */}
        <div className="flex flex-col items-center text-center text-brand-secondary mb-10 md:mb-16">
          <span className="text-[8px] md:text-[10px] font-semibold uppercase tracking-[0.4em] md:tracking-[0.5em] mb-3 md:mb-4 opacity-70">
            ALL CHOICE
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-brand-secondary mb-4 md:mb-6">
            <span className="italic font-serif font-light">Shop From All Categories</span>
          </h2>
          <Link 
            href="/product" 
            className="group flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest font-bold border-b border-brand-secondary/20 pb-1 hover:border-brand-secondary transition-all"
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
          <CarouselContent className="-ml-4 md:-ml-6">
            {isLoading ? (
              // Responsive Skeleton State
              [...Array(4)].map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="animate-pulse">
                    <div className="aspect-[4/5] bg-brand-accent/30 rounded-lg" />
                    <div className="mt-4 space-y-2">
                      <div className="h-4 bg-brand-accent/30 rounded w-3/4" />
                      <div className="h-3 bg-brand-accent/30 rounded w-1/2" />
                    </div>
                  </div>
                </CarouselItem>
              ))
            ) : (
              products.map((product) => (
                <CarouselItem
                  key={product._id}
                  /* Mobile: 85% width (shows peak of next item)
                     Tablet: 50% width (2 items)
                     Desktop: 25% width (4 items)
                  */
                  className="pl-4 md:pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/4"
                >
                  <Link
                    href={`/product/${product.category}/${product._id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/5] bg-[#f8f8f8] overflow-hidden rounded-xl md:rounded-2xl shadow-sm">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-brand-secondary/90 backdrop-blur-sm px-2 py-1 rounded-md">
                        <span className="w-1 h-1 bg-brand-primary rounded-full animate-pulse" />
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-brand-primary">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1 md:space-y-1.5 px-1">
                      <h3 className="text-sm md:text-base font-medium line-clamp-1 group-hover:text-brand-secondary transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-baseline flex-wrap gap-2">
                        <span className="text-sm md:text-base font-black">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>

                        <span className="text-[10px] md:text-xs text-gray-500 line-through">
                          ₹{product.mrp.toLocaleString("en-IN")}
                        </span>

                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                        </span>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))
            )}
          </CarouselContent>

          {/* Minimalist Navigation Controls - Hidden on mobile for swipe ease, visible on md+ */}
          <div className="hidden md:flex justify-end gap-3 mt-12">
            <CarouselPrevious className="static h-12 w-12 cursor-pointer rounded-full border border-brand-secondary/10 bg-transparent text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300 translate-y-0" />
            <CarouselNext className="static h-12 w-12 cursor-pointer ounded-full border border-brand-secondary/10 bg-transparent text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300 translate-y-0" />
          </div>

          {/* Mobile Swipe Indicator (Optional but helpful) */}
          <div className="flex md:hidden justify-center mt-6">
             <div className="h-1 w-20 bg-brand-secondary/10 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-brand-secondary/40 rounded-full" />
             </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TrendingProducts;