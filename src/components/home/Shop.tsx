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
import { Product, fetchProducts } from "@/store/getProduct";
import { useQuery } from "@tanstack/react-query";

const TrendingProducts = () => {

  const {data: products = [],isLoading,refetch,error} = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <section className="bg-brand-primary py-24 text-brand-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-brand-secondary mb-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.5em] mb-4">
            ALL CHOICE
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-brand-secondary mb-6">
          <span className="italic font-serif font-light text-brand-secondary">Shop From All Categories</span>
          </h2>
          <Link 
            href="/product" 
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
          {isLoading ? (
  <CarouselContent className="-ml-4">
    {[...Array(4)].map((_, index) => (
      <CarouselItem
        key={index}
        className="pl-8 md:basis-1/2 lg:basis-1/4"
      >
        <div className="animate-pulse">
          <div className="aspect-[4/5] bg-brand-accent/60 rounded-sm" />
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-brand-accent/60 rounded w-3/4" />
            <div className="h-3 bg-brand-accent/60 rounded w-1/2" />
          </div>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
) : (
  <CarouselContent className="-ml-4">
    {products.map((product) => (
      <CarouselItem
        key={product._id}
        className="pl-8 md:basis-1/2 lg:basis-1/4"
      >
        <Link
          href={`/product/${product.category}/${product._id}`}
          className="group block"
        >
          <div className="group cursor-pointer">
            <div className="relative aspect-[4/5] bg-[#f8f8f8] overflow-hidden rounded-sm">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-brand-secondary px-2 py-1 rounded-sm">
                <span className="w-1 h-1 bg-brand-primary rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              <h3 className="text-sm font-medium line-clamp-1">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold">
                  ₹{product.price.toLocaleString()}
                </span>

                <span className="text-xs text-gray-600 line-through">
                  ₹{product.mrp.toLocaleString()}
                </span>

                <span className="text-[10px] font-bold text-emerald-600">
                  {Math.round(
                    ((product.mrp - product.price) / product.mrp) * 100
                  )}
                  % OFF
                </span>
              </div>
            </div>
          </div>
        </Link>
      </CarouselItem>
    ))}
  </CarouselContent>
)}

          {/* Minimalist Navigation Controls */}
          <div className="flex justify-center md:justify-end gap-3 mt-12">
            <CarouselPrevious className="static cursor-pointer translate-y-0 h-12 w-12 rounded-full border border-white/10 bg-transparent text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300" />
            <CarouselNext className="static cursor-pointer translate-y-0 h-12 w-12 rounded-full border border-white/10 bg-transparent text-brand-secondary hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TrendingProducts;