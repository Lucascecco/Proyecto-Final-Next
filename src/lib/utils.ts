import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type ProductType = {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  stock: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getProduct(slug: string): Promise<ProductType> {
  return await fetch(`http://localhost:3000/api/products/${slug}`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());
}

export async function getProducts(category?: string): Promise<ProductType[]> {
  return await fetch(
    `http://localhost:3000/api/products${
      category ? "?category=" + category : ""
    }`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json());
}

export async function getCategories(): Promise<
  { id: string; link: string; label: string }[]
> {
  return await fetch("http://localhost:3000/api/categories", {
    next: { revalidate: 60 },
  }).then((res) => res.json());
}
