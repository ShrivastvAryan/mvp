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

export const fetchProductById = async (id: string,category: string): Promise<Product> => {
  const res = await fetch(`/api/get-product/${category}/${id}/`);
  const data = await res.json();
  if (!res.ok) throw new Error("Failed to fetch");
  return data.product;
}

export const fetchProductByCategory = async (
  category: string
): Promise<Product[]> => {
  const res = await fetch(`/api/get-product/${category}`);

  if (!res.ok) throw new Error("Failed to fetch");

  const data = await res.json();

  return data.product; // must be array
}