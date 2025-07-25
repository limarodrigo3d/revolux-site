'use client';

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSubMenu = () => setSubMenuOpen(!subMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo Revolux" className="h-12 md:h-16" />
          <span className="text-lg md:text-xl font-semibold text-gray-800">
            Revolux Certificados
          </span>
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition">Início</Link>
          <Link href="/sobrenos" className="hover:text-blue-600 transition">Sobre Nós</Link>
          <Link href="/certificados" className="hover:text-blue-600 transition">Certificados</Link>

          {/* Menu com submenu */}
          <div className="relative group">
            <button
              className="hover:text-blue-600 transition focus:outline-none"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Soluções
            </button>
            <div className="absolute left-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px] z-50">
              <Link href="/solucoes/e-cpf" className="block px-4 py-2 hover:bg-gray-100">e-CPF</Link>
              <Link href="/solucoes/e-cnpj" className="block px-4 py-2 hover:bg-gray-100">e-CNPJ</Link>
              <Link href="/solucoes/nfe-cte" className="block px-4 py-2 hover:bg-gray-100">NF-e / CT-e</Link>
              <Link href="/solucoes/bird-id-pf" className="block px-4 py-2 hover:bg-gray-100">Bird ID PF</Link>
              <Link href="/solucoes/bird-id-pj" className="block px-4 py-2 hover:bg-gray-100">Bird ID PJ</Link>
            </div>
          </div>

          <Link href="/contato" className="hover:text-blue-600 transition">Contato</Link>

          {/* Carrinho */}
          <Link
            href="/carrinho"
            className="flex items-center gap-1 hover:text-blue-600 transition"
          >
            <ShoppingCart size={18} />
            Carrinho
          </Link>
        </nav>

        {/* Botão hamburguer mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Navegação mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-white shadow-md text-sm font-medium text-gray-700 space-y-3">
          <Link href="/" className="block hover:text-blue-600 transition">Início</Link>
          <Link href="/sobrenos" className="block hover:text-blue-600 transition">Sobre Nós</Link>
          <Link href="/certificados" className="block hover:text-blue-600 transition">Certificados</Link>

          {/* Submenu mobile */}
          <button
            onClick={toggleSubMenu}
            className="block w-full text-left hover:text-blue-600 transition"
            aria-expanded={subMenuOpen}
          >
            Soluções
          </button>
          {subMenuOpen && (
            <div className="ml-4 space-y-1">
              <Link href="/solucoes/e-cpf" className="block hover:text-blue-600">e-CPF</Link>
              <Link href="/solucoes/e-cnpj" className="block hover:text-blue-600">e-CNPJ</Link>
              <Link href="/solucoes/nfe-cte" className="block hover:text-blue-600">NF-e / CT-e</Link>
              <Link href="/solucoes/bird-id-pf" className="block hover:text-blue-600">Bird ID PF</Link>
              <Link href="/solucoes/bird-id-pj" className="block hover:text-blue-600">Bird ID PJ</Link>
            </div>
          )}

          <Link href="/contato" className="block hover:text-blue-600 transition">Contato</Link>
          <Link href="/carrinho" className="block hover:text-blue-600 transition">🛒 Carrinho</Link>
        </div>
      )}
    </header>
  );
}
