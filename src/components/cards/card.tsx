import React from 'react'
import { Product } from '@/store/getProduct'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { calculateDiscount } from '@/utils/discount'

const Card = ({ products }: { products: Product[] }) => {
  return (
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <Link href={`/product/${product.category}/${product._id}`} key={product._id}>
          <div key={product._id} className="group cursor-pointer">
            <div className="relative aspect-[4/5] bg-white/40 overflow-hidden mb-5 border border-white/20 rounded-sm">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
           
                <div className="absolute top-4 left-4 bg-brand-secondary text-brand-primary text-[9px] font-black px-2 py-1 tracking-widest uppercase">
                  {product.category}
                </div>
            
              <div className="absolute bottom-0 left-0 right-0 bg-brand-secondary backdrop-blur-sm py-4 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <button className="text-[10px] text-brand-primary font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 w-full">
                   <ShoppingBag size={14} /> View
                </button>
              </div>
            </div>

           <div className="mt-4 space-y-1.5">
    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
      {product.name}
    </h3>
    
    <div className="flex items-baseline gap-2">
      <span className="text-base font-bold text-gray-900">
        ₹{product.price.toLocaleString()}
      </span>
     
        <span className="text-xs text-gray-600 line-through">
          ₹{product.mrp.toLocaleString()}
        </span>
    
      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight">
        {calculateDiscount(product.mrp, product.price).toFixed(0)}% OFF
      </span>
    </div>
  </div>
          </div>
          </Link>
        ))}
      </div>
  )
}

export default Card