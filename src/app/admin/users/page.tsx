import { UserTable } from "@/app/components/mantine/table/user-table";
import { getUsers } from "@/lib/actions";
import React from "react";

export const metadata = {
  title: "Usuarios",
};

type Props = {};

export default async function UsersPage({}: Props) {
  const users = await getUsers();

  return <UserTable initialData={users}></UserTable>;
}
