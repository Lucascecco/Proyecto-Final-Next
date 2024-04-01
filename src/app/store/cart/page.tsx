import { ArrowRight } from "lucide-react";
import React from "react";

export const metadata = {
  title: "Carrito",
};

type Props = {};

export default function CartPage({}: Props) {
  return (
    <section className="bg-gray-100 py-20 h-screen">
      <div className="mx-auto px-8">
        <div className="flex items-center justify-center">
          <h1 className="title">Carrito</h1>
        </div>

        <div className="mx-auto max-w-2xl mt-12">
          <div className="bg-white shadow">
            <div className="px-8 py-10">
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg font-semibold text-gray-900">$0.00</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Envío</p>
                  <p className="text-lg font-semibold text-gray-900">$0.00</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  <span className="text-xs font-normal text-gray-400">ARS</span>{" "}
                  0.00
                </p>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white focus:shadow hover:bg-gray-800"
                >
                  Pagar
                  <ArrowRight className="ml-2 h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
