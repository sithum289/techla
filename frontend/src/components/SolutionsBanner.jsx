import React from 'react';

export default function SolutionsBanner() {
  const inquireITWhatsApp = () => {
    const msg = `Hello TECHLA (Pvt) Ltd! 💼%0AI would like to consult with your IT Engineering team regarding Enterprise Networking / Server Infrastructure / Custom Software.`;
    window.open(`https://wa.me/94771234567?text=${msg}`, '_blank');
  };

  return (
    <section id="solutions-banner" className="py-12 bg-white dark:bg-[#060c1d] border-t border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-techla-950 to-slate-900 border border-techla-500/30 p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-techla-500/20 border border-techla-500/40 text-cyan-400 flex items-center justify-center text-2xl shrink-0">
              <i className="fa-solid fa-network-wired" />
            </div>
            <div>
              <span className="text-[10px] font-tech uppercase tracking-widest text-cyan-400 font-bold block">
                Secondary Corporate Services
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold">
                Need Enterprise IT Infrastructure, Networking or CCTV?
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                We also deliver corporate structured cabling, Ubiquiti UniFi mesh setups, server deployments, and 24/7 AMC SLA maintenance for offices & institutions.
              </p>
            </div>
          </div>

          <button
            onClick={inquireITWhatsApp}
            className="shrink-0 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-cyan-400 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all relative z-10"
          >
            <i className="fa-solid fa-headset text-cyan-400" />
            <span>Consult IT Engineers</span>
          </button>
        </div>

      </div>
    </section>
  );
}

