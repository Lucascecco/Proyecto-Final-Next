import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export default function StoreLayout({children}: Props) {
  return (
    <>
      {
        // Mueve el contenido de la página hacia abajo para no ocupar el espacio del header
      }
      <div className="h-[60px]" />
      {children}
    </>
  );
}
