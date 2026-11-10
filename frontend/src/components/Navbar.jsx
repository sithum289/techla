import React, { useState } from 'react';
import TechlaLogo from './TechlaLogo';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

export default function Navbar({ onSearchChange, searchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { totalCount, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-slate-900/98 text-white backdrop-blur-2xl border-b border-techla-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      
      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-techla-700 via-techla-600 to-blue-700 text-white text-[11px] font-medium py-1.5 px-4 hidden sm:block border-b border-white/10">
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
              <i className="fa-brands fa-whatsapp text-emerald-400 text-sm" /> Sales & Sourcing: +94 77 123 4567
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <a href="#store" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-techla-500/25 to-cyanGlow/20 border border-techla-400/50 group-hover:border-cyan-400 transition-all p-1 shadow-[0_0_20px_rgba(0,114,255,0.4)]">
            <TechlaLogo className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-2xl tracking-wider text-white">
                TECH<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-techla-400">LA</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-techla-500/30 text-cyan-300 border border-techla-400/40">
                HARDWARE & CCTV
              </span>
            </div>
            <span className="text-[10px] uppercase font-tech tracking-widest text-slate-300">
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
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 focus:bg-slate-950 border border-white/20 focus:border-cyan-400 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition-all"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400 text-xs" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Links & Cart Button */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            <a href="#store" className="text-slate-200 hover:text-cyan-400 transition-colors">
              Parts Catalog
            </a>
            <a href="#custom-order" className="text-cyan-300 hover:text-cyan-200 flex items-center gap-1.5">
              <i className="fa-solid fa-magnifying-glass-dollar text-xs" /> Request Any Part
            </a>
            <a href="#solutions-banner" className="text-slate-200 hover:text-cyan-400 transition-colors">
              Digital & IT Services
            </a>
            <a href="#about" className="text-slate-200 hover:text-cyan-400 transition-colors">
              About Us
            </a>
          </nav>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 flex items-center justify-center transition-all"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <i className="fa-solid fa-sun text-amber-400 text-sm" />
            ) : (
              <i className="fa-solid fa-moon text-cyan-300 text-sm" />
            )}
          </button>

          {/* High-Visibility Cyan Glow Order List Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-techla-500 hover:from-cyan-400 hover:to-techla-400 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 transition-all transform active:scale-95"
          >
            <i className="fa-solid fa-file-invoice text-sm" />
            <span>Order List</span>
            {totalCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-slate-900 font-black text-[10px] flex items-center justify-center animate-bounce shadow">
                {totalCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-techla-500/30 px-6 py-4 space-y-3 text-sm">
          <a
            href="#store"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-white hover:text-cyan-400"
          >
            🛒 Parts Catalog
          </a>
          <a
            href="#custom-order"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-cyan-400"
          >
            🔍 Request Any Part
          </a>
          <a
            href="#solutions-banner"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 font-bold text-white hover:text-cyan-400"
          >
            💼 Digital & IT Services
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-400"
          >
            ℹ️ About Us
          </a>
        </div>
      )}
    </header>
  );
}
