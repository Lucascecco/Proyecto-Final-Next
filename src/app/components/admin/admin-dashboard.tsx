"use client";

import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Group, Title, Text, Loader } from "@mantine/core";
import Link from "next/link";
import { useAuthContext } from "../context/auth-context";
import { NavbarSimple } from "../mantine/navbar-simple/navbar-simple";

type Props = { children: ReactNode[] };

export default function AdminDashboard({ children }: Props) {
  const { user } = useAuthContext();
  const router = useRouter();

  if (!user) {
    return (
      <Loader
        className="flex items-center justify-center w-full h-96"
        size={80}
        color="blue"
        type="dots"
      />
    );
  }

  if (!user.logged) {
    router.push("/user");
    router.refresh();
    return;
  }

  if (user.administrator) {
    return (
      <>
        <div className="h-[60px]" />
        <NavbarSimple
          title="Panel de Administración"
          buttons={[
            { label: "Crear Producto", link: "/admin/products/create" },
            { label: "Lista de Productos", link: "/admin/products" },
            { label: "Lista de Usuarios", link: "/admin/users" },
            { label: "Lista de Órdenes", link: "/admin/orders" },
            { label: "Lista de Categorías", link: "/admin/categories" },
          ]}
        />
        {children}
      </>
    );
  } else {
    return (
      <Container className="flex h-screen items-center justify-center">
        <div>
          <Title className="text-center">No tienes permisos</Title>
          <Text mt={"xl"} c="dimmed" size="lg" ta="center">
            La página a la que intentas acceder requiere permisos especiales.
          </Text>
          <Text c="dimmed" size="lg" ta="center">
            Si crees que esto es un error, contacta con el administrador del
            sitio.
          </Text>
          <Group mt={"xl"} justify="center">
            <Link href="/">
              <Button size="md" radius={"xl"}>
                Volver al Inicio
              </Button>
            </Link>
          </Group>
        </div>
      </Container>
    );
  }
}
