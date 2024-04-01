import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - CoderStore",
    default: "Productos",
  },
  description: "CoderStore E-Commerce",
  openGraph: {
    title: "CoderStore",
    description: "CoderStore E-Commerce",
    locale: "es-ES",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="flex flex-col">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
