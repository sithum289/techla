import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function GuestCheckoutModal({ isOpen, onClose, directItem }) {
  const { cartItems, totalAmount, clearCart, setIsCartOpen } = useCart();
  const { user, token } = useAuth();

  // If buying a direct item (Buy Now), use that item. Otherwise use cartItems.
  const isDirect = Boolean(directItem);
  const checkoutItems = isDirect
    ? [
        {
          id: directItem.id,
          title: directItem.title,
          price: directItem.price,
          quantity: directItem.quantity || directItem.qty || 1,
        },
      ]
    : cartItems;

  const checkoutTotal = isDirect
    ? directItem.price * (directItem.quantity || directItem.qty || 1)
    : totalAmount;

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [shippingAddress, setShippingAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      if (user.name) setCustomerName(user.name);
      if (user.phone) setCustomerPhone(user.phone);
      if (user.email) setCustomerEmail(user.email);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        customerName,
        customerPhone,
        customerEmail,
        shippingAddress,
        notes,
        totalAmount: checkoutTotal,
        items: checkoutItems.map((item) => ({
          productId: item.id || null,
          title: item.title,
          price: item.price,
          quantity: item.quantity || item.qty || 1,
        })),
      };

      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      setOrderSuccess(data.order);
      if (!isDirect) {
        clearCart();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    setOrderSuccess(null);
    onClose();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[280] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center"
        >
          <i className="fa-solid fa-xmark text-sm" />
        </button>

        {orderSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-3xl">
              <i className="fa-solid fa-check" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white font-heading">
              Order Placed Successfully!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Thank you, <span className="font-bold text-slate-800 dark:text-slate-200">{orderSuccess.customerName}</span>. Your order reference is:
            </p>
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 font-mono text-sm font-bold text-techla-600 dark:text-cyan-400">
              #{orderSuccess.id.slice(0, 8).toUpperCase()}
            </div>
            <p className="text-[11px] text-slate-400">
              Our team will call or WhatsApp you at <span className="font-bold">{orderSuccess.customerPhone}</span> to confirm delivery.
            </p>
            <button
              onClick={handleDone}
              className="mt-4 px-6 py-2.5 rounded-xl bg-techla-600 hover:bg-techla-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              Back to Store
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-techla-50 dark:bg-techla-500/20 text-techla-600 dark:text-cyan-300">
                {isDirect ? '⚡ Direct Buy Now Checkout' : (user ? `Ordering as ${user.name}` : '⚡ Guest Checkout')}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading mt-2">
                Delivery Details
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Cash On Delivery (Island-wide) & Showroom Pickup
              </p>
            </div>

            {/* Item Preview */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-4 text-xs space-y-1.5">
              <div className="font-bold text-slate-800 dark:text-slate-200 flex justify-between">
                <span className="truncate pr-2">
                  {checkoutItems.map((i) => `${i.quantity || 1}x ${i.title}`).join(', ')}
                </span>
                <span className="font-tech text-techla-600 dark:text-cyan-400 font-extrabold shrink-0">
                  LKR {Number(checkoutTotal).toLocaleString()}
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ruwan Silva"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-techla-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0771234567"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-techla-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="ruwan@example.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-techla-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="House No, Street, City / Area"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-techla-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Special Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Call before delivery, pickup instructions..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-techla-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-truck-fast" />
                <span>{loading ? 'Submitting Order...' : 'Confirm Order (Cash on Delivery)'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
