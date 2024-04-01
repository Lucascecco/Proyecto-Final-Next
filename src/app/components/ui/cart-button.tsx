import React from "react";
import { ShoppingCart } from "lucide-react";

type Props = {
  ping: boolean;
  size: number;
};

export default function CartButton({ ping, size }: Props) {
  return (
    <>
      <ShoppingCart className={`h-${size} w-${size}`} />
      {ping && (
        <span className="flex absolute -mt-5 ml-5">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
        </span>
      )}
    </>
  );
}
