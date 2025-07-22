'use client';

import { useCart } from '@/context/CartContext';

const opcoes = [
  {
    id: 'ecpf-a1',
    nome: 'e-CPF A1 (Arquivo)',
    preco: 149.90,
  },
  {
    id: 'ecpf-cartao',
    nome: 'e-CPF A3 (Cartão + Leitora)',
    preco: 239.90,
  },
  {
    id: 'ecpf-token',
    nome: 'e-CPF A3 (Token)',
    preco: 299.90,
  },
];

export default function Page() {
  const { addToCart } = useCart();

  return (
    <main className="pt-28 px-6 pb-16">
      <h1 className="text-3xl font-bold text-center mb-6">Certificado e-CPF</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {opcoes.map((opcao) => (
          <div key={opcao.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">{opcao.nome}</h2>
            <p className="text-blue-600 font-bold mb-4">R$ {opcao.preco.toFixed(2).replace('.', ',')}</p>
            <button
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() =>
                addToCart({
                  id: opcao.id,
                  nome: opcao.nome,
                  preco: opcao.preco,
                  quantidade: 1,
                })
              }
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
