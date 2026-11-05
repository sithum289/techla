import React, { useState, useEffect } from 'react';

const HARDWARE_ITEMS = [
  {
    id: 1,
    category: 'gpu',
    catLabel: 'Graphics Card',
    name: 'MSI GeForce RTX 4070 Ti SUPER 16G Ventus 3X OC',
    brand: 'MSI / NVIDIA',
    specs: '16GB GDDR6X • DLSS 3.5 • Ada Lovelace • 3 Years Warranty',
    price: 315000,
    monthly: '26,250',
    warranty: '3 Years Distributor Warranty (Serial Verified)',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    description: 'The MSI GeForce RTX 4070 Ti SUPER 16G Ventus 3X OC is equipped with 16GB of ultra-fast GDDR6X memory, capable of delivering flawless 1440p and 4K ultra-raytracing gaming alongside high-velocity AI inferencing and video rendering workflows. Features TORX Fan 4.0 thermal design and reinforced metal backplate.',
    techSpecs: {
      'GPU Architecture': 'NVIDIA Ada Lovelace (AD103)',
      'CUDA Cores': '8,448 Cores',
      'Boost Clock': '2,655 MHz (Extreme Performance)',
      'Memory Size & Type': '16GB GDDR6X (256-bit)',
      'Memory Speed': '21 Gbps',
      'Ray Tracing Cores': '3rd Generation',
      'Tensor Cores': '4th Generation with DLSS 3.5 Frame Gen',
      'Power Consumption / PSU': '285W TDP (750W PSU Recommended)',
      'Display Outputs': '3x DisplayPort 1.4a, 1x HDMI 2.1a (4K 120Hz / 8K 60Hz)'
    },
    inTheBox: ['Graphics Card', 'Support Bracket', '16-Pin to 2x 8-Pin Power Adapter', 'Quick Setup Guide']
  },
  {
    id: 2,
    category: 'cpu',
    catLabel: 'Processor',
    name: 'AMD Ryzen 7 7800X3D Desktop Gaming Processor',
    brand: 'AMD',
    specs: '8 Cores 16 Threads • 3D V-Cache • Socket AM5 • 3 Years Warranty',
    price: 165000,
    monthly: '13,750',
    warranty: '3 Years Agent Boxed Warranty',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
    description: 'The AMD Ryzen 7 7800X3D is globally recognized as the ultimate gaming processor. Equipped with breakthrough AMD 3D V-Cache technology providing a massive 96MB L3 cache, delivering jaw-dropping framerates in competitive esports and demanding AAA titles while maintaining extraordinary power efficiency.',
    techSpecs: {
      'CPU Cores / Threads': '8 Cores / 16 Threads',
      'Architecture': 'Zen 4 (5nm FinFET Process)',
      'Base Clock': '4.2 GHz',
      'Max Boost Clock': 'Up to 5.0 GHz',
      'Total L3 Cache': '96MB 3D V-Cache (104MB Combined)',
      'TDP': '120 Watts (Unbeatable Efficiency)',
      'Socket Compatibility': 'AMD Socket AM5 (PCIe 5.0 & DDR5 Only)',
      'Integrated Graphics': 'AMD Radeon Graphics (2 Cores, 2200 MHz)'
    },
    inTheBox: ['Ryzen 7 7800X3D Processor', 'Certificate of Authenticity', 'Official Warranty Booklet']
  },
  {
    id: 3,
    category: 'ram-ssd',
    catLabel: 'NVMe Storage',
    name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD',
    brand: 'Samsung Electronics',
    specs: 'Up to 7450 MB/s Read • Heatsink Edition • 5-Year Agent Warranty',
    price: 68000,
    monthly: '5,660',
    warranty: '5 Years Official Agent Warranty (1200 TBW)',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1000&q=80',
    description: 'Reach near-max performance of PCIe 4.0. The Samsung 990 PRO delivers lightning-quick 7,450 MB/s sequential read and 6,900 MB/s sequential write speeds. Optimized for heavy 4K/8K video scrubbing, instant game level loading, and PS5 expansion.',
    techSpecs: {
      'Form Factor': 'M.2 (2280) Single-Sided',
      'Interface': 'PCIe Gen 4.0 x4, NVMe 2.0',
      'Sequential Read': 'Up to 7,450 MB/s',
      'Sequential Write': 'Up to 6,900 MB/s',
      'Random Read (4KB, QD32)': 'Up to 1,400,000 IOPS',
      'Random Write (4KB, QD32)': 'Up to 1,550,000 IOPS',
      'NAND Type': 'Samsung V-NAND 3-bit MLC (TLC)',
      'DRAM Cache': '2GB Low Power DDR4 SDRAM',
      'Endurance': '1200 Terabytes Written (TBW)'
    },
    inTheBox: ['Samsung 990 PRO 2TB SSD', 'Pre-Installed Slim Aluminum Heatsink', 'Manual']
  },
  {
    id: 4,
    category: 'accessories',
    catLabel: 'Pro Display',
    name: 'ASUS TUF Gaming VG27AQ3A 27" 2K 180Hz Fast IPS',
    brand: 'ASUS',
    specs: '2560x1440 QHD • 1ms GTG • G-Sync Compatible • HDR400',
    price: 98500,
    monthly: '8,200',
    warranty: '3 Years Full Panel & Parts Replacement Warranty',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    description: 'A 27-inch QHD (2560x1440) Fast IPS gaming monitor with an overclockable 180Hz refresh rate and ultra-fast 1ms (GTG) response time for pro gamers and content creators. Features ASUS Extreme Low Motion Blur (ELMB Sync) and AMD FreeSync Premium.',
    techSpecs: {
      'Panel Size & Type': '27-Inch Fast IPS Anti-Glare',
      'Native Resolution': '2560 x 1440 (2K WQHD)',
      'Refresh Rate': '180Hz Overclocked',
      'Response Time': '1ms (GTG)',
      'Color Gamut': '130% sRGB / DCI-P3 96% Professional Coverage',
      'HDR Support': 'VESA DisplayHDR 400',
      'Variable Refresh Tech': 'G-Sync Compatible & FreeSync Premium',
      'Connectivity': '2x HDMI 2.0, 1x DisplayPort 1.2, Earphone Jack',
      'Ergonomics': 'Tilt Adjustment (+20° ~ -5°), VESA Wall Mountable (100x100mm)'
    },
    inTheBox: ['Display Unit', 'DisplayPort Cable', 'HDMI Cable', 'Power Cord', 'Warranty Card']
  },
  {
    id: 5,
    category: 'gpu',
    catLabel: 'Graphics Card',
    name: 'NVIDIA GeForce RTX 4090 24GB Flagship Series',
    brand: 'NVIDIA / Authorized Partner',
    specs: '24GB G6X • 16,384 CUDA Cores • 4K/8K Extreme Gaming & AI',
    price: 690000,
    monthly: '57,500',
    warranty: '3 Years Official Authorized Agent Warranty',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1000&q=80',
    description: 'The pinnacle of GPU computing. Built for extreme enthusiasts, 3D VFX artists, and AI machine learning researchers. Features a monstrous 24GB of high-bandwidth GDDR6X memory and 16,384 CUDA cores capable of real-time 8K editing and unrivaled ray-traced visuals.',
    techSpecs: {
      'CUDA Cores': '16,384 Cores',
      'VRAM': '24GB GDDR6X (384-Bit Bus)',
      'Boost Clock': '2,520+ MHz',
      'AI Tensor Performance': '1,321 AI TOPS',
      'Cooling System': 'Triple Axial Fan with Vapor Chamber',
      'Recommended Power Supply': '850W - 1000W ATX 3.0 Native PCIe 5.0'
    },
    inTheBox: ['RTX 4090 GPU', 'Reinforced GPU Anti-Sag Holder', '12VHPWR Adapter', 'Manual']
  },
  {
    id: 6,
    category: 'ram-ssd',
    catLabel: 'DDR5 Memory',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL30',
    brand: 'Corsair',
    specs: 'Optimized for Intel XMP & AMD EXPO • Dynamic Ten-Zone RGB',
    price: 46500,
    monthly: '3,875',
    warranty: 'Lifetime Official Limited Agent Warranty',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1000&q=80',
    description: 'Deliver cutting-edge frequencies, higher capacities, and enhanced performance required by the latest multi-core motherboards. Dynamic ten-zone RGB lighting with individual addressable LEDs housed in a solid aluminum heatspreader.',
    techSpecs: {
      'Capacity': '32GB Kit (2x 16GB)',
      'Memory Type': 'DDR5 UDIMM 288-Pin',
      'Tested Speed': '6000 MT/s (PC5-48000)',
      'Tested Latency': '30-36-36-76 (Low Latency Tuning)',
      'Voltage': '1.35V',
      'Profiles': 'Intel XMP 3.0 & AMD EXPO Certified Dual-Profile'
    },
    inTheBox: ['2x 16GB Corsair Vengeance DDR5 Modules', 'Warranty Guide']
  },
  {
    id: 7,
    category: 'accessories',
    catLabel: 'Chassis & Case',
    name: 'Lian Li O11 Dynamic EVO Dual-Chamber Panoramic Case',
    brand: 'Lian Li',
    specs: 'Panoramic Tempered Glass • Reversible Layout • Up to 360mm Rads',
    price: 58000,
    monthly: '4,830',
    warranty: '1 Year Warranty',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=1000&q=80',
    description: 'The standard for high-end gaming PC builds. Dual-chamber design completely isolates power supply and cable clutter from the main showcase compartment, featuring pillar-less panoramic tempered glass and support for up to 3x 360mm radiators simultaneously.',
    techSpecs: {
      'Motherboard Support': 'E-ATX (under 280mm), ATX, Micro-ATX, Mini-ITX',
      'Radiator Support': 'Top: 360mm, Side: 360mm, Bottom: 360mm',
      'Max GPU Length': '422mm (Fits all RTX 4090 models)',
      'Front Panel Ports': '2x USB 3.0, 1x USB 3.1 Type-C, HD Audio',
      'Drive Bays': 'Up to 6x 2.5" SSD or 3x 3.5" HDD'
    },
    inTheBox: ['Chassis with Removable Glass', 'Accessory Box & Screws', 'Manual']
  },
  {
    id: 8,
    category: 'cpu',
    catLabel: 'Processor',
    name: 'Intel Core i9-14900K 24-Core Flagship Processor',
    brand: 'Intel',
    specs: '24 Cores (8P + 16E) • 32 Threads • Up to 6.0 GHz Max Boost',
    price: 235000,
    monthly: '19,580',
    warranty: '3 Years Boxed Agent Warranty',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1000&q=80',
    description: 'Designed for extreme gaming, streaming, and intensive multi-threaded workloads. Intel Raptor Lake Refresh architecture with 8 Performance cores and 16 Efficient cores, achieving up to 6.0GHz with Intel Thermal Velocity Boost.',
    techSpecs: {
      'Total Cores / Threads': '24 Cores (8P + 16E) / 32 Threads',
      'Max Turbo Frequency': 'Up to 6.0 GHz',
      'Intel Smart Cache (L3)': '36 MB',
      'Total L2 Cache': '32 MB',
      'Memory Support': 'DDR5 5600 MT/s & DDR4 3200 MT/s',
      'Base Power / Max Turbo Power': '125W / 253W'
    },
    inTheBox: ['Intel Core i9-14900K Processor', 'Intel Inside Badge', 'Warranty Manual']
  }
];

