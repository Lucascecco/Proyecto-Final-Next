import { AuthenticationForm } from "@/app/components/mantine/authentication-form/authentication-form";
import { Container } from "@mantine/core";
import React from "react";

export const metadata = {
  title: "Iniciar sesión",
};

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <Container className="flex h-screen items-center justify-center">
      <AuthenticationForm />
    </Container>
  );
}
