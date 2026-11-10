import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('techla_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('techla_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const checkoutWhatsApp = () => {
    if (cartItems.length === 0) return;
    let message = `*🛒 NEW ORDER - TECHLA (PVT) LTD*%0A-------------------------------------%0A`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${encodeURIComponent(item.name)}*%0A   Qty: ${item.qty} × LKR ${item.price.toLocaleString()} = LKR ${(item.price * item.qty).toLocaleString()}%0A`;
    });
    message += `-------------------------------------%0A*Total Order Value: LKR ${totalAmount.toLocaleString()}*%0A%0A`;
    message += `I would like to confirm stock and arrange delivery / pickup from the Colombo Showroom.`;

    window.open(`https://wa.me/94771234567?text=${message}`, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalAmount,
        totalCount,
        checkoutWhatsApp
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

