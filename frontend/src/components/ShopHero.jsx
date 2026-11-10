import React from 'react';

export default function ShopHero() {
  const requestQuoteWhatsApp = () => {
    const msg = `Hello TECHLA! 🚀%0AI would like to get a price quote and availability check for computer parts / CCTV equipment:`;
    window.open(`https://wa.me/94771234567?text=${msg}`, '_blank');
  };

  return (
    <section className="pt-24 sm:pt-28 pb-6 relative overflow-hidden bg-slate-900 dark:bg-[#050813] transition-colors">
      
      {/* Full Screen Edge-to-Edge Container */}
      <div className="w-full relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#07132e] to-blue-950 border-b border-techla-500/25 py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16 text-white shadow-2xl">
        
        {/* Ambient Glowing Blobs */}
        <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-techla-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-cyanGlow/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#0072ff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Hero Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
              <i className="fa-solid fa-handshake text-xs" /> Verified Buying & Selling Partner • Sri Lanka
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              GENUINE COMPUTER &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-techla-400 via-cyan-400 to-blue-300">
                CCTV HARDWARE SOURCING
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Looking for computer parts, custom gaming rigs, or commercial CCTV surveillance systems? TECHLA connects you directly with authorized agent distributors at verified wholesale & retail market rates. Official warranty guaranteed.
            </p>

            {/* Model Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3 hover:border-cyan-400/40 transition-colors">
                <i className="fa-solid fa-tags text-cyan-400 text-lg" />
                <div>
                  <h5 className="font-bold text-white">Best Market Rates</h5>
                  <span className="text-[10px] text-slate-400">Direct agent sourcing</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3 hover:border-cyan-400/40 transition-colors">
                <i className="fa-solid fa-camera-security text-emerald-400 text-lg" />
                <div>
                  <h5 className="font-bold text-white">CCTV & PC Parts</h5>
                  <span className="text-[10px] text-slate-400">Hikvision, Dahua, ASUS</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3 hover:border-cyan-400/40 transition-colors">
                <i className="fa-solid fa-certificate text-amber-400 text-lg" />
                <div>
                  <h5 className="font-bold text-white">100% Genuine</h5>
                  <span className="text-[10px] text-slate-400">Official agent warranty</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#store"
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-techla-500 to-cyan-500 hover:from-techla-600 hover:to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-techla-500/30 flex items-center gap-2.5 transition-all transform hover:scale-105"
              >
                <i className="fa-solid fa-boxes-stacked" />
                <span>Explore Available Items</span>
              </a>

              <button
                onClick={requestQuoteWhatsApp}
                className="px-7 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center gap-2.5 transition-all"
              >
                <i className="fa-brands fa-whatsapp text-base" />
                <span>Request Custom Part / Price</span>
              </button>
            </div>
          </div>

          {/* Right Sourcing Concierge Box */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full rounded-3xl bg-white/5 border border-white/15 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <i className="fa-solid fa-bolt text-amber-400" /> Sourcing Concierge
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  Same-Day Availability
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Can't find a specific GPU, Motherboard or CCTV camera model in our list? Send us the model number and we'll source it for you with official agent warranty.
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2.5 text-slate-200">
                  <i className="fa-solid fa-circle-check text-cyan-400 text-sm" />
                  <span>Graphics Cards, CPUs & High-Speed RAM</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200">
                  <i className="fa-solid fa-circle-check text-cyan-400 text-sm" />
                  <span>IP / HD 4K CCTV Cameras & DVR / NVR Recorders</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-200">
                  <i className="fa-solid fa-circle-check text-cyan-400 text-sm" />
                  <span>Official Distributor Barcode Serial Warranty</span>
                </div>
              </div>

              <a
                href="#custom-order"
                className="block text-center w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-cyan-400 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                Inquire Specific Part Model
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
