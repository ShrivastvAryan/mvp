"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Premium Products",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 2,
    title: "Best Deals",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 3,
    title: "Fast Delivery",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  },
];

const Carousel = () => {
  return (
    <div className="w-full mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-125 w-full overflow-hidden">
             <Image
                    src={`${slide.image}?auto=format&fit=crop&w=1200&q=80`}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-white text-4xl font-bold">
                  {slide.title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
