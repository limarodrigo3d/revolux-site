import { redirect } from 'next/navigation';

// O carrinho foi substituído pela compra direta (Comprar agora → /checkout)
export default function Page() {
  redirect('/certificados');
}
