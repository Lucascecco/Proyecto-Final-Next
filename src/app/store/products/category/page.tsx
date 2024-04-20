import { ProductType, mockData } from "@/app/mock-data";
import { Button } from "@/components/ui/button";
import { capitalizeAndSeparate } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Categorías",
};

type Props = {};

export default async function CategoryPage({}: Props) {
  const categories: string[] = [];
  const products = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  }).then((res) => res.json());
  products.forEach((product: ProductType) => {
    if (!categories.includes(product.category))
      categories.push(product.category);
  });

  return (
    <div className="m-4">
      {categories.map((category) => (
        <Link key={category} href={`/store/products/category/${category}`}>
          <Button className="mx-1">
            {capitalizeAndSeparate(category)}
          </Button>
        </Link>
      ))}
    </div>
  );
}
