"use client";

import React from 'react';
import { Calendar, MapPin, ArrowRight, Sparkles, Clock, Ticket } from 'lucide-react';

const EventsPage = () => {
  const fakeEvents = [
    {
      id: 1,
      title: "The Solstice Pottery Workshop",
      date: "MAR 12, 2026",
      time: "10:00 AM",
      location: "Studio 4, Kyoto Hall",
      price: "Rs. 2,500",
      image: "https://images.unsplash.com/photo-1525498128493-380d1990a112?q=80&w=500",
      status: "Limited Seats"
    },
    {
      id: 2,
      title: "Indigo Dyeing: Ancient Secrets",
      date: "APR 05, 2026",
      time: "02:00 PM",
      location: "The Heritage Garden",
      price: "Rs. 1,800",
      image: "https://images.unsplash.com/photo-1558270156-4b586c595597?q=80&w=500",
      status: "Live"
    },
    {
      id: 3,
      title: "Hand-Block Printing Gala",
      date: "MAY 20, 2026",
      time: "11:30 AM",
      location: "Creative Hub Annex",
      price: "Rs. 3,200",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=500",
      status: "Upcoming"
    },
    {
      id: 4,
      title: "Modern Woodcraft Expo",
      date: "JUN 15, 2026",
      time: "09:00 AM",
      location: "Grand Exhibition Hall",
      price: "Free Entry",
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=500",
      status: "Upcoming"
    },
    
  ];

  return (
    // BG: Warm Stone (#D7CEBC)
    <main className="min-h-screen mt-20 bg-[#D7CEBC] text-[#2F3523] py-24 px-6 md:px-12 selection:bg-[#2F3523] selection:text-[#D7CEBC]">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Editorial Header */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-[#2F3523]/10 pb-12">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 block mb-4">
              Curated Gatherings — 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic mb-6">
              Our <span className="opacity-40">Events</span>
            </h1>
            <p className="text-lg font-medium opacity-70 leading-relaxed italic">
              "Experience the magic of creation first-hand through workshops and live artisan showcases."
            </p>
          </div>
        </header>

        {/* 4-Item Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
          {fakeEvents.map((event) => (
            <div key={event.id} className="group relative bg-[#2F3523] text-[#D7CEBC] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-3">
              
              {/* Image Area: Mix-blend on Stone background inside the card */}
              <div className="relative aspect-square bg-[#D7CEBC] m-3 rounded-[2rem] overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Status Badge */}
                <div className="absolute top-5 left-5">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    event.status === 'Live' ? 'bg-red-500 text-white animate-pulse' : 'bg-[#2F3523] text-[#D7CEBC]'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8">
                <div className="flex items-center gap-2 text-[10px] font-black opacity-50 uppercase tracking-[0.2em] mb-4">
                  <Calendar size={12} />
                  {event.date} — {event.time}
                </div>
                
                <h3 className="text-xl font-black tracking-tight leading-tight mb-6 h-14 line-clamp-2">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold opacity-60">
                    <MapPin size={14} className="opacity-40" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold opacity-60">
                    <Clock size={14} className="opacity-40" />
                    Workshop / 3 Hours
                  </div>
                </div>

                {/* Footer Action */}
                {/* <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="text-lg font-black tracking-tighter">
                    {event.price}
                  </div>
                  <button className="bg-[#D7CEBC] text-[#2F3523] p-3 rounded-xl hover:scale-110 active:scale-95 transition-all">
                    <Ticket size={18} />
                  </button>
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Client Stat Bar */}
        {/* <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#2F3523] text-[#D7CEBC] p-12 rounded-[3rem]">
           <div className="text-center md:text-left">
              <h4 className="text-4xl font-black mb-1">12+</h4>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Monthly Workshops</p>
           </div>
           <div className="text-center md:text-left border-y md:border-y-0 md:border-x border-white/10 py-8 md:py-0 md:px-8">
              <h4 className="text-4xl font-black mb-1">450+</h4>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Creative Participants</p>
           </div>
           <div className="text-center md:text-left md:pl-8">
              <h4 className="text-4xl font-black mb-1">50+</h4>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Master Artisans</p>
           </div>
        </div> */}

      </div>
    </main>
  );
};

export default EventsPage;