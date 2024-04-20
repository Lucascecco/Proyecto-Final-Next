"use client";

import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  Box,
} from "@mantine/core";
import { ContactIconsList } from "./contact-icons";
import bg from "/public/bg.svg";
import classes from "./contact-us.module.css";
import { useState } from "react";

export function ContactUs() {
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
    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
  };

  return (
    <Group
      justify="center"
      className="h-screen flex items-center justify-center"
    >
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
                  onChange={handleChange}
                />
                <TextInput
                  name="email"
                  label="E-mail"
                  placeholder="contacto@gmail.com"
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
