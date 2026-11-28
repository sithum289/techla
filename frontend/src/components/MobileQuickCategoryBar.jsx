import React from 'react';
import { STORE_CATEGORIES } from '../constants/categories';

export default function MobileQuickCategoryBar({ activeCategory, onSelectCategory, searchQuery, onSearchChange }) {
  return (
    <div className="sm:hidden bg-slate-900/95 dark:bg-[#071126]/95 backdrop-blur-md border-b border-slate-800 dark:border-white/10 sticky top-[60px] z-30 px-3 py-2.5 shadow-md space-y-2">
      
      {/* MOBILE PROMINENT SEARCH BAR */}
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery || ''}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          placeholder="Search Fridge, Washer, Phone, RTX..."
          className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
        />
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
        {searchQuery && (
          <button
            onClick={() => onSearchChange && onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs p-1"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
          <i className="fa-solid fa-bolt text-amber-400" />
          <span>Quick Categories</span>
        </span>
        <span className="text-[10px] text-slate-400">Swipe →</span>
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
