// app/layout.tsx
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';
// import CarrinhoResumo from '@/components/CarrinhoResumo'; // Removido do layout global
// import Carrinho from '@/components/Carrinho'; // Removido do layout global
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
          {/* CarrinhoResumo e Carrinho foram removidos daqui.
              Eles devem ser usados apenas dentro de /app/carrinho/page.tsx se necessário. */}
        </CartProvider>
      </body>
    </html>
  );
}
