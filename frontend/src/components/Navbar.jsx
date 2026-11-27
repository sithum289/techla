import React, { useState } from 'react';
import TechlaLogo from './TechlaLogo';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { STORE_CATEGORIES } from '../constants/categories';

export default function Navbar({ onSearchChange, searchQuery, onSelectCategory }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [hotline, setHotline] = useState('+94 77 123 4567');
  const [whatsappNum, setWhatsappNum] = useState('94771234567');
  const { theme, toggleTheme } = useTheme();
  const { totalCount, setIsCartOpen } = useCart();
  const { user, logout, isAdmin, setIsAuthModalOpen } = useAuth();

  React.useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.hotlinePhone) setHotline(data.hotlinePhone);
        if (data && data.whatsappNumber) setWhatsappNum(data.whatsappNumber);
      })
      .catch(() => {});
  }, []);

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) onSelectCategory(catId);
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    const storeEl = document.getElementById('store');
    if (storeEl) storeEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-white dark:bg-[#071126] border-b border-slate-200 dark:border-white/10 shadow-md">
      
      {/* Top Notice Bar (Sense.lk style branch & delivery hotline info) */}
      <div className="bg-gradient-to-r from-techla-700 via-techla-600 to-blue-700 text-white text-[11px] font-semibold py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-truck-fast text-cyan-300" /> Island-wide Cash on Delivery
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-cyan-300" /> Direct Authorized Agent Barcode Warranty
            </span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1.5 text-cyan-200">
              <i className="fa-solid fa-building-circle-check" /> Showroom Pickup Available
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                to="/admin"
                className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow animate-pulse"
              >
                <i className="fa-solid fa-gauge" /> Admin Dashboard
              </Link>
            )}
            <a href={`https://wa.me/${whatsappNum}`} target="_blank" rel="noreferrer" className="hover:text-cyan-200 font-bold flex items-center gap-1.5 text-white">
              <i className="fa-brands fa-whatsapp text-emerald-300 text-sm" /> Sales & Sourcing: {hotline}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 relative">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:border-techla-500 transition-all p-1 shadow-sm">
            <TechlaLogo className="w-full h-full" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-2xl tracking-wider text-slate-900 dark:text-white">
                TECH<span className="text-techla-600 dark:text-cyan-400">LA</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-techla-50 dark:bg-techla-500/20 text-techla-700 dark:text-cyan-300 border border-techla-200 dark:border-techla-400/30">
                ELECTRONICS & APPLIANCES
              </span>
            </div>
            <span className="text-[10px] uppercase font-tech tracking-widest text-slate-500 dark:text-slate-400">
              Home Appliances • Mobile • Computers • CCTV
            </span>
          </div>
        </Link>

        {/* Sense.lk Style "Shop Categories" Mega Menu Trigger */}
        <div className="hidden lg:block relative">
          <button
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-2.5 transition-all shadow-sm"
          >
            <i className="fa-solid fa-bars-staggered text-techla-600 dark:text-cyan-400" />
            <span>All Categories</span>
            <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Mega Menu Dropdown */}
          {megaMenuOpen && (
            <div className="absolute top-12 left-0 w-80 max-h-[75vh] overflow-y-auto bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 space-y-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/20">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 py-1.5 sticky top-0 bg-white/95 dark:bg-[#071126]/95 backdrop-blur-sm z-10 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span>Browse Departments</span>
                <span className="text-[9px] lowercase font-normal opacity-70">scroll for more ↓</span>
              </div>
              <button
                onClick={() => handleCategoryClick('all')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-techla-500 hover:text-white flex items-center gap-2.5 transition-colors"
              >
                <i className="fa-solid fa-layer-group w-4 text-center" />
                <span>All Store Products</span>
              </button>
              {STORE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-techla-500 hover:text-white flex items-center gap-2.5 transition-colors group"
                >
                  <i className={`fa-solid ${cat.icon} w-4 text-center text-techla-500 group-hover:text-white`} />
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder="Search Samsung Fridge, LG Washer, RTX 4060, iPhone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-techla-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-techla-500/20 transition-all"
            />
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange && onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Links & Actions */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <nav className="hidden xl:flex items-center gap-5 text-xs font-bold uppercase tracking-wider">
            <a href="#store" className="text-slate-700 dark:text-slate-200 hover:text-techla-600 dark:hover:text-cyan-400 transition-colors">
              Catalog
            </a>
            <a href="#custom-order" className="text-techla-600 dark:text-cyan-400 hover:text-techla-700 dark:hover:text-cyan-300 flex items-center gap-1.5">
              <i className="fa-solid fa-magnifying-glass-dollar text-xs" /> Request Item
            </a>
            <a href="#solutions-banner" className="text-slate-700 dark:text-slate-200 hover:text-techla-600 dark:hover:text-cyan-400 transition-colors">
              Services
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

          {/* Auth Button */}
          {user ? (
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <i className="fa-solid fa-shield-halved" />
                  <span className="hidden sm:inline">Admin</span>
                </Link>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <i className="fa-solid fa-user text-techla-500" />
                  <span className="max-w-[80px] truncate">{user.name || user.email.split('@')[0]}</span>
                </div>
              )}
              <button
                onClick={logout}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 text-slate-500 flex items-center justify-center transition-colors"
                title="Logout"
              >
                <i className="fa-solid fa-right-from-bracket text-xs" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <i className="fa-solid fa-user text-techla-500 text-xs" />
              <span>Sign In</span>
            </button>
          )}

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3.5 sm:px-4 py-2.5 rounded-xl bg-techla-600 hover:bg-techla-700 dark:bg-gradient-to-r dark:from-cyan-500 dark:to-techla-500 text-white font-extrabold text-xs shadow-md shadow-techla-600/30 flex items-center gap-2 transition-all transform active:scale-95"
          >
            <i className="fa-solid fa-cart-shopping text-sm" />
            <span className="hidden sm:inline">Cart</span>
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
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-techla-500/30 px-6 py-4 space-y-3 text-sm max-h-[80vh] overflow-y-auto">
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-amber-500"
            >
              ⚡ Open Admin Dashboard
            </Link>
          )}
          
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 pt-1">
            Categories
          </div>
          <button
            onClick={() => handleCategoryClick('all')}
            className="block w-full text-left py-2 font-bold text-slate-900 dark:text-white hover:text-techla-600"
          >
            🛒 All Store Products
          </button>
          {STORE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategoryClick(c.id)}
              className="block w-full text-left py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-techla-600 flex items-center gap-2"
            >
              <i className={`fa-solid ${c.icon} text-techla-500 w-4`} />
              <span>{c.name}</span>
            </button>
          ))}

          <div className="border-t border-slate-200 dark:border-white/10 pt-3">
            <a
              href="#custom-order"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-bold text-techla-600 dark:text-cyan-400"
            >
              🔍 Request Any Part / Appliance
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
