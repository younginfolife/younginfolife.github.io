import type { Metadata } from "next";
import "./globals.css";
import { AppNavbar } from "@/components/app-navbar";

export const metadata: Metadata = {
  title: "Young InfoLife",
  description: "La piattaforma per la Bioinformatica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <AppNavbar />
        <div className="">
          {children}
        </div>
      </body>
    </html>
  );
}
