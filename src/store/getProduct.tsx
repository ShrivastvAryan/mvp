export interface Product {
  _id: string;
  name: string;
  category: string;
  mrp: number;
  price: number;
  stock: number;
  description: string;
  images: string[];
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("/api/get-product");
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch");
  return data.products;
};