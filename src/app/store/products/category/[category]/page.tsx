import ProductList from "@/app/components/product-list/product-list";
import { mockData } from "@/app/mock-data";
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

export default function CategoryPage({ params }: Props) {
  let products = mockData().filter(
    (product) => product.category == params.category
  );

  if (products) {
    return (
      <>
        <h1 className="title m-4">{capitalizeAndSeparate(params.category)}</h1>
        <ProductList products={products} />
      </>
    );
  }
}
