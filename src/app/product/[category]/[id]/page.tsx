"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/store/getProduct";
import { fetchProductById } from "@/store/getProduct";
import { calculateDiscount } from "@/utils/discount";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

const Page = () => {

  const { id, category } = useParams<{ id: string; category: string }>();

 const { data: product, isLoading, error } = useQuery<Product>({
  queryKey: ["product", category, id],
  queryFn: () => fetchProductById(id, category),
  enabled: !!id && !!category,
});

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

useEffect(() => {
  if (product?.images?.length) {
    setSelectedImage(product.images[0]);
  }
}, [product]);

const handleAddToCart = () => {
  if (!product) return;

  const existingCart = localStorage.getItem("cart");
  const cart = existingCart ? JSON.parse(existingCart) : [];

  const existingItemIndex = cart.findIndex(
    (item: any) => item.productId === product._id
  );

  if (existingItemIndex !== -1) {
    // If already exists → increase quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.images[0],
      quantity: quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));

  toast.success("Added to cart!");
};


 if (isLoading) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-accent border-t-brand-secondary rounded-full animate-spin"></div>
    </div>
  );
}


  return (
  <div className="flex justify-center px-4 md:px-6 py-12 md:py-32 bg-brand-primary">
    <main className="max-w-6xl w-full mt-24 md:mt-0">
      
      {/* Breadcrumb - Hidden on very small screens or wrapped */}
      <nav className="text-xs md:text-sm text-brand-secondary/70 mb-6 md:min-h-[40px] font-medium tracking-wide">
        Home / {category} /{" "}
        <span className="text-brand-secondary font-semibold">
          {product?.name}
        </span>
      </nav>

      {/* Layout: Stacks on mobile (1 col), Grids on desktop (2 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* LEFT: Image Section */}
      {/* LEFT: Image Section */}
<div className="flex flex-col md:flex-row gap-4 md:gap-6">
  
  {/* Main Image - Now appears first on mobile */}
  <div className="relative w-full h-[350px] sm:h-[450px] md:h-[520px] md:flex-1 bg-brand-accent/30 rounded-3xl md:rounded-4xl shadow-xl border border-brand-secondary/10 overflow-hidden order-1 md:order-2">
    {selectedImage ? (
      <Image
        src={selectedImage}
        alt="product-main-image"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    ) : (
      /* Fallback if no image is selected */
      <div className="w-full h-full flex items-center justify-center opacity-20">
        <ShoppingBag size={48} />
      </div>
    )}
  </div>

  {/* Thumbnails - Now appears second on mobile */}
  <div className="flex flex-row md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 order-2 md:order-1">
    {product?.images.slice(0, 4).map((img: string, index: number) => (
      <div
        key={index}
        onClick={() => setSelectedImage(img)}
        className={`relative flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 ${
          selectedImage === img 
            ? "ring-2 ring-brand-secondary shadow-md" 
            : "ring-1 ring-brand-secondary/10 opacity-70"
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
</div>

        {/* RIGHT: Details */}
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-secondary leading-tight md:leading-snug">
            {product?.name}
          </h1>

          {/* Price & Discount */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-4 md:mt-6">
            <p className="text-xl md:text-2xl font-bold text-brand-secondary">
              ₹ {product?.price}
            </p>
            <p className="text-base md:text-lg text-brand-secondary/50 line-through">
              ₹{product?.mrp}
            </p>
            <span className="bg-brand-secondary text-brand-primary text-[10px] md:text-xs px-3 py-1 rounded-full font-semibold">
              {calculateDiscount(product?.mrp || 0, product?.price || 0).toFixed(0)}% OFF
            </span>
          </div>

          {/* Quantity Selection */}
          <div className="mt-8">
            <p className="text-sm font-semibold mb-3 text-brand-secondary">
              Quantity
            </p>

            <div className="flex items-center w-fit border border-brand-secondary/30 rounded-xl overflow-hidden bg-brand-primary shadow-sm">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="px-4 py-2 hover:bg-brand-accent/40 transition-colors cursor-pointer"
              >
                −
              </button>

              <span className="px-6 py-2 border-x border-brand-secondary/30 font-medium min-w-[3rem] text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-brand-accent/40 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 md:mt-10 flex flex-col gap-4">
            <button
              onClick={handleAddToCart}
              className="w-full bg-brand-secondary text-brand-primary py-4 rounded-2xl font-bold tracking-wide hover:opacity-95 active:scale-[0.98] transition-all duration-200 shadow-lg cursor-pointer"
            >
              ADD TO CART
            </button>
          </div>

          {/* About Section */}
          <div className="mt-8 border-t border-brand-secondary/20 pt-8">
            <h3 className="text-lg font-semibold text-brand-secondary mb-4">
              About This Craft
            </h3>

            <p className="text-brand-secondary/80 leading-relaxed text-sm md:text-base">
              {product?.description}
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
);
};

export default Page;
