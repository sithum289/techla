import React from 'react';

export default function AboutPvtLtd() {
  return (
    <section id="about" className="py-24 scroll-mt-24 relative bg-slate-100/70 dark:bg-[#050813] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold font-tech uppercase tracking-widest text-techla-600 dark:text-cyanGlow px-3 py-1 rounded-full bg-techla-500/10 border border-techla-500/20">
              About TECHLA (Pvt) Ltd
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight transition-colors">
              Built on Integrity, Driven by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-techla-600 via-techla-500 to-cyan-500 dark:from-techla-400 dark:via-cyan-400 dark:to-blue-500">
                Engineering Excellence
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              TECHLA (Pvt) Ltd was established with a singular mission: to provide Sri Lankan corporate enterprises, institutions, and individuals with uncompromising tech infrastructure, transparent warranties, and world-class customer service.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              Whether you are setting up a 50-workstation network infrastructure or procuring high-performance graphics workstations for 3D modeling and rendering, our certified tech team delivers turnkey solutions backed by official manufacturer partnerships.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#091122] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-certificate" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Genuine Guarantee</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Strict authorized channel distribution with direct agent serial warranty.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#091122] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-headset" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">24/7 Priority SLA</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Dedicated corporate emergency on-call team for zero downtime.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#091122] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-truck-fast" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Islandwide Safe Delivery</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Insured express door-step delivery & on-site deployment across Sri Lanka.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#091122] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-file-invoice" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Corporate Tax Invoicing</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Registered Private Limited company with complete formal SVAT / VAT invoices.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-white dark:bg-gradient-to-br dark:from-[#0c1630] dark:to-[#060c1d] border border-slate-200 dark:border-techla-500/30 p-8 shadow-xl dark:shadow-2xl transition-colors">
              <div className="text-center space-y-4 mb-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-techla-500/10 dark:bg-techla-500/20 border border-techla-500/30 dark:border-techla-400/40 flex items-center justify-center text-techla-600 dark:text-cyanGlow text-3xl shadow-lg dark:shadow-[0_0_20px_rgba(0,114,255,0.4)]">
                  <i className="fa-solid fa-shield-cat" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">TECHLA Corporate Pledge</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  We do not cut corners. Every PC build passes 24 hours of OCCT stress testing and thermal benchmarks before customer handover.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    <i className="fa-solid fa-check text-techla-500 mr-2" /> Thermal Paste Application
                  </span>
                  <span className="text-techla-600 dark:text-cyanGlow font-tech font-bold">Kryonaut Extreme</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    <i className="fa-solid fa-check text-techla-500 mr-2" /> Cable Management
                  </span>
                  <span className="text-techla-600 dark:text-cyanGlow font-tech font-bold">Stealth Channel Tied</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    <i className="fa-solid fa-check text-techla-500 mr-2" /> BIOS & Firmware
                  </span>
                  <span className="text-techla-600 dark:text-cyanGlow font-tech font-bold">Updated & Tuned</span>
                </div>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 text-xs">
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    <i className="fa-solid fa-check text-techla-500 mr-2" /> Memory Profile
                  </span>
                  <span className="text-techla-600 dark:text-cyanGlow font-tech font-bold">XMP / EXPO Enabled</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
