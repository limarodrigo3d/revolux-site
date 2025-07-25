export default function ObrigadoPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20 text-gray-800 animate-fade-in">
      <div className="max-w-xl bg-white rounded-2xl shadow-md p-10 text-center border border-gray-200">
        <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Pedido Concluído!</h1>
        <p className="text-lg text-gray-700 mb-8">
          Agradecemos pela sua compra.<br />
          Em breve entraremos em contato por e-mail com as instruções para emissão do seu certificado digital.
        </p>

        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md"
        >
          Voltar à Página Inicial
        </a>
      </div>
    </main>
  );
}
