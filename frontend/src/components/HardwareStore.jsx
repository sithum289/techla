import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const STORE_PRODUCTS = [
  {
    id: 1,
    category: 'gpu',
    catLabel: 'Graphics Card',
    name: 'MSI GeForce RTX 4070 Ti SUPER 16G Ventus 3X OC',
    brand: 'MSI / NVIDIA',
    specs: '16GB GDDR6X • DLSS 3.5 • Ada Lovelace • 3 Years Warranty',
    price: 315000,
    oldPrice: 335000,
    monthly: '26,250',
    stockStatus: 'In Stock (Colombo)',
    rating: 5,
    reviews: 32,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    description: 'Equipped with 16GB of ultra-fast GDDR6X memory, capable of flawless 1440p and 4K ultra-raytracing gaming alongside high-velocity AI workflows. Features TORX Fan 4.0 thermal design.',
    techSpecs: {
      'GPU Architecture': 'NVIDIA Ada Lovelace (AD103)',
      'CUDA Cores': '8,448 Cores',
      'Boost Clock': '2,655 MHz',
      'Memory': '16GB GDDR6X (256-bit)',
      'Ray Tracing': '3rd Generation RT Cores',
      'Power Consumption': '285W TDP (750W PSU Recommended)'
    }
  },
  {
    id: 2,
    category: 'cpu',
    catLabel: 'Processor',
    name: 'AMD Ryzen 7 7800X3D Desktop Gaming Processor',
    brand: 'AMD',
    specs: '8 Cores 16 Threads • 3D V-Cache • Socket AM5 • 3 Years Warranty',
    price: 165000,
    oldPrice: 178000,
    monthly: '13,750',
    stockStatus: 'In Stock (Colombo)',
    rating: 5,
    reviews: 48,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
    description: 'The world’s top gaming processor equipped with AMD 3D V-Cache technology delivering massive 96MB L3 cache with extraordinary power efficiency.',
    techSpecs: {
      'Cores / Threads': '8 Cores / 16 Threads',
      'Base Clock': '4.2 GHz',
      'Max Boost Clock': 'Up to 5.0 GHz',
      'Total L3 Cache': '96MB 3D V-Cache',
      'TDP': '120 Watts',
      'Socket': 'AMD Socket AM5 (DDR5 Only)'
    }
  },
  {
    id: 3,
    category: 'ram-ssd',
    catLabel: 'NVMe SSD',
    name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD with Heatsink',
    brand: 'Samsung',
    specs: 'Up to 7450 MB/s Read • Heatsink Edition • 5-Year Warranty',
    price: 68000,
    oldPrice: 74000,
    monthly: '5,660',
    stockStatus: 'In Stock (Colombo)',
    rating: 5,
    reviews: 19,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1000&q=80',
    description: 'Lightning-fast 7,450 MB/s sequential read and 6,900 MB/s sequential write speeds. Optimized for heavy 4K/8K video editing and PS5 storage expansion.',
    techSpecs: {
      'Form Factor': 'M.2 (2280) with Slim Heatsink',
      'Interface': 'PCIe Gen 4.0 x4, NVMe 2.0',
      'Sequential Read': '7,450 MB/s',
      'Sequential Write': '6,900 MB/s',
      'DRAM Cache': '2GB LPDDR4',
      'Warranty': '5 Years Agent Warranty (1200 TBW)'
    }
  },
  {
    id: 4,
    category: 'monitors',
    catLabel: 'Gaming Monitor',
    name: 'ASUS TUF Gaming VG27AQ3A 27" 2K 180Hz Fast IPS',
    brand: 'ASUS TUF',
    specs: '2560x1440 QHD • 1ms GTG • G-Sync Compatible • HDR400',
    price: 98500,
    oldPrice: 108000,
    monthly: '8,200',
    stockStatus: 'In Stock (Colombo)',
    rating: 5,
    reviews: 14,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    description: '27-inch QHD Fast IPS gaming monitor with overclockable 180Hz refresh rate and ultra-fast 1ms (GTG) response time for pro competitive gaming.',
    techSpecs: {
      'Display Size': '27-Inch Fast IPS Anti-Glare',
      'Resolution': '2560 x 1440 (2K WQHD)',
      'Refresh Rate': '180Hz Overclocked',
      'Response Time': '1ms GTG',
      'Color Gamut': '130% sRGB / DCI-P3 96%',
      'Ports': '2x HDMI 2.0, 1x DisplayPort 1.2'
    }
  },
  {
    id: 5,
    category: 'gpu',
    catLabel: 'Graphics Card',
    name: 'ASUS Dual GeForce RTX 4060 OC Edition 8GB GDDR6',
    brand: 'ASUS',
    specs: '8GB GDDR6 • DLSS 3 • Axial-tech Fan Design • 3 Years Warranty',
    price: 132000,
    oldPrice: 145000,
    monthly: '11,000',
    stockStatus: 'In Stock (Colombo)',
    rating: 5,
    reviews: 27,
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1000&q=80',
    description: 'Compact 2-slot design offering broad compatibility. Powered by NVIDIA Ada Lovelace architecture with DLSS 3 AI frame generation for ultra 1080p gaming.',
    techSpecs: {
      'Cuda Cores': '3,072',
      'Boost Clock': '2,535 MHz (OC Mode)',
      'Memory': '8GB GDDR6 (128-bit)',
      'Power': '115W TDP (550W PSU Recommended)'
    }
  },
  {
    id: 6,
    category: 'cpu',
    catLabel: 'Processor',
    name: 'Intel Core i9-14900K 24-Core Flagship Processor',
    brand: 'Intel',
    specs: '24 Cores (8P + 16E) • 32 Threads • Up to 6.0 GHz Max Boost',
    price: 235000,
    oldPrice: 250000,
    monthly: '19,580',
    stockStatus: 'In Stock (Colombo)',
    rating: 5,
    reviews: 21,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    description: 'Flagship unlocked desktop processor with 24 cores (8 Performance + 16 Efficient) clocking up to 6.0GHz with Intel Thermal Velocity Boost.',
    techSpecs: {
      'Total Cores': '24 Cores / 32 Threads',
      'Max Turbo Frequency': 'Up to 6.0 GHz',
      'Smart Cache': '36MB Intel Smart Cache',
      'Socket': 'LGA1700'
    }
  },
  {
    id: 7,
    category: 'ram-ssd',
    catLabel: 'Gaming RAM',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL30',
    brand: 'Corsair',
    specs: '32GB Kit • AMD EXPO & Intel XMP 3.0 • Ten-Zone RGB',
    price: 49500,
    oldPrice: 55000,
    monthly: '4,125',
    stockStatus: 'In Stock (Colombo)',
    rating: 5,
    reviews: 16,
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=1000&q=80',
    description: 'High-frequency DDR5 memory optimized for latest AMD and Intel motherboards with dynamic ten-zone RGB lighting and onboard voltage regulation.',
    techSpecs: {
      'Density': '32GB (2 x 16GB)',
      'Speed': 'DDR5 6000MT/s',
      'Tested Latency': 'CL30-36-36-76',
      'Tested Voltage': '1.40V'
    }
  },
  {
    id: 8,
    category: 'psu-case',
    catLabel: 'Power Supply',
    name: 'Corsair RM850e 850W 80+ Gold Fully Modular ATX 3.0',
    brand: 'Corsair',
    specs: '850W • PCIe 5.0 12VHPWR Native • Zero RPM Fan Mode',
    price: 48500,
    oldPrice: 53000,
    monthly: '4,040',
    stockStatus: 'In Stock (Colombo)',
    rating: 5,
    reviews: 11,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    description: 'Quiet, reliable power with 80 PLUS Gold efficiency. Compliant with ATX 3.0 and PCIe 5.0 power standards with included 12VHPWR cable for RTX 40 series.',
    techSpecs: {
      'Output Capacity': '850 Watts',
      'Efficiency': '80 PLUS Gold Certified',
      'Modularity': '100% Fully Modular',
      'Warranty': '7 Years Official Warranty'
    }
  }
];

