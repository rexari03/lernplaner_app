import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals/globals.css";
import 'bootstrap/dist/css/bootstrap.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LernPlaner",
  description: "Wilkommen zu deinem persönlichen Lernplaner!"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
