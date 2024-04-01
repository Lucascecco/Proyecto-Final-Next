import React from 'react'

type Props = {
    children: React.ReactNode;
}

export default function ContactLayout({children}: Props) {
  return (
    <section>
      <h1 className="title m-4">Contacto</h1>
      {children}
    </section>
  )
}