import { mockData } from "@/app/mock-data";
import { Button } from "@/components/ui/button";
import { capitalizeAndSeparate } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: 'Categorías',
}

type Props = {};

export default function CategoryPage({}: Props) {
  const getAllCategories = () => {
    let categories: string[] = [];
    mockData().forEach((product) => {
      if (!categories.includes(product.category))
        categories.push(product.category);
    });
    return categories;
  };

  return (
    <div className="m-4">
      {getAllCategories().map((category) => (
        <Button className="mx-1" key={category}>
          <Link href={`/store/products/category/${category}`}>{capitalizeAndSeparate(category)}</Link>
        </Button>
      ))}
    </div>
  );
}
