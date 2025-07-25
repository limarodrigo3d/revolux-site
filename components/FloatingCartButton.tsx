"use client";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function FloatingCart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.preco * (item.quantidade || 1), 0);

  if (cartItems.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed right-5 bottom-20 bg-white shadow-xl rounded-xl p-6 w-72 z-50"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
        Carrinho
      </h2>

      <ul className="space-y-3 mb-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-700 font-medium">{item.nome}</p>
              <p className="text-xs text-gray-500">Qtd: {item.quantidade || 1}</p>
              <p className="text-xs text-gray-500">
                R$ {(item.preco * (item.quantidade || 1)).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-400 hover:text-red-600 text-sm"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <p className="font-bold text-gray-800 mb-4 border-t pt-2">Total: R$ {total.toFixed(2)}</p>

      <div className="space-y-2">
        <button
          onClick={clearCart}
          className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300 py-2 rounded-lg transition"
        >
          Esvaziar Carrinho
        </button>
        <button
          className="w-full bg-green-500 text-white hover:bg-green-600 py-2 rounded-lg transition"
          onClick={() => window.location.href = '/checkout'}
        >
          Finalizar Compra
        </button>
      </div>
    </motion.div>
  );
}
