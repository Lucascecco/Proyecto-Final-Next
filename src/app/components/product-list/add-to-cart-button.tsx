"use client";

import { ProductType } from "@/lib/utils";
import { Button } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import React from "react";
import { useCartContext } from "../context/cart-context";
import Link from "next/link";

type Props = {
  product: ProductType;
  quantity: number;
  removeButton?: boolean;
};

export default function AddToCartButton({ product, quantity, removeButton }: Props) {
  const { addToCart, removeFromCart } = useCartContext();

  if (removeButton) {
    return (
      <Button
        onClick={() => removeFromCart(product)}
        radius="xl"
        className="w-full"
        style={{ flex: 1 }}
      >
        Quitar del Carrito
      </Button>
    );
  } else {
    return (
      <Link href={"/cart"}>
        <Button
          onClick={() => addToCart(product, quantity)}
          radius="xl"
          className="w-full"
          style={{ flex: 1 }}
        >
          <IconShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
          Agregar al Carrito
        </Button>
      </Link>
    );
  }
}
