import { Separator } from "@/components/ui/separator";
import React from "react";

export const metadata = {
  title: "Contacto",
};

type Props = {};

export default function ContactPage({}: Props) {
  return (
    <div className="m-4">
      <h2 className="text-2xl">
        Contáctenos por cualquiera de los siguientes medios
      </h2>
      <p>Instagram: @coderstore</p>
      <p>Facebook: facebook.com/coderstore</p>
      <p>Email: contact@coderstore.com</p>
    </div>
  );
}
