// app/layout.tsx
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Revolux Certificados Digitais',
  description: 'Certificados digitais com excelência e segurança.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased text-gray-800 bg-white">
        <CartProvider>
          <Header />
          <main className="min-h-[calc(100vh-200px)]">{children}</main>
          <Footer />
          <WhatsappButton />
        </CartProvider>
      </body>
    </html>
  );
}
