"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  User,
  Store,
  Mail,
  Phone,
  MapPin,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("user");
  const userType =
    role === "seller" || role === "buyer" ? role : "buyer";

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🔥 TanStack Mutation
  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
          role: userType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    },

    onSuccess: (data) => {
      console.log("Registered:", data);
      login({ email: formData.email, role: userType });
      // 🔥 Redirect based on role
      if (userType === "seller") {
        router.push("/seller/dashboard");
      } else {
        router.push("/");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate();
  };

  return (
    <div className=" min-h-screen flex items-center justify-center my-20">
      <div className="w-full max-w-md">
        <div className="bg-[#2F3523] text-[#D7CEBC] shadow-2xl rounded-2xl p-8">

          {/* Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-[#D7CEBC]/10 mb-6">
              {userType === "seller" ? (
                <Store size={36} />
              ) : (
                <User size={36} />
              )}
            </div>

            <h1 className="text-4xl font-black italic">
              Join as <span className="opacity-50">{userType}</span>
            </h1>

            <p className="text-[10px] uppercase tracking-[0.3em] font-black opacity-40">
              Step {step} of 2
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">

                <div>
                  <label className="text-xs opacity-50">
                    {userType === "buyer"
                      ? "Full Name"
                      : "Business Name"}
                  </label>

                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="text-xs opacity-50">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-[#D7CEBC] hover:cursor-pointer text-[#2F3523] py-3 mt-2 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  Next<ArrowRight size={22} />
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">

                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                />

                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Address"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                />

                {/* Error UI */}
                {registerMutation.isError && (
                  <p className="text-red-400 text-sm">
                    {(registerMutation.error as Error).message}
                  </p>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-white/5 border hover:cursor-pointer border-white/10 py-3 rounded-xl"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="flex-[2] bg-[#D7CEBC] text-[#2F3523] hover:cursor-pointer py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    {registerMutation.isPending
                      ? "Creating..."
                      : "Sign Up"} <ArrowRight size={22} />
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 pt-6 border-t border-brand-primary/10">
            <Link
              href={`/login?user=${userType}`}
              className="flex items-center justify-center gap-3"
            >
              <ShieldCheck size={18} />
              <span className="text-sm font-bold opacity-60">
                Already have an account? Login Here
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
