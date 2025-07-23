'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = cart
    .reduce((acc, item) => acc + item.preco * (item.quantidade || 1), 0)
    .toFixed(2);

  const handleMercadoPago = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        setError('Erro ao redirecionar para o pagamento.');
      }
    } catch (err) {
      console.error('Erro ao processar pagamento:', err);
      setError('Erro ao processar pagamento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 pt-28 pb-16 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Finalizar Pedido</h1>

      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <form className="space-y-6 max-w-xl" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block mb-1 font-medium">Nome completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-2">Resumo do Pedido:</h2>
            <ul className="mb-2 space-y-1">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.nome} x{item.quantidade || 1}
                  </span>
                  <span>
                    R$ {(item.preco * (item.quantidade || 1)).toFixed(2).replace('.', ',')}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold">
              Total: R$ {total.replace('.', ',')}
            </p>
          </div>

          {error && <p className="text-red-600 font-medium">{error}</p>}

          <button
            type="button"
            onClick={handleMercadoPago}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition w-full text-lg"
          >
            {loading ? 'Carregando...' : 'Pagar com Mercado Pago'}
          </button>
        </form>
      )}
    </main>
  );
}
