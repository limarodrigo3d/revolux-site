"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ViewCartButton() {
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <Link
      href="/checkout"
      className="fixed bottom-6 right-6 bg-[#0057D8] text-white px-5 py-3 rounded-full shadow-lg z-50 hover:bg-blue-700 transition"
    >
      Ver Carrinho ({totalItems})
    </Link>
  );
}
