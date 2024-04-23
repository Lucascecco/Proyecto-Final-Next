import { ContactUs } from "@/app/components/mantine/contact-us/contact-us";
import React from "react";

export const metadata = {
  title: "Contacto",
};

type Props = {};

export default function ContactPage({}: Props) {
  return (
    <ContactUs />
  );
}
