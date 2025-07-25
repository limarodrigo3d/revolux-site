'use client';

import { useState } from 'react';

export default function PaginaContato() {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode integrar com Vercel Forms, Resend, Formspree, etc.
    setEnviado(true);
    setFormData({ nome: '', email: '', mensagem: '' });
  };

  return (
    <main className="min-h-screen pt-28 px-6 pb-20 bg-gradient-to-b from-gray-50 to-white text-gray-800 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 text-center">
          Fale Conosco
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Estamos prontos para ajudar. Envie sua mensagem e retornaremos o mais rápido possível.
        </p>

        {enviado ? (
          <div className="bg-green-50 border border-green-400 text-green-700 px-6 py-5 rounded-lg text-center shadow-md transition-all">
            ✅ Sua mensagem foi enviada com sucesso! Em breve retornaremos.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
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
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md"
            >
              Enviar Mensagem
            </button>
          </form>
        )}

        {/* Link para WhatsApp (opcional) */}
        <a
          href="https://wa.me/553235328411"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center mt-6 text-blue-700 font-semibold hover:underline"
        >
          Ou fale conosco direto no WhatsApp →
        </a>
      </div>
    </main>
  );
}
