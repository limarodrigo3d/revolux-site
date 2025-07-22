"use client";

import { useCart } from "@/context/CartContext";

export default function ECNPJPage() {
  const { addToCart } = useCart();

  const produtos = [
    {
      id: "ecnpj-a1",
      name: "e-CNPJ A1 - Arquivo - 12 Meses",
      price: 165.0,
    },
    {
      id: "ecnpj-smartcard",
      name: "e-CNPJ A3 - SmartCard - 36 Meses",
      price: 265.0,
    },
    {
      id: "ecnpj-token",
      name: "e-CNPJ A3 - Token - 36 Meses",
      price: 350.0,
    },
    {
      id: "ecnpj-sem-midia",
      name: "e-CNPJ A3 - Sem Mídia - 36 Meses",
      price: 240.0,
    },
    {
      id: "ecnpj-smartcard-leitora",
      name: "e-CNPJ A3 - SmartCard + Leitora - 36 Meses",
      price: 365.0,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">e-CNPJ</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{produto.name}</h2>
            <p className="text-gray-700 text-sm mb-4">R$ {produto.price.toFixed(2)}</p>
            <button
              onClick={() => addToCart({ ...produto, quantity: 1 })}
              className="bg-[#0057D8] text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
