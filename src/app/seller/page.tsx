"use client";

import React from "react";
import { Package, IndianRupee, ShoppingCart, TrendingUp, Plus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ProductManage from "@/components/seller/ManageProducts";

const Seller = () => {
  const stats = [
    {
      title: "Total Products",
      value: 24,
      icon: <Package size={20} />,
    },
    {
      title: "Total Orders",
      value: 132,
      icon: <ShoppingCart size={20} />,
    },
    {
      title: "Revenue",
      value: "₹ 1,45,000",
      icon: <IndianRupee size={20} />,
    },
    {
      title: "Growth",
      value: "+18%",
      icon: <TrendingUp size={20} />,
    },
  ];

  const recentProducts = [
    {
      id: 1,
      name: "Handmade Ceramic Vase",
      price: 1500,
      stock: 12,
    },
    {
      id: 2,
      name: "Cotton Artisan Scarf",
      price: 899,
      stock: 30,
    },
  ];

  return (
    <div className="min-h-screen bg-primary text-secondary p-8 space-y-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Seller <span className="opacity-60 italic">Dashboard</span>
          </h1>
          <p className="text-sm opacity-60 mt-1">
            Overview of your store performance
          </p>
        </div>

        <Button className="bg-secondary text-primary hover:opacity-90">
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-secondary/5 border border-secondary/20 backdrop-blur-md"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium opacity-70">
                {stat.title}
              </CardTitle>
              <div className="opacity-70">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Products Table */}
      <div>
        <ProductManage/>
      </div>

    </div>
  );
};

export default Seller;
