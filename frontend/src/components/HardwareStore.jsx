import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';

const STORE_PRODUCTS = [
  // Monitors
  {
    id: 4,
    category: 'monitors',
    catLabel: 'Gaming Monitor',
    name: 'ASUS TUF Gaming VG27AQ3A 27" 2K 180Hz Fast IPS',
    brand: 'ASUS',
    price: 98500,
    specs: '27" • 2K QHD (2560x1440) • 180Hz • 1ms GTG • Fast IPS • G-Sync',
    warranty: '3 Years Full Panel Replacement',
    attributes: {
      screenSize: '27"',
      resolution: '2K QHD (1440p)',
      refreshRate: '180Hz',
      panelType: 'Fast IPS'
    },
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    description: '27-inch 2K QHD Fast IPS gaming monitor with 180Hz refresh rate and ultra-fast 1ms (GTG) response time for pro competitive gaming.'
  },
  {
    id: 11,
    category: 'monitors',
    catLabel: 'Curved Gaming Monitor',
    name: 'MSI MAG 325CQRXF 31.5" 2K Rapid VA 240Hz Curved',
    brand: 'MSI',
    price: 148000,
    specs: '31.5" • 2K QHD • 240Hz Ultra-Fast • 0.5ms • 1000R Curved • HDR400',
    warranty: '3 Years Agent Warranty',
    attributes: {
      screenSize: '32"',
      resolution: '2K QHD (1440p)',
      refreshRate: '240Hz',
      panelType: 'Rapid VA'
    },
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80',
    description: 'Immersive 1000R curved gaming monitor engineered for sim racing, FPS esports and ultra-smooth fluid visual gameplay at 240Hz.'
  },
  {
    id: 12,
    category: 'monitors',
    catLabel: 'Budget Esports Monitor',
    name: 'AOC 24G2SP 23.8" FHD 165Hz IPS Gaming Monitor',
    brand: 'AOC',
    price: 54500,
    specs: '24" • 1080p Full HD • 165Hz • 1ms MPRT • IPS • Height Adjustable',
    warranty: '3 Years Agent Warranty',
    attributes: {
      screenSize: '24"',
      resolution: '1080p FHD',
      refreshRate: '165Hz',
      panelType: 'IPS'
    },
    image: 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&w=800&q=80',
    description: 'The community favorite esports display. 165Hz smooth framerates on vivid IPS colors with ergonomic height and tilt adjustment.'
  },

  // Graphics Cards (GPUs)
  {
    id: 1,
    category: 'gpu',
    catLabel: 'Graphics Card',
    name: 'MSI GeForce RTX 4070 Ti SUPER 16G Ventus 3X OC',
    brand: 'MSI',
    price: 315000,
    specs: '16GB GDDR6X • 256-bit • DLSS 3.5 • Triple TORX Fans',
    warranty: '3 Years Distributor Warranty',
    attributes: {
      vram: '16GB',
      series: 'RTX 40 Series',
      chipset: 'NVIDIA GeForce'
    },
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-fast 16GB GDDR6X memory for flawless 1440p and 4K ultra-raytracing gaming alongside high-velocity AI workflows.'
  },
  {
    id: 5,
    category: 'gpu',
    catLabel: 'Graphics Card',
    name: 'ASUS Dual GeForce RTX 4060 OC Edition 8GB GDDR6',
    brand: 'ASUS',
    price: 132000,
    specs: '8GB GDDR6 • 128-bit • DLSS 3 • Dual Axial-Tech Fans',
    warranty: '3 Years Agent Warranty',
    attributes: {
      vram: '8GB',
      series: 'RTX 40 Series',
      chipset: 'NVIDIA GeForce'
    },
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
    description: 'Compact 2-slot design offering broad case compatibility and high FPS with DLSS 3 AI frame generation.'
  },
  {
    id: 13,
    category: 'gpu',
    catLabel: 'Graphics Card',
    name: 'Gigabyte Radeon RX 7800 XT Gaming OC 16GB',
    brand: 'Gigabyte',
    price: 245000,
    specs: '16GB GDDR6 • 256-bit • AMD RDNA 3 • Windforce 3X Cooling',
    warranty: '3 Years Agent Warranty',
    attributes: {
      vram: '16GB',
      series: 'RX 7000 Series',
      chipset: 'AMD Radeon'
    },
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    description: 'Native 1440p powerhouse with massive 16GB VRAM buffer to handle high-resolution textures in modern AAA titles.'
  },

  // CCTV Surveillance
  {
    id: 101,
    category: 'cctv',
    catLabel: 'CCTV Camera',
    name: 'Hikvision ColorVu 4K 8MP Smart Hybrid Audio Bullet Camera',
    brand: 'Hikvision',
    price: 18500,
    specs: '4K Ultra HD (8MP) • 24/7 Full Color • Built-in Mic • IP67 Metal',
    warranty: '2 Years Agent Warranty',
    attributes: {
      resolution: '4K (8MP)',
      camType: 'Bullet (Outdoor)',
      audio: 'Yes (Built-in Mic)'
    },
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    description: 'Full-color night vision up to 40 meters even in zero ambient lighting. Real-time audio recording for commercial premises.'
  },
  {
    id: 104,
    category: 'cctv',
    catLabel: 'CCTV Camera',
    name: 'Dahua 5MP WizSense Active Deterrence Eyeball Dome Camera',
    brand: 'Dahua',
    price: 15200,
    specs: '5MP HD • AI Human/Vehicle Detection • Built-in Siren & Strobe • 2-Way Audio',
    warranty: '2 Years Agent Warranty',
    attributes: {
      resolution: '5MP HD',
      camType: 'Dome (Indoor/Ceiling)',
      audio: 'Yes (2-Way Audio)'
    },
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80',
    description: 'Proactively deters intruders with red-blue flashing lights and custom voice alarms when boundary rules are breached.'
  },
  {
    id: 102,
    category: 'cctv',
    catLabel: 'CCTV Recorder',
    name: 'Hikvision 8-Channel 4K PoE Network Video Recorder (NVR)',
    brand: 'Hikvision',
    price: 36500,
    specs: '8 Ports PoE • Up to 8MP Recording • H.265+ • Remote App Viewing',
    warranty: '2 Years Agent Warranty',
    attributes: {
      resolution: '4K Supported',
      camType: 'NVR Recorder',
      audio: 'RCA / HDMI'
    },
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    description: 'Simple one-cable PoE setup. Supplies power and data to cameras up to 250 meters away.'
  },

  // Processors (CPUs)
  {
    id: 2,
    category: 'cpu',
    catLabel: 'Processor',
    name: 'AMD Ryzen 7 7800X3D Desktop Gaming Processor',
    brand: 'AMD',
    price: 165000,
    specs: '8 Cores 16 Threads • 3D V-Cache (96MB L3) • 5.0 GHz • Socket AM5',
    warranty: '3 Years Agent Warranty',
    attributes: {
      socket: 'AM5',
      cores: '8 Cores',
      brandFamily: 'AMD Ryzen'
    },
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
    description: 'Globally recognized as the highest performance gaming CPU with unbeatable power efficiency.'
  },
  {
    id: 6,
    category: 'cpu',
    catLabel: 'Processor',
    name: 'Intel Core i7-14700K 20-Core Unlocked Processor',
    brand: 'Intel',
    price: 168000,
    specs: '20 Cores (8P+12E) • 28 Threads • Up to 5.6 GHz • LGA1700',
    warranty: '3 Years Agent Warranty',
    attributes: {
      socket: 'LGA1700',
      cores: '20 Cores',
      brandFamily: 'Intel Core'
    },
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    description: 'Supreme multi-tasking and gaming processor built for video rendering, streaming and AAA gaming.'
  },

  // Storage & RAM
  {
    id: 3,
    category: 'ram-ssd',
    catLabel: 'NVMe Storage',
    name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD',
    brand: 'Samsung',
    price: 68000,
    specs: '2TB • 7,450 MB/s Read • PCIe 4.0 x4 • Heatsink Edition',
    warranty: '5 Years Agent Warranty',
    attributes: {
      capacity: '2TB',
      type: 'NVMe M.2 SSD'
    },
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    description: 'Max PCIe 4.0 speeds for extreme content creators, CAD rendering, and PS5 storage expansion.'
  },
  {
    id: 7,
    category: 'ram-ssd',
    catLabel: 'Gaming RAM',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
    brand: 'Corsair',
    price: 49500,
    specs: '32GB Kit • DDR5 6000MT/s • CL30 Low Latency • RGB Lighting',
    warranty: '3 Years Agent Warranty',
    attributes: {
      capacity: '32GB',
      type: 'DDR5 RAM'
    },
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=800&q=80',
    description: 'High-frequency DDR5 memory optimized for the latest Intel and AMD motherboards.'
  }
];

