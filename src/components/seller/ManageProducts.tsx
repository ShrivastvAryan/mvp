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
   image: string;  
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
  const { data: products = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 2,
  });

  const [editProduct, setEditProduct] = useState<Product | null>(null);
const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Product | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    setNewImage(e.target.files[0]);
  }
};

  const openEditDialog = (product: Product) => {
  setEditProduct(product);
  setForm(product);
};

const openDeleteDialog = (product: Product) => {
  setDeleteProduct(product);
};

 const closeEditDialog = () => {
  setEditProduct(null);
  setForm(null);
  setNewImage(null);
};

const closeDeleteDialog = () => {
  setDeleteProduct(null);
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
  if (!form) return;

  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("mrp", String(form.mrp));
  formData.append("price", String(form.price));
  formData.append("stock", String(form.stock));
  formData.append("description", form.description);

  if (newImage) {
    formData.append("image", newImage);
  }

  await fetch(`/api/product/${form._id}`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });

  closeEditDialog();
  refetch();
};

const handleDelete = async (id: string) => {
  await fetch(`/api/product/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  refetch();
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

                    <button onClick={() => openDeleteDialog(product)} className="p-2.5 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition">
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
    <Dialog open={!!editProduct} onOpenChange={closeEditDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Product</DialogTitle>
    </DialogHeader>

    {form && (
      <div className="space-y-4">

        {/* 🔥 Current Image Preview */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Current Image</p>
          <img
            src={newImage ? URL.createObjectURL(newImage) : form.image}
            alt="product"
            className="h-32 w-full object-cover rounded-md border"
          />
        </div>

        {/* 🔥 Replace Image */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Change Image</p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

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

       <Button className="w-full" onClick={handleUpdate}>
  Update Product
</Button>
      </div>
    )}
  </DialogContent>
</Dialog>


{/* 🔥 Delete Dialog */}
<Dialog open={!!deleteProduct} onOpenChange={closeDeleteDialog}>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle className="text-red-600">
        Delete Product
      </DialogTitle>
    </DialogHeader>

    {deleteProduct && (
      <div className="space-y-5">

        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this product? This action cannot be undone.
        </p>

        <div className="space-y-2">
          <p className="text-sm font-medium">Product Name</p>
          <p className="text-sm text-muted-foreground">
            {deleteProduct.name}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Product Image</p>
          <img
            src={deleteProduct.image}
            alt="product"
            className="h-32 w-full object-cover rounded-md border"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            className="w-full"
            onClick={() => handleDelete(deleteProduct._id)}
          >
            Delete
          </Button>

          <Button
            className="w-full"
            onClick={closeDeleteDialog}
          >
            Cancel
          </Button>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>
    </>
  );
};

export default ProductManage;