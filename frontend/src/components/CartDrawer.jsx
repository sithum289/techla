import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import GuestCheckoutModal from './GuestCheckoutModal';
import QuotationModal from './QuotationModal';

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

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
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
                    <div className="w-14 h-14 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <i className="fa-solid fa-microchip text-slate-400 text-lg" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {item.title}
                      </h5>
                      <div className="text-[11px] font-tech font-bold text-techla-600 dark:text-cyanGlow mt-0.5">
                        LKR {Number(item.price).toLocaleString()}
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQty(item.id, (item.qty || 1) - 1)}
                          className="w-6 h-6 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white text-xs flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold font-tech px-2">
                          {item.qty || 1}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, (item.qty || 1) + 1)}
                          className="w-6 h-6 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white text-xs flex items-center justify-center"
                        >
                          +
                        </button>
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
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-techla-600 to-blue-600 hover:from-techla-500 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-techla-500/25 flex items-center justify-center gap-2.5 transition-all transform active:scale-95"
                  >
                    <i className="fa-solid fa-truck-fast text-base" />
                    <span>Place Order (Cash on Delivery)</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={checkoutWhatsApp}
                      className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <i className="fa-brands fa-whatsapp text-sm" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => setIsQuotationOpen(true)}
                      className="py-2.5 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-cyan-400 border border-blue-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      title="Download PDF Quotation for Cart Items"
                    >
                      <i className="fa-solid fa-file-invoice text-sm" />
                      <span>Download Quotation</span>
                    </button>
                  </div>

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

      <GuestCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
}
