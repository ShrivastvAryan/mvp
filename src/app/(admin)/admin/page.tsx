"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        sessionStorage.setItem("admin_auth", "true");
        toast.success("Signed in successfully");
        router.push("/admin/home");
      } else {
        toast.error("Invalid credentials");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-md bg-white/40 backdrop-blur-xl border border-brand-accent/40 rounded-2xl px-10 py-12 shadow-[0_8px_48px_rgba(47,53,35,0.12)]">
        <h1 className="text-center text-[1.65rem] font-bold tracking-tight text-brand-secondary font-serif mb-6">
          Admin Portal
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            className="w-full px-4 py-2.5 rounded-xl border border-brand-accent/50 bg-brand-primary/30 text-brand-secondary text-sm outline-none"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-xl border border-brand-accent/50 bg-brand-primary/30 text-brand-secondary text-sm outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-3 cursor-pointer rounded-xl bg-brand-secondary text-brand-primary text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}