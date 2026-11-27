import React from 'react';
import { STORE_CATEGORIES } from '../constants/categories';

export default function MobileQuickCategoryBar({ activeCategory, onSelectCategory }) {
  return (
    <div className="sm:hidden bg-slate-900/95 dark:bg-[#071126]/95 backdrop-blur-md border-b border-slate-800 dark:border-white/10 sticky top-[60px] z-30 px-3 py-2.5 shadow-md">
      <div className="flex items-center justify-between mb-1.5 px-1">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
          <i className="fa-solid fa-bolt text-amber-400" />
          <span>Quick Categories</span>
        </span>
        <span className="text-[10px] text-slate-400">Swipe to browse →</span>
      </div>

      {/* Horizontal Scroll Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {/* All Products Pill */}
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 ${
            activeCategory === 'all'
              ? 'bg-techla-500 text-white shadow-md shadow-techla-500/30'
              : 'bg-white/10 text-slate-200 hover:bg-white/15'
          }`}
        >
          <i className="fa-solid fa-layer-group text-[11px]" />
          <span>All Items</span>
        </button>

        {/* Dynamic Category Pills */}
        {STORE_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 ${
                isActive
                  ? 'bg-techla-500 text-white shadow-md shadow-techla-500/30 ring-2 ring-cyan-400/50'
                  : 'bg-white/10 text-slate-200 hover:bg-white/15'
              }`}
            >
              <i className={`fa-solid ${cat.icon || 'fa-tag'} text-[11px] ${isActive ? 'text-white' : 'text-cyan-400'}`} />
              <span>{cat.shortName || cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
