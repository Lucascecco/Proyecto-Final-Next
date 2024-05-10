import React, { ReactNode } from "react";
import AdminDashboard from "../components/admin/admin-dashboard";

type Props = { children: ReactNode[] };

export const metadata = {
  title: {
    template: "%s - Administración",
    default: "Administración",
  }
};


export default function AdminLayout({ children }: Props) {
  return <AdminDashboard>{children}</AdminDashboard>;
}
