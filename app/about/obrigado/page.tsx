export default function ObrigadoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Pedido Realizado com Sucesso!</h1>
      <p className="text-lg text-gray-700">
        Obrigado por comprar com a <strong>Revolux Certificados Digitais</strong>! <br />
        Em breve entraremos em contato com você para concluir o processo de emissão do seu certificado.
      </p>

      <a
        href="/"
        className="inline-block mt-8 bg-[#0057D8] text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Voltar para a Home
      </a>
    </div>
  );
}
