import './globals.css'; // <- ESSENCIAL para carregar Tailwind
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton';

export const metadata = {
  title: 'Revolux Certificados Digitais',
  description: 'Emissão de certificados digitais com segurança, agilidade e confiança.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
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
