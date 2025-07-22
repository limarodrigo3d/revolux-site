"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push("/obrigado");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div className="border-t border-b py-4">
            <h2 className="font-semibold mb-2">Resumo do Pedido</h2>
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 font-bold text-lg flex justify-between">
              <span>Total:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Finalizar Pedido
          </button>
        </form>
      )}
    </div>
  );
}
