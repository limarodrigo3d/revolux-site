// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import ViewCartButton from "@/components/ViewCartButton";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Revolux Certificados Digitais",
  description: "Emissão de certificados digitais com segurança, agilidade e confiança.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#F2F5F9] text-gray-800">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <ViewCartButton />
          <WhatsappButton />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
