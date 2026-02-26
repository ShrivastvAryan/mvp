"use client";

import React from "react";
import { Mail, MapPin, PenTool, Send, MessageCircle } from "lucide-react";

const ContactPage = () => {
  return (
    // BG: Warm Stone (#D7CEBC) | TEXT: Deep Sage (#2F3523)
    <main className="min-h-screen bg-[#D7CEBC] text-[#2F3523] selection:bg-[#2F3523] selection:text-[#D7CEBC]">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        
        {/* Header Section */}
        <header className="max-w-3xl mb-8 mt-24">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 block mb-4">
            Direct Communication
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic mb-8">
            Let&apos;s <span className="opacity-40">Connect</span>
          </h1>
          <p className="text-xl md:text-2xl font-serif italic opacity-70 leading-relaxed border-l-2 border-[#2F3523]/20 pl-6">
            "Thoughtful words, just like handcrafted work, build the bridge between artisan and admirer."
          </p>
        </header>

        {/* Horizontal Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Column: Context & Info */}
          <div className="space-y-10">
            <div className="space-y-6 text-lg leading-relaxed opacity-80">
              <p className="font-medium">
                Every handmade piece begins with intention — and so does every
                message we receive. Whether you have feedback, questions, or
                ideas to share, we value hearing from you.
              </p>
              <p className="font-medium">
                Your thoughts help us grow, improve, and continue supporting
                artisan communities through meaningful, handcrafted work.
              </p>
            </div>

            {/* Visual Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-[#2F3523]/5 rounded-3xl border border-[#2F3523]/10">
                <Mail size={20} className="mb-4 opacity-40" />
                <h4 className="text-[10px] uppercase tracking-widest font-black opacity-40 mb-1">Email Us</h4>
                <p className="font-bold text-sm">support@yourbrand.com</p>
              </div>
              <div className="p-6 bg-[#2F3523]/5 rounded-3xl border border-[#2F3523]/10">
                <MapPin size={20} className="mb-4 opacity-40" />
                <h4 className="text-[10px] uppercase tracking-widest font-black opacity-40 mb-1">Our Reach</h4>
                <p className="font-bold text-sm">Pan-India Artisan Network</p>
              </div>
            </div>
          </div>

          {/* Right Column: Blended Feedback Form */}
          <div className="relative group">
            {/* Card: Deep Sage Green (#2F3523) */}
            <div className="rounded-[3rem] bg-[#2F3523] text-[#D7CEBC] p-10 md:p-14 shadow-2xl border border-white/5">
              
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 rounded-2xl bg-[#D7CEBC]/10 flex items-center justify-center backdrop-blur-md">
                  <PenTool size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight italic">Share Feedback</h3>
                  <p className="text-[10px] uppercase tracking-widest font-black opacity-40 mt-1">Direct to Studio</p>
                </div>
              </div>

              <form className="space-y-6">
                {/* Message Input */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-black ml-1 opacity-50">
                    Your Message
                  </label>
                  <div className="relative group/input">
                    <MessageCircle className="absolute left-4 top-6 opacity-30 group-focus-within/input:opacity-100 transition-opacity" size={18} />
                    <textarea
                      rows={5}
                      placeholder="Share your thoughts with us..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all placeholder:text-white/20 text-sm resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button: Warm Stone (#D7CEBC) */}
                <button
                  type="submit"
                  className="w-full bg-[#D7CEBC] text-[#2F3523] py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 cursor-pointer hover:shadow-2xl hover:shadow-[#D7CEBC]/20 active:scale-[0.98] transition-all"
                >
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>

            {/* Background Decorative Accent */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#2F3523]/10 rounded-full blur-3xl -z-10" />
          </div>

        </div>
      </div>
    </main>
  );
};

export default ContactPage;