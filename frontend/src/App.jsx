import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import HardwareStore from './components/HardwareStore';
import Showroom from './components/Showroom';
import AboutPvtLtd from './components/AboutPvtLtd';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import BackgroundCanvas from './components/BackgroundCanvas';

export default function App() {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050813] text-slate-900 dark:text-slate-100 font-sans selection:bg-techla-500 selection:text-white overflow-x-hidden transition-colors duration-300">
      {/* Dynamic Background */}
      <BackgroundCanvas />

      {/* Main navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Solutions />
        <HardwareStore />
        <Showroom />
        <AboutPvtLtd />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky WhatsApp Floating Pill */}
      <WhatsAppFloating />
    </div>
  );
}
