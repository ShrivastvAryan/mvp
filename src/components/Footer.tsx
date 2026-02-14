"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Twitter, Mail, ArrowRight, MapPin, Phone } from "lucide-react";

export default function Footer() {
    const pathname = usePathname();

  // Hide navbar on seller routes
  if (pathname.startsWith("/seller")) {
    return null;
  }
  
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { name: "All Products", href: "/products" },
      { name: "New Arrivals", href: "/products?sort=newest" },
      { name: "Featured Art", href: "/products?category=featured" },
      { name: "Special Events", href: "/event" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Become a Seller", href: "/login?user=seller" },
      { name: "Contact Us", href: "/contact" },
      { name: "Careers", href: "/careers" },
    ],
    Support: [
      { name: "Shipping Policy", href: "/shipping" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "FAQs", href: "/faq" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  return (
    <footer className="bg-brand-secondary text-brand-primary border-t border-brand-primary/10">
      {/* Newsletter Section */}
      

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <Link href="/" className="text-3xl font-black tracking-tighter hover:opacity-70 transition-opacity">
              Logo<span className="text-brand-primary/30">.</span>
            </Link>
            <p className="opacity-70 text-sm leading-relaxed max-w-sm font-medium">
              Celebrating the soul of craftsmanship. We connect world-class artisans with those who value the beauty of handmade traditions.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <Link key={idx} href="#" className="p-3 rounded-xl bg-brand-primary/5 hover:bg-brand-primary hover:text-brand-secondary transition-all group">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h4 className="font-black uppercase tracking-widest text-xs mb-6 opacity-40">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-bold opacity-70 hover:opacity-100 hover:text-brand-primary hover:translate-x-1 inline-block transition-all"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-brand-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 text-center md:text-left">
            <span className="flex items-center gap-2">
              <MapPin size={14} /> Global Artisan Hub
            </span>
            <span className="flex items-center gap-2">
              <Phone size={14} /> +1 (234) 567-890
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} /> hello@yourbrand.com
            </span>
          </div>
          
          <p className="text-[10px] font-black opacity-40 tracking-[0.2em] uppercase">
            © {currentYear} YOUR BRAND. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}