import React from "react";
import UserDashboard from "../components/user/user-dashboard";

export const metadata = {
  title: "Usuario",
};

type Props = {};

export default function UserPage({}: Props) {
  return <UserDashboard />;
}
