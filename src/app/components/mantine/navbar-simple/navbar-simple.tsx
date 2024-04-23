"use client";

import { useState } from "react";
import { Group, Code } from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons-react";
import classes from "./navbar-simple.module.css";
import Link from "next/link";

type Props = {
  title: string;
  buttons: {
    label: string;
    link: string;
  }[];
};

export function NavbarSimple({ title, buttons }: Props) {
  const [active, setActive] = useState("Billing");

  const links = buttons.map((item) => (
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <Group className={classes.header} justify="space-between">
        <span className="text-2xl font-bold">{title}</span>
        <div className="flex flex-row flex-wrap">{links}</div>
      </Group>
    </nav>
  );
}
