"use client";

import React from "react";
import ItemCard from "../product-list/item-card";
import { useCartContext } from "../context/cart-context";

type Props = {
    updateTotal: (price: number) => void;
};

// eslint-disable-next-line @next/next/no-async-client-component
export default function CartList({updateTotal}: Props) {
  const { cart } = useCartContext();
  updateTotal(cart.reduce((acc, item) => acc + (item.product.discountedPrice > 0 ? item.product.discountedPrice : item.product.price) * item.quantity, 0));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 m-4">
      {cart.map(({ product, quantity }) => (
        <ItemCard
          key={product.id}
          product={product}
          quantity={quantity}
          removeButton
        />
      ))}
    </div>
  );
}
