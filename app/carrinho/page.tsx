// app/carrinho/page.tsx
"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CarrinhoPage() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.preco, 0);

  return (
    <div className="min-h-screen bg-white py-12 px-6 text-gray-900">
      <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <h2 className="text-xl font-semibold">{item.nome}</h2>
                <p className="text-blue-600 font-medium">
                  R$ {item.preco.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remover
              </button>
            </div>
          ))}

          <div className="pt-6 border-t mt-8">
            <p className="text-xl font-semibold mb-4">
              Total:{" "}
              <span className="text-green-600">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </p>
            <Link href="/checkout">
              <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
                Finalizar Pedido
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
