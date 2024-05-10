import { CategoriesTable } from "@/app/components/mantine/table/categories-table";
import { getCategories } from "@/lib/actions";
import React from "react";

export const metadata = {
  title: "Categorías",
};

type Props = {};

export default async function CategoriesPage({}: Props) {
  const categories = await getCategories();

  return <CategoriesTable initialData={categories} />;
}
