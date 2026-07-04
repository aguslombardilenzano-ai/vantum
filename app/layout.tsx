import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 1. Importamos el paquete oficial de analíticas
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VANTUM // Textile Architecture",
  description: "Estructuras de alta simetría. Estética urbana con rigor de ingeniería.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-black`}>
        {children}
        
        {/* 2. Inyectamos el componente de rastreo del sistema */}
        <Analytics />
      </body>
    </html>
  );
}