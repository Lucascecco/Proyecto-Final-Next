import { Box, Stack, Text, rem } from "@mantine/core";
import { IconAt, IconPhone, IconSun } from "@tabler/icons-react";
import classes from "./contact-icons.module.css";

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: typeof IconSun;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  ...others
}: ContactIconProps) {
  return (
    <div className={classes.wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: "E-mail", description: "contacto@coderstore.com", icon: IconAt },
  { title: "Teléfono", description: "+54 9 11 2345-6789", icon: IconPhone },
  { title: "Horario de atención", description: "8 a.m. – 10 p.m.", icon: IconSun },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
