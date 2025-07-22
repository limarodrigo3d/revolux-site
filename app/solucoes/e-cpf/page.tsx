// app/solucoes/e-cpf/page.tsx
"use client";

import { useCart } from "@/context/CartContext";

export default function EcpfPage() {
  const { addToCart } = useCart();

  const opcoes = [
    {
<<<<<<< HEAD
      nome: "e-CPF A1 (Arquivo)",
      preco: 149.9,
    },
    {
      nome: "e-CPF A3 (Cartão + Leitora)",
      preco: 229.9,
    },
    {
      nome: "e-CPF A3 (Token USB)",
      preco: 259.9,
=======
      id: "ecpf-arquivo",
      nome: "e-CPF A1 (Arquivo)",
      preco: 159.90,
    },
    {
      id: "ecpf-cartao",
      nome: "e-CPF A3 (Cartão + Leitora)",
      preco: 269.90,
    },
    {
      id: "ecpf-token",
      nome: "e-CPF A3 (Token)",
      preco: 299.90,
>>>>>>> 72c4bd4fb81d592523a075d60c15036cc28c002f
    },
  ];

  return (
<<<<<<< HEAD
    <main className="min-h-screen bg-white px-6 pt-28 pb-16 text-gray-800 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
          Certificado Digital e-CPF
        </h1>
        <p className="text-gray-600 mb-10">
          O e-CPF é a versão digital do CPF. Ele garante autenticidade e segurança para
          acessar serviços da Receita Federal, assinar documentos eletrônicos e muito mais.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-left">
          {opcoes.map((opcao, index) => (
            <div
              key={index}
              className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition"
=======
    <div className="min-h-screen bg-white text-gray-900 py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Certificado e-CPF</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="border rounded-xl shadow p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{produto.nome}</h2>
              <p className="text-lg mt-2 text-blue-600 font-bold">
                R$ {produto.preco.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <button
              onClick={() => addToCart(produto)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
>>>>>>> 72c4bd4fb81d592523a075d60c15036cc28c002f
            >
              <h2 className="text-lg font-semibold mb-1">{opcao.nome}</h2>
              <p className="text-sm text-gray-600 mb-4">
                R$ {opcao.preco.toFixed(2).replace(".", ",")}
              </p>
              <button
                onClick={() =>
                  addToCart({
                    nome: opcao.nome,
                    preco: opcao.preco,
                  })
                }
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded text-sm"
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
