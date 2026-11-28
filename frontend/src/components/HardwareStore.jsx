import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import ProductDetailModal from './ProductDetailModal';
import QuotationModal from './QuotationModal';
import { STORE_CATEGORIES } from '../constants/categories';
import { API_BASE_URL } from '../constants/api';
import { FALLBACK_PRODUCTS } from '../constants/fallbackProducts';

export default function HardwareStore({ activeCategory, setActiveCategory, searchQuery }) {
  const { addToCart, checkoutWhatsApp, setIsCartOpen } = useCart();
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quotationProduct, setQuotationProduct] = useState(null);

  // Filters State (Sense.lk style sidebar controls)
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'discount'
  const [maxPrice, setMaxPrice] = useState(500000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setDbProducts(data);
          return;
        }
      }
      // If backend returns empty or non-200, use robust fallback catalog
      setDbProducts(FALLBACK_PRODUCTS);
    } catch (err) {
      console.warn('Backend unavailable, using catalog fallback:', err);
      setDbProducts(FALLBACK_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  // Extract all unique brands dynamically
  const uniqueBrands = useMemo(() => {
    const brandsMap = {};
    dbProducts.forEach((p) => {
      if (p.brand) {
        brandsMap[p.brand] = (brandsMap[p.brand] || 0) + 1;
      }
    });
    return Object.entries(brandsMap).sort((a, b) => b[1] - a[1]);
  }, [dbProducts]);

  // Toggle a brand in filter
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const resetAllFilters = () => {
    setSelectedBrands([]);
    setInStockOnly(false);
    setMaxPrice(500000);
    if (setActiveCategory) setActiveCategory('all');
  };

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = dbProducts.filter((item) => {
      // Category filter
      if (activeCategory && activeCategory !== 'all') {
        if (item.category.toLowerCase() !== activeCategory.toLowerCase()) {
          return false;
        }
      }

      // Search query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(q);
        const matchBrand = item.brand?.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchDesc) return false;
      }

      // Brand Checklist
      if (selectedBrands.length > 0) {
        if (!item.brand || !selectedBrands.includes(item.brand)) {
          return false;
        }
      }

      // In Stock filter
      if (inStockOnly && !item.inStock) {
        return false;
      }

      // Price limit
      if (Number(item.price) > maxPrice) {
        return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'discount') {
      result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }

    return result;
  }, [dbProducts, activeCategory, searchQuery, selectedBrands, inStockOnly, maxPrice, sortBy]);

  const activeCategoryObj = STORE_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <section id="store" className="py-10 bg-slate-50 dark:bg-[#050813] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Home</span>
              <span>/</span>
              <span>Catalog</span>
              <span>/</span>
              <span className="font-bold text-techla-600 dark:text-cyan-400">
                {activeCategoryObj ? activeCategoryObj.name : 'All Products'}
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {activeCategoryObj ? activeCategoryObj.name : 'Official Store & Electronics Catalog'}
            </h2>
          </div>

          {/* Sort Controls & Mobile Filter Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3 py-2 rounded-xl bg-techla-600 text-white border border-techla-500 text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <i className="fa-solid fa-sliders text-xs" />
              <span>Filter Options ({selectedBrands.length + (inStockOnly ? 1 : 0)})</span>
            </button>

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-2.5 py-2 rounded-xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-techla-500 shadow-sm"
              >
                <option value="featured">Featured / Newest</option>
                <option value="discount">Highest Discount %</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* MOBILE INLINE QUICK BRAND PILLS (Always visible on mobile without needing to open filters) */}
        {uniqueBrands.length > 0 && (
          <div className="lg:hidden mb-5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1.5 px-1">
              <span>FILTER BY BRAND:</span>
              {selectedBrands.length > 0 && (
                <button
                  onClick={() => setSelectedBrands([])}
                  className="text-rose-500 text-[10px] font-bold hover:underline"
                >
                  Clear ({selectedBrands.length})
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedBrands([])}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                  selectedBrands.length === 0
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-[#071126] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                }`}
              >
                All Brands
              </button>
              {uniqueBrands.map(([brand, count]) => {
                const isSelected = selectedBrands.includes(brand);
                return (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 flex items-center gap-1 transition-all ${
                      isSelected
                        ? 'bg-techla-600 text-white shadow-md shadow-techla-500/30 ring-2 ring-cyan-400'
                        : 'bg-white dark:bg-[#071126] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <span>{brand}</span>
                    <span className="text-[10px] opacity-75 font-tech">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2-Column Layout: Sense.lk Left Filter Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================== SENSE.LK STYLE LEFT SIDEBAR FILTERS ===================== */}
          <aside
            className={`lg:col-span-3 space-y-6 ${
              mobileFilterOpen
                ? 'fixed inset-0 z-[250] bg-white dark:bg-[#071126] p-5 sm:p-6 overflow-y-auto block animate-in slide-in-from-bottom-5 duration-200'
                : 'hidden lg:block'
            }`}
          >
            {mobileFilterOpen && (
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 lg:hidden sticky top-0 bg-white/95 dark:bg-[#071126]/95 backdrop-blur-md z-20">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-sliders text-techla-500" />
                  <h3 className="font-heading font-black text-base text-slate-900 dark:text-white">
                    Filter & Refine Products
                  </h3>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                  <span>Done</span>
                </button>
              </div>
            )}

            <div className="p-5 rounded-2xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <i className="fa-solid fa-sliders text-techla-500" />
                  <span>Filter by Options</span>
                </h4>
                {(selectedBrands.length > 0 || inStockOnly || activeCategory !== 'all') && (
                  <button
                    onClick={resetAllFilters}
                    className="text-[11px] text-rose-500 hover:underline font-semibold"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* 1. Category Tree */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Department / Category
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => setActiveCategory && setActiveCategory('all')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      activeCategory === 'all'
                        ? 'bg-techla-500 text-white font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[10px] opacity-75">{dbProducts.length}</span>
                  </button>

                  {STORE_CATEGORIES.map((c) => {
                    const count = dbProducts.filter((p) => p.category.toLowerCase() === c.id.toLowerCase()).length;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setActiveCategory && setActiveCategory(c.id)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                          activeCategory === c.id
                            ? 'bg-techla-500 text-white font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className="truncate">{c.name}</span>
                        <span className="text-[10px] opacity-75">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Stock Availability Filter */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Availability
                </label>
                <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-techla-600 focus:ring-techla-500"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* 3. Price Filter Slider */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span className="uppercase">Max Budget</span>
                  <span className="text-techla-600 dark:text-cyan-400 font-tech">
                    LKR {maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-techla-500"
                />
              </div>

              {/* 4. Brand Multi-Checklist (Sense.lk style) */}
              {uniqueBrands.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Brands ({uniqueBrands.length})
                  </label>
                  <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                    {uniqueBrands.map(([brand, count]) => (
                      <label
                        key={brand}
                        className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer py-0.5"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="w-3.5 h-3.5 rounded text-techla-600 focus:ring-techla-500"
                          />
                          <span className="font-medium truncate">{brand}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-tech">({count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Showroom & Warranty Assurance */}
              <div className="pt-3 border-t border-slate-100 dark:border-white/5 text-[11px] text-slate-400 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <i className="fa-solid fa-shield-check" /> 100% Authorized Agents
                </div>
                <p className="text-[10px]">
                  All appliances & gadgets carry direct importer barcode warranty.
                </p>
              </div>

            </div>

            {mobileFilterOpen && (
              <div className="sticky bottom-0 bg-white/95 dark:bg-[#071126]/95 backdrop-blur-md pt-2 pb-1 border-t border-slate-200 dark:border-white/10 lg:hidden">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-techla-600 to-blue-600 hover:from-techla-500 hover:to-blue-500 text-white font-extrabold text-xs shadow-xl uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-check" />
                  <span>View {filteredProducts.length} Filtered Results</span>
                </button>
              </div>
            )}
          </aside>

          {/* ===================== PRODUCTS CATALOG GRID ===================== */}
          <main className="lg:col-span-9 space-y-6">
            
            {loading ? (
              <div className="py-24 flex flex-col items-center justify-center space-y-3">
                <div className="w-10 h-10 border-4 border-techla-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-xs text-slate-400">Loading catalog items...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 space-y-3">
                <i className="fa-solid fa-box-open text-4xl text-slate-300 dark:text-slate-600" />
                <h3 className="font-heading font-bold text-slate-800 dark:text-slate-200 text-lg">
                  No matching items found
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your budget slider, deselecting brand filters, or requesting a direct quote.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-5 py-2.5 rounded-xl bg-techla-600 text-white font-bold text-xs shadow-md"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((item) => {
                  const discountPct = item.discount || (item.originalPrice && item.originalPrice > item.price
                    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                    : null);

                  return (
                    <div
                      key={item.id}
                      className="group rounded-3xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 hover:border-techla-500/60 p-4 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Showcase Box */}
                        <div
                          onClick={() => setSelectedProduct(item)}
                          className="relative aspect-square rounded-2xl bg-slate-50 dark:bg-white/5 overflow-hidden border border-slate-200/80 dark:border-white/5 cursor-pointer flex items-center justify-center p-3"
                        >
                          {/* Badges */}
                          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                            <span
                              className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider text-white shadow ${
                                item.inStock
                                  ? 'bg-emerald-500'
                                  : 'bg-rose-500'
                              }`}
                            >
                              {item.inStock ? 'IN STOCK' : 'SOLD OUT'}
                            </span>

                            {discountPct && (
                              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow">
                                {discountPct}% OFF
                              </span>
                            )}
                          </div>

                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <i className="fa-solid fa-box text-3xl text-slate-300 dark:text-slate-600" />
                          )}

                          {item.images && item.images.length > 1 && (
                            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-bold flex items-center gap-1">
                              <i className="fa-solid fa-images text-[8px]" /> {item.images.length}
                            </div>
                          )}
                        </div>

                        {/* Item Details */}
                        <div className="mt-3 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="font-bold text-techla-600 dark:text-cyanGlow uppercase tracking-wider truncate max-w-[150px]">
                              {item.category}
                            </span>
                            {item.brand && (
                              <span className="font-semibold text-slate-600 dark:text-slate-300">
                                {item.brand}
                              </span>
                            )}
                          </div>

                          <h4
                            onClick={() => setSelectedProduct(item)}
                            className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-techla-600 dark:group-hover:text-cyanGlow transition-colors line-clamp-2 cursor-pointer"
                          >
                            {item.title}
                          </h4>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                            {item.description || item.condition}
                          </p>
                        </div>
                      </div>

                      {/* Pricing & Sense.lk Style Actions */}
                      <div className="pt-3 border-t border-slate-100 dark:border-white/5 mt-3 space-y-2.5">
                        <div className="flex items-baseline justify-between">
                          <div>
                            {item.originalPrice && item.originalPrice > item.price && (
                              <span className="text-[11px] text-slate-400 line-through block font-tech">
                                LKR {Number(item.originalPrice).toLocaleString()}
                              </span>
                            )}
                            <span className="text-base font-extrabold font-tech text-slate-900 dark:text-white">
                              LKR {Number(item.price).toLocaleString()}
                            </span>
                          </div>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            Agent Warranty
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => {
                                addToCart(item, 1, false);
                              }}
                              disabled={!item.inStock}
                              className={`py-2 px-2 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all ${
                                item.inStock
                                  ? 'bg-techla-600 hover:bg-techla-700 shadow-techla-500/20 active:scale-95'
                                  : 'bg-slate-400 cursor-not-allowed opacity-60'
                              }`}
                            >
                              <i className="fa-solid fa-cart-plus text-xs" />
                              <span>{item.inStock ? 'Add to Cart' : 'Sold Out'}</span>
                            </button>

                            <button
                              onClick={() => checkoutWhatsApp(item)}
                              className="py-2 px-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                            >
                              <i className="fa-brands fa-whatsapp text-sm" />
                              <span>Inquire</span>
                            </button>
                          </div>

                          <button
                            onClick={() => setQuotationProduct(item)}
                            className="w-full py-1.5 px-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-cyan-400 border border-blue-500/30 font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            title="Generate instant official PDF quotation"
                          >
                            <i className="fa-solid fa-file-invoice text-xs" />
                            <span>📄 Get Instant Quotation (PDF)</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Quick Quotation Modal for Card Item */}
      {quotationProduct && (
        <QuotationModal
          isOpen={!!quotationProduct}
          onClose={() => setQuotationProduct(null)}
          items={[{
            id: quotationProduct.id,
            title: quotationProduct.title,
            price: Number(quotationProduct.price),
            qty: 1,
            condition: quotationProduct.condition,
            category: quotationProduct.category
          }]}
          totalAmount={Number(quotationProduct.price)}
        />
      )}
    </section>
  );
}
