// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';

export const metadata: Metadata = {
  title: 'Revolux Certificados Digitais',
  description: 'A confiança que você busca, a segurança que você precisa.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsappButton />
        </CartProvider>
      </body>
    </html>
  );
}
