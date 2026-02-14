"use client";

import React from 'react';
import { Heart, Sparkles, Users, Leaf, PenTool } from 'lucide-react';

const AboutPage = () => {
  const philosophy = [
    { icon: <PenTool size={18} />, text: "Honouring traditional art & craft" },
    { icon: <Heart size={18} />, text: "Celebrating handmade over mass-produced" },
    { icon: <Users size={18} />, text: "Working directly with artisans" },
    { icon: <Leaf size={18} />, text: "Using natural, sustainable materials" },
    { icon: <Sparkles size={18} />, text: "Embracing imperfections as beauty" },
  ];

  return (
    <main className="min-h-screen justify-center items-center flex bg-brand-primary/10 text-brand-secondary">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        
        {/* Layout Grid */}
        <div className="flex flex-col md:flex-row justify-between gap-12 items-center">

          {/* Left Side: Content Card */}
          <div className=" p-8 md:p-14 w-[60%] rounded-[3rem] border text-brand-secondary border-brand-primary/5 relative overflow-hidden">
            {/* Subtle brand accent ornament */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16" />
            
            <header className="relative z-10">
              <span className="text-xs uppercase tracking-[0.3em] font-bold opacity-50 block mb-2">Our Story</span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                About <span className="text-brand-secondary underline decoration-brand-primary/20 decoration-8 underline-offset-4">Us</span>
              </h1>
              
              <blockquote className="mt-6 border-l-4 border-brand-primary pl-6 italic text-xl md:text-2xl font-medium opacity-80">
                "Crafted by Hands. Connected by Heart"
              </blockquote>
            </header>

            <div className="mt-10 space-y-6 text-brand-secondary/80 leading-relaxed text-base md:text-lg">
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
            <div className="mt-12 pt-10 border-t border-brand-primary/10">
              <h3 className="text-sm uppercase tracking-widest font-black mb-6">Our Craft Philosophy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {philosophy.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg bg-brand-primary/5 text-brand-secondary group-hover:bg-brand-primary group-hover:text-brand-secondary transition-all">
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Visual Element */}
          <div className="relative group w-[40%]">
            {/* Decorative background squares */}
            <div className="absolute -inset-4 border-2 border-brand-primary/10 rounded-[3rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500" />
            <div className="absolute -inset-4 border-2 border-brand-primary/5 rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-500" />
            
            <div className="relative aspect-[4/5] w-full bg-brand-secondary rounded-[2.5rem] overflow-hidden shadow-2xl">
              {/* Replace with actual <img> tag */}
              <div className="w-full h-full bg-brand-primary/10 flex flex-col items-center justify-center text-center p-10">
                <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mb-4">
                  <Sparkles size={40} className="text-brand-secondary opacity-40" />
                </div>
                <p className="text-brand-primary font-bold uppercase tracking-widest text-sm">Artisan Showcase Image</p>
              </div>

              {/* Float Badge */}
              <div className="absolute bottom-8 text-brand-primary left-8 right-8 bg-brand-secondary/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
                <p className="text-xs font-bold text-brand-primary uppercase tracking-tighter opacity-50 mb-1">Preserving Heritage</p>
                <p className="text-sm font-medium leading-tight italic">
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