import React from "react";
import ItemCard from "./item-card";
import { ProductType, getProducts } from "@/lib/actions";

type Props = { category?: string };

export default async function ProductList({ category }: Props) {
  const products = await getProducts(category);

  return (
    <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 m-4">
      {products.map((product: ProductType) => (
        <ItemCard
          key={product.id} product={product}
        />
      ))}
    </div>
  );
}
