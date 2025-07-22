// app/obrigado/page.tsx
export default function ObrigadoPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center text-center px-6">
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Pedido Concluído!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Agradecemos pela sua compra. Em breve entraremos em contato por e-mail com as instruções para emissão do seu certificado digital.
        </p>

        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Voltar à Página Inicial
        </a>
      </div>
    </div>
  );
}
