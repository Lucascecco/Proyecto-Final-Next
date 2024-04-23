"use client";

import React, { useState } from "react";
import CartList from "./cart-list";
import { Button, Modal } from "@mantine/core";
import { IconTrash, IconArrowRight } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useCartContext } from "../context/cart-context";

type Props = {};

export default function Cart({}: Props) {
  const [total, setTotal] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const { resetCart } = useCartContext();

  return (
    <>
      <Modal opened={opened} onClose={close} title="¿Está seguro?">
        <p>¿Está seguro de borrar el carrito?</p>
        <div className="flex flex-row justify-between gap-4 m-4">
          <Button onClick={close} variant="default" className="grow">
            No
          </Button>
          <Button
            onClick={() => {
              close();
              resetCart();
            }}
            className="grow"
          >
            Sí
          </Button>
        </div>
      </Modal>
      <div className="flex items-center justify-center">
        <CartList updateTotal={setTotal} />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">
          <span className="text-xs font-normal text-gray-400">USD</span>{" "}
          {total.toFixed(2)}
        </p>
      </div>

      <div className="flex flex-row gap-4 mt-6 text-center">
        <Button
          size="xl"
          radius="xl"
          variant="default"
          onClick={open}
          className="group inline-flex w-full items-center justify-center rounded-md text-lg font-semiboldfocus:shadow"
        >
          Borrar Carrito
          <IconTrash className="ml-2 my-96 h-6 w-6" />
        </Button>
        <Button
          size="xl"
          radius="xl"
          className="group inline-flex w-full items-center justify-center rounded-md text-lg font-semibold focus:shadow"
        >
          Pagar
          <IconArrowRight className="ml-2 my-96 h-6 w-6" />
        </Button>
      </div>
    </>
  );
}
