import ItemDetail from "@/app/components/item-detail/item-detail";
import { mockData } from "@/app/mock-data";
import { Metadata, ResolvingMetadata } from "next";
import { useRouter } from "next/navigation";
import React from "react";

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const product = mockData().find((product) => product.slug == params.id);

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
    id: string;
  };
};

export default function ProductPage({ params }: Props) {
  const product = mockData().find((product) => product.slug == params.id);

  if (product) {
    return <ItemDetail product={product} />;
  } else {
    return <h1>Producto no encontrado</h1>;
  }
}
