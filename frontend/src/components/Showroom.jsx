import React, { useState } from 'react';

const SHOWROOM_GALLERY = [
  {
    title: 'Flagship Custom Rig Battlestation Zone',
    category: 'Hands-On Demo Station',
    desc: 'Test 4K 240Hz ray tracing performance on our Intel i9 14900K & RTX 4090 liquid-cooled showcase rigs before you buy.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    tag: 'Live Testing'
  },
  {
    title: 'Authorized Component & Hardware Vault',
    category: 'Retail & Wholesale Display',
    desc: 'Browse 100% genuine sealed boxed stock of ASUS ROG, MSI, Corsair, Gigabyte, and Samsung components with authorized agent serials.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    tag: 'Genuine Stock'
  },
  {
    title: 'Enterprise Server & Network Lab',
    category: 'Corporate Infrastructure Node',
    desc: 'Live operating demo racks with Ubiquiti UniFi 10GbE switches, Cisco routers, multi-camera 4K AI video wall, and biometric access controls.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    tag: 'Enterprise Demo'
  },
  {
    title: 'Precision Assembly & Diagnostic Lab',
    category: 'Engineering & Stress Testing',
    desc: 'Watch our certified hardware engineers craft stealth cable-sleeved custom builds and execute 24-hour OCCT thermal stability tests.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    tag: 'Pro Cleanroom'
  }
];

export default function Showroom() {
  const [activeTab, setActiveTab] = useState(0);

  const bookVisitWhatsApp = () => {
    const message = 'Hello TECHLA (Pvt) Ltd! 🏬%0AI would like to book a visit to your Showroom / Experience Centre for a custom PC & IT consultation.';
    window.open(`https://wa.me/94771234567?text=${message}`, '_blank');
  };

  return (
    <section id="showroom" className="py-24 scroll-mt-24 relative bg-slate-50 dark:bg-[#050813] overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-techla-500/10 border border-techla-500/30 backdrop-blur-md">
            <i className="fa-solid fa-store text-techla-600 dark:text-cyanGlow text-xs" />
            <span className="text-xs font-bold font-tech uppercase tracking-widest text-techla-600 dark:text-cyanGlow">
              Flagship Experience Centre
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white transition-colors">
            Step Inside the{' '}
            <span className="animate-gradient-text text-transparent bg-clip-text bg-gradient-to-r from-techla-600 via-cyan-500 to-techla-400 dark:from-techla-400 dark:via-cyanGlow dark:to-blue-500">
              TECHLA Showroom
            </span>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Sri Lanka’s most advanced physical tech showroom. Experience hands-on custom gaming rigs, test enterprise networking equipment, and consult one-on-one with certified system architects.
          </p>
        </div>

        {/* Featured Interactive Visual Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Main Large Image Stage */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-techla-500/30 shadow-xl dark:shadow-[0_15px_50px_rgba(0,114,255,0.25)] group aspect-video sm:aspect-[16/10]">
              <img
                src={SHOWROOM_GALLERY[activeTab].image}
                alt={SHOWROOM_GALLERY[activeTab].title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <div className="absolute top-5 left-5">
                <span className="px-3 py-1 rounded-full text-xs font-bold font-tech bg-techla-500/90 text-white backdrop-blur-md border border-white/20 shadow-lg">
                  {SHOWROOM_GALLERY[activeTab].tag}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-2 text-white">
                <span className="text-xs font-tech text-cyanGlow uppercase tracking-wider font-semibold">
                  {SHOWROOM_GALLERY[activeTab].category}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                  {SHOWROOM_GALLERY[activeTab].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 max-w-2xl line-clamp-2">
                  {SHOWROOM_GALLERY[activeTab].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Thumbnail Selector Right */}
          <div className="lg:col-span-4 space-y-3.5">
            <span className="block text-xs font-bold font-tech uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Select Experience Zone:
            </span>
            {SHOWROOM_GALLERY.map((item, index) => (
              <div
                key={index}
                onClick={() => setActiveTab(index)}
                className={`card-hover-fx p-4 rounded-2xl cursor-pointer transition-all border ${
                  activeTab === index
                    ? 'bg-techla-500/10 dark:bg-techla-500/20 border-techla-500 dark:border-cyanGlow/60 shadow-md dark:shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                    : 'bg-white dark:bg-[#091224]/80 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 shadow-sm dark:shadow-none'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-white/10">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <h4 className={`text-xs sm:text-sm font-bold ${activeTab === index ? 'text-techla-600 dark:text-cyanGlow' : 'text-slate-900 dark:text-white'}`}>
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Showroom Perks & Location Information Bar */}
        <div className="rounded-3xl bg-white dark:bg-gradient-to-r dark:from-[#0a1329] dark:via-[#0d1c3d] dark:to-[#0a1329] border border-slate-200 dark:border-techla-500/30 p-8 shadow-xl dark:shadow-2xl transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-slate-100 dark:border-white/10">
            
            <div className="flex items-start gap-4 card-hover-fx">
              <div className="w-12 h-12 rounded-2xl bg-techla-500/10 dark:bg-techla-500/20 border border-techla-500/30 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0 text-xl transition-transform hover:rotate-12">
                <i className="fa-solid fa-map-location-dot" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">Prime Showroom</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Galle Road, Colombo 03, Sri Lanka</p>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-tech font-semibold">Ample Customer Parking</span>
              </div>
            </div>

            <div className="flex items-start gap-4 card-hover-fx">
              <div className="w-12 h-12 rounded-2xl bg-techla-500/10 dark:bg-techla-500/20 border border-techla-500/30 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0 text-xl transition-transform hover:rotate-12">
                <i className="fa-solid fa-clock" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">Visiting Hours</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Monday – Saturday: 9:00 AM – 7:30 PM</p>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-tech">Sunday: On Prior Appointment</span>
              </div>
            </div>

            <div className="flex items-start gap-4 card-hover-fx">
              <div className="w-12 h-12 rounded-2xl bg-techla-500/10 dark:bg-techla-500/20 border border-techla-500/30 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0 text-xl transition-transform hover:rotate-12">
                <i className="fa-solid fa-gamepad" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">Live Hands-on Demos</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">Test Cyberpunk, Blender 3D & 4K video editing</p>
                <span className="text-[11px] text-techla-600 dark:text-cyanGlow font-tech font-semibold">Try Before You Buy</span>
              </div>
            </div>

            <div className="flex items-start gap-4 card-hover-fx">
              <div className="w-12 h-12 rounded-2xl bg-techla-500/10 dark:bg-techla-500/20 border border-techla-500/30 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0 text-xl transition-transform hover:rotate-12">
                <i className="fa-solid fa-credit-card" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">Easy Payment Plans</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">0% Card Installments up to 36 Months</p>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-tech">Corporate PO & Cheques Accepted</span>
              </div>
            </div>

          </div>

          {/* Showroom CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="radar-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Showroom is currently <strong className="text-emerald-600 dark:text-emerald-400 font-bold">OPEN TODAY</strong> for walk-in visitors & consultations.
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={bookVisitWhatsApp}
                className="btn-shine w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]"
              >
                <i className="fa-brands fa-whatsapp text-sm" />
                <span>Book In-Store Consultation</span>
              </button>

              <a
                href="https://maps.google.com/?q=Colombo+Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 text-xs font-semibold transition-all text-center flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <i className="fa-solid fa-location-arrow text-techla-600 dark:text-cyanGlow text-xs" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
