'use client'

import { LifeBuoy, Smartphone, Wrench } from 'lucide-react'
import Link from 'next/link'

export default function SuportePage() {
  return (
    <main className="min-h-screen pt-28 px-6 pb-16 bg-white text-gray-800 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
          Suporte Técnico
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Conte com nosso time especializado para te auxiliar com instalação, uso e dúvidas sobre seu certificado digital.
        </p>

        <div className="space-y-6 text-left text-gray-700">
          <div className="flex items-start gap-3">
            <Wrench className="text-blue-600 mt-1" />
            <div>
              <strong>Instalação de Certificado:</strong><br />
              Suporte completo para instalar e configurar seu certificado A1 ou A3 em computador, celular ou token.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <LifeBuoy className="text-blue-600 mt-1" />
            <div>
              <strong>Erros e Acessos:</strong><br />
              Ajuda para solucionar erros em portais como e-CAC, Conectividade Social, SEFAZ, Gov.br e outros.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Smartphone className="text-blue-600 mt-1" />
            <div>
              <strong>Atendimento Direto via WhatsApp:</strong><br />
              Clique aqui para falar com nosso suporte técnico:&nbsp;
              <Link href="https://wa.me/553235328411" target="_blank" className="text-blue-600 underline">
                (32) 3532-8411
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
