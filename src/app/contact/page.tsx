"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const sendMessage = async (content: string) => {
  const res = await fetch("/api/contact", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send message");
  return data;
};

const ContactPage = () => {
  const [message, setMessage] = useState("");

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      toast.success("Message sent successfully");
      setMessage("");
    },
    onError: (error: any) => toast.error(error.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }
    mutation.mutate(message);
  };

  return (
    <main className="min-h-screen bg-[#D7CEBC] text-[#2F3523] selection:bg-[#2F3523] selection:text-[#D7CEBC]">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 lg:py-32">
        
        {/* Simplified Header */}
        <header className="mb-12 md:mb-20">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight mb-6">
            Get in <span className="italic font-serif opacity-60">touch</span>
          </h1>
          <p className="max-w-md text-base md:text-lg opacity-70 font-normal leading-relaxed">
            Have a question about our artisans or your order? <br className="hidden md:block" />
            Our team is here to assist you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left: Contact Details (More minimal) */}
          <div className="lg:col-span-4 space-y-12 order-2 lg:order-1">
            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-40 mb-3">Email</h4>
                <p className="text-lg md:text-xl font-medium border-b border-[#2F3523]/10 pb-2 w-fit">
                  support@yourbrand.com
                </p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-40 mb-3">Location</h4>
                <p className="text-lg md:text-xl font-medium">New Delhi, India</p>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-[11px] font-medium opacity-50 uppercase tracking-widest leading-loose italic">
                Typical response time: <br />
                Within 24 Hours
              </p>
            </div>
          </div>

          {/* Right: Refined Form */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <form 
              onSubmit={handleSubmit} 
              className="bg-[#2F3523] text-[#D7CEBC] p-8 md:p-12 rounded-[1.5rem] md:rounded-[2rem] shadow-sm space-y-8"
            >
              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold opacity-50 block ml-1">
                  Your Message
                </label>

                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you today?"
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-[#D7CEBC] transition-all placeholder:text-[#D7CEBC]/30 text-lg resize-none rounded-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="group inline-flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] py-2 border-b border-[#D7CEBC]/40 hover:border-[#D7CEBC] transition-all disabled:opacity-50"
                >
                  {mutation.isPending ? "Sending" : "Send Inquiry"}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ContactPage;