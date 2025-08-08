import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (producto, quantity) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === producto.id);
      if (exist) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prev, { ...producto, quantity }];
      }
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalQuantity = () => cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = () =>
    cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, clearCart, totalQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
