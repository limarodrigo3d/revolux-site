'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function FloatingCartButton() {
  const { cartItems } = useCart();

  const totalQuantidade = cartItems.reduce(
    (total, item) => total + (item.quantidade ?? 1),
    0
  );

  if (totalQuantidade === 0) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-fade-in drop-shadow-xl">
      <Link href="/checkout">
        <button
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[#0A0A23] font-semibold px-5 py-3 rounded-full shadow-lg transition-all duration-300"
          aria-label={`Ver carrinho com ${totalQuantidade} item(s)`}
          title={`Ver carrinho (${totalQuantidade})`}
        >
          <ShoppingCart size={20} />
          <span className="whitespace-nowrap">
            Ver Carrinho ({totalQuantidade})
          </span>
        </button>
      </Link>
    </div>
  );
}
