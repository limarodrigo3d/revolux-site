"use client";

import { useCart } from "@/context/CartContext";

<<<<<<< HEAD
export default function BirdIdPjPage() {
  const { addToCart } = useCart();

  const opcoes = [
    {
      nome: "Bird ID PJ (Val. 1 ano)",
      preco: 209.9,
    },
    {
      nome: "Bird ID PJ (Val. 3 anos)",
      preco: 259.9,
=======
export default function BirdIDPJPage() {
  const { addToCart } = useCart();

  const produtos = [
    {
      id: "birdidpj-arquivo",
      nome: "Bird ID PJ A1 (Arquivo)",
      preco: 189.90,
    },
    {
      id: "birdidpj-cartao",
      nome: "Bird ID PJ A3 (Cartão + Leitora)",
      preco: 299.90,
    },
    {
      id: "birdidpj-token",
      nome: "Bird ID PJ A3 (Token)",
      preco: 329.90,
>>>>>>> 72c4bd4fb81d592523a075d60c15036cc28c002f
    },
  ];

  return (
<<<<<<< HEAD
    <main className="min-h-screen bg-white px-6 pt-28 pb-16 text-gray-800 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
          Certificado Bird ID Pessoa Jurídica
        </h1>
        <p className="text-gray-600 mb-10">
          Certificado digital com biometria facial para empresas. Emissão remota e validade jurídica, com segurança e praticidade.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 text-left">
          {opcoes.map((opcao, index) => (
            <div
              key={index}
              className="bg-gray-50 border rounded-xl p-6 shadow-sm hover:shadow-md transition"
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
=======
    <div className="min-h-screen bg-white text-gray-900 py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Certificado Bird ID PJ</h1>

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
            >
              Comprar
            </button>
          </div>
        ))}
>>>>>>> 72c4bd4fb81d592523a075d60c15036cc28c002f
      </div>
    </div>
  );
}
