import React from 'react';

const SCROLLING_PARTS = [
  {
    name: 'MSI RTX 4070 Ti SUPER 16G',
    cat: 'GPU',
    price: 'LKR 315,000',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'AMD Ryzen 7 7800X3D',
    cat: 'CPU',
    price: 'LKR 165,000',
    tag: 'Best Gaming',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Hikvision 4K ColorVu IP Cam',
    cat: 'CCTV',
    price: 'LKR 18,500',
    tag: 'Surveillance',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Samsung 990 PRO 2TB NVMe',
    cat: 'SSD',
    price: 'LKR 68,000',
    tag: '7450 MB/s',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'ASUS Dual RTX 4060 8GB',
    cat: 'GPU',
    price: 'LKR 132,000',
    tag: 'Top Value',
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Hikvision 8Ch 4K PoE NVR',
    cat: 'CCTV',
    price: 'LKR 36,500',
    tag: 'Plug & Play',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Corsair Vengeance 32GB DDR5',
    cat: 'RAM',
    price: 'LKR 49,500',
    tag: '6000MHz',
    image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'ASUS TUF 27" 2K 180Hz IPS',
    cat: 'Display',
    price: 'LKR 98,500',
    tag: '1ms GTG',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=300&q=80'
  }
];

export default function LivePartsMarquee() {
  // Duplicate for seamless infinite loop
  const displayItems = [...SCROLLING_PARTS, ...SCROLLING_PARTS];

  return (
    <section className="py-6 bg-slate-900/90 dark:bg-[#040814] border-y border-techla-500/20 overflow-hidden relative">
      
      {/* Side Fade Gradients for sleek infinite look */}
      <div className="absolute top-0 left-0 w-24 sm:w-40 h-full bg-gradient-to-r from-slate-900 dark:from-[#040814] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 sm:w-40 h-full bg-gradient-to-l from-slate-900 dark:from-[#040814] to-transparent z-10 pointer-events-none" />

      {/* Top micro header */}
      <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-tech font-bold uppercase tracking-widest text-cyan-400">
            Live Hardware & CCTV Sourcing Feed
          </span>
        </div>
        <span className="text-[10px] text-slate-400 hidden sm:inline">
          Hover to pause ticker • Click any part to inquire
        </span>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex items-center gap-4 py-1">
          {displayItems.map((item, idx) => (
            <a
              key={idx}
              href={`https://wa.me/94771234567?text=Hello%20TECHLA!%20I%20saw%20${encodeURIComponent(item.name)}%20on%20your%20live%20feed.%20Can%20you%20confirm%20current%20price%20and%20stock?`}
              target="_blank"
              rel="noreferrer"
              className="group shrink-0 flex items-center gap-3.5 px-4 py-2.5 rounded-2xl bg-white/5 hover:bg-techla-500/20 border border-white/10 hover:border-cyan-400/60 backdrop-blur-md transition-all shadow-md cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-xl object-cover border border-white/10 group-hover:scale-110 transition-transform"
              />
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold font-tech uppercase px-1.5 py-0.2 rounded bg-techla-500/20 text-cyan-300 border border-techla-500/30">
                    {item.cat}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-400">
                    {item.tag}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors max-w-[180px] truncate mt-0.5">
                  {item.name}
                </h5>
                <span className="text-xs font-extrabold font-tech text-cyan-400 block">
                  {item.price}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

