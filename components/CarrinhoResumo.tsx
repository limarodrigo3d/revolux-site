'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';

export default function CarrinhoResumo() {
  const { totalItems, totalPrice } = useCart();
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/carrinho')}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '15px 25px',
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: 16,
        fontWeight: '600',
        color: '#1D4ED8',
        minWidth: 200,
      }}
      title="Ver carrinho"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') router.push('/carrinho');
      }}
    >
      <FaShoppingCart size={24} />
      <div>
        <div>Itens no carrinho: {totalItems}</div>
        <div>Total: R$ {totalPrice.toFixed(2).replace('.', ',')}</div>
        <small style={{ fontWeight: 400, fontSize: 12 }}>Clique para ver</small>
      </div>
    </div>
  );
}
