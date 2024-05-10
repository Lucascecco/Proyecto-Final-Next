"use client";

import React, { ReactNode } from "react";
import { useAuthContext } from "../components/context/auth-context";
import { Loader } from "@mantine/core";

type Props = { children: ReactNode[]; login: ReactNode[] };

export default function UserLayout({ children, login }: Props) {
  const { user } = useAuthContext();

  return (
    <>
      {user ? (
        user.logged ? (
          children
        ) : (
          login
        )
      ) : (
        <Loader
          className="flex items-center justify-center w-full h-96"
          size={80}
          color="blue"
          type="dots"
        />
      )}
    </>
  );
}
