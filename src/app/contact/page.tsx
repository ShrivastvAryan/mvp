"use client";

import React, { useState } from "react";
import { Send, ArrowRight } from "lucide-react";
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
      <div className="max-w-5xl mx-auto px-6 py-24 lg:py-40">
        
        {/* Minimalist Header */}
        <header className="mb-16">
          <h1 className="text-6xl font-black tracking-tighter leading-none mb-6">
            Get in <span className="opacity-40 italic font-medium tracking-normal">Touch</span>
          </h1>
          <p className="max-w-xl text-lg opacity-60 font-medium leading-relaxed border-l border-[#2F3523]/20 pl-6">
            Have a question about our artisans or your order? We are here to help.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Direct Details */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30 mb-2">Email</h4>
              <p className="text-xl font-bold tracking-tight">support@yourbrand.com</p>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-black opacity-30 mb-2">Location</h4>
              <p className="text-xl font-bold tracking-tight">New Delhi, India</p>
            </div>

            <div className="pt-6 border-t border-[#2F3523]/10">
              <p className="text-xs font-bold opacity-40 uppercase tracking-widest leading-loose">
                Response time:<br /> Within 24 Hours
              </p>
            </div>
          </div>

          {/* Right: Refined Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-[#2F3523] text-[#D7CEBC] p-10 rounded-[2.5rem] shadow-xl space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40">
                    Message
                  </label>
                </div>

                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#D7CEBC]/40 transition-all placeholder:text-[#D7CEBC]/20 text-md resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="group w-full bg-[#D7CEBC] text-[#2F3523] py-5 rounded-2xl font-black text-xs tracking-[0.3em] uppercase flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? "Sending..." : "Submit Inquiry"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ContactPage;