"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import {
  Mail,
  Lock,
  ArrowRight,
  Store,
  User,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const LoginContent = () => {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("user");
  const userType =
    role === "seller" || role === "buyer" ? role : "buyer";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔥 TanStack Mutation
  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: userType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Login failed!", { description: data.message });
        throw new Error(data.message || "Login failed");
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success("Login successful!", { description: "Redirecting..." });
      login({
        email: data.user.email,
        role: data.user.role,
      });

      if (data.user.role === "seller") {
        router.push("/seller");
      } else {
        router.push("/");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="flex items-center my-36 justify-center bg-brand-primary/10 text-brand-primary px-4">
      <div className="w-full max-w-md">
        <div className="bg-brand-secondary shadow-2xl rounded-2xl p-8 border border-brand-primary/5">

          {/* Header */}
          <div className="text-center mb-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-brand-primary text-brand-secondary mb-6">
              {userType === "seller" ? (
                <Store size={40} />
              ) : (
                <User size={40} />
              )}
            </div>

            <h1 className="text-3xl font-black mb-2">Login</h1>
            <p className="text-sm opacity-60">
              Access your{" "}
              <span className="uppercase text-xs font-bold">
                {userType}
              </span>{" "}
              dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="text-xs font-bold opacity-70">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={20} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-primary/5"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold opacity-70">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" size={20} />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-brand-primary/5"
                />
              </div>
            </div>

            {/* Error
            {loginMutation.isError && (
              <p className="text-red-500 text-sm">
                {(loginMutation.error as Error).message}
              </p>
            )} */}

            {/* Submit */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-brand-primary hover:cursor-pointer text-brand-secondary py-3 rounded-2xl font-black flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loginMutation.isPending ? (
                "Logging in..."
              ) : (
                <>
                  Continue <ArrowRight size={22} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-brand-primary/10">
            <Link
              href={`/signup?user=${userType}`}
              className="flex items-center justify-center gap-3"
            >
              <ShieldCheck size={18} />
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

export default LoginContent;
