"use client";

import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Loader,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./header-mega-menu.module.css";
import Link from "next/link";
import { useAuthContext } from "../../context/auth-context";

const links = [
  { link: "/store", label: "Tienda" },
  { link: "/store/products/category", label: "Categorías" },
  { link: "/contact", label: "Contacto" },
  { link: "/cart", label: "Carrito" },
];

export function HeaderMegaMenu() {
  const { user } = useAuthContext();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box pb={0} className="fixed top-0 z-50 bg-white/70 backdrop-blur w-full">
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href={"/"} className="text-2xl font-bold flex-grow basis-0">
            {" "}
            CoderStore
          </Link>
          <Group h="100%" gap={0} visibleFrom="sm">
            {links.map((link) => (
              <Link key={link.label} href={link.link} className={classes.link}>
                {link.label}
              </Link>
            ))}
          </Group>

          {user ? (
            user.logged ? (
              <Group visibleFrom="sm" className="justify-end flex-grow basis-0">
                <Link
                  href={"/user"}
                  className={`${classes.link} px-0 font-normal`}
                >
                  <Stack justify="center" align="end" gap={0}>
                    <span className="font-bold">{user.name}</span>
                    <span className="text-xs">{user.email}</span>
                  </Stack>
                </Link>
                {user.administrator && (
                  <Link href={"/admin"}>
                    <Button variant="default">Panel</Button>
                  </Link>
                )}
              </Group>
            ) : (
              <Group visibleFrom="sm" className="justify-end flex-grow basis-0">
                <Link href={"/user"}>
                  <Button variant="default">Ingresar</Button>
                </Link>
              </Group>
            )
          ) : (
            <Group visibleFrom="sm" className="justify-end flex-grow basis-0">
              <Link href={"/user"}>
                <Loader className="mr-4" size={25} color="blue" type="bars" />
              </Link>
            </Group>
          )}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navegación"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          {links.map((link) => (
            <Link
              onClick={closeDrawer}
              key={link.label}
              href={link.link}
              className={classes.link}
            >
              {link.label}
            </Link>
          ))}

          <Divider my="sm" />
          {user && user.logged ? (
            <Stack justify="center" pb="xl" px="md">
              <Link
                href={"/user"}
                className={`${classes.link} p-0 font-normal`}
              >
                <Stack justify="center" gap={0}>
                  <span className="font-bold">{user.name}</span>
                  <span className="text-xs">{user.email}</span>
                </Stack>
              </Link>

              {user.administrator && (
                <Group justify="center" grow pb="xl">
                  <Link href={"/admin"}>
                    <Button variant="default">Panel de Administración</Button>
                  </Link>
                </Group>
              )}
            </Stack>
          ) : (
            <Group>
              <Link href={"/user"}>
                <Button variant="default">Ingresar</Button>
              </Link>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
