import React, { useState } from 'react';

const DIGITAL_SERVICES = [
  {
    id: 'web-dev',
    title: 'Website & Web Application Development',
    desc: 'High-speed business websites, e-commerce stores, and custom web portals built with React, Next.js, and modern tech.',
    icon: 'fa-code',
    tag: 'Popular'
  },
  {
    id: 'pos-systems',
    title: 'Custom POS & Inventory Software',
    desc: 'Smart point-of-sale systems for retail shops, restaurants & supermarkets with barcode billing, stock alerts & sales reports.',
    icon: 'fa-cash-register',
    tag: 'Business'
  },
  {
    id: 'app-dev',
    title: 'Mobile App Development (Android & iOS)',
    desc: 'Custom cross-platform smartphone apps with clean UI/UX, user authentication, online payments, and push notifications.',
    icon: 'fa-mobile-screen-button',
    tag: 'Custom'
  },
  {
    id: 'media-editing',
    title: 'Photo & Video Editing / Production',
    desc: 'High-end commercial video reels, TikTok/Shorts promos, product photography retouching, and branded YouTube content.',
    icon: 'fa-photo-film',
    tag: 'Creative'
  },
  {
    id: 'marketing',
    title: 'Social Media Marketing & Meta Ads',
    desc: 'Targeted Facebook, Instagram & TikTok advertising campaigns, content calendars, graphic posters, and lead generation.',
    icon: 'fa-bullhorn',
    tag: 'Growth'
  },
  {
    id: 'cctv-networking',
    title: 'CCTV Setup & Office Networking',
    desc: 'Complete IP camera security systems, mesh Wi-Fi setups, and router configurations for homes and workplaces.',
    icon: 'fa-network-wired',
    tag: 'Security'
  }
];

export default function SolutionsBanner() {
  const [selectedService, setSelectedService] = useState(null);

  const requestServiceQuote = (serviceTitle) => {
    const msg = `Hello TECHLA! 🚀%0AI would like to get a quotation and details for:* ${encodeURIComponent(serviceTitle)} * for my business.`;
    window.open(`https://wa.me/94771234567?text=${msg}`, '_blank');
  };

  return (
    <section id="solutions-banner" className="py-16 bg-slate-100/70 dark:bg-[#060c1d] border-t border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-techla-500/10 text-techla-600 dark:text-cyanGlow text-xs font-bold font-tech uppercase tracking-wider">
            <i className="fa-solid fa-laptop-code" /> Digital & IT Solutions
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Software Development & Creative Agency Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Beyond computer hardware, TECHLA delivers end-to-end digital solutions to build, automate, and market your business online.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIGITAL_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#071126] border border-slate-200 dark:border-white/5 hover:border-techla-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    <i className={`fa-solid ${srv.icon}`} />
                  </div>
                  <span className="text-[10px] font-bold font-tech uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                    {srv.tag}
                  </span>
                </div>

                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white group-hover:text-techla-600 dark:group-hover:text-cyanGlow transition-colors mb-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <i className="fa-solid fa-circle-check text-[9px]" /> Available for Projects
                </span>
                <button
                  onClick={() => requestServiceQuote(srv.title)}
                  className="px-3.5 py-1.5 rounded-xl bg-techla-500/10 hover:bg-techla-500 text-techla-600 hover:text-white dark:text-cyanGlow dark:hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <span>Get Quote</span>
                  <i className="fa-brands fa-whatsapp text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Consultation Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-techla-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-cyan-300 text-lg shrink-0">
              <i className="fa-solid fa-lightbulb" />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold">Have a Custom Project or Startup Idea?</h4>
              <p className="text-xs text-slate-300">Talk directly with our development & marketing team for a free consultation and project roadmap.</p>
            </div>
          </div>
          <button
            onClick={() => requestServiceQuote('Custom IT & Marketing Consultation')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20"
          >
            <i className="fa-brands fa-whatsapp text-sm" />
            <span>Chat with Tech Lead</span>
          </button>
        </div>

      </div>
    </section>
  );
}
