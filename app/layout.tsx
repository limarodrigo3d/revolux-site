import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'Revolux Certificados Digitais',
  description: 'Certificados digitais com excelência e segurança.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
