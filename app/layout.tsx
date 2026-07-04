import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <-- ESTA LÍNEA ES CRÍTICA. SI NO ESTÁ, TAILWIND NO EXISTE.
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VANTUM // Lab de Ingeniería Textil",
  description: "Estructuras de alta simetría. Estética urbana con rigor de ingeniería.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-behavior-smooth">
      <body className={`${inter.className} bg-vantum-black text-vantum-white antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}