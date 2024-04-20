import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/ui/header";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
} from "@mantine/core";
import { HeaderMegaMenu } from "./components/mantine/header/header-mega-menu";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - CoderStore",
    default: "CoderStore",
  },
  description: "CoderStore E-Commerce",
  openGraph: {
    title: "CoderStore",
    description: "CoderStore E-Commerce",
    locale: "es-ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="flex flex-col bg-gray-100">
        <MantineProvider forceColorScheme="light">
          <HeaderMegaMenu />
          <main>{children}</main>
        </MantineProvider>
      </body>
    </html>
  );
}
