"use client";

import { Button, Input } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
import { useCartContext } from "../context/cart-context";
import { ProductType } from "@/lib/actions";
import AddToCartButton from "../product-list/add-to-cart-button";

type Props = {
  product: ProductType;
};

export default function ItemQuantity({ product }: Props) {
  const [counter, setCounter] = useState(1);
  const { addToCart } = useCartContext();

  function handleIncrease() {
    if (counter < product.stock) {
      setCounter(counter + 1);
    }
  }

  function handleDecrease() {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(event.target.value);
    if (value > product.stock) {
      setCounter(product.stock);
    } else {
      setCounter(value);
    }
  }

  function handleClick() {
    addToCart(product, counter);
  }

  return (
    <div className="flex flex-row items-center gap-4 flex-wrap justify-center">
      <div className="flex flex-row">
        <Button onClick={handleDecrease} variant="outline">
          -
        </Button>
        <Input type="number" min={1} onChange={handleChange} value={counter} />
        <Button onClick={handleIncrease} variant="outline">
          +
        </Button>
      </div>

      <Link href={"/cart"} onClick={handleClick} aria-disabled={product.stock === 0}>
        <div>
          <AddToCartButton
            product={product}
            quantity={counter}
            disabled={product.stock <= 0}
          />
        </div>
      </Link>
    </div>
  );
}
