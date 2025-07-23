'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ViewCartButton() {
  const { cartItems } = useCart();

  if (!cartItems || cartItems.length === 0) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-fade-in">
      <Link href="/checkout" aria-label={`Ver carrinho com ${totalItems} item(ns)`}>
        <button
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-3 rounded-full shadow-lg transition duration-300"
          title={`Ver carrinho (${totalItems})`}
        >
          <ShoppingCart size={20} />
          Ver Carrinho ({totalItems})
        </button>
      </Link>
    </div>
  );
}
