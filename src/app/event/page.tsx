"use client";

import React from 'react';
import { Calendar, Users, Sparkles, PenTool, MapPin, ArrowRight } from 'lucide-react';

const EventsPage = () => {
  const eventHighlights = [
    { icon: <PenTool size={18} />, text: "Hands-on craft workshops" },
    { icon: <Users size={18} />, text: "Meet & learn from artisans" },
    { icon: <Sparkles size={18} />, text: "Live craft demonstrations" },
    { icon: <Calendar size={18} />, text: "Curated seasonal events" },
    { icon: <MapPin size={18} />, text: "Hosted across cultural spaces" },
  ];

  return (
    <main className="min-h-screen bg-brand-primary/10 text-brand-primary">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        
        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20">

          {/* Left Content Card */}
          <div className="bg-brand-secondary p-8 md:p-14 w-full lg:w-[60%] rounded-[3rem] shadow-xl border border-brand-primary/5 relative overflow-hidden">
            
            {/* Decorative Background Circle */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
            
            <header className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.3rem] opacity-50 block mb-2">
                Our Gatherings
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                Artisan <span className="text-brand-primary italic font-serif">Events</span>
              </h1>
              <p className="mt-6 text-lg opacity-70 leading-relaxed max-w-lg">
                Experience the magic of creation first-hand. Our events bring you closer to the heartbeat of traditional craftsmanship.
              </p>
            </header>

            {/* Highlights List */}
            <div className="mt-12 space-y-4 relative z-10">
              {eventHighlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-brand-primary text-brand-secondary group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-bold text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Visual / Stats */}
          <div className="w-full lg:w-[40%] space-y-6">
            <div className="bg-brand-primary text-brand-secondary p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                 <Sparkles size={100} />
               </div>
               <h2 className="text-5xl font-black mb-2">12+</h2>
               <p className="text-sm font-bold uppercase tracking-widest opacity-60">Upcoming Exhibitions</p>
               <div className="mt-8 pt-8 border-t border-brand-secondary/20 text-sm leading-relaxed opacity-80">
                 Join us in celebrating human creativity through workshops and live showcases.
               </div>
            </div>

            <div className="bg-brand-primary shadow-2xl p-8 rounded-[2rem] border border-brand-primary/10 flex items-center gap-6">
               <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center">
                  <MapPin size={32} className="text-brand-secondary/60" />
               </div>
               <div>
                  <h4 className="font-black text-brand-secondary/60">Local Venues</h4>
                  <p className="text-xs font-medium opacity-60 text-brand-secondary">Find an event near you.</p>
               </div>
            </div>
          </div>
        
        </div>
      </div>
    </main>
  );
};

export default EventsPage;