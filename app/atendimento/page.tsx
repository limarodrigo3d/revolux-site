'use client'

import { MapPin, Clock, Phone } from 'lucide-react'

export default function Atendimento() {
  return (
    <main className="min-h-screen pt-28 px-6 pb-16 bg-white text-gray-800 animate-fade-in">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
          Atendimento Presencial
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Além do atendimento online, oferecemos um espaço físico confortável para atendê-lo com segurança e comodidade.
        </p>

        <section className="space-y-8 text-left text-gray-700">
          <div className="flex items-start gap-4">
            <MapPin className="text-blue-600 mt-1" size={24} />
            <div>
              <p className="font-medium">Endereço:</p>
              <p>Rua Exemplo, 123 – Centro, Cidade MG, CEP 00000-000</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Clock className="text-blue-600 mt-1" size={24} />
            <div>
              <p className="font-medium">Horário de Atendimento:</p>
              <p>Segunda a Sexta, das 9h às 17h</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="text-blue-600 mt-1" size={24} />
            <div>
              <p className="font-medium">Telefone / WhatsApp:</p>
              <p>(32) 3532-8411</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
