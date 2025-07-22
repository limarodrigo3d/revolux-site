// app/carrinho/page.tsx
"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CarrinhoPage() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-600">
                  Quantidade: {item.quantity} | Preço: R$ {item.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Remover
              </button>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-lg font-semibold">Total: R$ {total.toFixed(2)}</p>
            <Link href="/checkout">
              <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
                Finalizar Pedido
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
