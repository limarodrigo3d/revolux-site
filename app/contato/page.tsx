'use client'

import { useState } from 'react'

export default function ContatoPage() {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode integrar com API, serviço de email ou Vercel Forms
    setEnviado(true)
    setFormData({ nome: '', email: '', mensagem: '' })
  }

  return (
    <main className="min-h-screen pt-28 px-6 pb-16 bg-white text-gray-800 animate-fade-in">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4 text-center">
          Entre em Contato
        </h1>
        <p className="text-gray-700 mb-8 text-center">
          Estamos prontos para ajudar você com seu certificado digital.
        </p>

        {enviado ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg text-center">
            ✅ Mensagem enviada com sucesso! Em breve entraremos em contato.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">Mensagem</label>
              <textarea
                name="mensagem"
                id="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
