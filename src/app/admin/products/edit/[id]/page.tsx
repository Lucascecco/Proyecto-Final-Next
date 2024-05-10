import ProductForm from "@/app/components/admin/product-form";
import { getProduct } from "@/lib/actions";
import { Loader } from "@mantine/core";
import React, { Suspense } from "react";

export const metadata = {
  title: "Editar Producto",
};

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductEditPage({ params }: Props) {
  const product = await getProduct(params.id);

  return (
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
      <ProductForm product={product} />
    </Suspense>
  );
}
