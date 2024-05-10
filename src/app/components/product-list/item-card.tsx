import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StarRating from "../item-detail/star-rating";
import { Button } from "@mantine/core";
import { ProductType } from "@/lib/actions";
import AddToCartButton from "./add-to-cart-button";

type Props = {
  product: ProductType;
  quantity?: number;
  removeButton?: boolean;
  noButton?: boolean;
};

export default function ItemCard({ product, quantity, removeButton, noButton }: Props) {
  const {
    title,
    image,
    price,
    rating: { rate, count },
    discountedPrice,
    id,
  } = product;

  return (
    <div className="h-full relative m-1 flex max-w-xs my-2 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        href={`/store/products/id/${id}`}
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl grow"
      >
          <Image
            className="object-contain"
            src={image}
            width={500}
            height={500}
            alt="product image"
          />
          {discountedPrice > 0 && (
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              {Math.round(((price - discountedPrice) / price) * 100)}% OFF
            </span>
          )}
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link href={`/store/products/id/${id}`}>
          <h5 className="text-xl tracking-tight text-slate-900">{title}</h5>
        </Link>
        <StarRating rating={rate} count={count} />
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            {discountedPrice == 0 ? (
              <span className="text-2xl font-bold text-slate-900">
                ${price.toFixed(2)}
              </span>
            ) : (
              <>
                <span className="text-2xl font-bold text-slate-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-slate-900 line-through">
                  ${price.toFixed(2)}
                </span>
              </>
            )}
          </p>
          {quantity && (
            <span className="text-gray-500 ml-1">{`Cantidad: ${quantity}`}</span>
          )}
        </div>
        {!noButton && (
          <AddToCartButton
            product={product}
            quantity={quantity ? quantity : 1}
            removeButton={removeButton? true : false}
            disabled={product.stock <= 0}
          />
        )}
      </div>
    </div>
  );
}
