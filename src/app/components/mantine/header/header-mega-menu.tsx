"use client";

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./header-mega-menu.module.css";
import Link from "next/link";

const links = [
  { link: "/store", label: "Tienda" },
  { link: "/store/products/category", label: "Categorías" },
  { link: "/contact", label: "Contacto" },
  { link: "/cart", label: "Carrito" },
];

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box pb={0} className="fixed top-0 z-50 bg-white/70 backdrop-blur w-full">
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href={"/"} className="text-2xl font-bold">
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

          {/* <Group visibleFrom="sm">
            <Button variant="default">Log in</Button>
            <Link href={"/admin"}>
              <Button>Admin</Button>
            </Link>
          </Group> */}

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
        title="Navigation"
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

          {/* <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Link href={"/admin"}>
              <Button>Sign up</Button>
            </Link>
          </Group> */}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
