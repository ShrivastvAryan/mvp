"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  // 🔥 Check cookie on mount
  useEffect(() => {
    setIsAuth(document.cookie.includes("isAuthenticated=true"));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    setIsAuth(false);
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="text-xl font-semibold text-gray-900">
            YourLogo
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="nav-link">
              Products
            </Link>

            <Link href="/about" className="nav-link">
              About Us
            </Link>

            <Link href="/contact" className="nav-link">
              Contact Us
            </Link>

            {isAuth ? (
              <button
                onClick={handleLogout}
                className="nav-link text-red-500"
              >
                Logout
              </button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="nav-link outline-none">
                  Login
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem asChild>
                    <Link href="/login?user=buyer">
                      Login as User
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/login?user=seller">
                      Login as Seller
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link href="/products" className="mobile-link" onClick={() => setOpen(false)}>
              Products
            </Link>

            <Link href="/become-seller" className="mobile-link" onClick={() => setOpen(false)}>
              Become a Seller
            </Link>

            <Link href="/about" className="mobile-link" onClick={() => setOpen(false)}>
              About Us
            </Link>

            <Link href="/contact" className="mobile-link" onClick={() => setOpen(false)}>
              Contact Us
            </Link>

            <div className="border-t pt-4">
              {isAuth ? (
                <button
                  onClick={handleLogout}
                  className="mobile-link text-red-500"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login?user=buyer"
                    className="mobile-link"
                    onClick={() => setOpen(false)}
                  >
                    Login as User
                  </Link>

                  <Link
                    href="/login?user=seller"
                    className="mobile-link"
                    onClick={() => setOpen(false)}
                  >
                    Login as Seller
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
