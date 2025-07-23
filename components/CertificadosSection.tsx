"use client";

import { useCart } from "@/context/CartContext";

const produtos = [
  {
    id: "ecpf-a1",
    nome: "e-CPF A1 (Arquivo)",
    preco: 149.9,
  },
  {
    id: "ecpf-cartao",
    nome: "e-CPF A3 (Cartão + Leitora)",
    preco: 239.9,
  },
  {
    id: "ecpf-token",
    nome: "e-CPF A3 (Token)",
    preco: 299.9,
  },
];

export default function CertificadosSection() {
  const { addToCart } = useCart();

  return (
    <section className="py-20 bg-[#F9FAFB] text-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Nossos Certificados
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{produto.nome}</h3>
              <p className="text-2xl font-bold text-[#D4AF37] mb-4">
                R$ {produto.preco.toFixed(2)}
              </p>
              <button
                onClick={() => addToCart(produto)}
                className="bg-[#D4AF37] hover:bg-[#c49e2c] text-[#0A0A23] px-5 py-2 rounded-lg font-medium transition"
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
