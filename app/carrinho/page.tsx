'use client';

import { useCart, Produto } from '@/context/CartContext';
import Link from 'next/link';

export default function CarrinhoPage() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.preco * (item.quantidade ?? 1),
    0
  );

  const handleIncrement = (item: Produto) => {
    addToCart({ ...item, quantidade: 1 });
  };

  const handleDecrement = (item: Produto) => {
    if ((item.quantidade ?? 1) > 1) {
      removeFromCart(item.id);
      addToCart({ ...item, quantidade: (item.quantidade ?? 1) - 1 });
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-6 text-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center text-blue-700">
          Carrinho de Compras
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Seu carrinho está vazio.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-4 shadow-sm rounded-xl border border-gray-200"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.nome}</h2>
                  <p className="text-blue-600 font-medium">
                    R$ {item.preco.toFixed(2).replace('.', ',')}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => handleDecrement(item)}
                      className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                    >
                      -
                    </button>
                    <span>{item.quantidade ?? 1}</span>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="bg-green-500 text-white px-2 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remover
                </button>
              </div>
            ))}

            <div className="pt-6 border-t border-gray-300 mt-10">
              <p className="text-xl font-bold text-right mb-6">
                Total:{' '}
                <span className="text-green-600">
                  R$ {total.toFixed(2).replace('.', ',')}
                </span>
              </p>
              <div className="text-center">
                <Link href="/checkout">
                  <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition shadow-lg">
                    Finalizar Pedido
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
