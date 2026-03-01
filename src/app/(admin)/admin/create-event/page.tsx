"use client";

import React, { useState } from "react";
import { PackagePlus, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AddEvent = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    address: "",
    date: "",
    time: "",
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

    if (images.length + selectedFiles.length > 1) {
      toast.error("You can upload a maximum of 1 image");
      return;
    }
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
      formData.append("address", form.address);
      formData.append("date", form.date);
      formData.append("time", form.time);
      images.forEach((file) => formData.append("images", file));

      const res = await fetch("/api/event", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add event');

      toast.success("Event added successfully");
      setForm({ name: "", category: "", address: "", date: "", time: "" });
      setImages([]);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full ml-24 bg-[#D7CEBC] text-[#2F3523] px-4 sm:px-6 md:px-10 py-6 md:py-10 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-center md:justify-start gap-3 mb-8 md:mb-12">
        <PackagePlus size={28} />
        <h1 className="text-2xl md:text-3xl font-black tracking-tighter italic">
          Add <span className="opacity-40 font-medium">Event</span>
        </h1>
      </div>

      {/* Form Container */}
      <div className="bg-[#F0E8D8] border border-[#2F3523]/15 rounded-[2rem] p-6 md:p-12 max-w-5xl mx-auto md:mx-0 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-6"
        >
          {/* Event Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
              Event Name
            </label>
            <input
              name="name"
              placeholder="e.g. Artisan Pottery Workshop"
              value={form.name}
              onChange={handleChange}
              className="soft-input w-full bg-[#D7CEBC]/20 border-[#2F3523]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2F3523]/40 transition-all"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
              Event Category
            </label>
            <input
              name="category"
              placeholder="e.g. Workshop"
              value={form.category}
              onChange={handleChange}
              className="soft-input w-full bg-[#D7CEBC]/20 border-[#2F3523]/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#2F3523]/40 transition-all"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
              Full Address
            </label>
            <input
              name="address"
              placeholder="Enter venue details"
              value={form.address}
              onChange={handleChange}
              className="soft-input w-full bg-[#D7CEBC]/20 border-[#2F3523]/10 rounded-xl px-4 py-3"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="soft-input w-full bg-[#D7CEBC]/20 border-[#2F3523]/10 rounded-xl px-4 py-3 cursor-pointer"
            />
          </div>

          {/* Time */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
              Event Time
            </label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="soft-input w-full bg-[#D7CEBC]/20 border-[#2F3523]/10 rounded-xl px-4 py-3 cursor-pointer"
            />
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-3 md:col-span-2 pt-4">
            <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 ml-1">
              Event Cover Image
            </label>

            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={images.length >= 1}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
              />
              <div className="w-full border-2 border-dashed border-[#2F3523]/20 rounded-2xl py-10 flex flex-col items-center justify-center gap-2 group-hover:border-[#2F3523]/40 transition-colors bg-[#D7CEBC]/10">
                <Upload className="opacity-40" size={24} />
                <p className="text-xs font-bold opacity-60">Click to upload cover photo</p>
              </div>
            </div>

            {/* Preview Grid */}
            {images.length > 0 && (
              <div className="flex justify-center md:justify-start mt-4">
                {images.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-full max-w-[300px] aspect-video rounded-2xl overflow-hidden shadow-md group"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg hover:bg-red-600 transition-all cursor-pointer z-20"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 pt-8">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2F3523] text-[#FBFAF7] py-7 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-[#3F4A2C] transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Publishing Event..." : "Save Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;