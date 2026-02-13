"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("user");

  const userType =
    role === "seller" || role === "buyer" ? role : "buyer";

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    sellername: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload =
      userType === "buyer"
        ? {
            role: "buyer",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            password: formData.password,
          }
        : {
            role: "seller",
            sellername: formData.sellername,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            password: formData.password,
          };

    console.log(payload);

    // Call API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign Up as {userType === "seller" ? "Seller" : "Buyer"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* STEP 1 */}
          {step === 1 && (
            <>
              {userType === "buyer" ? (
                <div className="flex flex-col gap-1">
                  <label>Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border rounded-lg px-4 py-2"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <label>Seller Name</label>
                  <input
                    name="sellername"
                    value={formData.sellername}
                    onChange={handleChange}
                    required
                    className="border rounded-lg px-4 py-2"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-4 py-2"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                Next
              </button>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <div className="flex flex-col gap-1">
                <label>Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-4 py-2"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-4 py-2"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-4 py-2"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/2 bg-gray-300 py-2 rounded-lg"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="w-1/2 bg-blue-600 text-white py-2 rounded-lg"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;
