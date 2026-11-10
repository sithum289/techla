import React from 'react';

const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'fa-layer-group', count: '50+ Items' },
  { id: 'gpu', name: 'Graphics Cards', icon: 'fa-gamepad', count: 'RTX 40 / RX 7000' },
  { id: 'cpu', name: 'Processors', icon: 'fa-microchip', count: 'Intel & AMD' },
  { id: 'ram-ssd', name: 'RAM & NVMe SSD', icon: 'fa-memory', count: 'DDR5 & Gen4/5' },
  { id: 'motherboard', name: 'Motherboards', icon: 'fa-chess-board', count: 'B650, Z790, X670' },
  { id: 'psu-case', name: 'Cases & Power Supplies', icon: 'fa-plug', count: '750W-1200W & ARGB' },
  { id: 'monitors', name: 'Gaming Monitors', icon: 'fa-desktop', count: '180Hz - 240Hz IPS' },
  { id: 'peripherals', name: 'Keyboards & Mice', icon: 'fa-keyboard', count: 'Wireless / RGB' },
];

export default function CategoryBar({ activeCategory, setActiveCategory }) {
  return (
    <section id="categories" className="py-8 bg-white dark:bg-[#071126] border-y border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-techla-500 animate-pulse" />
              Shop by Category
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select a component category to filter our certified in-stock hardware
            </p>
          </div>
          <span className="text-xs font-bold text-techla-600 dark:text-cyanGlow hidden sm:block">
            100% Genuine Boxed Stock
          </span>
        </div>

        {/* Categories Grid / Scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between group ${
                  isActive
                    ? 'bg-techla-500 text-white border-techla-400 shadow-lg shadow-techla-500/30 scale-[1.02]'
                    : 'bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'bg-techla-500/10 text-techla-600 dark:text-cyanGlow'
                }`}>
                  <i className={`fa-solid ${cat.icon} text-sm`} />
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-snug truncate">
                    {cat.name}
                  </h4>
                  <span className={`text-[10px] block font-tech mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {cat.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

