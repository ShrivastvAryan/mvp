"use client";

import React, { useState } from "react";
import { PackagePlus } from "lucide-react";
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
    <div className=" w-full bg-[#D7CEBC] text-[#2F3523] px-10 py-4">
      <div className="flex items-center gap-3 mb-6">
        <PackagePlus size={24} />
        <h1 className="text-2xl font-semibold mt-2">
          Add <span className="opacity-60">Product</span>
        </h1>
      </div>

      <div className="bg-[#F0E8D8] border border-[#2F3523]/25 rounded-2xl p-10 max-w-6xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-4"
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
              <option >Wooden-Handicraft</option>
              <option >Textile</option>
              <option >Pottery</option>
              <option >Home-Decor</option>
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
          {/* Images Upload */}
<div className="flex flex-col gap-3 md:col-span-2">
  <label className="text-sm font-medium text-[#2F3523]/70">
    Product Images (Max 4)
  </label>

  <input
    type="file"
    accept="image/*"
    multiple
    onChange={handleImageChange}
    disabled={images.length >= 4}
    className="soft-input"
  />

  {/* Preview Grid */}
  {images.length > 0 && (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
      {images.map((file, index) => (
        <div
          key={index}
          className="relative group border rounded-lg overflow-hidden"
        >
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className="h-28 w-full object-cover"
          />

          <button
            type="button"
            onClick={() => removeImage(index)}
            className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
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
            <Button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#2F3523] cursor-pointer text-[#FBFAF7] py-3 rounded-xl font-semibold hover:bg-[#3F4A2C] transition disabled:opacity-50`}
            >
              {loading ? "Uploading..." : "Save Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;