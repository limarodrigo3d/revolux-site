'use client';

import { useState } from 'react';

export default function ContatoPage() {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui você pode integrar com API de email, backend, ou Vercel Forms
    setEnviado(true);
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  return (
    <main className="min-h-screen pt-28 px-6 pb-20 bg-gray-50 text-gray-800 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center">
          Entre em Contato
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Estamos prontos para ajudar você com seu certificado digital. Envie sua dúvida ou solicitação.
        </p>

        {enviado ? (
          <div className="bg-green-100 border border-green-400 text-green-800 px-6 py-5 rounded-lg text-center shadow-md">
            ✅ Sua mensagem foi enviada com sucesso! Em breve retornaremos.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-2xl shadow-md border border-gray-200"
          >
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700">
                Mensagem
              </label>
              <textarea
                name="mensagem"
                id="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                required
                rows={5}
                className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow"
            >
              Enviar Mensagem
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
