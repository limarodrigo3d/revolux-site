// app/certificados/page.tsx
export default function CertificadosPage() {
  return (
    <main className="min-h-screen bg-white px-6 pt-28 pb-16 text-gray-800 animate-fade-in">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-700 mb-6">
          Certificados Digitais com Validade e Segurança
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12">
          Escolha o certificado ideal com total confiança. Soluções digitais para pessoas e empresas com praticidade e suporte.
        </p>

        {/* Linha 1 - e-CPF, e-CNPJ, NF-e */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* e-CPF */}
          <Card
            title="e-CPF"
            description="Perfeito para pessoa física assinar documentos com validade jurídica."
            href="/solucoes/e-cpf"
          />

          {/* e-CNPJ */}
          <Card
            title="e-CNPJ"
            description="Ideal para empresas autenticarem documentos com segurança digital."
            href="/solucoes/e-cnpj"
          />

          {/* NF-e / CT-e */}
          <Card
            title="NF-e / CT-e"
            description="Solução certa para emissão de Nota Fiscal e Conhecimento de Transporte Eletrônico."
            href="/solucoes/nfe-cte"
          />
        </div>

        {/* Linha 2 - Bird ID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Bird ID PF */}
          <Card
            title="Bird ID PF"
            description="Certificação digital por biometria facial. Prático, seguro e sem burocracia."
            href="/solucoes/bird-id-pf"
          />

          {/* Bird ID PJ */}
          <Card
            title="Bird ID PJ"
            description="Reconhecimento facial para assinatura digital empresarial com validade legal."
            href="/solucoes/bird-id-pj"
          />
        </div>
      </div>
    </main>
  );
}

// Card Component
function Card({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-blue-500 transition duration-300 text-left">
      <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-6">{description}</p>
      <a
        href={href}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
      >
        Ver opções
      </a>
    </div>
  );
}
