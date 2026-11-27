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
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('techla_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sense.lk style: Add to cart with feedback toast
  const addToCart = (product, openDrawer = false) => {
    const qtyToAdd = product.quantity || product.qty || 1;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qtyToAdd } : item
        );
      }
      return [...prev, { ...product, qty: qtyToAdd }];
    });

    // Show Sense.lk style "Added to Cart" popup toast
    setToastMessage({
      title: product.title || product.name || 'Item',
      price: product.price,
      image: product.image,
      qty: qtyToAdd,
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.qty || 1),
    0
  );

  const totalCount = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);

  const checkoutWhatsApp = (singleItem = null) => {
    const itemsToOrder = singleItem ? [{ ...singleItem, qty: 1 }] : cartItems;
    if (itemsToOrder.length === 0) return;

    let text = `*🛒 OFFICIAL ORDER INQUIRY - TECHLA*%0A-------------------------------------%0A`;
    itemsToOrder.forEach((item, idx) => {
      text += `${idx + 1}. *${encodeURIComponent(item.title || item.name)}* (x${item.qty || 1}) - LKR ${Number(item.price * (item.qty || 1)).toLocaleString()}%0A`;
    });
    const total = singleItem ? singleItem.price : totalAmount;
    text += `-------------------------------------%0A*Total Amount:* LKR ${total.toLocaleString()}%0A%0APlease arrange immediate delivery & confirm stock warranty.`;

    window.open(`https://wa.me/94771234567?text=${text}`, '_blank');
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
        checkoutWhatsApp,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}

      {/* SENSE.LK STYLE "ADDED TO CART" NOTIFICATION TOAST */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[300] max-w-sm w-full bg-white dark:bg-[#071126] border-2 border-emerald-500 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 text-base">
              <i className="fa-solid fa-circle-check" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-400">
                  Added to Cart!
                </span>
                <button
                  onClick={() => setToastMessage(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>

              <h5 className="font-heading font-bold text-xs text-slate-900 dark:text-white truncate mt-0.5">
                {toastMessage.title}
              </h5>

              <p className="font-tech text-xs font-extrabold text-techla-600 dark:text-cyan-400 mt-0.5">
                LKR {Number(toastMessage.price * toastMessage.qty).toLocaleString()} (x{toastMessage.qty})
              </p>

              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => {
                    setToastMessage(null);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 py-1.5 rounded-lg bg-techla-600 hover:bg-techla-700 text-white font-bold text-[11px] shadow-sm flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-cart-shopping text-[10px]" />
                  <span>View Cart</span>
                </button>

                <button
                  onClick={() => setToastMessage(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-[11px]"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
