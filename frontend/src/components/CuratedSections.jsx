import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ProductDetailModal from './ProductDetailModal';

export default function CuratedSections({ onSelectCategory }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  // Split products into Sense.lk style curated blocks
  const dealProducts = products.filter((p) => (p.discount && p.discount > 0) || (p.originalPrice && p.originalPrice > p.price)).slice(0, 4);
  const homeAppliances = products.filter((p) =>
    ['Refrigerators & Freezers', 'Washing Machines', 'Kitchen Appliances', 'Smart TVs & Audio', 'Air Conditioners & Fans'].includes(p.category)
  ).slice(0, 4);
  const techGadgets = products.filter((p) =>
    ['Mobile Phones', 'Laptops & Computers', 'Computer Hardware & Parts', 'Accessories & Gadgets', 'CCTV & Security Systems'].includes(p.category)
  ).slice(0, 4);

  const renderProductCard = (p) => {
    const discountPct = p.discount || (p.originalPrice && p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : null);

    return (
      <div
        key={p.id}
        className="group rounded-3xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 p-4 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
      >
        <div>
          <div
            onClick={() => setSelectedProduct(p)}
            className="relative aspect-square rounded-2xl bg-slate-50 dark:bg-white/5 overflow-hidden flex items-center justify-center p-3 cursor-pointer"
          >
            {discountPct && (
              <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow">
                {discountPct}% OFF
              </span>
            )}
            {p.image ? (
              <img src={p.image} alt={p.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            ) : (
              <i className="fa-solid fa-box text-3xl text-slate-400" />
            )}
          </div>

          <div className="mt-3 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-techla-600 dark:text-cyan-400">
              {p.category}
            </span>
            <h4
              onClick={() => setSelectedProduct(p)}
              className="font-heading font-bold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 cursor-pointer hover:text-techla-600 transition-colors"
            >
              {p.title}
            </h4>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-3 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="font-tech text-base font-extrabold text-slate-900 dark:text-white">
              LKR {Number(p.price).toLocaleString()}
            </span>
            {p.originalPrice && p.originalPrice > p.price && (
              <span className="font-tech text-xs text-slate-400 line-through">
                LKR {Number(p.originalPrice).toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={() => {
              addToCart(p);
              setIsCartOpen(true);
            }}
            disabled={!p.inStock}
            className={`w-full py-2 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              p.inStock ? 'bg-techla-600 hover:bg-techla-700 active:scale-95' : 'bg-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            <i className="fa-solid fa-cart-plus text-xs" />
            <span>{p.inStock ? 'Add to Cart' : 'Sold Out'}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 py-6">
      
      {/* 1. SENSE.LK STYLE FLASH / HOT OFFERS ROW */}
      {dealProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border border-blue-500/30 text-white shadow-xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
                  <i className="fa-solid fa-fire text-amber-400" /> Special Promotional Deals
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black">
                  Trending Offers & Verified Discounts
                </h3>
              </div>
              <a
                href="#store"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold transition-all"
              >
                View Full Catalog →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {dealProducts.map(renderProductCard)}
            </div>
          </div>
        </section>
      )}

      {/* 2. SINGER / ABANS STYLE HOME APPLIANCES ROW */}
      {homeAppliances.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                  🏠 Home & Kitchen Appliances
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Refrigerators, Inverter Washing Machines & Smart Kitchen Gadgets
              </p>
            </div>
            <button
              onClick={() => onSelectCategory && onSelectCategory('Refrigerators & Freezers')}
              className="text-xs font-bold text-techla-600 dark:text-cyan-400 hover:underline"
            >
              See All Appliances →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {homeAppliances.map(renderProductCard)}
          </div>
        </section>
      )}

      {/* 3. SENSE.LK STYLE COMPUTERS & SMARTPHONES ROW */}
      {techGadgets.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                  💻 Mobile, Laptops & IT Hardware
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Authorized Importer Stocks: Apple, Samsung, ASUS, Hikvision CCTV
              </p>
            </div>
            <button
              onClick={() => onSelectCategory && onSelectCategory('Mobile Phones')}
              className="text-xs font-bold text-techla-600 dark:text-cyan-400 hover:underline"
            >
              See All Tech →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {techGadgets.map(renderProductCard)}
          </div>
        </section>
      )}

      {/* Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
