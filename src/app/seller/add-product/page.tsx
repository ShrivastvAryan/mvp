"use client";

import React, { useState } from "react";
import { PackagePlus } from "lucide-react";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    mrp: "",
    price: "",
    stock: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    /* PRIMARY BEIGE BACKGROUND (same as first image) */
    <div className="min-h-screen w-full bg-[#D7CEBC] text-[#2F3523] px-10 py-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <PackagePlus size={24} className="text-[#2F3523]" />
        <h1 className="text-2xl font-semibold">
          Add <span className="opacity-60">Product</span>
        </h1>
      </div>

      {/* Card */}
      <div className="bg-[#F0E8D8] border border-[#2F3523]/25 rounded-2xl p-10 max-w-6xl">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-7"
        >
          {/* Product Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2F3523]/70">
              Product Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Handmade Ceramic Vase"
              className="soft-input"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2F3523]/70">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="soft-input"
            >
              <option value="">Select Category</option>
              <option>Pottery</option>
              <option>Textiles</option>
              <option>Kitchen</option>
            </select>
          </div>

          {/* MRP */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2F3523]/70">
              MRP
            </label>
            <input
              type="number"
              name="mrp"
              value={form.mrp}
              onChange={handleChange}
              placeholder="0.00"
              className="soft-input"
            />
          </div>

          {/* Selling Price */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2F3523]/70">
              Selling Price
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              className="soft-input"
            />
          </div>

          {/* Available Units */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2F3523]/70">
              Available Units
            </label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="0"
              className="soft-input"
            />
          </div>

          {/* spacer to keep layout */}
          <div />

          {/* Description */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-[#2F3523]/70">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief product details..."
              className="soft-input"
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              className="w-full bg-[#2F3523] text-[#FBFAF7] py-3 rounded-xl font-semibold hover:bg-[#3F4A2C] transition"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
