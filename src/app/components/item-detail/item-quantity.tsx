"use client";

import { Button, Input } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
import { useCartContext } from "../context/cart-context";
import { ProductType } from "@/lib/utils";

type Props = {
  product: ProductType;
  stock: number;
};

export default function ItemQuantity({ product, stock }: Props) {
  const [counter, setCounter] = useState(1);
  const { addToCart } = useCartContext();

  function handleIncrease() {
    if (counter < stock) {
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
    if (value > stock) {
      setCounter(stock);
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

      <Link href={"/cart"} onClick={handleClick}>
        <div>
          <Button radius="xl" className="w-full" style={{ flex: 1 }}>
            <IconShoppingCart className="mr-2" />
            Agregar al carrito
          </Button>
        </div>
      </Link>
    </div>
  );
}
