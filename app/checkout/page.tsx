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

    // Aqui você pode enviar os dados para uma API ou serviço de pagamento
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Itens do carrinho:', cartItems);

    clearCart(); // limpa o carrinho
    router.push('/obrigado'); // redireciona
  };

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-700">
        <p className="text-xl">Seu carrinho está vazio.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 pt-28 pb-16 bg-white text-gray-800 animate-fade-in">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Finalizar Compra</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Resumo do Pedido</h2>
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.nome} x {item.quantidade}
                  </span>
                  <span>
                    R$ {(item.preco * (item.quantidade || 1)).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-right mt-4 font-bold text-lg">
              Total: R$ {total.toFixed(2)}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Confirmar e Finalizar
          </button>
        </form>
      </div>
    </main>
  );
}
