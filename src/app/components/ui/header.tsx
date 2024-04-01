"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartButton from "./cart-button";
import { CircleUserRound } from "lucide-react";

type Props = {};

const links = [
  {
    key: "store",
    label: "Tienda",
    href: "/store",
  },
  {
    key: "category",
    label: "Categorías",
    href: "/store/products/category",
  },
  {
    key: "contact",
    label: "Contacto",
    href: "/store/contact",
  },
];

export default function Header({}: Props) {
  return (
    <header className="sticky z-50 top-0 place-items-center h-1/6">
      <nav className="flex justify-between bg-black/70 text-white w-screen backdrop-blur">
        <div className="px-12 py-6 flex w-full items-center">
          <Link className="text-3xl font-bold font-heading" href="/">
            CoderStore
          </Link>
          <ul className="flex px-4 mx-auto font-semibold font-heading space-x-12">
            {links.map((link) => (
              <li key={link.key}>
                <Link className="hover:text-gray-200" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-5">
            <Link
              className="flex items-center hover:text-gray-200"
              href="/store/cart"
            >
              <CartButton size={7} ping={false} />
            </Link>
            <Link
              className="flex items-center hover:text-gray-200"
              href="/store/admin"
            >
              <CircleUserRound className="h-7 w-7" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
