import React from 'react';

export default function ShopHero() {
  return (
    <section className="pt-32 sm:pt-36 pb-12 relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-[#060c1c] dark:via-[#050813] dark:to-[#050813] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Promotional Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-techla-950 to-blue-950 border border-techla-500/30 p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-techla-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyanGlow/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                <i className="fa-solid fa-sparkles text-xs" /> Authorized Sri Lankan Distributor
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                POWER YOUR RIG WITH{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-techla-400 via-cyan-400 to-blue-300">
                  GENUINE HARDWARE
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Sri Lanka's leading computer hardware store. Official agent-boxed RTX 40 Series GPUs, Ryzen 7000/9000 & Intel 14th Gen processors, lightning NVMe SSDs, and gaming monitors with direct serial barcode warranty.
              </p>

              {/* Badges / Highlights */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-slate-200">
                  <i className="fa-solid fa-check text-emerald-400" /> 1-to-1 RMA Replacement
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-slate-200">
                  <i className="fa-solid fa-check text-emerald-400" /> Island-wide Cash/Bank Transfer
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5 text-slate-200">
                  <i className="fa-solid fa-check text-emerald-400" /> 0% Card Installment Plans
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#store"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-techla-500 to-cyan-500 hover:from-techla-600 hover:to-cyan-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-techla-500/30 flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <i className="fa-solid fa-bag-shopping" />
                  <span>Browse Products</span>
                </a>

                <a
                  href="https://wa.me/94771234567?text=Hello%20TECHLA%20Store!%20I%20want%20to%20inquire%20about%20computer%20parts%20and%20prices."
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all"
                >
                  <i className="fa-brands fa-whatsapp text-sm" />
                  <span>Quick WhatsApp Inquiries</span>
                </a>
              </div>
            </div>

            {/* Right Product Spotlight Image */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-white/15 bg-white/5 p-4 backdrop-blur-md shadow-2xl">
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider animate-pulse">
                  HOT SELLER • LIMITED STOCK
                </div>
                <img
                  src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80"
                  alt="GeForce RTX 4070 Ti"
                  className="w-full h-56 object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                />
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-cyan-300 font-tech uppercase block">NVIDIA / MSI</span>
                    <h4 className="text-sm font-bold text-white">GeForce RTX 4070 Ti SUPER 16G</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 line-through block font-tech">LKR 335,000</span>
                    <span className="text-sm font-bold text-cyan-400 font-tech">LKR 315,000</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