export default function HardwareStore({ activeCategory, searchQuery }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  // Dynamic Multi-Attribute Filters
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedScreenSize, setSelectedScreenSize] = useState('all');
  const [selectedResolution, setSelectedResolution] = useState('all');
  const [selectedRefreshRate, setSelectedRefreshRate] = useState('all');
  const [selectedVram, setSelectedVram] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  // Available brands in the active category
  const availableBrands = useMemo(() => {
    const items = activeCategory === 'all' 
      ? STORE_PRODUCTS 
      : STORE_PRODUCTS.filter((i) => i.category === activeCategory);
    return ['all', ...Array.from(new Set(items.map((i) => i.brand)))];
  }, [activeCategory]);

  // Filter Logic
  const filteredItems = useMemo(() => {
    return STORE_PRODUCTS.filter((item) => {
      // 1. Category
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;

      // 2. Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchBrand = item.brand.toLowerCase().includes(q);
        const matchSpecs = item.specs.toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchSpecs) return false;
      }

      // 3. Brand
      if (selectedBrand !== 'all' && item.brand !== selectedBrand) return false;

      // 4. Monitor specific filters
      if (activeCategory === 'monitors') {
        if (selectedScreenSize !== 'all' && item.attributes?.screenSize !== selectedScreenSize) return false;
        if (selectedResolution !== 'all' && item.attributes?.resolution !== selectedResolution) return false;
        if (selectedRefreshRate !== 'all' && item.attributes?.refreshRate !== selectedRefreshRate) return false;
      }

      // 5. GPU specific filters
      if (activeCategory === 'gpu') {
        if (selectedVram !== 'all' && item.attributes?.vram !== selectedVram) return false;
      }

      // 6. Price Range
      if (selectedPriceRange === 'under-50k' && item.price >= 50000) return false;
      if (selectedPriceRange === '50k-100k' && (item.price < 50000 || item.price > 100000)) return false;
      if (selectedPriceRange === '100k-200k' && (item.price < 100000 || item.price > 200000)) return false;
      if (selectedPriceRange === 'above-200k' && item.price < 200000) return false;

      return true;
    });
  }, [
    activeCategory,
    searchQuery,
    selectedBrand,
    selectedScreenSize,
    selectedResolution,
    selectedRefreshRate,
    selectedVram,
    selectedPriceRange
  ]);

  const resetFilters = () => {
    setSelectedBrand('all');
    setSelectedScreenSize('all');
    setSelectedResolution('all');
    setSelectedRefreshRate('all');
    setSelectedVram('all');
    setSelectedPriceRange('all');
  };

  const checkPriceWhatsApp = (product) => {
    const message = `Hello TECHLA! 🚀%0AI want to check current price & order:* ${encodeURIComponent(product.name)} * (LKR ${product.price.toLocaleString()}).%0APlease confirm available distributor warranty and delivery time.`;
    window.open(`https://wa.me/94771234567?text=${message}`, '_blank');
  };

  return (
    <section id="store" className="py-12 scroll-mt-24 relative bg-slate-50 dark:bg-[#050813] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-techla-500/10 text-techla-600 dark:text-cyanGlow text-xs font-bold font-tech uppercase tracking-wider mb-2">
              <i className="fa-solid fa-sliders" /> Smart Attribute Filtering
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {activeCategory === 'monitors' ? 'Monitors & Pro Displays' : 'Hardware & CCTV Sourcing Catalog'}
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Found <strong className="text-slate-900 dark:text-white font-tech">{filteredItems.length}</strong> matching products
          </span>
        </div>

        {/* 🎛️ SMART FILTER BAR (Brand, Screen Size, Resolution, Refresh Rate, Price) */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 shadow-sm mb-8 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2.5">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <i className="fa-solid fa-filter text-techla-500 text-xs" /> Filter By Specifications:
            </span>
            <button
              onClick={resetFilters}
              className="text-[11px] font-bold text-techla-600 dark:text-cyanGlow hover:underline"
            >
              Reset All Filters
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            
            {/* 1. Brand Filter */}
            <div>
              <label className="text-[10px] font-tech uppercase tracking-wider text-slate-400 block mb-1">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-techla-500"
              >
                {availableBrands.map((b) => (
                  <option key={b} value={b} className="dark:bg-[#071126]">
                    {b === 'all' ? 'All Brands' : b}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Price Range Filter */}
            <div>
              <label className="text-[10px] font-tech uppercase tracking-wider text-slate-400 block mb-1">
                Price Budget
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-techla-500"
              >
                <option value="all" className="dark:bg-[#071126]">All Prices</option>
                <option value="under-50k" className="dark:bg-[#071126]">Under LKR 50,000</option>
                <option value="50k-100k" className="dark:bg-[#071126]">LKR 50K - 100K</option>
                <option value="100k-200k" className="dark:bg-[#071126]">LKR 100K - 200K</option>
                <option value="above-200k" className="dark:bg-[#071126]">Above LKR 200,000</option>
              </select>
            </div>

            {/* 3. Screen Size (Visible for Monitors or All) */}
            <div>
              <label className="text-[10px] font-tech uppercase tracking-wider text-slate-400 block mb-1">
                Screen Size
              </label>
              <select
                value={selectedScreenSize}
                onChange={(e) => setSelectedScreenSize(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-techla-500"
              >
                <option value="all" className="dark:bg-[#071126]">Any Size</option>
                <option value='24"' className="dark:bg-[#071126]">24-Inch</option>
                <option value='27"' className="dark:bg-[#071126]">27-Inch (Sweetspot)</option>
                <option value='32"' className="dark:bg-[#071126]">32-Inch+ Curved</option>
              </select>
            </div>

            {/* 4. Resolution */}
            <div>
              <label className="text-[10px] font-tech uppercase tracking-wider text-slate-400 block mb-1">
                Resolution
              </label>
              <select
                value={selectedResolution}
                onChange={(e) => setSelectedResolution(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-techla-500"
              >
                <option value="all" className="dark:bg-[#071126]">Any Resolution</option>
                <option value="1080p FHD" className="dark:bg-[#071126]">1080p Full HD</option>
                <option value="2K QHD (1440p)" className="dark:bg-[#071126]">2K QHD (1440p)</option>
                <option value="4K (8MP)" className="dark:bg-[#071126]">4K Ultra HD</option>
              </select>
            </div>

            {/* 5. Refresh Rate / VRAM */}
            <div>
              <label className="text-[10px] font-tech uppercase tracking-wider text-slate-400 block mb-1">
                Refresh Rate / Speed
              </label>
              <select
                value={selectedRefreshRate}
                onChange={(e) => setSelectedRefreshRate(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-techla-500"
              >
                <option value="all" className="dark:bg-[#071126]">Any Rate</option>
                <option value="165Hz" className="dark:bg-[#071126]">165Hz</option>
                <option value="180Hz" className="dark:bg-[#071126]">180Hz</option>
                <option value="240Hz" className="dark:bg-[#071126]">240Hz Ultra Esports</option>
              </select>
            </div>

          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-3">
            <i className="fa-solid fa-filter-circle-xmark text-4xl text-slate-400" />
            <h3 className="font-heading font-bold text-slate-800 dark:text-slate-200 text-lg">
              No matching products found with these specific filters
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try choosing "All Brands" or resetting resolution/size filters to view all verified items.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-techla-500 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/5 hover:border-techla-500/60 p-4 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => setSelectedProduct(item)}
                    className="relative h-48 rounded-2xl bg-slate-100 dark:bg-white/5 overflow-hidden border border-slate-200/80 dark:border-white/5 cursor-pointer"
                  >
                    <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded text-[10px] font-bold font-tech bg-blue-600/90 text-white shadow-md">
                      AVAILABLE ON ORDER
                    </span>

                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div className="pt-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-tech font-bold text-techla-600 dark:text-cyanGlow uppercase tracking-wider">
                        {item.catLabel}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5">
                        {item.brand}
                      </span>
                    </div>

                    <h4
                      onClick={() => setSelectedProduct(item)}
                      className="font-heading text-sm font-bold text-slate-900 dark:text-white group-hover:text-techla-600 dark:group-hover:text-cyanGlow transition-colors line-clamp-2 cursor-pointer"
                    >
                      {item.name}
                    </h4>

                    {/* Quick Specs Pill Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.attributes && Object.entries(item.attributes).map(([k, v]) => (
                        <span key={k} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 mt-4 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-tech">ESTIMATED PRICE</span>
                      <span className="text-base font-extrabold font-tech text-slate-900 dark:text-white">
                        LKR {item.price.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      Agent Warranty
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      className="py-2.5 px-2 rounded-xl bg-techla-500 hover:bg-techla-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-techla-500/25 transition-all"
                    >
                      <i className="fa-solid fa-cart-plus text-xs" />
                      <span>Add to List</span>
                    </button>

                    <button
                      onClick={() => checkPriceWhatsApp(item)}
                      className="py-2.5 px-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <i className="fa-brands fa-whatsapp text-sm" />
                      <span>Inquire</span>
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
                  {selectedProduct.brand} • {selectedProduct.catLabel}
                </span>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  {selectedProduct.name}
                </h3>
                <div className="text-xl font-black font-tech text-techla-600 dark:text-cyanGlow">
                  LKR {selectedProduct.price.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-500 font-semibold flex items-center gap-1.5">
                  <i className="fa-solid fa-shield-check" /> {selectedProduct.warranty}
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
                    <span>Add to Order List</span>
                  </button>
                  <button
                    onClick={() => checkPriceWhatsApp(selectedProduct)}
                    className="py-3 px-4 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-1.5"
                  >
                    <i className="fa-brands fa-whatsapp text-sm" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
