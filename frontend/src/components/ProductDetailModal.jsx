import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import GuestCheckoutModal from './GuestCheckoutModal';
import QuotationModal from './QuotationModal';

export default function ProductDetailModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isDirectCheckoutOpen, setIsDirectCheckoutOpen] = useState(false);
  const [isQuotationOpen, setIsQuotationOpen] = useState(false);

  // Close on Escape key and lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!product) return null;

  const title = product.title || product.name || 'Product Details';
  const category = product.category || product.catLabel || 'Electronics';
  const brand = product.brand || 'Authorized Agent';
  const price = Number(product.price) || 0;
  const originalPrice = product.originalPrice ? Number(product.originalPrice) : null;
  const discount = product.discount || (originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null);

  const gallery = (product.images && product.images.length > 0)
    ? product.images
    : product.gallery || [product.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'];

  const handleWhatsAppOrder = () => {
    const msg = `*🛒 DIRECT INQUIRY - TECHLA*%0A-------------------------------------%0A` +
      `*Product:* ${encodeURIComponent(title)}%0A` +
      `*Category:* ${encodeURIComponent(category)}%0A` +
      `*Brand:* ${encodeURIComponent(brand)}%0A` +
      `*Quantity:* ${quantity}%0A` +
      `*Unit Price:* LKR ${price.toLocaleString()}%0A` +
      `*Total Estimate:* LKR ${(price * quantity).toLocaleString()}%0A%0A` +
      `Please confirm immediate availability, agent warranty terms, and delivery options to my address.`;

    window.open(`https://wa.me/94771234567?text=${msg}`, '_blank');
  };

  // Add to cart with Sense.lk feedback toast (Does NOT open checkout modal)
  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        title: title,
        price: price,
        image: gallery[0] || product.image,
        quantity: quantity,
        qty: quantity,
      },
      false
    );
    onClose();
  };

  // Place Order / Buy Now (Bypasses Cart, opens Direct Checkout immediately)
  const handleDirectBuyNow = () => {
    setIsDirectCheckoutOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Dim Backdrop - Clicking anywhere outside closes the popup */}
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity cursor-pointer"
          onClick={onClose}
        />

        {/* 1. FIXED SCREEN-CORNER CLOSE BUTTON (Fixed to Viewport, NEVER cut off by any modal size) */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-6 sm:right-8 z-[300] px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-90 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_10px_25px_rgba(225,29,72,0.6)] border-2 border-white transition-all cursor-pointer"
          title="Close Window (Esc)"
        >
          <i className="fa-solid fa-xmark text-base" />
          <span>CLOSE (✕)</span>
        </button>

        {/* Modal Window Container */}
        <div className="relative w-full max-w-4xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header Bar */}
          <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-slate-50 dark:bg-[#050b18] border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-techla-50 dark:bg-techla-500/20 text-techla-600 dark:text-cyan-400">
                {category}
              </span>
              <span className="text-slate-300 dark:text-slate-600">/</span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                {brand}
              </span>
            </div>

            {/* In-Modal Close Button */}
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-rose-500 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-xmark" />
              <span>Dismiss</span>
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start">
              
              {/* Product Gallery Left */}
              <div className="md:col-span-6 space-y-3">
                {/* Main Image Showcase */}
                <div className="relative rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/90 dark:border-white/10 overflow-hidden flex items-center justify-center aspect-square max-h-[320px] sm:max-h-[360px] p-4 mx-auto w-full">
                  <span className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider text-white shadow ${
                    product.inStock === false ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}>
                    {product.inStock === false ? 'Sold Out' : 'In Stock'}
                  </span>

                  {discount && (
                    <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow">
                      {discount}% OFF
                    </span>
                  )}

                  <img
                    src={gallery[selectedImg] || product.image}
                    alt={title}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Thumbnails if multiple images */}
                {gallery.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none justify-center">
                    {gallery.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImg(idx)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-slate-50 dark:bg-white/5 p-1 ${
                          selectedImg === idx
                            ? 'border-techla-500 scale-105 shadow-md'
                            : 'border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={imgUrl} alt="thumbnail" className="w-full h-full object-contain rounded-lg" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info & Purchase Buttons Right */}
              <div className="md:col-span-6 space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-techla-600 dark:text-cyan-400 uppercase tracking-widest block mb-1">
                    {brand} Authorized Sourced
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                    {title}
                  </h3>
                </div>

                {/* Price Display */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Verified Offer Rate
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-tech text-2xl font-black text-techla-600 dark:text-cyan-400">
                      LKR {price.toLocaleString()}
                    </span>
                    {originalPrice && originalPrice > price && (
                      <span className="font-tech text-xs text-slate-400 line-through">
                        LKR {originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 pt-0.5">
                    <i className="fa-solid fa-shield-check" />
                    <span>{product.condition || 'Official Company Warranty Included'}</span>
                  </div>
                </div>

                {/* Quantity Controller */}
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="font-bold text-slate-600 dark:text-slate-300">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden bg-slate-50 dark:bg-white/5">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center font-bold hover:bg-slate-200 dark:hover:bg-white/10"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-tech font-bold text-xs">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center font-bold hover:bg-slate-200 dark:hover:bg-white/10"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-slate-400 font-tech text-xs">
                      = LKR {(price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons: Buy Now (Direct Checkout) + Add to Cart + WhatsApp */}
                <div className="space-y-2 pt-1">
                  {/* DIRECT PLACE ORDER BUTTON - Bypasses Cart Drawer Completely */}
                  <button
                    onClick={handleDirectBuyNow}
                    disabled={product.inStock === false}
                    className={`w-full py-3.5 px-4 rounded-xl text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all transform active:scale-95 ${
                      product.inStock === false
                        ? 'bg-slate-400 cursor-not-allowed opacity-60'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25'
                    }`}
                  >
                    <i className="fa-solid fa-bolt text-sm text-amber-300" />
                    <span>{product.inStock === false ? 'Out of Stock' : '⚡ Buy Now / Place Order'}</span>
                  </button>

                  {/* SENSE.LK STYLE ADD TO CART - Shows "Added to Cart" Toast Feedback */}
                  <button
                    onClick={handleAddToCart}
                    disabled={product.inStock === false}
                    className={`w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      product.inStock === false
                        ? 'bg-slate-400 cursor-not-allowed opacity-60'
                        : 'bg-techla-600 hover:bg-techla-700 shadow-md shadow-techla-500/20 active:scale-95'
                    }`}
                  >
                    <i className="fa-solid fa-cart-plus" />
                    <span>Add to Cart</span>
                  </button>

                  {/* WHATSAPP INQUIRE & QUOTATION BUTTONS */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleWhatsAppOrder}
                      className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <i className="fa-brands fa-whatsapp text-sm" />
                      <span>WhatsApp</span>
                    </button>

                    {/* SENSE.LK STYLE FORMAL QUOTATION BUTTON */}
                    <button
                      onClick={() => setIsQuotationOpen(true)}
                      className="py-2.5 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-cyan-400 border border-blue-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      title="Download Official PDF Quotation for Office / Loans"
                    >
                      <i className="fa-solid fa-file-invoice text-sm" />
                      <span>Get Quotation</span>
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-[11px] flex items-center gap-2">
                  <i className="fa-solid fa-truck-fast text-techla-500" />
                  <span>Cash on Delivery (Island-wide) & Pickup Available</span>
                </div>
              </div>

            </div>

            {/* Description / Overview Section */}
            {product.description && (
              <div className="border-t border-slate-200 dark:border-white/10 pt-4">
                <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1.5">
                  Overview & Key Specifications
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Direct Buy Now Checkout Modal (Bypasses Cart Drawer) */}
      <GuestCheckoutModal
        isOpen={isDirectCheckoutOpen}
        directItem={{
          id: product.id,
          title: title,
          price: price,
          quantity: quantity,
          qty: quantity,
        }}
        onClose={() => {
          setIsDirectCheckoutOpen(false);
          onClose();
        }}
      />

      {/* Sense.lk Style Quotation Modal for Single Item */}
      <QuotationModal
        isOpen={isQuotationOpen}
        onClose={() => setIsQuotationOpen(false)}
        items={[
          {
            title: title,
            price: price,
            quantity: quantity,
            condition: product.condition,
          },
        ]}
        totalAmount={price * quantity}
      />
    </>
  );
}
