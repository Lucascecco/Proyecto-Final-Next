import { ProductType } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import StarRating from "./star-rating";
import ItemQuantity from "./item-quantity";
import {
  IconCreditCard,
  IconWorld,
} from "@tabler/icons-react";

type Props = {
  product: ProductType;
};

export default function ItemDetail({ product }: Props) {
  return (
    <section className="py-6">
      <div className="container px-4">
        <div className="mt-8 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2">
          <div className="flex lg:row-end-1 justify-center xl:justify-start">
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
              <StarRating
                rating={product.rating.rate}
                count={product.rating.count}
              />
            </div>

            <span className="mt-1 flex items-center text-gray-500 text-sm font-semibold">
              Stock: {product.stock}
            </span>

            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-end">
                <h1 className="text-3xl font-bold">
                  $
                  {product.discountedPrice != 0
                    ? product.discountedPrice.toFixed(2)
                    : product.price.toFixed(2)}
                </h1>
                {product.discountedPrice != 0 && (
                  <span className="text-base line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="mt-5 flex items-center">
                <ItemQuantity product={product} stock={product.stock} />
              </div>
            </div>

            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <IconWorld className="mr-2" />
                Envío Internacional
              </li>

              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                <IconCreditCard className="mr-2" />
                Cancela en cualquier momento
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-8" />

        <h1 className="title">Descripción</h1>
        <p className="my-4">{product.description}</p>
      </div>
    </section>
  );
}
