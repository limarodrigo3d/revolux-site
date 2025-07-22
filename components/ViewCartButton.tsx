// components/ViewCartButton.tsx
"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ViewCartButton() {
  const { cartItems } = useCart();

  if (!cartItems || cartItems.length === 0) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <Link href="/checkout">
        <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-3 rounded-full shadow-lg transition duration-300">
          <ShoppingCart size={20} />
          Ver Carrinho ({totalItems})
        </button>
      </Link>
    </div>
  );
}
