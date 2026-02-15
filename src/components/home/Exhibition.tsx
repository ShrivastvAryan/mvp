"use client";

import React from 'react';
import { Calendar, MapPin, Ticket, ArrowRight, ArrowLeft } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Exhibition = () => {
  const exhibitions = [
    { id: 1, title: "Ancient Clay & Modern Hands", date: "Oct 12-15", location: "Kyoto Hall", status: "Live", image: "🏺" },
    { id: 2, title: "The Silk Weavers Guild", date: "Nov 02-05", location: "Grand Atrium", status: "Upcoming", image: "🧵" },
    { id: 3, title: "Sustainable Woodcraft", date: "Dec 10-12", location: "Green Plaza", status: "Upcoming", image: "🪵" },
    { id: 4, title: "Indigo: Soul of Blue", date: "Jan 15-20", location: "Creative Hub", status: "Upcoming", image: "🎨" },
    { id: 5, title: "Glass Blowing Mastery", date: "Feb 05-08", location: "Venice Studio", status: "Upcoming", image: "🍷" },
    { id: 6, title: "Metal & Fire Expo", date: "Mar 12-15", location: "Iron Works", status: "Upcoming", image: "⚒️" },
    { id: 7, title: "The Paper Trail", date: "Apr 20-22", location: "Library Annex", status: "Upcoming", image: "📜" },
    { id: 8, title: "Stone Carving Gala", date: "May 10-14", location: "Heritage Park", status: "Upcoming", image: "🗿" },
  ];

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3">
        
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-brand-secondary tracking-tighter">
            Events & <span className="italic font-serif font-medium">Exhibitions</span>
          </h1>
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
            {exhibitions.map((item) => (
             <CarouselItem
  key={item.id}
  className="pl-4 md:basis-1/2 lg:basis-1/4"
>
  <div className="flex flex-col bg-brand-secondary h-[450px]  border border-brand-primary/5 overflow-hidden">

    {/* Visual Area */}
    <div className="min-h-[200px] bg-brand-primary/5 flex items-center justify-center relative">
      <div className="text-4xl transition-transform duration-700 ease-out">
        {item.image}
      </div>

      <div className="absolute top-6 left-6">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
            item.status === "Live"
              ? "bg-red-500 text-white animate-pulse"
              : "bg-brand-primary text-brand-secondary"
          }`}
        >
          {item.status}
        </span>
      </div>
    </div>

    {/* Content Area */}
   <div className="p-6 flex flex-col h-full">
  <div>
    <div className="flex items-center gap-2 text-[10px] font-black text-brand-primary/40 uppercase tracking-widest mb-4">
      <Calendar size={12} />
      {item.date}
    </div>

    <h3 className="text-xl font-bold text-brand-primary leading-tight line-clamp-2 mb-3">
      {item.title}
    </h3>

    <div className="flex items-center gap-2 text-sm font-medium text-brand-primary/60 mb-3">
      <MapPin size={14} className="opacity-40" />
      {item.location}
    </div>
  </div>

  <button className="mt-auto w-full flex items-center justify-center gap-2 py-4 bg-brand-primary text-brand-secondary rounded-2xl text-xs font-black transition-all hover:opacity-90 active:scale-95">
    <Ticket size={16} />
    Get to Know More
  </button>
</div>

  </div>
</CarouselItem>

            ))}
          </CarouselContent>

          {/* Custom Styled Controls */}
          <div className="flex justify-center gap-4 mt-12">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border-2 border-brand-primary/10 bg-brand-secondary text-brand-primary hover:scale-105 transition-all" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border-2 border-brand-primary/10 bg-brand-secondary text-brand-primary hover:scale-105 transition-all" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Exhibition;