import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import ShopHero from './components/ShopHero';
import LivePartsMarquee from './components/LivePartsMarquee';
import CategoryBar from './components/CategoryBar';
import HardwareStore from './components/HardwareStore';
import CustomSourcingSection from './components/CustomSourcingSection';
import SolutionsBanner from './components/SolutionsBanner';
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
        
        {/* Dynamic Network Canvas */}
        <BackgroundCanvas />

        {/* Navigation */}
        <Navbar
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
        />

        {/* Sliding Order Inquiry Tray */}
        <CartDrawer />

        <main className="relative z-10">
          {/* 1. Buying & Selling Hero Banner */}
          <ShopHero />

          {/* 2. Live Infinite Scrolling Computer & CCTV Parts Ticker */}
          <LivePartsMarquee />

          {/* 3. Category Selector (CCTV, GPUs, CPUs, SSDs, etc.) */}
          <CategoryBar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* 3. Computer Parts & CCTV Sourcing Catalog */}
          <HardwareStore
            activeCategory={activeCategory}
            searchQuery={searchQuery}
          />

          {/* 4. "Don't See What You Need?" Custom Sourcing Form */}
          <CustomSourcingSection />

          {/* 5. Secondary IT Solutions & CCTV Installation Banner */}
          <SolutionsBanner />

          {/* 6. Genuine Warranty & Sourcing Model Guarantee */}
          <AboutPvtLtd />

          {/* 7. Contact & Quotation Form */}
          <ContactForm />
        </main>

        <Footer />
        <WhatsAppFloating />
      </div>
    </CartProvider>
  );
}
