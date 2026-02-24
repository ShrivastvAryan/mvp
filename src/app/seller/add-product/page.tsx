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

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
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
      formData.append("image", image);

      const res = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      alert("Product added successfully");

      // Reset form
      setForm({
        name: "",
        category: "",
        mrp: "",
        price: "",
        stock: "",
        description: "",
      });
      setImage(null);

    } catch (error: any) {
      alert(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#D7CEBC] text-[#2F3523] px-10 py-8">
      <div className="flex items-center gap-3 mb-6">
        <PackagePlus size={24} />
        <h1 className="text-2xl font-semibold">
          Add <span className="opacity-60">Product</span>
        </h1>
      </div>

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
              name="mrp"
              value={form.mrp}
              onChange={handleChange}
              className="soft-input"
            />
          </div>

          {/* Selling Price */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2F3523]/70">
              Selling Price
            </label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              className="soft-input"
            />
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2F3523]/70">
              Available Units
            </label>
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="soft-input"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#2F3523]/70">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="soft-input"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-[#2F3523]/70">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="soft-input"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2F3523] text-[#FBFAF7] py-3 rounded-xl font-semibold hover:bg-[#3F4A2C] transition disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;