'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const opcoes = [
  {
    id: 'ecpf-a1',
    nome: 'e-CPF A1 (Arquivo)',
    preco: 149.90,
    precoOriginal: 189.90,
    destaque: true,
  },
  {
    id: 'ecpf-cartao',
    nome: 'e-CPF A3 (Cartão + Leitora)',
    preco: 239.90,
    precoOriginal: 269.90,
    destaque: false,
  },
  {
    id: 'ecpf-token',
    nome: 'e-CPF A3 (Token)',
    preco: 299.90,
    precoOriginal: 329.90,
    destaque: false,
  },
];

export default function Page() {
  const { addToCart } = useCart();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAdd = (produto: typeof opcoes[0]) => {
    setLoadingId(produto.id);
    addToCart({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1,
    });
    setTimeout(() => setLoadingId(null), 1000); // feedback visual
  };

  return (
    <main className="min-h-screen bg-white px-6 pt-28 pb-16 text-gray-800 animate-fade-in">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
          Certificado e-CPF
        </h1>
        <p className="text-base mb-10">
          Escolha seu modelo ideal com total segurança digital.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {opcoes.map((opcao) => (
            <div
              key={opcao.id}
              className="relative group bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.015] transition-all duration-200"
            >
              {opcao.destaque && (
                <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                  Mais vendido
                </span>
              )}

              <h2 className="text-lg font-semibold text-gray-900 mb-1">{opcao.nome}</h2>

              <div className="mb-4">
                {opcao.precoOriginal && (
                  <p className="text-sm text-gray-500 line-through">
                    R$ {opcao.precoOriginal.toFixed(2).replace('.', ',')}
                  </p>
                )}
                <p className="text-blue-600 font-bold text-lg">
                  R$ {opcao.preco.toFixed(2).replace('.', ',')}
                </p>
              </div>

              <button
                className={`w-full py-2 px-4 rounded text-white font-medium transition ${
                  loadingId === opcao.id
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={() => handleAdd(opcao)}
                disabled={loadingId === opcao.id}
              >
                {loadingId === opcao.id ? 'Adicionando...' : 'Comprar agora'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
