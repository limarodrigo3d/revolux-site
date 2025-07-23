'use client';

import { useCart } from '@/context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

export default function FloatingCartButton() {
  const { cartItems } = useCart(); // ✅ corrigido
  const totalQuantidade = cartItems.reduce((total, item) => total + item.quantidade, 0);

  if (totalQuantidade === 0) return null;

  return (
    <Link
      href="/checkout"
      className="fixed bottom-20 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 transition"
      aria-label="Ir para o carrinho de compras"
    >
      <FaShoppingCart size={18} />
      <span>{totalQuantidade}</span>
    </Link>
  );
}
