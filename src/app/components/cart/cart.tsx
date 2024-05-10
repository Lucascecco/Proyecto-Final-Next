"use client";

import React, { useState } from "react";
import CartList from "./cart-list";
import { Button, Group, Modal } from "@mantine/core";
import { IconTrash, IconArrowRight } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useCartContext } from "../context/cart-context";
import { useAuthContext } from "../context/auth-context";
import { makeOrder } from "@/lib/actions";
import ConfirmationModal from "../modals/confirmation-modal";
import NotificationModal from "../modals/notification-modal";

type Props = {};

export default function Cart({}: Props) {
  const [total, setTotal] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedSuccess, { open: openSuccess, close: closeSuccess }] =
    useDisclosure(false);
  const { cart, resetCart } = useCartContext();
  const { user } = useAuthContext();

  const handleOrder = async () => {
    if (user && user.email && user.name) {
      await makeOrder({
        products: cart.map(({ product, quantity }) => ({
          slug: product.id,
          quantity,
        })),
        user: {
          uid: user.uid,
          email: user.email,
          name: user.name,
        },
        total,
      });
      resetCart();
      openSuccess();
    }
  };

  return (
    <>
      <ConfirmationModal
        opened={opened}
        close={close}
        handleConfirmation={resetCart}
        title="¿Está seguro de que quiere borrar el carrito?"
      />
      <NotificationModal opened={openedSuccess} close={closeSuccess} title="Orden Procesada">
        <p className="text-center">¡Su orden ha sido procesada correctamente!</p>
        <p className="text-center">Gracias por confiar en nosotros</p>
      </NotificationModal>
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

      <Group className="flex flex-row gap-4 mt-6 text-center w-full">
        <Button
          size="xl"
          radius="xl"
          variant="default"
          onClick={open}
          className="group grow inline-flex items-center justify-center rounded-md text-lg font-semibold focus:shadow"
        >
          Borrar Carrito
          <IconTrash className="ml-2 my-96 h-6 w-6" />
        </Button>
        <Button
          size="xl"
          radius="xl"
          className="group grow inline-flex items-center justify-center rounded-md text-lg font-semibold focus:shadow"
          onClick={handleOrder}
          {...(total === 0 || !user ? { disabled: true } : { disabled: false })}
        >
          {user && user.logged ? (
            <>
              Realizar Orden
              <IconArrowRight className="ml-2 my-96 h-6 w-6" />
            </>
          ) : (
            "Debes iniciar sesión"
          )}
        </Button>
      </Group>
    </>
  );
}