export default function HardwareStore() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  const filteredItems = activeCategory === 'all'
    ? HARDWARE_ITEMS
    : HARDWARE_ITEMS.filter((item) => item.category === activeCategory);

  const inquireWhatsApp = (product) => {
    const message = `Hello TECHLA (Pvt) Ltd! 🚀%0AI am interested in purchasing:* ${encodeURIComponent(product.name)} * (LKR ${product.price.toLocaleString()}).%0APlease let me know immediate stock availability at your Colombo Showroom and delivery options.`;
    window.open(`https://wa.me/94771234567?text=${message}`, '_blank');
  };

  return (
    <section id="hardware" className="py-24 scroll-mt-24 relative bg-slate-100/70 dark:bg-[#070d1d]/80 border-t border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold font-tech uppercase tracking-widest text-techla-600 dark:text-cyanGlow px-3 py-1 rounded-full bg-techla-500/10 border border-techla-500/20">
              100% Genuine Authorized Hardware
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white transition-colors">
              Direct Distributor{' '}
              <span className="animate-gradient-text text-transparent bg-clip-text bg-gradient-to-r from-techla-600 via-cyan-500 to-techla-400 dark:from-techla-400 dark:via-cyanGlow dark:to-blue-500">
                Computer Hardware & Components
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Official Sri Lankan agent warranty with serial barcode verification. Click on any product below to inspect in-depth specifications, benchmarks, and installment plans.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'gpu', label: 'GPUs' },
              { id: 'cpu', label: 'CPUs' },
              { id: 'ram-ssd', label: 'RAM & Storage' },
              { id: 'accessories', label: 'Chassis & Displays' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`btn-shine px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-techla-500 text-white shadow-md shadow-techla-500/40 scale-105'
                    : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className="card-hover-fx group rounded-3xl bg-white dark:bg-[#0b1429] border border-slate-200/90 dark:border-white/5 hover:border-techla-500/60 p-4 shadow-sm hover:shadow-2xl dark:shadow-none hover:shadow-techla-500/20 cursor-pointer relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Product Image */}
                <div className="relative h-52 rounded-2xl bg-slate-100 dark:bg-gradient-to-br dark:from-[#0c1630] dark:to-[#060c1d] overflow-hidden border border-slate-200/80 dark:border-white/5">
                  <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold font-tech bg-emerald-600 text-white shadow-md shadow-emerald-900/40 tracking-wider">
                      IN STOCK
                    </span>
                  </div>

                  <span className="absolute bottom-2.5 right-2.5 z-20 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-900/85 text-white shadow-md backdrop-blur-md group-hover:bg-techla-600 transition-colors">
                    Click for Full Specs
                  </span>
                  
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-tech text-techla-600 dark:text-techla-400 uppercase tracking-widest font-semibold">
                      {item.catLabel}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {item.brand}
                    </span>
                  </div>

                  <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-techla-600 dark:group-hover:text-cyanGlow transition-colors line-clamp-2 mt-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {item.specs}
                  </p>
                </div>
              </div>

              {/* Price & CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-tech">PRICE:</span>
                  <span className="text-sm font-bold font-tech text-slate-900 dark:text-white">
                    LKR {item.price.toLocaleString()}
                  </span>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(item);
                  }}
                  className="btn-shine px-3 py-1.5 rounded-xl bg-techla-500/10 hover:bg-techla-500 text-techla-600 dark:text-cyanGlow hover:text-white border border-techla-500/30 transition-all text-xs font-semibold flex items-center gap-1.5"
                >
                  <span>Details</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* COMPREHENSIVE PRODUCT DETAILS MODAL - Fixed z-[100] and viewport spacing */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          
          {/* Backdrop Click to Close */}
          <div className="fixed inset-0 -z-10" onClick={() => setSelectedProduct(null)} />

          <div className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-[#0b1429] border border-slate-200 dark:border-techla-500/40 p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto my-auto">
            
            {/* Prominent Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shadow-md hover:rotate-90 duration-300"
              title="Close Dialog"
            >
              <i className="fa-solid fa-xmark text-base" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
              
              {/* Product Big Visual & Warranty Left */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Image Container with generous padding for tag */}
                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg bg-slate-100 dark:bg-[#070e20]">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Stock Tag with safe inset margins */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-tech bg-emerald-600 text-white shadow-lg backdrop-blur-sm border border-emerald-400/40">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span>IN STOCK &bull; COLOMBO SHOWROOM</span>
                    </span>
                  </div>
                </div>

                {/* Warranty Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                    <i className="fa-solid fa-shield-check text-techla-500 text-base" />
                    <span>{selectedProduct.warranty}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Comes with authorized distributor serial barcode, verified tax invoice and direct one-to-one replacement RMA support.
                  </p>
                </div>

                {/* Box Contents */}
                {selectedProduct.inTheBox && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                    <h5 className="text-[11px] font-bold font-tech text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      Package Includes:
                    </h5>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      {selectedProduct.inTheBox.map((boxItem, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <i className="fa-solid fa-check text-techla-500 text-[10px]" />
                          <span>{boxItem}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Product Specs & Purchase Actions Right */}
              <div className="lg:col-span-7 space-y-6">
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-tech text-techla-600 dark:text-cyanGlow uppercase tracking-wider">
                      {selectedProduct.catLabel} &bull; {selectedProduct.brand}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 leading-snug">
                    {selectedProduct.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Price Display & Installment Plan */}
                <div className="p-4 rounded-2xl bg-techla-500/10 border border-techla-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-tech block">SPECIAL CASH / BANK TRANSFER PRICE:</span>
                    <div className="font-tech text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      LKR {selectedProduct.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-techla-500/20 pt-2 sm:pt-0 sm:pl-4">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-tech block">0% CARD INSTALLMENTS:</span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      From LKR {selectedProduct.monthly} / month
                    </span>
                    <span className="text-[10px] text-slate-400 block">(Up to 36 Months)</span>
                  </div>
                </div>

                {/* Technical Specifications Table */}
                <div>
                  <h4 className="text-xs font-bold font-tech text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <i className="fa-solid fa-list-check text-techla-500" />
                    <span>Technical Specifications:</span>
                  </h4>

                  <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden divide-y divide-slate-200 dark:divide-white/10 text-xs">
                    {Object.entries(selectedProduct.techSpecs).map(([key, value], idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 p-3 bg-white dark:bg-[#070e20] hover:bg-slate-50 dark:hover:bg-[#0c1630] transition-colors">
                        <span className="sm:col-span-5 font-semibold text-slate-600 dark:text-slate-400">{key}</span>
                        <span className="sm:col-span-7 font-bold text-slate-900 dark:text-white mt-0.5 sm:mt-0">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => inquireWhatsApp(selectedProduct)}
                    className="btn-shine flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
                  >
                    <i className="fa-brands fa-whatsapp text-lg" />
                    <span>Order / Inquire via WhatsApp</span>
                  </button>

                  <a
                    href="tel:+94771234567"
                    className="py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all border border-slate-200 dark:border-white/10 hover:scale-[1.02]"
                  >
                    <i className="fa-solid fa-phone" />
                    <span>Call Sales Desk</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
