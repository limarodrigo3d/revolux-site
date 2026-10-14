import { Suspense } from 'react';
import type { Metadata } from 'next';
import Checkout from './Checkout';

export const metadata: Metadata = {
  title: 'Finalizar compra',
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="min-h-[70vh] bg-paper">
      <Suspense fallback={<div className="py-32 text-center text-ink/50">Carregando…</div>}>
        <Checkout />
      </Suspense>
    </div>
  );
}
