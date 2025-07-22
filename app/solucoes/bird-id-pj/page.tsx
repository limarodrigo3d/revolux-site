'use client';

import { useCart } from '@/context/CartContext'; // ✅ Correto

const opcoes = [
  {
    id: 'birdidpj',
    nome: 'Bird ID PJ (Pessoa Jurídica)',
    preco: 189.90,
  },
];

export default function Page() {
  const { addToCart } = useCart(); // ✅ Correto

  return (
    <main className="min-h-screen bg-white px-6 pt-28 pb-16 text-gray-800 animate-fade-in">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
          Certificado Bird ID - Pessoa Jurídica
        </h1>
        <p className="text-base mb-10">
          Faça autenticações com reconhecimento facial para empresas.
        </p>

        <div className="grid gap-6 md:grid-cols-2 text-left">
          {opcoes.map((opcao) => (
            <div
              key={opcao.id}
              className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">{opcao.nome}</h2>
              <p className="text-sm text-gray-700 mb-4">
                R$ {opcao.preco.toFixed(2).replace('.', ',')}
              </p>
              <button
                onClick={() =>
                  addToCart({
                    id: opcao.id,
                    nome: opcao.nome,
                    preco: opcao.preco,
                    quantidade: 1,
                  })
                }
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
