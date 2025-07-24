'use client';

import { useCart } from '@/context/CartContext';

type Produto = {
  id: string;
  nome: string;
  preco: number;
};

const produtos: Produto[] = [
  {
    id: 'ecpf-a1',
    nome: 'e-CPF A1 (Arquivo)',
    preco: 149.9,
  },
  {
    id: 'ecpf-cartao',
    nome: 'e-CPF A3 (Cartão + Leitora)',
    preco: 239.9,
  },
  {
    id: 'ecpf-token',
    nome: 'e-CPF A3 (Token)',
    preco: 299.9,
  },
];

export default function CertificadosSection() {
  const { addToCart } = useCart();

  return (
    <section className="py-24 bg-gray-50 text-gray-800 animate-fade-in">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-14">
          Nossos Certificados
        </h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold mb-2">{produto.nome}</h3>
              <p className="text-2xl font-bold text-[#D4AF37] mb-6">
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </p>
              <button
                onClick={() => addToCart({ ...produto, quantidade: 1 })}
                className="bg-[#D4AF37] hover:bg-[#c49e2c] text-[#0A0A23] px-6 py-2 rounded-lg font-medium shadow transition-all duration-200"
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
