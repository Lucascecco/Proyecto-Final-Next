import ProductList from "@/app/components/product-list/product-list";
import { ProductType, mockData } from "@/app/mock-data";
import { capitalizeAndSeparate } from "@/lib/utils";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: capitalizeAndSeparate(params.category),
  };
}

type Props = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params }: Props) {
  const products = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  }).then(async (res) => (await res.json()).filter(
    (product: ProductType) => product.category == params.category
  ));

  if (products) {
    return (
      <>
        <h1 className="title m-4">{capitalizeAndSeparate(params.category)}</h1>
        <ProductList products={products} />
      </>
    );
  }
}
