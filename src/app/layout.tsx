import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "./components/context/cart-context";
import { HeaderMegaMenu } from "./components/mantine/header/header-mega-menu";
import "./globals.css";
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
        <CartProvider>
          <MantineProvider forceColorScheme="light">
            <HeaderMegaMenu />
            <main>{children}</main>
          </MantineProvider>
        </CartProvider>
      </body>
    </html>
  );
}
