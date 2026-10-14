import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-paper py-24 text-center">
      <div className="container-x">
        <p className="font-display text-7xl font-extrabold text-carimbo">404</p>
        <h1 className="mt-4 text-3xl font-extrabold">Página não encontrada</h1>
        <p className="mt-3 text-ink/60">O endereço pode ter mudado. Que tal ver nossos certificados?</p>
        <Link href="/certificados" className="btn-primary mt-8">Ver certificados</Link>
      </div>
    </section>
  );
}
