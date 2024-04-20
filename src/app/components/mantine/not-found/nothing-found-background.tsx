import React from "react";
import { Container, Title, Text, Button, Group } from "@mantine/core";
import classes from "./nothing-found-background.module.css";
import { Illustration } from "./illustration";
import Link from "next/link";

type Props = {};

export default function NothingFoundBackground({}: Props) {
  return (
    <Container className={classes.root}>
      <div className="h-[60px]"/>
      <div className={classes.inner}>
        <Illustration className={`text-gray-200 ${classes.image}`} />
        <div className={classes.content}>
          <Title className={classes.title}>Recurso no encontrado</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            La página a la que intentas acceder no existe. Puede que hayas
            escrito mal la ruta o que la página se haya movido a otra URL. Si
            crees que esto es un error, por favor contáctanos.
          </Text>
          <Group justify="center">
            <Link href="/">
              <Button size="md">Ir al inicio</Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
}
