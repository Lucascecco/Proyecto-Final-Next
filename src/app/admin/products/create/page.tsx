import ProductForm from "@/app/components/admin/product-form";
import React from "react";

export const metadata = {
  title: "Crear Producto",
};

type Props = {};

export default function CreatePage({}: Props) {
  return <ProductForm />;
}
