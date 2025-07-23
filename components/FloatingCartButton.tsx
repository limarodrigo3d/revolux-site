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
    <div className="fixed bottom-24 right-6 z-50 animate-fade-in">
      <Link href="/checkout">
        <button
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-3 rounded-full shadow-lg transition duration-300"
          aria-label={`Ver carrinho com ${totalQuantidade} item(ns)`}
          title={`Ver carrinho (${totalQuantidade})`}
        >
          <ShoppingCart size={20} />
          Ver Carrinho ({totalQuantidade})
        </button>
      </Link>
    </div>
  );
}
