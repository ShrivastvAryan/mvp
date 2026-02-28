"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/store/getProduct";
import { fetchProductById } from "@/store/getProduct";
import { calculateDiscount } from "@/utils/discount";
import Image from "next/image";

const Page = () => {

  const { id, category } = useParams<{ id: string; category: string }>();

 const { data: product, isLoading, error } = useQuery<Product>({
  queryKey: ["product", category, id],
  queryFn: () => fetchProductById(id, category),
  enabled: !!id && !!category,
});

  const [quantity, setQuantity] = useState(1);
   const [selectedImage, setSelectedImage] = useState(product?.images[0]);

 if (isLoading) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-accent border-t-brand-secondary rounded-full animate-spin"></div>
    </div>
  );
}


  return (
    <div className=" flex justify-center px-6 py-32">
      <main className="max-w-6xl w-full">

        {/* Breadcrumb */}
        <p className="text-sm text-brand-secondary/70 mb-10 font-medium tracking-wide">
          Home /{category} /{" "}
          <span className="text-brand-secondary font-semibold">
            {product?.name}
          </span>
        </p>

        {/* Layout */}
        <div className="grid grid-cols-2 gap-16">

          {/* LEFT: Image Section */}
       <div className="flex gap-6">
      {/* Thumbnails */}
      <div className="flex flex-col gap-4">
        {product?.images.slice(0, 4).map((img: string, index: number) => (
          <div
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`relative w-20 h-20 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 ${
              selectedImage === img ? "ring-2 ring-brand-accent/30" : ""
            }`}
          >
            <Image
              src={img}
              alt={`product-thumbnail-${index}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 h-[520px] bg-brand-accent/30 rounded-4xl shadow-xl border border-brand-secondary/10 overflow-hidden">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt="product-main-image"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>
    </div>

          {/* RIGHT: Details */}
          <div className="flex flex-col">

            {/* Title */}
            <h1 className="text-3xl font-bold text-brand-secondary leading-snug">
              {product?.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mt-6">
              <p className="text-2xl font-bold text-brand-secondary">
                ₹ {product?.price}
              </p>
              <p className="text-lg text-brand-secondary/50 line-through">
               ₹{product?.mrp}
              </p>
              <span className="bg-brand-secondary text-brand-primary text-xs px-3 py-1 rounded-full font-semibold">
                {calculateDiscount(product?.mrp || 0, product?.price || 0).toFixed(0)}% OFF
              </span>
            </div>

            {/* Tagline */}
            {/* <p className="mt-6 text-brand-secondary/80 italic">
              Handcrafted with love using sustainable natural fibres.
            </p> */}

            {/* Quantity */}
            <div className="mt-8">
              <p className="text-sm font-semibold mb-3 text-brand-secondary">
                Quantity
              </p>

              <div className="flex items-center w-fit border border-brand-secondary/30 rounded-xl overflow-hidden  bg-brand-primary">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="px-4 py-2 hover:bg-brand-accent/40 transition cursor-pointer"
                >
                  −
                </button>

                <span className="px-6 py-2 border-x border-brand-secondary/30 font-medium">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-brand-accent/40 transition cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col gap-4">

              {/* Primary Action */}
              <button className="w-full bg-brand-secondary text-brand-primary py-3 rounded-2xl font-semibold tracking-wide hover:opacity-90 transition-all duration-300 shadow-lg cursor-pointer">
                ADD TO CART
              </button>

              {/* Secondary */}
              {/* <button className="w-full border border-brand-secondary text-brand-secondary py-3 rounded-2xl font-semibold tracking-wide hover:bg-brand-secondary hover:text-brand-primary transition-all duration-300">
                BUY IT NOW
              </button> */}
            </div>

            {/* About Section */}
            <div className="mt-8 border-t border-brand-secondary/20 pt-8">
              <h3 className="text-lg font-semibold text-brand-secondary mb-4">
                About This Craft
              </h3>

              <p className="text-brand-secondary/80 leading-relaxed text-sm">
               {product?.description}
              </p>

              {/* <ul className="mt-4 text-sm text-brand-secondary/80 space-y-2 list-disc pl-5">
                <li>100% Handmade</li>
                <li>Eco-friendly materials</li>
                <li>Perfect for living rooms & studios</li>
              </ul> */}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
