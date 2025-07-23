'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Produto = {
  id: string;
  nome: string;
  preco: number;
  quantidade?: number;
};

type CartContextType = {
  cartItems: Produto[];
  addToCart: (produto: Produto) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Produto[]>([]);

  const addToCart = (produto: Produto) => {
    setCartItems((prevCart) => {
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

  const removeFromCart = (id: string) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
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
