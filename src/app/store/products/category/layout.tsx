import React from "react";
import { NavbarSimple } from "@/app/components/mantine/navbar-simple/navbar-simple";
import { getCategories } from "@/lib/actions";

type Props = {
  children: React.ReactNode;
  params: {
    category: string;
  };
};

export default async function CategoryLayout({ children, params }: Props) {
  const categories = await getCategories()

  return (
    <section>
      <div>
        <NavbarSimple title="Categorías" buttons={categories} />
        {children}
      </div>
    </section>
  );
}
