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
    image: "/car-1.jpg",
  },
  {
    id: 2,
    image: "/img-3.jpg",
  },
  {
    id: 3,
    image: "/img-5.jpg",
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
            <div className="relative h-[500px] w-full overflow-hidden">
              <Image
                src={slide.image}
                alt=""
                fill
                quality={80}
                className="object-cover"
                priority={slide.id === 1}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                {/* <h2 className="text-white text-4xl font-bold">
                  {slide.title}
                </h2> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
