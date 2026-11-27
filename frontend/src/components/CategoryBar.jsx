import React, { useState } from 'react';
import { STORE_CATEGORIES } from '../constants/categories';

export default function CategoryBar({ activeCategory, setActiveCategory }) {
  const [selectedGroup, setSelectedGroup] = useState('All');

  const groups = ['All', 'Home Appliances', 'Digital & Gadgets', 'Security', 'Power & Energy'];

  const displayedCategories = selectedGroup === 'All'
    ? STORE_CATEGORIES
    : STORE_CATEGORIES.filter((c) => c.group === selectedGroup);

  return (
    <section id="categories" className="py-6 sm:py-8 bg-white dark:bg-[#071126] border-y border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-techla-500 animate-pulse" />
              Store Categories & Sourcing Catalog
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Browse Home Appliances, Electronics, Smart Devices & CCTV with Authorized Warranty
            </p>
          </div>
          <span className="text-xs font-bold text-techla-600 dark:text-cyanGlow hidden sm:inline-flex items-center gap-1.5">
            <i className="fa-solid fa-shield-check text-emerald-500" /> Singer, Abans & Official Agent Warranty
          </span>
        </div>

        {/* Department / Group Filter Tabs (Swipeable on Mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2.5 scrollbar-none mb-3">
          {groups.map((grp) => (
            <button
              key={grp}
              onClick={() => setSelectedGroup(grp)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedGroup === grp
                  ? 'bg-techla-600 text-white shadow-md shadow-techla-600/25'
                  : 'bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
              }`}
            >
              {grp === 'Home Appliances' ? '🏠 Home Appliances (Singer Style)' : grp}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll on Mobile / Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 overflow-x-auto sm:overflow-x-visible pb-3 sm:pb-0 scrollbar-none">
          {/* 'All Products' Card */}
          <button
            onClick={() => setActiveCategory('all')}
            className={`min-w-[130px] sm:min-w-0 p-3 sm:p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between shrink-0 group ${
              activeCategory === 'all'
                ? 'bg-techla-600 text-white border-techla-500 shadow-lg shadow-techla-500/30 scale-[1.02]'
                : 'bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200'
            }`}
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 transition-colors ${
              activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-techla-500/10 text-techla-600 dark:text-cyanGlow'
            }`}>
              <i className="fa-solid fa-layer-group text-sm" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-xs tracking-tight line-clamp-1">
                All Products
              </h4>
              <span className={`text-[10px] block truncate ${
                activeCategory === 'all' ? 'text-white/80' : 'text-slate-400'
              }`}>
                Full Store
              </span>
            </div>
          </button>

          {/* Individual Category Cards */}
          {displayedCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`min-w-[135px] sm:min-w-0 p-3 sm:p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between shrink-0 group ${
                  isActive
                    ? 'bg-techla-600 text-white border-techla-500 shadow-lg shadow-techla-500/30 scale-[1.02]'
                    : 'bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'bg-techla-500/10 text-techla-600 dark:text-cyanGlow'
                }`}>
                  <i className={`fa-solid ${cat.icon} text-sm`} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs tracking-tight line-clamp-1">
                    {cat.shortName || cat.name}
                  </h4>
                  <span className={`text-[10px] block truncate ${
                    isActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {cat.sub}
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
