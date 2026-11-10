import React from 'react';
import TechlaLogo from './TechlaLogo';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ onSearchChange, searchQuery }) {
  const { theme, toggleTheme } = useTheme();
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/95 dark:bg-[#050813]/95 backdrop-blur-xl border-b border-slate-200/90 dark:border-white/10 shadow-sm dark:shadow-none">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-techla-700 via-techla-600 to-blue-700 text-white text-[11px] font-medium py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-truck-fast text-cyan-300" /> Island-wide Express Delivery & Pickup
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-badge-check text-cyan-300" /> Sourced from Direct Authorized Agents
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-cyan-300" /> Official Manufacturer Serial Warranty
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/94771234567" target="_blank" rel="noreferrer" className="hover:text-cyan-200 font-bold flex items-center gap-1">
              <i className="fa-brands fa-whatsapp text-emerald-300" /> Order / Price Check: +94 77 123 4567
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <a href="#store" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-techla-500/15 dark:from-techla-500/25 to-cyanGlow/10 border border-techla-500/30 group-hover:border-techla-400 transition-all p-1 shadow-[0_0_20px_rgba(0,114,255,0.25)]">
            <TechlaLogo className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-2xl tracking-wider text-slate-900 dark:text-white transition-colors">
                TECH<span className="text-transparent bg-clip-text bg-gradient-to-r from-techla-500 to-techla-400 dark:from-techla-400 dark:to-cyanGlow">LA</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-techla-500/15 text-techla-600 dark:text-cyanGlow border border-techla-500/30">
                HARDWARE & CCTV
              </span>
            </div>
            <span className="text-[10px] uppercase font-tech tracking-widest text-slate-500 dark:text-slate-400">
              Computer Parts • CCTV • IT Services
            </span>
          </div>
        </a>

        {/* Live Search */}
        <div className="hidden md:flex flex-1 max-w-lg mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Parts: RTX 4060, Hikvision 4K CCTV, Ryzen CPU, SSD..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-techla-500 focus:ring-2 focus:ring-techla-500/20 transition-all"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <a href="#store" className="text-slate-700 dark:text-slate-300 hover:text-techla-500 dark:hover:text-cyanGlow transition-colors">
              Parts Catalog
            </a>
            <a href="#custom-order" className="text-techla-600 dark:text-cyanGlow flex items-center gap-1 hover:opacity-80 transition-opacity">
              <i className="fa-solid fa-magnifying-glass-dollar" /> Request Any Part
            </a>
            <a href="#solutions-banner" className="text-slate-700 dark:text-slate-300 hover:text-techla-500 dark:hover:text-cyanGlow transition-colors">
              Software & Digital Services
            </a>
            <a href="#about" className="text-slate-700 dark:text-slate-300 hover:text-techla-500 dark:hover:text-cyanGlow transition-colors">
              About Us
            </a>
          </nav>

          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 flex items-center justify-center transition-all"
          >
            {theme === 'dark' ? (
              <i className="fa-solid fa-sun text-amber-400 text-sm" />
            ) : (
              <i className="fa-solid fa-moon text-slate-600 text-sm" />
            )}
          </button>

          {/* Cart / Inquiry Tray */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 sm:px-4 py-2.5 rounded-xl bg-gradient-to-r from-techla-600 to-blue-600 hover:from-techla-700 hover:to-blue-700 text-white font-bold text-xs shadow-lg shadow-techla-500/25 flex items-center gap-2 transition-all transform active:scale-95"
          >
            <i className="fa-solid fa-file-invoice text-sm" />
            <span className="hidden sm:inline">Order List</span>
            {totalCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-900 font-extrabold text-[10px] flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
