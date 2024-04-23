import React from "react";

export const metadata = {
  title: "Categorías",
};

type Props = {};

export default async function CategoryPage({}: Props) {

  return (
    <div className="flex w-full justify-center m-4">
      <span className="text-2xl">Selecccione una categoría</span>
    </div>
  );
}
