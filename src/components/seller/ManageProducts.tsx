"use client";

import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProductManage = () => {
  const products = [
    {
      name: "Handmade Ceramic Vase",
      category: "Pottery",
      mrp: "₹ 2000",
      selling: "₹ 1500",
      stock: 12,
      description: "Clay artisan vase with matte finish.",
    },
    {
      name: "Handwoven Cotton Scarf",
      category: "Textiles",
      mrp: "₹ 1200",
      selling: "₹ 899",
      stock: 30,
      description: "Soft breathable cotton scarf.",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-secondary/20 bg-secondary/5">
      <Table>
        <TableHeader className="bg-secondary/10 border-b border-secondary/20">
          <TableRow>
            <TableHead className="py-4 font-medium text-secondary/80">
              Product
            </TableHead>
            <TableHead className="py-4 font-medium text-secondary/80">
              Category
            </TableHead>
            <TableHead className="py-4 font-medium text-secondary/80">
              MRP
            </TableHead>
            <TableHead className="py-4 font-medium text-secondary/80">
              Selling
            </TableHead>
            <TableHead className="py-4 font-medium text-secondary/80">
              Stock
            </TableHead>
            <TableHead className="py-4 font-medium text-secondary/80">
              Description
            </TableHead>
            <TableHead className="py-4 text-right font-medium text-secondary/80">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product, index) => (
            <TableRow
              key={index}
              className="hover:bg-secondary/5 transition-colors"
            >
              <TableCell className="py-5 font-medium">
                {product.name}
              </TableCell>
              <TableCell className="py-5 opacity-80">
                {product.category}
              </TableCell>
              <TableCell className="py-5 opacity-70">
                {product.mrp}
              </TableCell>
              <TableCell className="py-5 font-medium text-green-600">
                {product.selling}
              </TableCell>
              <TableCell className="py-5">
                {product.stock}
              </TableCell>
              <TableCell className="py-5 opacity-70 max-w-xs leading-relaxed">
                {product.description}
              </TableCell>
              <TableCell className="py-5 text-right">
                <div className="flex justify-end gap-3">
                  <button className="p-2.5 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition">
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
  );
};

export default ProductManage;
