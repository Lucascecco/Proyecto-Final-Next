import React from 'react'

type Props = {}

export const metadata = {
  title: "Administración",
};

export default function AdminPage({}: Props) {
  return (
    <div className="flex w-full justify-center m-4">
      <span className="text-2xl">Seleccione una opción</span>
    </div>
  );
}