import type { Metadata } from "next";
import "./globals.css";

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
        <div className="">{children}</div>
      </body>
    </html>
  );
}
