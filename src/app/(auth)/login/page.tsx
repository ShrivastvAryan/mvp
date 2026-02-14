"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Mail, Lock, ArrowRight, Store, User, ShieldCheck } from "lucide-react";
import Link from "next/link";

const LoginContent = () => {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("user");
  const userType = role === "seller" || role === "buyer" ? role : "buyer";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...formData, role: userType }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || "Login failed");
        return;
      }
      login({ email: formData.email, role: userType });
      router.push("/");
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d flex items-center my-28 justify-center bg-brand-primary/10 text-brand-primary px-4">
      <div className="w-full max-w-md">
        {/* Form Card */}
        <div className="bg-brand-secondary shadow-2xl rounded-[2.5rem] p-8 border border-brand-primary/5">
          
          {/* Header */}
          <div className="text-center mb-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-brand-primary text-brand-secondary mb-6 shadow-xl shadow-brand-primary/20">
              {userType === "seller" ? <Store size={40} /> : <User size={40} />}
            </div>
            <h1 className="text-3xl font-black tracking-tight mb-2">Login</h1>
            <p className="text-sm font-medium opacity-60">
              Access your <span className="text-brand-primary uppercase tracking-wider text-xs font-bold">{userType}</span> dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold ml-1 opacity-70">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:opacity-100 transition-opacity" size={20} />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="hello@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-brand-primary/5 border-2 border-transparent rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-primary/20 focus:bg-transparent transition-all placeholder:text-brand-primary/30"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs uppercase tracking-widest font-bold opacity-70">Password</label>
                <Link href="#" className="text-xs font-bold hover:underline opacity-50 hover:opacity-100">Forgot?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 group-focus-within:opacity-100 transition-opacity" size={20} />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-brand-primary/5 border-2 border-transparent rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-brand-primary/20 focus:bg-transparent transition-all placeholder:text-brand-primary/30"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary text-brand-secondary py-3 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-brand-primary/30 hover:-translate-y-1 active:scale-[0.97] transition-all disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="w-3 h-3 border-3 border-brand-secondary/30 border-t-brand-secondary rounded-full animate-spin" />
              ) : (
                <>
                  Continue
                  <ArrowRight size={22} />
                </>
              )}
            </button>
          </form>

          {/* Role Switcher Footer */}
          <div className="mt-5 pt-8 border-t border-brand-primary/10">
            <Link 
              href={`/login?user=${userType === "seller" ? "buyer" : "seller"}`}
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl border-2 border-brand-primary/5 hover:border-brand-primary/20 transition-all group"
            >
              <ShieldCheck size={18} className="opacity-40 group-hover:text-brand-primary transition-colors" />
              <span className="text-sm font-bold opacity-60">
                Don't have an account? Register Here
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-primary/10" />}>
      <LoginContent />
    </Suspense>
  );
}