import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/navbar";

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
    <section>
        <NavBar />
        {children}
    </section>
  );
}
