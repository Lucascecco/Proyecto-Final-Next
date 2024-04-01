import React from "react";
import { Separator } from "@/components/ui/separator"

type Props = {
  children: React.ReactNode;
  params: {
    category: string;
  }
};

export default function CategoryLayout({ children, params }: Props) {
  return (
    <section>
      <h1 className="title m-4">Categorías</h1>
      <Separator />
      {children}
    </section>
  );
}
