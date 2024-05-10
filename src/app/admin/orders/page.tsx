import { OrderTable } from "@/app/components/mantine/table/order-table";
import { getOrders } from "@/lib/actions";
import React from "react";

export const metadata = {
  title: "Órdenes",
};

type Props = {};

export default async function OrdersPage({}: Props) {
  const orders = await getOrders();

  return <OrderTable initialData={orders} />;
}
