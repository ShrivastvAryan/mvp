"use client";

import React from 'react';
import Link from 'next/link';

const Categories = () => {
  const categories = [
    { 
      name: "Pottery & Ceramics", 
      href: "/products/pottery",
      image: "/car-1.jpg" 
    },
    { 
      name: "Textiles & Weaving", 
      href: "/products/textiles",
      image: "/caraousel-1.webp" 
    },
    { 
      name: "Kitchen & Dining", 
      href: "/products/kitchen",
      image: "/img-6.jpg" 
    },
    { 
      name: "Jewelry & Gems", 
      href: "/products/jewelry",
      image: "/img-1.jpg" 
    },
    { 
      name: "Home Decor", 
      href: "/products/home",
      image: "/img-7.jpg" 
    },
    { 
      name: "Woodworking", 
      href: "/products/wood",
      image: "/img-8.jpg" 
    },
    { 
      name: "Paper & Arts", 
      href: "/products/paper",
      image: "/img-9.jpg" 
    },
    { 
      name: "Tools & Kits", 
      href: "/products/kits",
      image: "/pic-1.jpg" 
    },
  ];

  return (
    <section className="bg-brand-primary/10 py-6 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 text-center text-brand-secondary">
          <span className="text-xs font-black uppercase tracking-[0.4em] block mb-4">
            Curated Collections
          </span>
          <h1 className="text-5xl md:text-6xl font-black  tracking-tighter">
            Browse by <span className="italic font-serif font-medium">Category</span>
          </h1>
        </div>

        {/* 4-Item Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm transition-all duration-700"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />

              {/* Centered Label (Matches your image) */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-brand-accent text-black px-8 py-4 shadow-xl transition-all duration-500">
                  <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] whitespace-nowrap">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
       
      </div>
    </section>
  );
};

export default Categories;