import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import MobileQuickCategoryBar from './components/MobileQuickCategoryBar';
import ShopHero from './components/ShopHero';
import LivePartsMarquee from './components/LivePartsMarquee';
import CategoryBar from './components/CategoryBar';
import CuratedSections from './components/CuratedSections';
import HardwareStore from './components/HardwareStore';
import CustomSourcingSection from './components/CustomSourcingSection';
import SolutionsBanner from './components/SolutionsBanner';
import AboutPvtLtd from './components/AboutPvtLtd';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WhatsAppFloating from './components/WhatsAppFloating';
import BackgroundCanvas from './components/BackgroundCanvas';
import AuthModal from './components/AuthModal';
import AdminDashboard from './components/AdminDashboard';

function StoreFront() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    const storeEl = document.getElementById('store');
    if (storeEl) storeEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050813] text-slate-900 dark:text-slate-100 font-sans selection:bg-techla-500 selection:text-white overflow-x-hidden transition-colors duration-300">
      {/* Dynamic Network Canvas */}
      <BackgroundCanvas />

      {/* Navigation with Sense.lk Style Mega Dropdown */}
      <Navbar
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        onSelectCategory={handleSelectCategory}
      />

      {/* Sliding Order Tray */}
      <CartDrawer />

      {/* MOBILE ONLY: Instant Sticky Quick-Category Bar at the very top */}
      <MobileQuickCategoryBar
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="relative z-10">
        {/* 1. Buying & Selling Hero Banner */}
        <ShopHero />

        {/* 2. Live Verified Product Ticker */}
        <LivePartsMarquee />

        {/* 3. Sense.lk Style Curated Promos & Deals (Hot Deals, Home Appliances, Tech) */}
        <CuratedSections onSelectCategory={handleSelectCategory} />

        {/* 4. Category Selector Bar */}
        <CategoryBar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* 5. Sense.lk Style Sourcing Catalog with Left Filter Sidebar */}
        <HardwareStore
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
        />

        {/* 6. Custom Sourcing Form */}
        <CustomSourcingSection />

        {/* 7. Secondary Solutions Banner */}
        <SolutionsBanner />

        {/* 8. About Pvt Ltd & Warranty Assurance */}
        <AboutPvtLtd />

        {/* 9. Direct Inquiry / Consultation Form */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Speed Contact Bubble */}
      <WhatsAppFloating />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Universal Auth Popup Modal */}
          <AuthModal />

          <Routes>
            <Route path="/" element={<StoreFront />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
