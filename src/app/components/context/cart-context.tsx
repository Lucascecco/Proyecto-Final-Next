"use client";

import { ProductType } from "@/lib/utils";
import React, { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

const CartContext = createContext({
  cart: [] as { product: ProductType; quantity: number }[],
  addToCart: (product: ProductType, quantity: number) => {},
  removeFromCart: (product: ProductType) => {},
  resetCart: () => {},
});

export const useCartContext = () => useContext(CartContext);

export function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<
    { product: ProductType; quantity: number }[]
  >([]);

  const addToCart = (product: ProductType, quantity: number) => {
    setCart([
      ...cart.filter((item) => item.product.id != product.id),
      { product, quantity },
    ]);
  };

  const removeFromCart = (product: ProductType) => {
    setCart(cart.filter((item) => item.product.id !== product.id));
  };

  const resetCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
