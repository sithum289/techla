import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQty,
    clearCart,
    totalAmount,
    totalCount,
    checkoutWhatsApp
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#071126] border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center">
                <i className="fa-solid fa-cart-shopping text-lg" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  Your Shopping Cart
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-slate-400">
                <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-3xl text-slate-300 dark:text-slate-600">
                  <i className="fa-solid fa-basket-shopping" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-slate-800 dark:text-slate-200 text-lg">
                    Your cart is empty
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Browse our high-performance computer parts and click "Add to Cart" to start your order.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-techla-500 text-white font-bold text-xs shadow-lg shadow-techla-500/30 hover:bg-techla-600 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 flex gap-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-white/10 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </h5>
                    <span className="text-[10px] text-techla-600 dark:text-cyanGlow font-tech block uppercase tracking-wider">
                      LKR {item.price.toLocaleString()} each
                    </span>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden bg-white dark:bg-black/40">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900 dark:text-white font-tech">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-slate-900 dark:text-white font-tech">
                        LKR {(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <i className="fa-solid fa-trash-can text-sm" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-[#050b18] space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-xs">
                  <span>Subtotal</span>
                  <span className="font-tech font-bold text-slate-800 dark:text-slate-200">
                    LKR {totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-xs">
                  <span>Colombo Showroom Pickup</span>
                  <span className="text-emerald-500 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-xs">
                  <span>Island-wide Courier Delivery</span>
                  <span className="text-techla-600 dark:text-cyanGlow font-bold">Available</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex justify-between items-baseline">
                  <span className="font-heading font-bold text-slate-900 dark:text-white text-base">
                    Total
                  </span>
                  <span className="font-tech text-xl font-extrabold text-techla-600 dark:text-cyanGlow">
                    LKR {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={checkoutWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2.5 transition-all group"
                >
                  <i className="fa-brands fa-whatsapp text-lg group-hover:scale-110 transition-transform" />
                  <span>Order Directly on WhatsApp</span>
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={clearCart}
                    className="text-[11px] text-slate-400 hover:text-red-500 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <i className="fa-solid fa-shield-check text-emerald-500" /> Official Agent Warranty
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

