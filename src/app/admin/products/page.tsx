import { ProductTable } from "@/app/components/mantine/table/product-table";
import { ProductType, getProducts } from "@/lib/actions";
import React from "react";

export const metadata = {
  title: "Productos",
};

type Props = {};

export default async function ProductAdminPage({}: Props) {
  const products = await getProducts();

  return (
    <ProductTable
      initialData={products.map((product: ProductType) => {
        return {
          id: product.id,
          title: product.title,
          category: product.category,
          price: product.price.toString(),
          discountedPrice: product.discountedPrice.toString(),
          stock: product.stock.toString(),
          rating: product.rating.rate.toString(),
          ratingCount: product.rating.count.toString(),
        };
      })}
    />
  );
}
