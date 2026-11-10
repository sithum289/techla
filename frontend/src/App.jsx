import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ShopHero from './components/ShopHero';
import CategoryBar from './components/CategoryBar';
import HardwareStore from './components/HardwareStore';
import SolutionsBanner from './components/SolutionsBanner';
import Showroom from './components/Showroom';
import AboutPvtLtd from './components/AboutPvtLtd';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppFloating from './components/WhatsAppFloating';
import BackgroundCanvas from './components/BackgroundCanvas';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <CartProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-[#050813] text-slate-900 dark:text-slate-100 font-sans selection:bg-techla-500 selection:text-white overflow-x-hidden transition-colors duration-300">
        
        {/* Dynamic Background Network */}
        <BackgroundCanvas />

        {/* E-Commerce Navigation with Live Search & Cart */}
        <Navbar
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
        />

        {/* Sliding Shopping Cart Drawer */}
        <CartDrawer />

        {/* Main Content (Selling First) */}
        <main className="relative z-10">
          {/* 1. Promotional Selling Hero */}
          <ShopHero />

          {/* 2. Visual Category Picker Bar */}
          <CategoryBar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* 3. Main Hardware Products Grid (Searchable, Add to Cart, WhatsApp Buy) */}
          <HardwareStore
            activeCategory={activeCategory}
            searchQuery={searchQuery}
          />

          {/* 4. Compact Secondary IT Solutions Banner */}
          <SolutionsBanner />

          {/* 5. Physical Experience Centre & Showroom */}
          <Showroom />

          {/* 6. Company Credentials & Genuine Warranty Pledge */}
          <AboutPvtLtd />

          {/* 7. Quick Inquiries & Quote Form */}
          <ContactForm />
        </main>

        {/* E-Commerce Footer */}
        <Footer />

        {/* Sticky Floating WhatsApp Pill */}
        <WhatsAppFloating />
      </div>
    </CartProvider>
  );
}
