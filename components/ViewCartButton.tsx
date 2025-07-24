'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ViewCartButton() {
  const { cartItems } = useCart();

  if (!cartItems || cartItems.length === 0) return null;

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantidade ?? 1),
    0
  );

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-fade-in drop-shadow-xl">
      <Link href="/checkout">
        <button
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-[#0A0A23] font-medium px-5 py-3 rounded-full shadow-md transition-all duration-300"
          aria-label={`Ver carrinho com ${totalItems} item(s)`}
          title={`Ver carrinho (${totalItems})`}
        >
          <ShoppingCart size={20} />
          <span className="whitespace-nowrap">
            Ver Carrinho ({totalItems})
          </span>
        </button>
      </Link>
    </div>
  );
}
