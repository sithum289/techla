import React, { useState } from 'react';
import TechlaLogo from './TechlaLogo';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white/85 dark:bg-[#050813]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/5 shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-techla-500/15 dark:from-techla-500/20 to-cyanGlow/10 border border-techla-500/30 group-hover:border-techla-400 transition-all shadow-[0_0_20px_rgba(0,114,255,0.2)]">
            <TechlaLogo className="w-7 h-7 drop-shadow-[0_2px_10px_rgba(0,114,255,0.7)]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-2xl tracking-wider text-slate-900 dark:text-white transition-colors">
                TECH<span className="text-transparent bg-clip-text bg-gradient-to-r from-techla-500 to-techla-400 dark:from-techla-400 dark:to-cyanGlow">LA</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow border border-techla-500/30 dark:border-techla-500/40">
                PVT LTD
              </span>
            </div>
            <span className="text-[10px] uppercase font-tech tracking-widest text-slate-500 dark:text-slate-400">
              IT Solutions & Hardware
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#home" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-techla-500 dark:hover:text-cyanGlow transition-colors">Home</a>
          
          <a href="#solutions" className="text-sm font-semibold text-techla-600 dark:text-cyanGlow transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-techla-500 dark:bg-cyanGlow animate-pulse" />
            <span>IT Solutions</span>
          </a>

          <a href="#hardware" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-techla-500 dark:hover:text-cyanGlow transition-colors">
            Computer Hardware
          </a>

          <a href="#showroom" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-techla-500 dark:hover:text-cyanGlow transition-colors">
            Showroom
          </a>

          <a href="#about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-techla-500 dark:hover:text-cyanGlow transition-colors">About Us</a>
          <a href="#contact" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-techla-500 dark:hover:text-cyanGlow transition-colors">Contact</a>
        </nav>

        {/* Header Actions & Theme Toggle */}
        <div className="flex items-center gap-3">
          
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-all flex items-center justify-center text-sm"
            aria-label="Toggle Theme Mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <i className="fa-solid fa-sun text-amber-400 text-base" />
            ) : (
              <i className="fa-solid fa-moon text-techla-600 text-base" />
            )}
          </button>

          <a
            href="https://wa.me/94771234567?text=Hello%20TECHLA,%20I%20would%20like%20to%20inquire%20about%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all text-xs font-semibold"
          >
            <i className="fa-brands fa-whatsapp text-sm" />
            <span>Quick Chat</span>
          </a>

          <a
            href="#contact"
            className="hidden sm:flex relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-techla-600 via-techla-500 to-cyan-500 text-white font-semibold text-xs tracking-wide shadow-md hover:shadow-[0_0_25px_rgba(0,114,255,0.4)] transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Get Free Quote</span>
              <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-lg`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-[#070c18]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 px-6 py-6 transition-all space-y-4 shadow-xl">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-techla-500 dark:hover:text-cyanGlow">Home</a>
          <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="block text-base font-semibold text-techla-600 dark:text-cyanGlow">IT Solutions & Enterprise Services</a>
          <a href="#hardware" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-techla-500 dark:hover:text-cyanGlow">Computer Hardware & Parts</a>
          <a href="#showroom" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-techla-500 dark:hover:text-cyanGlow">Experience Centre & Showroom</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-techla-500 dark:hover:text-cyanGlow">About TECHLA (Pvt) Ltd</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-slate-800 dark:text-slate-200 hover:text-techla-500 dark:hover:text-cyanGlow">Contact & Quotation</a>
          <div className="pt-4 flex flex-col gap-3">
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-sm font-semibold"
            >
              <i className="fa-brands fa-whatsapp mr-2" /> WhatsApp Direct
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-techla-600 to-cyan-500 text-white font-semibold text-sm"
            >
              Request a Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
