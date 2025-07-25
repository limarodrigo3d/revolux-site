'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import InputMask from 'react-input-mask';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + item.preco * (item.quantidade || 1),
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/pagamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems,
          nome,
          email,
          cpf,
          telefone,
        }),
      });

      const data = await response.json();

      if (data?.init_point) {
        clearCart();
        window.location.href = data.init_point;
      } else {
        alert('Erro ao iniciar pagamento.');
        setLoading(false);
      }
    } catch (err) {
      console.error('Erro no checkout:', err);
      alert('Erro ao processar o pagamento.');
      setLoading(false);
    }
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
            <label className="block text-sm font-medium mb-1">Nome completo</label>
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
            <label className="block text-sm font-medium mb-1">CPF</label>
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Telefone</label>
            <InputMask
              mask="(99) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
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
                    R$ {(item.preco * (item.quantidade || 1)).toFixed(2).replace('.', ',')}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-right mt-4 font-bold text-lg">
              Total: R$ {total.toFixed(2).replace('.', ',')}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processando...' : 'Confirmar e Finalizar'}
          </button>
        </form>
      </div>
    </main>
  );
}
