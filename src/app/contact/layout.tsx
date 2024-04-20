import React from 'react'

type Props = {
    children: React.ReactNode;
}

export default function ContactLayout({children}: Props) {
  return (
    <section>
      {children}
    </section>
  )
}