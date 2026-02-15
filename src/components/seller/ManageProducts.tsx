"use client";

import React, { useState } from "react";
import { Pencil, Trash2, Package } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

const ProductManage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Handmade Ceramic Vase",
      category: "Pottery",
      mrp: 2000,
      price: 1500,
      stock: 12,
      description: "Clay artisan vase with matte finish.",
    },
    {
      id: 2,
      name: "Handwoven Cotton Scarf",
      category: "Textiles",
      mrp: 1200,
      price: 899,
      stock: 30,
      description: "Soft breathable cotton scarf.",
    },
  ]);

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-primary text-secondary p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Package size={22} />
        <div>
          <h1 className="text-2xl font-semibold">
            Manage <span className="opacity-60">Products</span>
          </h1>
          <p className="text-sm opacity-50 mt-1">
            View and manage all your listed products
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-secondary/20 rounded-lg">

        <Table>
          <TableHeader>
            <TableRow className="border-secondary/20">
              <TableHead className="text-secondary/60">Product</TableHead>
              <TableHead className="text-secondary/60">Category</TableHead>
              <TableHead className="text-secondary/60">MRP</TableHead>
              <TableHead className="text-secondary/60">Selling</TableHead>
              <TableHead className="text-secondary/60">Stock</TableHead>
              <TableHead className="text-secondary/60">Description</TableHead>
              <TableHead className="text-center text-secondary/60">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="border-secondary/20 hover:bg-secondary/5"
              >
                <TableCell className="font-medium">
                  {product.name}
                </TableCell>

                <TableCell>{product.category}</TableCell>

                <TableCell>₹ {product.mrp}</TableCell>

                <TableCell className="text-green-500">
                  ₹ {product.price}
                </TableCell>

                <TableCell>{product.stock}</TableCell>

                <TableCell className="max-w-xs truncate">
                  {product.description}
                </TableCell>

                <TableCell className="flex justify-center gap-2">
                  <Button
                    size="icon"
                    
                    className="hover:bg-secondary/10"
                  >
                    <Pencil size={16} />
                  </Button>

                  <Button
                    size="icon"
                    
                    onClick={() => handleDelete(product.id)}
                    className="hover:bg-red-500/20 text-red-500"
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {products.length === 0 && (
          <div className="text-center py-8 text-secondary/50">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManage;
