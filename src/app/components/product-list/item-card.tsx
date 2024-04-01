import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StarRating from "../ui/star-rating";

type Props = {
  name: string;
  image: string;
  price: number;
  rating: number;
  discountedPrice: number;
  productSlug: string;
};

export default function ItemCard({
  name,
  image,
  price,
  rating,
  discountedPrice,
  productSlug,
}: Props) {
  return (
    <div className="relative m-2 flex max-w-xs my-2 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href={`/store/products/id/${productSlug}`}
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
        <Link href={`/store/products/id/${productSlug}`}>
          <h5 className="text-xl tracking-tight text-slate-900">{name}</h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            {discountedPrice == 0 ? (
              <span className="text-3xl font-bold text-slate-900">
                ${price}
              </span>
            ) : (
              <>
                <span className="text-3xl font-bold text-slate-900">
                  ${discountedPrice}
                </span>
                <span className="text-sm text-slate-900 line-through">
                  ${price}
                </span>
              </>
            )}
          </p>
          <StarRating rating={rating} />
        </div>
        <a
          href="#"
          className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
          Agregar al Carrito
        </a>
      </div>
    </div>
  );
}
