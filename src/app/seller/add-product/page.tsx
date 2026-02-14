"use client";

import React, { useState } from 'react';
import { 
  PackagePlus, 
  Tag, 
  IndianRupee, 
  AlignLeft, 
  Layers, 
  Boxes, 
  FileText,
  UploadCloud,
  ArrowRight
} from 'lucide-react';

const AddProduct = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#dcd7c9] flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl w-full bg-[#3d4432] rounded-[3rem] p-10 md:p-16 shadow-2xl border border-white/5">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-[#dcd7c9]/10 text-[#dcd7c9] mb-6 backdrop-blur-md">
            <PackagePlus size={40} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter italic text-[#dcd7c9]">Add New <span className="opacity-50">Product</span></h1>
          <p className="text-sm font-medium text-[#dcd7c9]/50 uppercase tracking-[0.2em] mt-2">Product Schema: Artisan Collection</p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Product Name */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[#dcd7c9]/50 ml-1">Product Name</label>
            <div className="relative group">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-[#dcd7c9] group-focus-within:opacity-100 transition-opacity" size={18} />
              <input 
                type="text" 
                placeholder="e.g. Handmade Ceramic Vase"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all text-[#dcd7c9] placeholder:text-[#dcd7c9]/20"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[#dcd7c9]/50 ml-1">Category</label>
            <div className="relative group">
              <Layers className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-[#dcd7c9] group-focus-within:opacity-100 transition-opacity" size={18} />
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all text-[#dcd7c9] appearance-none cursor-pointer">
                <option className="bg-[#3d4432]">Select Category</option>
                <option className="bg-[#3d4432]">Pottery</option>
                <option className="bg-[#3d4432]">Kitchen & Dining</option>
                <option className="bg-[#3d4432]">Textiles</option>
              </select>
            </div>
          </div>

          {/* MRP */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[#dcd7c9]/50 ml-1">MRP (Gross Price)</label>
            <div className="relative group">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-[#dcd7c9] group-focus-within:opacity-100 transition-opacity" size={18} />
              <input 
                type="number" 
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all text-[#dcd7c9] placeholder:text-[#dcd7c9]/20"
              />
            </div>
          </div>

          {/* Selling Price */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[#dcd7c9]/50 ml-1">Selling Price</label>
            <div className="relative group">
              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-[#dcd7c9] group-focus-within:opacity-100 transition-opacity" size={18} />
              <input 
                type="number" 
                placeholder="0.00"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all text-[#dcd7c9] placeholder:text-[#dcd7c9]/20"
              />
            </div>
          </div>

          {/* Units / Stock */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[#dcd7c9]/50 ml-1">Available Units</label>
            <div className="relative group">
              <Boxes className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-[#dcd7c9] group-focus-within:opacity-100 transition-opacity" size={18} />
              <input 
                type="number" 
                placeholder="Available quantity"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all text-[#dcd7c9] placeholder:text-[#dcd7c9]/20"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[#dcd7c9]/50 ml-1">Short Description</label>
            <div className="relative group">
              <AlignLeft className="absolute left-4 top-6 opacity-30 text-[#dcd7c9] group-focus-within:opacity-100 transition-opacity" size={18} />
              <textarea 
                rows={3}
                placeholder="Briefly describe your product..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all text-[#dcd7c9] placeholder:text-[#dcd7c9]/20 resize-none"
              />
            </div>
          </div>

          {/* Full Details */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-[#dcd7c9]/50 ml-1">Detailed Specifications</label>
            <div className="relative group">
              <FileText className="absolute left-4 top-6 opacity-30 text-[#dcd7c9] group-focus-within:opacity-100 transition-opacity" size={18} />
              <textarea 
                rows={5}
                placeholder="Materials, sizing, care instructions, etc..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all text-[#dcd7c9] placeholder:text-[#dcd7c9]/20 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 pt-6 flex flex-col sm:flex-row gap-4">
            <button 
              type="submit"
              className="flex-1 bg-[#dcd7c9] text-[#3d4432] py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] transition-all"
            >
              Confirm & Save Product
              <ArrowRight size={18} />
            </button>
            <button 
              type="button"
              className="px-8 py-5 border-2 border-white/10 rounded-2xl font-black text-sm tracking-[0.2em] uppercase text-[#dcd7c9] hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;