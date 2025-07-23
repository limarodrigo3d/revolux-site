'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Produto = {
  id: string;
  nome: string;
  preco: number;
  quantidade?: number;
};

type CartContextType = {
  cart: Produto[];
  addToCart: (produto: Produto) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Produto[]>([]);

  const addToCart = (produto: Produto) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === produto.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: (item.quantidade || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { ...produto, quantidade: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro do CartProvider');
  }
  return context;
};
