'use client';

import { useCart } from '@/context/CartContext';

export default function CarrinhoResumo() {
  const { totalItems, totalPrice } = useCart();

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      backgroundColor: 'white',
      padding: '10px 20px',
      borderRadius: 8,
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <p><strong>Itens no carrinho:</strong> {totalItems}</p>
      <p><strong>Total:</strong> R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
    </div>
  );
}
