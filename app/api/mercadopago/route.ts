// Rota antiga desativada: ela aceitava qualquer preço vindo do navegador.
// O pagamento agora é feito por /api/pagamento. Pode apagar esta pasta.
import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Rota desativada.' }, { status: 410 });
}