export default function HardwareStore({ activeCategory, searchQuery }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  // Filter items
  const filteredItems = STORE_PRODUCTS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specs.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const quickBuyWhatsApp = (product) => {
    const message = `Hello TECHLA (Pvt) Ltd! 🚀%0AI would like to place an immediate order for:* ${encodeURIComponent(product.name)} * (LKR ${product.price.toLocaleString()}).%0APlease confirm Colombo showroom stock and delivery process.`;
    window.open(`https://wa.me/94771234567?text=${message}`, '_blank');
  };

  return (
    <section id="store" className="py-16 scroll-mt-24 relative bg-slate-50 dark:bg-[#050813] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-techla-500/10 text-techla-600 dark:text-cyanGlow text-xs font-bold font-tech uppercase tracking-wider mb-2">
              <i className="fa-solid fa-boxes-stacked" /> Authorized Hardware Catalog
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Computer Parts & Components
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Showing <strong className="text-slate-900 dark:text-white">{filteredItems.length}</strong> items in stock
          </span>
        </div>

        {/* Product Grid */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-3">
            <i className="fa-solid fa-box-open text-4xl text-slate-400" />
            <h3 className="font-heading font-bold text-slate-800 dark:text-slate-200 text-lg">
              No products found matching "{searchQuery}"
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching with another keyword (e.g. RTX, Ryzen, SSD, RAM) or reset the category filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/5 hover:border-techla-500/60 p-4 shadow-sm hover:shadow-2xl hover:shadow-techla-500/15 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div
                    onClick={() => setSelectedProduct(item)}
                    className="relative h-48 rounded-2xl bg-slate-100 dark:bg-white/5 overflow-hidden border border-slate-200/80 dark:border-white/5 cursor-pointer"
                  >
                    {/* Stock badge */}
                    <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold font-tech bg-emerald-600 text-white shadow-md">
                      IN STOCK
                    </span>

                    {/* Discount badge */}
                    {item.oldPrice && (
                      <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded text-[10px] font-extrabold font-tech bg-rose-500 text-white shadow-md">
                        SALE
                      </span>
                    )}

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="pt-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-tech font-bold text-techla-600 dark:text-cyanGlow uppercase tracking-wider">
                        {item.catLabel}
                      </span>
                      <span className="text-amber-500 flex items-center gap-1 font-semibold">
                        <i className="fa-solid fa-star text-[9px]" /> 5.0 ({item.reviews})
                      </span>
                    </div>

                    <h4
                      onClick={() => setSelectedProduct(item)}
                      className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-techla-600 dark:group-hover:text-cyanGlow transition-colors line-clamp-2 cursor-pointer"
                    >
                      {item.name}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {item.specs}
                    </p>
                  </div>
                </div>

                {/* Price and Action Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 mt-4 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      {item.oldPrice && (
                        <span className="text-[11px] text-slate-400 line-through block font-tech">
                          LKR {item.oldPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-base font-extrabold font-tech text-slate-900 dark:text-white">
                        LKR {item.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-tech">
                      Or LKR {item.monthly}/mo
                    </span>
                  </div>

                  {/* Dual Action Buttons (Add to Cart + WhatsApp) */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      className="py-2.5 px-3 rounded-xl bg-techla-500 hover:bg-techla-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-techla-500/30 transition-all active:scale-95"
                    >
                      <i className="fa-solid fa-cart-plus text-xs" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => quickBuyWhatsApp(item)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <i className="fa-brands fa-whatsapp text-sm" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Specs Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
            >
              <i className="fa-solid fa-xmark" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-56 object-cover rounded-2xl border border-slate-200 dark:border-white/10"
              />

              <div className="space-y-3">
                <span className="text-[10px] font-tech font-bold uppercase tracking-widest text-techla-600 dark:text-cyanGlow px-2 py-0.5 rounded bg-techla-500/10">
                  {selectedProduct.brand}
                </span>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  {selectedProduct.name}
                </h3>
                <div className="text-xl font-black font-tech text-techla-600 dark:text-cyanGlow">
                  LKR {selectedProduct.price.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-techla-500 hover:bg-techla-600 text-white font-bold text-xs shadow-lg shadow-techla-500/30 flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-cart-plus" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => quickBuyWhatsApp(selectedProduct)}
                    className="py-3 px-4 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-1.5"
                  >
                    <i className="fa-brands fa-whatsapp text-sm" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tech Specs Table */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10">
              <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <i className="fa-solid fa-microchip text-techla-500" /> Technical Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(selectedProduct.techSpecs).map(([key, val]) => (
                  <div key={key} className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="text-slate-400 block text-[10px] font-tech uppercase">{key}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
