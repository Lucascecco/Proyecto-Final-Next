import { Button, Group } from "@mantine/core";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Bienvenido",
};

type Props = {};

export default function HomePage({}: Props) {
  return (
    <section className="flex justify-center items-center flex-1 flex-grow flex-col">
      <div className="h-[60px]" />
      <h1 className="text-3xl font-bold m-12">Bienvenido a CoderStore</h1>

      <Group justify="center">
        <Link href="/store">
          <Button radius={"xl"} size="xl">
            Ir a la Tienda
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </Link>
      </Group>
    </section>
  );
}
