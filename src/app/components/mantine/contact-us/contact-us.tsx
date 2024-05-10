"use client";

import {
  Button,
  Group,
  Modal,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useState } from "react";
import { ContactIconsList } from "./contact-icons";
import classes from "./contact-us.module.css";
import bg from "/public/bg.svg";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";

export function ContactUs() {
  const [opened, { open, close }] = useDisclosure(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());
    if (response.error) {
      setError(response.error);
      open();
    } else {
      router.push("/contact/success");
    }
  };

  return (
    <Group
      justify="center"
      className="h-screen flex items-center justify-center"
    >
      <Modal opened={opened} onClose={close} title="Error">
        <p>{error}</p>
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
      <Paper shadow="md" radius="lg">
        <div className={classes.wrapper}>
          <div
            className={classes.contacts}
            style={{ backgroundImage: `url(${bg.src})` }}
          >
            <Text fz="lg" fw={700} className={classes.title} c="#fff">
              Información de contacto
            </Text>

            <ContactIconsList />
          </div>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Text fz="lg" fw={700} className={classes.title}>
              Contáctenos
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput
                  name="name"
                  label="Nombre"
                  placeholder="Nombre"
                  required
                  onChange={handleChange}
                />
                <TextInput
                  name="email"
                  label="E-mail"
                  placeholder="yo@example.com"
                  required
                  onChange={handleChange}
                />
              </SimpleGrid>

              <TextInput
                name="subject"
                mt="md"
                label="Asunto"
                placeholder="Asunto"
                required
                onChange={handleChange}
              />

              <Textarea
                name="message"
                mt="md"
                label="Su mensaje"
                placeholder="Por favor incluya toda la información relevante"
                minRows={3}
                required
                onChange={handleChange}
              />

              <Group justify="flex-end" mt="md">
                <Button type="submit" className={classes.control}>
                  Enviar mensaje
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </Group>
  );
}
