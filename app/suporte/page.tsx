'use client';

import { LifeBuoy, Smartphone, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function SuportePage() {
  return (
    <main className="min-h-screen pt-28 px-6 pb-20 bg-gray-50 text-gray-800 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Suporte Técnico</h1>
        <p className="text-lg text-gray-600 mb-10">
          Conte com nosso time especializado para te auxiliar com instalação, uso e dúvidas
          relacionadas ao seu certificado digital.
        </p>

        <section className="space-y-8 text-left text-gray-700">
          <div className="flex items-start gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">
            <Wrench className="text-blue-600 mt-1" size={28} />
            <div>
              <h2 className="font-semibold text-lg mb-1">Instalação de Certificado</h2>
              <p className="text-sm">
                Suporte completo para instalar e configurar seu certificado A1 ou A3 em computador,
                celular ou token.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">
            <LifeBuoy className="text-blue-600 mt-1" size={28} />
            <div>
              <h2 className="font-semibold text-lg mb-1">Erros e Acessos</h2>
              <p className="text-sm">
                Ajuda para solucionar erros em portais como e-CAC, Conectividade Social, SEFAZ,
                Gov.br e outros sistemas governamentais.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition">
            <Smartphone className="text-blue-600 mt-1" size={28} />
            <div>
              <h2 className="font-semibold text-lg mb-1">Atendimento via WhatsApp</h2>
              <p className="text-sm">
                Clique aqui para falar diretamente com nosso suporte técnico:&nbsp;
                <Link
                  href="https://wa.me/553235328411"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  (32) 3532-8411
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
