"use client";

import { useState } from "react";
import { PackageSearch, Pencil, Sparkles, Trash2, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Product } from "@/store/getProduct";
import { fetchProducts } from "@/store/getProduct";


const ProductManage = () => {
  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Product | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const openEditDialog = (product: Product) => {
    setEditProduct(product);
    setForm(product);
    setExistingImages(product.images);
    setNewImages([]);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files)
    const totalImages = existingImages.length + newImages.length + files.length

    if (totalImages > 4) {
      toast.error("Maximum 4 images allowed", {
        description: `You can upload only max 4 images`,
      })

      e.target.value = "" // reset input
      return
    }

    setNewImages((prev) => [...prev, ...files])
  }

  const removeExistingImage = (i: number) =>
    setExistingImages((p) => p.filter((_, idx) => idx !== i));

  const removeNewImage = (i: number) =>
    setNewImages((p) => p.filter((_, idx) => idx !== i));

  const handleUpdate = async () => {
    if (!form) return

    try {
      setIsUpdating(true)

      const formData = new FormData()
      formData.append("name", form.name)
      formData.append("mrp", String(form.mrp))
      formData.append("price", String(form.price))
      formData.append("stock", String(form.stock))
      formData.append("description", form.description)

      existingImages.forEach((img) =>
        formData.append("existingImages", img)
      )

      newImages.forEach((file) =>
        formData.append("images", file)
      )

      const res = await fetch(`/api/product/${form._id}`, {
        method: "PUT",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Update failed")
      }

      toast.success("Product updated successfully")

      setEditProduct(null)
      refetch()
    } catch (error) {
      toast.error("Failed to update product")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(true)
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      })


      if (!res.ok) {
        throw new Error("Delete failed")
      }

      toast.success("Product deleted successfully")

      setDeleteProduct(null)
      refetch()
    } catch (error) {
      toast.error("Failed to delete product")
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#D7CEBC] text-[#2F3523]">
        <div className="relative">
          {/* Pulsing artisan-style loader */}
          <div className="w-24 h-24 rounded-[2rem] bg-[#2F3523]/5 flex items-center justify-center border border-[#2F3523]/10 animate-pulse">
            <Loader2 className="animate-spin opacity-40" size={40} strokeWidth={1} />
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-3xl font-black tracking-tighter italic mb-2">Curating <span className="opacity-40">Collection</span></h2>
        </div>
      </div>
    );
  }

  // 2. Refined Empty State
  if (products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#D7CEBC] text-[#2F3523] px-6 text-center">
        {/* Deep Sage Card-like Icon Container */}
        <div className="w-16 h-16 rounded-[2.5rem] bg-[#2F3523] text-[#D7CEBC] flex items-center justify-center mb-10 shadow-2xl rotate-3">
          <PackageSearch size={36} strokeWidth={1.5} />
        </div>

        <div className="max-w-md">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 block mb-4">Inventory Search</span>
          <h2 className="text-2xl font-black tracking-tighter leading-none mb-6 italic">
            Quiet <span className="opacity-40">Spaces</span>
          </h2>
          <p className="text-sm font-medium italic opacity-70 leading-relaxed mb-10 border-l-2 border-[#2F3523]/20 pl-6">
            "Every handmade piece is currently finding its new home. Our artisans are hard at work crafting fresh traditions."
          </p>

        </div>
      </div>
    );
  }

  return (
    <>
      {/* TABLE */}
      <div className="rounded-2xl bg-[#D7CEBC] border p-2 border-black/20 overflow-hidden">
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
                <TableCell className="text-green-700">
                  ₹ {product.price}
                </TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell className="max-w-[420px] align-top">
                  <p
                    className="text-sm leading-relaxed line-clamp-2"
                    title={product.description}
                  >
                    {product.description}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditDialog(product)}
                      className="p-2 rounded-lg cursor-pointer bg-[#E6DFCF] border border-black/20 hover:bg-[#AEB69A]/40"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteProduct(product)}
                      className="p-2 rounded-lg bg-[#E6DFCF] cursor-pointer border border-black/20 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* EDIT MODAL */}
      <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] hide-scrollbar overflow-y-auto bg-[#E6DFCF] rounded-2xl border border-black/20">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          {form && (
            <div className="space-y-6">
              {/* Images */}
              <div className="p-4 bg-[#DED6C4] rounded-2xl border border-black/20">
                <p className="text-sm font-medium mb-3">
                  Product Images (Max 4)
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {existingImages.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img}
                        className="h-24 w-full object-cover rounded-xl border border-black/20"
                      />
                      <button
                        onClick={() => removeExistingImage(i)}
                        className="absolute top-1 cursor-pointer right-1 text-xs bg-red-500 text-white px-2 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <Input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="mt-3 bg-[#DED6C4]"
                />
              </div>

              {/* Fields */}
              {/* Fields */}
              <div className="grid grid-cols-2 gap-4">

                {/* Product Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-black/70">
                    Name
                  </label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="bg-[#DED6C4] border border-black/20 rounded-xl px-4 py-3"
                  />
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-black/70">
                    Category
                  </label>
                  <Input
                    name="category"
                    value={form.category}
                    disabled
                    className="bg-[#DED6C4] border border-black/20 rounded-xl px-4 py-3"
                  />
                </div>

                {/* MRP */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-black/70">
                    MRP (₹)
                  </label>
                  <Input
                    name="mrp"
                    value={form.mrp}
                    onChange={handleChange}
                    className="bg-[#DED6C4] border border-black/20 rounded-2xl px-4 py-3"
                  />
                </div>

                {/* Selling Price */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-black/70">
                    Selling Price (₹)
                  </label>
                  <Input
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className="bg-[#DED6C4] border border-black/20 rounded-2xl px-4 py-3"
                  />
                </div>

                {/* Stock */}
                <div className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm font-medium text-black/70">
                    Stock Quantity
                  </label>
                  <Input
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    className="bg-[#DED6C4] border border-black/20 rounded-2xl px-4 py-3"
                  />
                </div>

              </div>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                disabled={isUpdating}
                rows={4}
                className="w-full bg-[#DED6C4] rounded-2xl border border-black/20 p-4 resize-none"
              />

              <Button disabled={isUpdating} className="w-full bg-[#2F3523] hover:bg-[#3F4A2C] cursor-pointer" onClick={handleUpdate}>
                {isUpdating ? "Updating..." : "Update Product"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* DELETE MODAL */}
      <Dialog
        open={!!deleteProduct}
        onOpenChange={() => setDeleteProduct(null)}
      >
        <DialogContent className="bg-[#E6DFCF] rounded-2xl border border-black/20">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              Delete Product
            </DialogTitle>
          </DialogHeader>

          {deleteProduct && (
            <div className="space-y-4">
              <p>
                Are you sure you want to delete{" "}
                <b>{deleteProduct.name}</b>?
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <Button
                  onClick={() => handleDelete(deleteProduct._id)}
                  disabled={isDeleting}
                  className="bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded-xl py-3"
                >
                  {isDeleting ? "Deleting..." : " Delete"}
                </Button>

                <Button
                  disabled={isDeleting}
                  onClick={() => setDeleteProduct(null)}
                  className="bg-brand-secondary cursor-pointer text-white rounded-xl py-3"
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