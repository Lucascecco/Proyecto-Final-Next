import ItemDetail from "@/app/components/item-detail/item-detail";
import { getProduct } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (product) {
    return {
      title: product.title,
      openGraph: {
        images: [product.image],
      },
    };
  } else {
    return {
      title: "Producto no encontrado",
    };
  }
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug);

  if (product.id) {
    return <ItemDetail product={product} />;
  } else {
    return notFound();
  }
}
