"use client";

import React, { useState } from "react";
import { Loader2, PackagePlus, Upload, X } from "lucide-react";
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
  /* 1. lg:pl-72: Adds space for the sidebar only on large screens.
     2. pt-24: Adds top padding on mobile to stay below the fixed mobile header.
     3. ml-0: Removed the fixed ml-24.
  */
  <div className="w-full lg:pl-72 bg-[#D7CEBC] text-[#2F3523] px-4 sm:px-8 md:px-12 py-8 pt-24 lg:pt-12 min-h-screen transition-all duration-300">
    
    {/* Header */}
    <div className="flex items-center justify-center lg:justify-start gap-3 mb-10 md:mb-14">
      <div className="p-3 bg-[#2F3523] text-[#D7CEBC] rounded-2xl shadow-lg rotate-3">
        <PackagePlus size={24} />
      </div>
      <h1 className="text-3xl md:text-4xl font-black tracking-tighter italic">
        Add <span className="opacity-40 font-medium">Event</span>
      </h1>
    </div>

    {/* Form Container */}
    <div className="bg-[#F0E8D8] border border-[#2F3523]/15 rounded-[2.5rem] p-6 md:p-10 lg:p-14 max-w-5xl shadow-xl shadow-[#2F3523]/5">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-6 md:gap-y-8"
      >
        {/* Event Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 ml-1">
            Event Name
          </label>
          <input
            name="name"
            placeholder="e.g. Artisan Pottery Workshop"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-[#D7CEBC]/20 border border-[#2F3523]/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#2F3523]/20 focus:border-[#2F3523]/40 transition-all placeholder:opacity-30 text-sm font-medium"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 ml-1">
            Event Category
          </label>
          <input
            name="category"
            placeholder="e.g. Workshop"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-[#D7CEBC]/20 border border-[#2F3523]/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#2F3523]/20 focus:border-[#2F3523]/40 transition-all placeholder:opacity-30 text-sm font-medium"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 ml-1">
            Full Address
          </label>
          <input
            name="address"
            placeholder="Enter venue details"
            value={form.address}
            onChange={handleChange}
            className="w-full bg-[#D7CEBC]/20 border border-[#2F3523]/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#2F3523]/20 focus:border-[#2F3523]/40 transition-all placeholder:opacity-30 text-sm font-medium"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 ml-1">
            Event Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full bg-[#D7CEBC]/20 border border-[#2F3523]/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#2F3523]/20 transition-all cursor-pointer text-sm font-medium"
          />
        </div>

        {/* Time */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 ml-1">
            Event Time
          </label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full bg-[#D7CEBC]/20 border border-[#2F3523]/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#2F3523]/20 transition-all cursor-pointer text-sm font-medium"
          />
        </div>

        {/* Image Upload Area */}
        <div className="flex flex-col gap-3 md:col-span-2 pt-4">
          <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 ml-1">
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
            <div className={`
              w-full border-2 border-dashed border-[#2F3523]/20 rounded-[2rem] py-12 flex flex-col items-center justify-center gap-3 transition-all duration-300
              ${images.length >= 1 ? "opacity-50" : "group-hover:border-[#2F3523]/50 group-hover:bg-[#2F3523]/5 bg-[#D7CEBC]/10"}
            `}>
              <div className="p-4 bg-white/50 rounded-full text-[#2F3523]/60 group-hover:scale-110 transition-transform duration-300">
                <Upload size={24} strokeWidth={1.5} />
              </div>
              <p className="text-xs font-bold opacity-60">
                Click or drag cover photo
              </p>
            </div>
          </div>

          {/* Preview Container - Scaled for mobile */}
          {images.length > 0 && (
            <div className="flex justify-center md:justify-start mt-6 animate-in fade-in zoom-in duration-300">
              {images.map((file, index) => (
                <div
                  key={index}
                  className="relative w-full sm:w-[350px] aspect-video rounded-[1.5rem] overflow-hidden shadow-2xl group border-4 border-white"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-3 right-3 bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-red-600 active:scale-90 transition-all cursor-pointer z-20"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 pt-10">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2F3523] text-[#FBFAF7] py-8 rounded-[2rem] font-black uppercase text-[10px] md:text-xs tracking-[0.4em] hover:bg-[#3F4A2C] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-[#2F3523]/20 cursor-pointer flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Publishing...
              </>
            ) : (
              "Save & Publish Event"
            )}
          </Button>
        </div>
      </form>
    </div>
  </div>
);
};

export default AddEvent;