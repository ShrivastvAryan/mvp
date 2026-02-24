"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Product {
  _id: string;
  name: string;
  category: string;
  mrp: number;
  price: number;
  stock: number;
  description: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("/api/get-product");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }

  return data.products;
};

const ProductManage = () => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 2,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Product | null>(null);

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setForm(product);
  };

  const closeDialog = () => {
    setSelectedProduct(null);
    setForm(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error</div>;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-secondary/20 bg-secondary/5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>MRP</TableHead>
              <TableHead>Selling</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₹ {product.mrp}</TableCell>
                <TableCell className="text-green-600">
                  ₹ {product.price}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => openEditDialog(product)}
                      className="p-2.5 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition"
                    >
                      <Pencil size={16} />
                    </button>

                    <button className="p-2.5 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 🔥 Edit Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          {form && (
            <div className="space-y-4">
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Product Name"
              />
              <Input
                name="mrp"
                value={form.mrp}
                onChange={handleChange}
                placeholder="MRP"
              />
              <Input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Selling Price"
              />
              <Input
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock"
              />
              <Input
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
              />

              <Button className="w-full">
                Update Product
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductManage;