"use client";

import { useToggle, upperFirst, useDisclosure } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Modal,
} from "@mantine/core";
import { useAuthContext } from "../../context/auth-context";
import { useState } from "react";

export function AuthenticationForm(props: PaperProps) {
  const { loginUser, registerUser, googleLogin } = useAuthContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [type, toggle] = useToggle(["inicia sesión", "regístrate"]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let res = false
    if (type === "regístrate") {
      res = await registerUser(values);
    } else {
      res = await loginUser(values);
    }
    if (!res) {
      open();
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Modal opened={opened} onClose={close} title="Error">
        <Text>{type === "inicia sesión" ? "Credenciales incorrectas" : "El correo ingresado ya fue utilizado o la contraseña no es válida" }</Text>
        <div className="flex flex-row justify-between gap-4 m-4">
          <Button
            onClick={() => {
              close();
            }}
            className="grow"
          >
            Ok
          </Button>
        </div>
      </Modal>
      <Text size="lg" fw={500}>
        {upperFirst(type)}
      </Text>

      <Divider labelPosition="center" my="lg" />

      <form onSubmit={handleSubmit}>
        <Stack>
          {type === "regístrate" && (
            <TextInput
              name="name"
              required
              label="Nombre"
              placeholder="Su nombre"
              onChange={handleChange}
              radius="md"
            />
          )}

          <TextInput
            name="email"
            required
            label="E-mail"
            placeholder="yo@example.com"
            onChange={handleChange}
            radius="md"
          />

          <PasswordInput
            name="password"
            required
            label="Contraseña"
            placeholder="Su contraseña"
            onChange={handleChange}
            radius="md"
          />

          {type === "regístrate" && (
            <Checkbox
              name="terms"
              label="Acepto los Términos y Condiciones"
              required
              onChange={handleChange}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "regístrate"
              ? "¿Ya tienes una cuenta? Inicia sesión"
              : "¿No tienes una cuenta? Regístrate"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
