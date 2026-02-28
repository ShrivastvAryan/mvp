"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X, ChevronDown, LogOut, User, Store, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();

  // Hide navbar on seller routes
  if (pathname.startsWith("/seller")) {
    return null;
  }
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    logout();
    window.location.href = "/";
  };

  // remove Category from static links so we can render it as a dropdown
  const navLinks = [
    { name: "Events", href: "/event" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // fake category items to demonstrate dropdown
  const categoryItems = [
    { name: "Wooden-Handicraft" },
    { name: "Textile" },
    { name: "Pottery" },
    { name: "Home-Decor" },
  ];

  const [categoryOpen, setCategoryOpen] = useState(false);


  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-500 ">
      <nav
        className={cn(
          "w-full mx-auto transition-all duration-300 border border-white/10",
          "bg-brand-secondary/80 backdrop-blur-md text-brand-primary shadow-sm py-4 px-8",
          
        )}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
           <Image
              src="/logo.png"
              alt="YourLogo"
              width={100}
              height={20}
              priority
              className="object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1 cursor-pointer">
            {/* Category dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="group flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-brand-primary/10 transition-all duration-200">
                Category
                <ChevronDown size={14} className="group-data-[state=open]:rotate-180 transition-transform" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 p-2 rounded-xl border-none shadow-xl bg-brand-secondary">
                {categoryItems.map((item) => (
                  <DropdownMenuItem
                    asChild
                    key={item.name}
                    className="focus:bg-brand-primary/10 text-brand-primary rounded-lg cursor-pointer p-3"
                  >
                    <Link href={`/product/${item.name}`} className="font-medium">
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-brand-primary/10 transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}

            <div className="w-[1px] h-6 bg-brand-primary/20 mx-3" />

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-primary hover:cursor-pointer rounded-lg transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="group flex items-center gap-2 bg-brand-primary text-brand-secondary px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:cursor-pointer">
                  Login/Register
                  <ChevronDown size={14} className="group-data-[state=open]:rotate-180 transition-transform" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border-none shadow-xl bg-brand-secondary">
                  <DropdownMenuItem asChild className="focus:bg-brand-primary/10 rounded-lg cursor-pointer p-3">
                    <Link href="/login?user=buyer" className="flex items-center gap-3 font-medium">
                      <div className="p-2 bg-brand-primary rounded-md text-brand-secondary"><User size={16} /></div>
                      <div className="text-brand-primary">
                        <p className="text-sm">Login as User</p>
                        <p className="text-[10px] opacity-60">Personal account</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="focus:bg-brand-primary/10 rounded-lg cursor-pointer p-3">
                    <Link href="/login?user=seller" className="flex items-center gap-3 font-medium">
                      <div className="p-2 bg-brand-primary rounded-md text-brand-secondary"><Store size={16} /></div>
                      <div className="text-brand-primary">
                        <p className="text-sm">Login as Seller</p>
                        <p className="text-[10px] opacity-60">Business account</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 rounded-xl bg-brand-primary/5 text-brand-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
          )}
        >
          <div className="flex flex-col gap-2 pb-6">
            {/* mobile category toggle */}
            <button
              className="flex items-center justify-between p-4 rounded-xl hover:bg-brand-primary/5 text-lg font-medium"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              Category
              <ChevronDown
                size={20}
                className={cn("transition-transform", categoryOpen && "rotate-180")}
              />
            </button>
            {categoryOpen && (
              <div className="flex flex-col pl-4">
                {categoryItems.map((item) => (
                  <Link
                    key={item.name}
                    href={`/product/${item.name}`}
                    onClick={() => {
                      setIsOpen(false);
                      setCategoryOpen(false);
                    }}
                    className="py-2 text-base font-medium hover:text-brand-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-brand-primary/5 text-lg font-medium"
              >
                {link.name}
                <ArrowRight size={16} className="opacity-40" />
              </Link>
            ))}
            <div className="h-[1px] bg-brand-primary/10 my-2" />
            {!isAuthenticated ? (
               <div className="grid grid-cols-2 gap-3 mt-2">
                 <Link href="/login?user=buyer" className="text-center py-3 rounded-xl border border-brand-primary/20 text-sm font-bold">User Login</Link>
                 <Link href="/login?user=seller" className="text-center py-3 rounded-xl bg-brand-primary text-brand-secondary text-sm font-bold">Seller Login</Link>
               </div>
            ) : (
              <button onClick={handleLogout} className="w-full text-left p-4 font-bold">Logout</button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}