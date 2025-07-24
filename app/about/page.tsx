// app/certificados/page.tsx
export default function CertificadosPage() {
  return (
    <main className="min-h-screen bg-white px-6 pt-28 pb-16 text-gray-800 animate-fade-in">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-6">
          Certificados Digitais
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          Escolha o certificado ideal para sua necessidade. Segurança e confiança em cada emissão.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* e-CPF */}
          <div className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">e-CPF</h2>
            <p className="text-sm text-gray-500 mb-4">
              Certificado digital para pessoa física.
            </p>
            <a
              href="/solucoes/e-cpf"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Ver opções
            </a>
          </div>

          {/* e-CNPJ */}
          <div className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">e-CNPJ</h2>
            <p className="text-sm text-gray-500 mb-4">
              Para empresas que precisam assinar com validade jurídica.
            </p>
            <a
              href="/solucoes/e-cnpj"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Ver opções
            </a>
          </div>

          {/* NF-e / CT-e */}
          <div className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">NF-e / CT-e</h2>
            <p className="text-sm text-gray-500 mb-4">
              Ideal para emissão de Nota Fiscal e Conhecimento de Transporte Eletrônico.
            </p>
            <a
              href="/solucoes/nfe-cte"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Ver opções
            </a>
          </div>
        </div>

        {/* Linha 2 - Bird ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Bird ID PF */}
          <div className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Bird ID PF</h2>
            <p className="text-sm text-gray-500 mb-4">
              Certificado digital por biometria facial para pessoas físicas.
            </p>
            <a
              href="/solucoes/bird-id-pf"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Ver opções
            </a>
          </div>

          {/* Bird ID PJ */}
          <div className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Bird ID PJ</h2>
            <p className="text-sm text-gray-500 mb-4">
              Assinatura digital com reconhecimento facial para empresas.
            </p>
            <a
              href="/solucoes/bird-id-pj"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              Ver opções
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
