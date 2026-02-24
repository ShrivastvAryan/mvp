"use client";

import React from "react";
import { Mail, MapPin, PenTool } from "lucide-react";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-brand-primary/10 text-brand-secondary">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">

        {/* Header */}
        <header className="max-w-3xl mb-20 mt-12">
          <span className="text-xs uppercase tracking-[0.35em] font-bold opacity-50 block mb-4">
            Let&apos;s Connect
          </span>

          <h1 className="text-4xl md:text-5xl font-black inline-block border-b-2 border-brand-secondary pb-3">
            Contact Us
          </h1>

          <p className="mt-6 text-xl italic text-brand-secondary/70">
            Thoughtful words, just like handcrafted work.
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 ">

          {/* Left Content */}
          <div className="space-y-8 text-lg leading-relaxed text-brand-secondary/80">
            <p>
              Every handmade piece begins with intention — and so does every
              message we receive. Whether you have feedback, questions, or
              ideas to share, we value hearing from you.
            </p>

            <p>
              Your thoughts help us grow, improve, and continue supporting
              artisan communities through meaningful, handcrafted work.
            </p>

            {/* Contact Info */}
            <div className="pt-8 space-y-5 text-base">
              <div className="flex items-center gap-4">
                <Mail size={18} className="opacity-70" />
                <span>support@yourbrand.com</span>
              </div>

              <div className="flex items-center gap-4">
                <MapPin size={18} className="opacity-70" />
                <span>Working with artisan communities across India</span>
              </div>
            </div>
          </div>

          {/* Right: Feedback Form */}
          <div className="relative bg-red-600">
            <div className="rounded-[2.75rem] bg-brand-secondary text-brand-primary p-12 shadow-xl">

              <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center mb-8">
                <PenTool size={32} />
              </div>

              <h3 className="text-2xl font-bold mb-6">
                Share Your Feedback
              </h3>

              <form className="space-y-6">


                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share your thoughts with us..."
                    className="
                      w-full rounded-xl px-4 py-3
                      bg-brand-primary/10
                      border border-brand-primary/30
                      focus:outline-none focus:ring-2 focus:ring-brand-primary/40
                      text-brand-primary resize-none
                    "
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="
                    w-full py-4 mt-4
                    rounded-xl
                    border border-brand-primary
                    text-brand-primary font-semibold tracking-wide
                    hover:bg-brand-primary hover:text-brand-secondary
                    transition-all duration-300
                  "
                >
                  Send Message
                </button>

              </form>
            </div>

            {/* Decorative Accent */}
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-brand-primary/20 rounded-full -z-10" />
          </div>

        </div>
      </div>
    </main>
  );
};

export default ContactPage;
