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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Product:", form);
  };

  return (
    <div className="min-h-screen bg-primary text-secondary flex items-center justify-center px-4">

      <div className="w-full max-w-4xl space-y-8">

        {/* Heading */}
        <div className="flex items-center gap-3">
          <PackagePlus size={26} />
          <h1 className="text-2xl font-bold">
            Add <span className="opacity-60">Product</span>
          </h1>
        </div>

        {/* Form Container */}
        <div className="border border-secondary/20 rounded-xl p-8">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Product Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium opacity-70">
                Product Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Handmade Ceramic Vase"
                className="input-style"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium opacity-70">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input-style"
              >
                <option value="">Select Category</option>
                <option>Pottery</option>
                <option>Textiles</option>
                <option>Kitchen</option>
              </select>
            </div>

            {/* MRP */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium opacity-70">
                MRP
              </label>
              <input
                type="number"
                name="mrp"
                value={form.mrp}
                onChange={handleChange}
                placeholder="0.00"
                className="input-style"
              />
            </div>

            {/* Selling Price */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium opacity-70">
                Selling Price
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                className="input-style"
              />
            </div>

            {/* Stock */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium opacity-70">
                Available Units
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                className="input-style"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium opacity-70">
                Description
              </label>
              <textarea
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief product details..."
                className="input-style resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full bg-secondary text-primary font-semibold py-3 rounded-lg hover:opacity-90 transition"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Minimal Input Styling */}
      <style jsx>{`
        .input-style {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          color: inherit;
          outline: none;
          transition: border 0.2s ease;
        }
        .input-style:focus {
          border-color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AddProduct;
