"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Store,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
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

  // Hide navbar on seller/admin routes
  if (pathname.startsWith("/seller") || pathname.startsWith("/admin")) {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const { isAuthenticated, logout } = useAuth();

  /* ---------------- CART SYNC ---------------- */
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = localStorage.getItem("cart");
      if (!storedCart) {
        setCartCount(0);
        return;
      }

      const parsed = JSON.parse(storedCart);
      const total = parsed.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0
      );

      setCartCount(total);
    };

    updateCartCount(); // initial load

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
    logout();
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Events", href: "/event" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const categoryItems = [
    { name: "Wooden-Handicraft" },
    { name: "Textile" },
    { name: "Pottery" },
    { name: "Home-Decor" },
  ];

  return (
    <header className="fixed top-0 w-full z-50">
      <nav className="w-full bg-brand-secondary/80 backdrop-blur-md text-brand-primary border border-white/10 py-4 px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={20}
              priority
            />
          </Link>

          {/* ---------------- DESKTOP NAV ---------------- */}
          <div className="hidden md:flex items-center gap-1">

            {/* Category Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-brand-primary/10">
                Category
                <ChevronDown size={14} />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="w-48 p-2 bg-brand-secondary border-none shadow-xl z-[100]"
              >
                {categoryItems.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    asChild
                    className="rounded-lg p-3 cursor-pointer text-brand-primary focus:bg-brand-primary/10"
                  >
                    <Link href={`/product/${item.name}`}>
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Static Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-brand-primary/10"
              >
                {link.name}
              </Link>
            ))}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative px-4 py-2 rounded-lg hover:bg-brand-primary/10 transition"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-[2px] rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="w-[1px] h-6 bg-brand-primary/20 mx-3" />

            {/* Auth */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer font-medium"
              >
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center cursor-pointer gap-2 bg-brand-primary text-brand-secondary px-6 py-2.5 rounded-xl font-bold text-sm">
                  Login/Register
                  <ChevronDown size={14} />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 p-2 bg-brand-secondary border-none shadow-xl"
                >
                  <DropdownMenuItem asChild className="p-3 rounded-lg text-brand-primary cursor-pointer">
                    <Link href="/login?user=buyer" className="flex gap-3">
                      <User size={16} />
                      Login as User
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild className="p-3 rounded-lg text-brand-primary cursor-pointer">
                    <Link href="/login?user=seller" className="flex gap-3">
                      <Store size={16} />
                      Login as Seller
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* ---------------- MOBILE TOGGLE ---------------- */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ---------------- MOBILE MENU ---------------- */}
        {isOpen && (
          <div className="md:hidden mt-6 flex flex-col gap-2 pb-6">

            {/* Category Toggle */}
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex justify-between p-4 font-medium"
            >
              Category
              <ChevronDown
                size={18}
                className={cn(categoryOpen && "rotate-180")}
              />
            </button>

            {categoryOpen &&
              categoryItems.map((item) => (
                <Link
                  key={item.name}
                  href={`/product/${item.name}`}
                  onClick={() => setIsOpen(false)}
                  className="pl-6 py-2"
                >
                  {item.name}
                </Link>
              ))}

            {/* Other Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex justify-between p-4"
              >
                {link.name}
                <ArrowRight size={16} />
              </Link>
            ))}

            {/* Mobile Cart */}
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex justify-between p-4"
            >
              Cart
              <div className="relative">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            <div className="h-[1px] bg-brand-primary/10 my-2" />

            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login?user=buyer"
                  className="text-center py-3 border text-sm font-bold"
                >
                  User Login
                </Link>
                <Link
                  href="/login?user=seller"
                  className="text-center py-3 bg-brand-primary text-brand-secondary text-sm font-bold"
                >
                  Seller Login
                </Link>
              </div>
            ) : (
              <button onClick={handleLogout} className="p-4 font-bold cursor-pointer">
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}