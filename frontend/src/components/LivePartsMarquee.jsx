import React, { useState, useEffect } from 'react';
import ProductDetailModal from './ProductDetailModal';

export default function LivePartsMarquee() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Fallback if db is empty
          setProducts([
            {
              id: '1',
              title: 'Singer Inverter Refrigerator 240L',
              category: 'Refrigerators & Freezers',
              brand: 'Singer',
              price: 168000,
              originalPrice: 189000,
              discount: 11,
              inStock: true,
              image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: '2',
              title: 'Samsung Galaxy S24 Ultra 5G',
              category: 'Mobile Phones',
              brand: 'Samsung',
              price: 345000,
              originalPrice: 385000,
              discount: 10,
              inStock: true,
              image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: '3',
              title: 'LG 8kg Smart Inverter Washing Machine',
              category: 'Washing Machines',
              brand: 'LG',
              price: 142000,
              originalPrice: 158000,
              discount: 10,
              inStock: true,
              image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: '4',
              title: 'Apple iPhone 15 Pro Max 256GB',
              category: 'Mobile Phones',
              brand: 'Apple',
              price: 388000,
              originalPrice: 420000,
              discount: 8,
              inStock: true,
              image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: '5',
              title: 'Philips Digital Air Fryer XL 4.1L',
              category: 'Kitchen Appliances',
              brand: 'Philips',
              price: 36500,
              originalPrice: 42000,
              discount: 13,
              inStock: true,
              image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: '6',
              title: 'ASUS TUF Gaming A15 (RTX 4060)',
              category: 'Laptops & Computers',
              brand: 'ASUS',
              price: 325000,
              originalPrice: 350000,
              discount: 7,
              inStock: true,
              image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: '7',
              title: 'Hikvision 4-Camera 5MP ColorVu CCTV Package',
              category: 'CCTV & Security Systems',
              brand: 'Hikvision',
              price: 68500,
              originalPrice: 79000,
              discount: 13,
              inStock: true,
              image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80',
            },
          ]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const marqueeList = products.concat(products);

  return (
    <>
      <div className="relative overflow-hidden bg-slate-950 dark:bg-[#030611] border-y border-white/10 py-4 select-none shadow-inner">
        <div className="flex items-center">
          
          {/* Bigger, High-Impact Static Badge on Left */}
          <div className="hidden lg:flex items-center gap-2.5 pl-6 pr-5 shrink-0 border-r border-white/10 z-20 bg-slate-950 dark:bg-[#030611] shadow-2xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-wider text-white">
                LIVE STORE FEED
              </span>
              <span className="text-[9px] font-semibold text-cyan-400">
                Appliances • Phones • Laptops
              </span>
            </div>
          </div>

          {/* Marquee Track with Bigger Cards & Hover Pause */}
          <div className="flex overflow-hidden whitespace-nowrap group">
            <div className="flex animate-marquee gap-4 py-1 items-center group-hover:[animation-play-state:paused]">
              {marqueeList.map((item, idx) => {
                const discountPct = item.discount || (item.originalPrice && item.originalPrice > item.price
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                  : null);

                return (
                  <div
                    key={`${item.id}-${idx}`}
                    onClick={() => setSelectedProduct(item)}
                    className="inline-flex items-center gap-3.5 px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-cyan-400/50 transition-all cursor-pointer shadow-md hover:scale-[1.02] transform"
                    title="Click to view details & buy"
                  >
                    {/* Bigger Product Thumbnail */}
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-white/10 dark:bg-white/5 border border-white/10 flex items-center justify-center p-1 shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <i className="fa-solid fa-box text-slate-400 text-base" />
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-techla-500/20 text-cyan-300 font-mono text-[10px] font-bold">
                          {item.brand || item.category?.split(' ')[0] || 'TECHLA'}
                        </span>
                        {discountPct && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-amber-400 text-slate-950">
                            {discountPct}% OFF
                          </span>
                        )}
                      </div>

                      <span className="text-white font-bold text-xs sm:text-sm truncate max-w-[200px] sm:max-w-[240px]">
                        {item.title}
                      </span>

                      <div className="flex items-baseline gap-2">
                        <span className="text-emerald-400 font-tech font-extrabold text-xs sm:text-sm">
                          LKR {Number(item.price).toLocaleString()}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-slate-500 font-tech text-[10px] line-through">
                            LKR {Number(item.originalPrice).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick View Arrow */}
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-500/20 transition-colors ml-1">
                      <i className="fa-solid fa-arrow-right text-[10px]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Product Detail Modal on Click */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
