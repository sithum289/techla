import React from 'react';

export default function ShopHero() {
  const requestQuoteWhatsApp = () => {
    const msg = `Hello TECHLA! 🚀%0AI would like to inquire about products, electronics or home appliances availability:`;
    window.open(`https://wa.me/94771234567?text=${msg}`, '_blank');
  };

  return (
    <section className="pt-20 sm:pt-28 pb-4 sm:pb-6 relative overflow-hidden bg-slate-900 dark:bg-[#050813] transition-colors">
      
      {/* Full Screen Edge-to-Edge Container */}
      <div className="w-full relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#07132e] to-blue-950 border-b border-techla-500/25 py-6 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 text-white shadow-2xl">
        
        {/* Ambient Glowing Blobs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-techla-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-cyanGlow/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#0072ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase backdrop-blur-md">
              <i className="fa-solid fa-store text-xs" /> Authorized Retail & Sourcing Partner • Sri Lanka
            </div>

            <h1 className="font-heading text-2xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              ELECTRONICS, HOME APPLIANCES &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-techla-400 via-cyan-400 to-blue-300">
                IT HARDWARE SOURCING
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed hidden sm:block">
              From Refrigerators, Washing Machines & Smart 4K TVs to Mobile Phones, Laptops and Custom PC & CCTV Systems. TECHLA connects you directly with authorized agent distributors at verified wholesale & retail prices with official barcode warranty.
            </p>

            {/* Department Highlights - Compact Horizontal Slider on Mobile */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 sm:pt-2 text-xs">
              <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3 hover:border-cyan-400/40 transition-colors text-center sm:text-left">
                <i className="fa-solid fa-couch text-cyan-400 text-base sm:text-lg" />
                <div>
                  <h5 className="font-bold text-white text-[11px] sm:text-xs">Appliances</h5>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 hidden sm:block">Fridges, Washers, ACs</span>
                </div>
              </div>

              <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3 hover:border-cyan-400/40 transition-colors text-center sm:text-left">
                <i className="fa-solid fa-mobile-screen text-emerald-400 text-base sm:text-lg" />
                <div>
                  <h5 className="font-bold text-white text-[11px] sm:text-xs">Phones & PC</h5>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 hidden sm:block">Apple, Samsung, ASUS</span>
                </div>
              </div>

              <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-center gap-1.5 sm:gap-3 hover:border-cyan-400/40 transition-colors text-center sm:text-left">
                <i className="fa-solid fa-shield-check text-amber-400 text-base sm:text-lg" />
                <div>
                  <h5 className="font-bold text-white text-[11px] sm:text-xs">Genuine</h5>
                  <span className="text-[9px] sm:text-[10px] text-slate-400 hidden sm:block">Official Warranty</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row items-center gap-2 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="#store"
                className="flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-techla-500 to-cyan-500 hover:from-techla-600 hover:to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-techla-500/30 flex items-center gap-2 transition-all transform active:scale-95"
              >
                <i className="fa-solid fa-boxes-stacked text-xs" />
                <span>Store Catalog</span>
              </a>

              <button
                onClick={requestQuoteWhatsApp}
                className="flex-1 sm:flex-initial text-center justify-center px-4 sm:px-7 py-3 sm:py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all active:scale-95"
              >
                <i className="fa-brands fa-whatsapp text-sm" />
                <span>WhatsApp Price</span>
              </button>
            </div>
          </div>

          {/* Right Sourcing Concierge Box - Hidden on very small mobile, visible on tablet & desktop */}
          <div className="hidden lg:block lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <i className="fa-solid fa-bolt" /> Sourcing Concierge
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Island-wide Delivery
              </span>
            </div>

            <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">
              Can't find a specific model or appliance?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Send us any Phone, Laptop, Refrigerator, TV, Air Conditioner or Computer Part model number. We will source it directly from authorized agent importers with official barcode warranty.
            </p>

            <div className="space-y-2 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-cyan-400 text-[10px]" />
                <span>Refrigerators, Inverter ACs, Washing Machines & Smart TVs</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-cyan-400 text-[10px]" />
                <span>Smartphones, Laptops, Gadgets & Accessories</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-cyan-400 text-[10px]" />
                <span>CCTV Surveillance Packages & Custom High-End PC Rigs</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-cyan-400 text-[10px]" />
                <span>Official Agent Serial Barcode Warranty Card</span>
              </div>
            </div>

            <a
              href="#custom-order"
              className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <i className="fa-solid fa-magnifying-glass-dollar" />
              <span>Inquire Specific Model</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
