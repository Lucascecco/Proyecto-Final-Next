import ProductList from "@/app/components/product-list/product-list";
import { getCategories } from "@/lib/utils";
import { Loader } from "@mantine/core";
import { Metadata } from "next";
import React, { Suspense } from "react";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getCategories();

  return {
    title: categories.find((category) => category.id === params.category)?.label,
  };
}

export async function generateStaticParams() {
  return [
    {category: "mens-clothing"},
    {category: "womens-clothing"},
    {category: "jewelery"},
    {category: "electronics"},
  ]
}

export const revalidate = 3600;

type Props = {
  params: {
    category: string;
  };
};

export default function CategoryPage({ params }: Props) {
  return (
    <>
      <Suspense
        fallback={
          <Loader
            className="flex items-center justify-center w-full h-96"
            size={80}
            color="blue"
            type="dots"
          />
        }
      >
        <ProductList category={params.category}/>
      </Suspense>
    </>
  );
}
