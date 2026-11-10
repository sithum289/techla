import React, { useState } from 'react';
import TechlaLogo from './TechlaLogo';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ onSearchChange, searchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-white dark:bg-[#071126] border-b border-slate-200 dark:border-white/10 shadow-md">
      
      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-techla-700 via-techla-600 to-blue-700 text-white text-[11px] font-semibold py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-truck-fast text-cyan-300" /> Island-wide Delivery & Pickup
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-cyan-300" /> Direct Authorized Agent Barcode Warranty
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/94771234567" target="_blank" rel="noreferrer" className="hover:text-cyan-200 font-bold flex items-center gap-1.5 text-white">
              <i className="fa-brands fa-whatsapp text-emerald-300 text-sm" /> Sales & Sourcing: +94 77 123 4567
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <a href="#store" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:border-techla-500 transition-all p-1 shadow-sm">
            <TechlaLogo className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-2xl tracking-wider text-slate-900 dark:text-white">
                TECH<span className="text-techla-600 dark:text-cyan-400">LA</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-techla-50 dark:bg-techla-500/20 text-techla-700 dark:text-cyan-300 border border-techla-200 dark:border-techla-400/30">
                HARDWARE & CCTV
              </span>
            </div>
            <span className="text-[10px] uppercase font-tech tracking-widest text-slate-500 dark:text-slate-400">
              Computer Parts • CCTV • Digital Services
            </span>
          </div>
        </a>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search RTX 4060, Hikvision CCTV, Ryzen CPU, SSD..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-techla-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-techla-500/20 transition-all"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400 text-xs" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Links & Actions */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <a href="#store" className="text-slate-700 dark:text-slate-200 hover:text-techla-600 dark:hover:text-cyan-400 transition-colors">
              Parts Catalog
            </a>
            <a href="#custom-order" className="text-techla-600 dark:text-cyan-400 hover:text-techla-700 dark:hover:text-cyan-300 flex items-center gap-1.5">
              <i className="fa-solid fa-magnifying-glass-dollar text-xs" /> Request Any Part
            </a>
            <a href="#solutions-banner" className="text-slate-700 dark:text-slate-200 hover:text-techla-600 dark:hover:text-cyan-400 transition-colors">
              Digital & IT Services
            </a>
            <a href="#about" className="text-slate-700 dark:text-slate-200 hover:text-techla-600 dark:hover:text-cyan-400 transition-colors">
              About Us
            </a>
          </nav>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all"
            title="Toggle Light / Dark mode"
          >
            {theme === 'dark' ? (
              <i className="fa-solid fa-sun text-amber-400 text-sm" />
            ) : (
              <i className="fa-solid fa-moon text-slate-700 text-sm" />
            )}
          </button>

          {/* High-Visibility Order List Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2.5 rounded-xl bg-techla-600 hover:bg-techla-700 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-techla-500 text-white font-extrabold text-xs shadow-md shadow-techla-600/30 flex items-center gap-2 transition-all transform active:scale-95"
          >
            <i className="fa-solid fa-file-invoice text-sm" />
            <span>Order List</span>
            {totalCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-900 font-black text-[10px] flex items-center justify-center animate-bounce shadow">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-white"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-techla-500/30 px-6 py-4 space-y-3 text-sm">
          <a
            href="#store"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-slate-900 dark:text-white hover:text-techla-600 dark:hover:text-cyan-400"
          >
            🛒 Parts Catalog
          </a>
          <a
            href="#custom-order"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-techla-600 dark:text-cyan-400"
          >
            🔍 Request Any Part
          </a>
          <a
            href="#solutions-banner"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-slate-900 dark:text-white hover:text-techla-600 dark:hover:text-cyan-400"
          >
            💼 Digital & IT Services
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-600 dark:text-slate-400"
          >
            ℹ️ About Us
          </a>
        </div>
      )}
    </header>
  );
}
