"use client";

import { ProductType } from "@/lib/actions";
import { Button } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import React from "react";
import { useCartContext } from "../context/cart-context";
import Link from "next/link";
import { FrownIcon } from "lucide-react";

type Props = {
  product: ProductType;
  quantity: number;
  removeButton?: boolean;
  disabled?: boolean;
};

export default function AddToCartButton({
  product,
  quantity,
  removeButton,
  disabled,
}: Props) {
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
      <Link href={"/cart"} aria-disabled={disabled}>
        <Button
          onClick={() => addToCart(product, quantity)}
          radius="xl"
          className="w-full"
          style={{ flex: 1 }}
          disabled={disabled}
        >
          {disabled ? (
            <>
              <FrownIcon className="mr-2 h-5 w-5" aria-hidden="true" />
              Sin stock
            </>
          ) : (
            <>
              <IconShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
              Agregar al Carrito
            </>
          )}
        </Button>
      </Link>
    );
  }
}
