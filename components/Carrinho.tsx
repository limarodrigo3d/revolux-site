'use client';

import { useCart, Produto } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function Carrinho() {
  const { cartItems, totalItems, totalPrice, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const handleFinalizarCompra = () => {
    router.push('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div style={{
        position: 'fixed',
        bottom: 70,
        right: 20,
        backgroundColor: 'white',
        padding: '10px 20px',
        borderRadius: 8,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        maxWidth: 320,
        zIndex: 1000
      }}>
        <p>Carrinho vazio.</p>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 70,
      right: 20,
      backgroundColor: 'white',
      padding: '10px 20px',
      borderRadius: 8,
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      maxWidth: 320,
      zIndex: 1000
    }}>
      <h2 style={{ fontWeight: 'bold', marginBottom: 8 }}>Carrinho</h2>
      <ul style={{ maxHeight: 200, overflowY: 'auto', marginBottom: 16 }}>
        {cartItems.map((item: Produto) => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <p>{item.nome}</p>
              <p>Qtd: {item.quantidade ?? 1}</p>
              <p>R$ {(item.preco * (item.quantidade ?? 1)).toFixed(2).replace('.', ',')}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{ color: 'red', fontWeight: 'bold', marginLeft: 12, cursor: 'pointer', border: 'none', background: 'none' }}
              aria-label={`Remover ${item.nome}`}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <p style={{ fontWeight: 'bold', marginBottom: 12 }}>
        Total: R$ {totalPrice.toFixed(2).replace('.', ',')}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Esvaziar
        </button>
        <button
          onClick={handleFinalizarCompra}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}
