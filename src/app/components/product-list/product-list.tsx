import React from "react";
import ItemCard from "./item-card";
import { ProductType } from "@/app/mock-data";

type Props = {products: ProductType[]};

export default function ProductList({products}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 items-center">
      {products.map((product) => (
        <ItemCard
          key={product.slug}
          name={product.title}
          image={product.image}
          price={product.price}
          rating={product.rating.rate}
          discountedPrice={product.discountedPrice}
          productSlug={product.slug}
        />
      ))}
    </div>
  );
}
