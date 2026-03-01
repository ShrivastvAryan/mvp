"use client";

import React from 'react';
import { Calendar, MapPin, ArrowRight, Sparkles, Clock, Ticket } from 'lucide-react';
import { Event } from '@/store/getEvent';
import { fetchEvents } from '@/store/getEvent';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const EventsPage = () => {
 
const { data: events, isLoading, error } = useQuery<Event[]>({
  queryKey: ['events'],
  queryFn: fetchEvents,
});

const getEventStatus = (eventDate: string) => {
  const today = new Date();
  const eventDay = new Date(eventDate);

  // Remove time for accurate day comparison
  today.setHours(0, 0, 0, 0);
  eventDay.setHours(0, 0, 0, 0);

  if (eventDay.getTime() === today.getTime()) return "Live";
  if (eventDay > today) return "Upcoming";
  return "Ended";
};


if (isLoading) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-accent border-t-brand-secondary rounded-full animate-spin"></div>
    </div>
  );
}
    
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {events?.map((event) => (
            <div key={event._id} className="group relative bg-[#2F3523] text-[#D7CEBC] cursor-pointer rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-3">
              
              {/* Image Area: Mix-blend on Stone background inside the card */}
            
             <div className="relative aspect-square bg-[#D7CEBC] m-3 rounded-[2rem] overflow-hidden">
                <Image
                  src={event.images?.[0] || "/placeholder.jpg"}
                  alt={event.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover mix-blend-multiply opacity-90 transition-transform duration-1000 "
                />

                {/* Status Badge */}
                <div className="absolute top-5 left-5">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      getEventStatus(event.date) === "Live"
                        ? "bg-red-500 text-white animate-pulse"
                        : "bg-[#2F3523] text-[#D7CEBC]"
                    }`}
                  >
                    {getEventStatus(event.date)}
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
                  {event.name}
                </h3>

                <div className="space-y-2 mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold opacity-60">
                    <MapPin size={14} className="opacity-40" />
                    {event.address}
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