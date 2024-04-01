import { ProductType } from "@/app/mock-data";
import { CreditCard, Globe, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import StarRating from "../ui/star-rating";
import ItemQuantity from "./item-quantity";
import Link from "next/link";

type Props = {
  product: ProductType;
};

export default function ItemDetail({ product }: Props) {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <Image
              src={product.image}
              className="object-contain"
              width={500}
              height={500}
              alt="Imagen del Producto"
              priority={true}
            ></Image>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="title">{product.title}</h1>

            <div className="mt-5 flex items-center">
              <div className="flex items-center">
                <StarRating rating={product.rating.rate} />
              </div>
              <p className="ml-2 text-sm font-medium text-gray-500">
                {product.rating.count} Reviews
              </p>
            </div>

            <div className="mt-5 flex items-center">
              <ItemQuantity />
            </div>

            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">
                  $
                  {product.discountedPrice != 0
                    ? product.discountedPrice
                    : product.price}
                </h1>
                {product.discountedPrice != 0 && (
                  <span className="text-base line-through">
                    ${product.price}
                  </span>
                )}
              </div>

              <Link
                className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                href={"/store/cart"}
              >
                <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
                Agregar al carrito
              </Link>
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <Globe className="mr-2" />
                Envío Internacional
              </li>

              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <CreditCard className="mr-2" />
                Cancela en cualquier momento
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
