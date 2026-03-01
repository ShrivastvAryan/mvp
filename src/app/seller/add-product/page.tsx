"use client";

import React, { useState } from "react";
import { PackagePlus, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    mrp: "",
    price: "",
    stock: "",
    description: "",
  });

const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;

  const selectedFiles = Array.from(e.target.files);

  if (images.length + selectedFiles.length > 4) {
    toast.error("You can upload a maximum of 4 images");
    return;
  }

  setImages((prev) => [...prev, ...selectedFiles]);
};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

   if (images.length === 0) {
  toast.error("Please upload at least one image");
  return;
}

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("mrp", form.mrp);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("description", form.description);
      images.forEach((file) => {
  formData.append("images", file);
});

      const res = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error('Failed to add product');
        throw new Error(data.message);
      }

      toast.success("Product added successfully");
      // Reset form
      setForm({
        name: "",
        category: "",
        mrp: "",
        price: "",
        stock: "",
        description: "",
      });
      setImages([]);

    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
  setImages((prev) => prev.filter((_, i) => i !== index));
};

  return (
  <div className="w-full bg-[#D7CEBC] text-[#2F3523] px-4 sm:px-6py-6 md:py-5 min-h-screen">
    {/* Header - Centered on mobile, left-aligned on desktop */}
    <div className="flex items-center justify-center md:justify-start gap-3 mb-8 md:mb-12">
      <PackagePlus size={28} className="text-[#2F3523]" />
      <h1 className="text-2xl md:text-3xl font-black tracking-tighter italic">
        Add <span className="opacity-40 font-medium">Product</span>
      </h1>
    </div>

    {/* Form Container */}
    <div className="bg-[#F0E8D8] border border-[#2F3523]/15 rounded-[2rem] p-6 md:p-12 max-w-5xl mx-auto md:mx-0 shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-6"
      >
        {/* Product Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
            Product Name
          </label>
          <input
            name="name"
            placeholder="e.g. Hand-carved Teak Vase"
            value={form.name}
            onChange={handleChange}
            className="soft-input w-full bg-[#D7CEBC]/20 border-[#2F3523]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2F3523]/40 transition-all"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="soft-input w-full bg-[#D7CEBC]/20 border-[#2F3523]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2F3523]/40 transition-all appearance-none cursor-pointer"
          >
            <option value="">Select Category</option>
            <option>Wooden-Handicraft</option>
            <option>Textile</option>
            <option>Pottery</option>
            <option>Home-Decor</option>
          </select>
        </div>

        {/* Price Row: Responsive flex for smaller screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:col-span-2 lg:col-span-1">
           <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
              MRP (₹)
            </label>
            <input
              name="mrp"

              value={form.mrp}
              onChange={handleChange}
              className="soft-input w-full bg-[#D7CEBC]/20 border-[#2F3523]/10 rounded-xl px-4 py-3"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
              Selling Price (₹)
            </label>
            <input
              name="price"

              value={form.price}
              onChange={handleChange}
              className="soft-input w-full bg-[#D7CEBC]/20 border-[#2F3523]/10 rounded-xl px-4 py-3 font-bold text-emerald-800"
            />
          </div>
        </div>

        {/* Stock */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
            Available Units
          </label>
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="soft-input w-full bg-[#D7CEBC]/20 border-[#2F3523]/10 rounded-xl px-4 py-3"
          />
        </div>

        {/* Images Upload - Full width on all screens */}
        <div className="flex flex-col gap-3 md:col-span-2 border-t border-[#2F3523]/5 pt-6 mt-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
            Product Images (Max 4)
          </label>

          <div className="relative group">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={images.length >= 4}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            />
            <div className="w-full border-2 border-dashed border-[#2F3523]/20 rounded-2xl py-8 flex flex-col items-center justify-center gap-2 group-hover:border-[#2F3523]/40 transition-colors">
               <Upload className="opacity-40" size={24} />
               <p className="text-xs font-bold opacity-60">Click or Drag to Upload</p>
            </div>
          </div>

          {/* Preview Grid: 2 columns on mobile, 4 on desktop */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {images.map((file, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-md group"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white w-7 h-7 flex items-center justify-center rounded-full shadow-lg hover:bg-red-600 transition-all cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
            Craftsman Story / Description
          </label>
          <textarea
            name="description"
            rows={5}
            value={form.description}
            onChange={handleChange}
            className="soft-input w-full bg-[#D7CEBC]/20 border-[#2F3523]/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-[#2F3523]/40 transition-all resize-none leading-relaxed"
            placeholder="Tell the story behind this piece..."
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 pt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2F3523] text-[#FBFAF7] py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-[#1c2115] hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Processing..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default AddProduct;