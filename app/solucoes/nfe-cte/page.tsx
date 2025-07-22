"use client";

export default function BirdIdPfPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 px-6 md:px-20 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#0057D8]">
        Escolha as opções disponíveis para Bird ID PF
      </h1>
      <p className="mb-10 text-lg text-gray-600">
        O Bird ID Pessoa Física é ideal para autenticação e assinatura digital com biometria facial.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Opção 1 */}
        <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Bird ID PF - 12 Meses</h2>
          <p className="text-gray-600 mb-4">R$ 110,00</p>
          <button className="bg-[#0057D8] text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
            Comprar
          </button>
        </div>

        {/* Opção 2 */}
        <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Bird ID PF - 24 Meses</h2>
          <p className="text-gray-600 mb-4">R$ 185,00</p>
          <button className="bg-[#0057D8] text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
            Comprar
          </button>
        </div>

        {/* Opção 3 */}
        <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Bird ID PF - 36 Meses</h2>
          <p className="text-gray-600 mb-4">R$ 240,00</p>
          <button className="bg-[#0057D8] text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full">
            Comprar
          </button>
        </div>
      </div>
    </main>
  );
}
