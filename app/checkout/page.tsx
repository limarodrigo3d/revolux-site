'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const total = cartItems.reduce(
    (acc, item) => acc + item.preco * (item.quantidade || 1),
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Itens do carrinho:', cartItems);

    clearCart();
    router.push('/obrigado');
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-700 px-6">
        <div className="text-center space-y-4">
          <p className="text-xl font-medium">Seu carrinho está vazio.</p>
          <a
            href="/certificados"
            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
          >
            Ver Certificados
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 pt-28 pb-20 bg-gray-50 text-gray-800 animate-fade-in">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
          Finalizar Compra
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-1">Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Resumo do Pedido
            </h2>
            <ul className="space-y-3 divide-y divide-gray-200 mb-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between pt-3">
                  <span>
                    {item.nome} {item.quantidade > 1 && `x ${item.quantidade}`}
                  </span>
                  <span>
                    R$ {(item.preco * (item.quantidade || 1)).toFixed(2).replace('.', ',')}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-right font-bold text-xl">
              Total: <span className="text-green-600">R$ {total.toFixed(2).replace('.', ',')}</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
          >
            Confirmar e Finalizar Pedido
          </button>
        </form>
      </div>
    </main>
  );
}
