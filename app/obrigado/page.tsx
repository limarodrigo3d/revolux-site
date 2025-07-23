'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function ObrigadoPage() {
  return (
    <main className="min-h-screen px-6 pt-28 pb-16 bg-white text-gray-800 flex flex-col items-center justify-center text-center">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Pedido Realizado com Sucesso!</h1>
      <p className="text-base text-gray-600 max-w-md mb-6">
        Obrigado por comprar com a <strong className="text-gray-800">Revolux Certificados</strong>. 
        Em breve entraremos em contato com as instruções para emissão do seu certificado digital.
      </p>

      <Link href="/">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition">
          Voltar para a Página Inicial
        </button>
      </Link>
    </main>
  );
}
