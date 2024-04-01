import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

export default function HomePage({}: Props) {
  return (
    <section className="flex justify-center items-center flex-1 flex-grow flex-col">
      <h1 className="text-3xl font-bold m-12">Bienvenido a CoderStore</h1>
      <Link
        type="button"
        className="group inline-flex w-50 items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white focus:shadow hover:bg-gray-800"
        href={"/store"}
      >
        Ir a la Tienda
        <ArrowRight className="ml-2 h-6 w-6" />
      </Link>
    </section>
  );
}
