"use client";

import React from "react";
import {
  Package,
  IndianRupee,
  ShoppingCart,
  TrendingUp,
  Plus,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductManage from "@/components/seller/ManageProducts";

const Seller = () => {
  const stats = [
    {
      title: "Total Products",
      value: 24,
      icon: <Package size={18} />,
    },
    {
      title: "Total Orders",
      value: 132,
      icon: <ShoppingCart size={18} />,
    },
    {
      title: "Revenue",
      value: "₹ 1,45,000",
      icon: <IndianRupee size={18} />,
    },
    {
      title: "Growth",
      value: "+18%",
      icon: <TrendingUp size={18} />,
    },
  ];

  return (
    <div className="min-h-screen bg-primary text-secondary px-10 py-8 space-y-14">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Seller <span className="opacity-60 italic">Dashboard</span>
          </h1>
          <p className="text-sm opacity-60">
            Overview of your store performance
          </p>
        </div>

        <Button className="bg-secondary text-primary px-5 py-2.5 rounded-xl hover:opacity-90">
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-secondary/5 border border-secondary/20 rounded-2xl"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-medium opacity-70">
                {stat.title}
              </CardTitle>
              <div className="opacity-60">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Manage Products Section */}
      <div className="space-y-6">
        {/* Heading */}
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <Package size={18} />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">
              Manage <span className="opacity-60">Products</span>
            </h2>
            <p className="text-sm opacity-60">
              View and manage all your listed products
            </p>
          </div>
        </div>

        {/* Table */}
        <ProductManage />
      </div>
    </div>
  );
};

export default Seller;
