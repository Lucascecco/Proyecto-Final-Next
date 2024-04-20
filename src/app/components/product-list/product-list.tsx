import React from "react";
import ItemCard from "./item-card";
import { ProductType } from "@/app/mock-data";

type Props = { products: ProductType[] };

export default function ProductList({ products }: Props) {
  return (
      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 m-4">
        {products.map((product) => (
          <ItemCard
            key={product.slug}
            name={product.title}
            image={product.image}
            price={product.price}
            rating={product.rating.rate}
            ratingCount={product.rating.count}
            discountedPrice={product.discountedPrice}
            productSlug={product.slug}
          />
        ))}
      </div>
  );
}
