"use client";

import React from 'react';
import { Heart, Sparkles, Users, Leaf, PenTool } from 'lucide-react';
import Image from 'next/image';

const AboutPage = () => {
  const philosophy = [
    { icon: <PenTool size={18} />, text: "Honouring traditional art & craft" },
    { icon: <Heart size={18} />, text: "Celebrating handmade over mass-produced" },
    { icon: <Users size={18} />, text: "Working directly with artisans" },
    { icon: <Leaf size={18} />, text: "Using natural, sustainable materials" },
    { icon: <Sparkles size={18} />, text: "Embracing imperfections as beauty" },
  ];

  return (
    <main className="min-h-screen flex justify-center items-center bg-brand-primary/10 text-brand-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 md:py-24">
        
        {/* Layout Grid: Stacks on mobile, splits on LG screens */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 items-center">

          {/* Left Side: Content Card */}
          <div className="p-8 md:p-14 w-full lg:w-[60%] rounded-[2rem] md:rounded-[3rem] border text-brand-secondary border-brand-primary/5 relative overflow-hidden bg-white/5 backdrop-blur-sm order-2 lg:order-1">
            {/* Subtle brand accent ornament */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16" />
            
            <header className="relative z-10">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold opacity-50 block mb-2 text-center lg:text-left">Our Story</span>
              <h1 className="text-3xl md:text-5xl font-black leading-tight text-center lg:text-left">
                About <span className="text-brand-secondary underline decoration-brand-primary/20 decoration-4 md:decoration-8 underline-offset-4">Us</span>
              </h1>
              
              <blockquote className="mt-6 border-l-4 border-brand-primary pl-4 md:pl-6 italic text-lg md:text-2xl font-medium opacity-80 leading-snug">
                "Crafted by Hands. Connected by Heart"
              </blockquote>
            </header>

            <div className="mt-8 md:mt-10 space-y-4 md:space-y-6 text-brand-secondary/80 leading-relaxed text-sm md:text-lg">
              <p>
                <span className="font-black text-brand-secondary">Art and craft</span> celebrate the beauty of creating by hand. Every piece reflects the 
                skill, patience, and creativity of artisans who transform natural materials into meaningful 
                objects.
              </p>

              <p>
                In a world of mass production, handmade art stands apart—carrying stories, traditions, and the unique touch of its maker. These are not just products, but living traditions passed down through generations.
              </p>

              <p>
                The slight variations in handmade pieces are what make them truly special, reminding us that they are shaped by human hands, not machines. When you choose handmade, you invest in craftsmanship that values people over speed.
              </p>
            </div>
            
            {/* Philosophy Section */}
            <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-brand-primary/10">
              <h3 className="text-[10px] md:text-sm uppercase tracking-widest font-black mb-6 opacity-60">Our Craft Philosophy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {philosophy.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="p-2 md:p-3 rounded-lg bg-brand-primary/5 text-brand-secondary group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-xs md:text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Visual Element */}
          <div className="relative group w-full max-w-[450px] lg:max-w-none lg:w-[40%] order-1 lg:order-2">
            {/* Decorative background squares - subtle on mobile */}
            <div className="absolute -inset-4 border-2 border-brand-primary/10 rounded-[2.5rem] md:rounded-[3rem] -rotate-2 md:-rotate-3 group-hover:rotate-0 transition-transform duration-500 hidden sm:block" />
            <div className="absolute -inset-4 border-2 border-brand-primary/5 rounded-[2.5rem] md:rounded-[3rem] rotate-2 md:rotate-3 group-hover:rotate-0 transition-transform duration-500 hidden sm:block" />
            
            <div className="relative aspect-[4/5] mt-24 lg:mt-0 w-full bg-brand-secondary rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src="/about.webp"
                alt="Artisan Showcase"
                fill
                className="object-cover rounded-[2rem] md:rounded-2xl transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Floating Badge */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-brand-secondary/90 backdrop-blur-md p-4 md:p-6 rounded-2xl border border-white/20 shadow-lg">
                <p className="text-[10px] md:text-xs font-bold text-brand-primary uppercase tracking-tighter opacity-50 mb-1">Preserving Heritage</p>
                <p className="text-xs md:text-sm font-medium leading-tight italic text-brand-primary">
                  Supporting 50+ local artisan communities worldwide.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
};

export default AboutPage;