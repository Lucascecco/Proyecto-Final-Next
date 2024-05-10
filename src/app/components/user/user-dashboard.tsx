"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Group,
  Modal,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { changeUsername } from "@/lib/actions";
import { useAuthContext } from "../context/auth-context";

export const metadata = {
  title: "Usuario",
};

type Props = {};

export default function UserDashboard({}: Props) {
  const { user, logoutUser } = useAuthContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [username, setUsername] = useState("");

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    setUsername(user?.name || "");
  }, [user?.name])

  return (
    <Container className="flex h-screen items-center justify-center">
      <Modal opened={opened} onClose={close} title="Cambiar nombre">
          <Stack>
            <p>Una vez cambiado el nombre, deberás reloguearte.</p>
            <TextInput
              label="Nuevo nombre"
              onChange={handleUsername}
              {...(user && user.name && { defaultValue: user.name })}
            />
            <Button
              onClick={() => {
                close();
                if (user?.uid) {
                  changeUsername(user, username);
                }
                logoutUser();
              }}
              className="grow"
            >
              Cambiar nombre
            </Button>
          </Stack>
      </Modal>
      <Paper radius="md" p="xl" withBorder>
        <h1 className="text-2xl">
          <span className="font-bold">Nombre: </span>
          {user?.name}
        </h1>
        <h1 className="text-2xl">
          <span className="font-bold">E-mail: </span>
          {user?.email}
        </h1>

        <Group justify="space-around" mt="xl">
          <Button variant="outline" radius={"xl"} onClick={open}>
            Cambiar nombre
          </Button>
          <Button color="red" radius={"xl"} onClick={logoutUser}>
            Cerrar sesión
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
