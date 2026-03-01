'use client'
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';



export const ADMIN_EMAIL = "admin@gmail.com";
export const ADMIN_PASSWORD = "admin123";

const FakeLogin = ({ onLogin }: { onLogin: () => void }) => {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("admin-auth", "true");
      router.push("/admin");
      onLogin();
    } else {
      setError("Wrong credentials");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-[#D7CEBC]">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-[400px] space-y-6">
        <h2 className="text-3xl font-bold text-[#2F3523]">
          Admin Login
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#2F3523]/20 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#2F3523]/20 outline-none"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm font-semibold">{error}</p>
        )}

      
        <button
          onClick={handleLogin}
          className="w-full bg-[#2F3523] cursor-pointer text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};
export default FakeLogin;