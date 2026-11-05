import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [counts, setCounts] = useState({ builds: 0, uptime: 0, clients: 0, warranty: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        builds: Math.floor(progress * 500),
        uptime: (progress * 99.9).toFixed(1),
        clients: Math.floor(progress * 150),
        warranty: Math.floor(progress * 100)
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({ builds: 500, uptime: 99.9, clients: 150, warranty: 100 });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pulsing Live Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-techla-500/10 border border-techla-500/30 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="radar-ring absolute inline-flex h-full w-full rounded-full bg-cyanGlow opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-techla-500 dark:bg-cyanGlow" />
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-techla-600 dark:text-cyanGlow font-tech">
                TECHLA (PVT) LTD &bull; Corporate & Retail IT Leader
              </span>
            </div>

            {/* Shimmering Animated Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] transition-colors">
              Supercharge Your World With{' '}
              <span className="animate-gradient-text text-transparent bg-clip-text bg-gradient-to-r from-techla-600 via-cyan-500 to-techla-400 dark:from-techla-400 dark:via-cyanGlow dark:to-blue-500">
                Elite IT Solutions
              </span>{' '}
              & Cutting-Edge Hardware
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300/90 max-w-2xl font-normal leading-relaxed transition-colors">
              We engineer enterprise-grade IT infrastructure, corporate cloud, cybersecurity, surveillance systems, and high-performance custom computer hardware tailored for Sri Lankan enterprises, professionals & gamers.
            </p>

            {/* CTAs with Shine Sweep Animation */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#solutions"
                className="btn-shine px-7 py-3.5 rounded-xl bg-gradient-to-r from-techla-600 via-techla-500 to-cyan-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-techla-600/30 hover:shadow-[0_0_35px_rgba(0,114,255,0.6)] hover:scale-[1.03] transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-network-wired text-cyan-200" />
                <span>Explore Enterprise Solutions</span>
              </a>
              <a
                href="#hardware"
                className="btn-shine px-7 py-3.5 rounded-xl bg-slate-200/80 hover:bg-slate-300/80 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white border border-slate-300 dark:border-white/15 hover:border-techla-500/50 dark:hover:border-cyanGlow/50 font-semibold text-sm transition-all flex items-center gap-2 backdrop-blur-sm shadow-sm hover:scale-[1.02]"
              >
                <i className="fa-solid fa-microchip text-techla-600 dark:text-cyanGlow" />
                <span>Browse Hardware Store</span>
              </a>
            </div>

            {/* Live Counter Metrics Bar with Smooth Tickers */}
            <div className="pt-8 border-t border-slate-200 dark:border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div className="space-y-0.5">
                <div className="font-tech text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-baseline">
                  <span>{counts.builds}</span><span className="text-techla-500 dark:text-cyanGlow">+</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Custom Rigs Built</div>
              </div>
              <div className="space-y-0.5">
                <div className="font-tech text-2xl sm:text-3xl font-bold text-techla-600 dark:text-cyanGlow tracking-tight flex items-baseline">
                  <span>{counts.uptime}</span><span>%</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">SLA Uptime Target</div>
              </div>
              <div className="space-y-0.5">
                <div className="font-tech text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-baseline">
                  <span>{counts.clients}</span><span className="text-techla-500 dark:text-cyanGlow">+</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Corporate Clients</div>
              </div>
              <div className="space-y-0.5">
                <div className="font-tech text-2xl sm:text-3xl font-bold text-techla-500 dark:text-techla-400 tracking-tight flex items-baseline">
                  <span>{counts.warranty}</span><span>%</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Genuine Warranty</div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual 3D Floating Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none animate-float">
              
              {/* Outer Pulsing Neon Aura */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-techla-500 via-cyanGlow to-blue-600 opacity-25 dark:opacity-45 blur-2xl animate-pulse" />

              {/* Main Panel */}
              <div className="relative rounded-3xl bg-white/95 dark:bg-[#091224]/90 border border-slate-200 dark:border-techla-500/40 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 transition-colors neon-glow">
                
                {/* Node Status with Radar Pulse */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-techla-500/10 dark:bg-techla-500/25 border border-techla-400/40 flex items-center justify-center text-techla-600 dark:text-cyanGlow shadow-inner">
                      <i className="fa-solid fa-server text-lg" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">TECHLA Enterprise Node</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-tech">STATUS: OPERATIONAL 24/7</p>
                    </div>
                  </div>
                  <span className="flex h-3 w-3 relative">
                    <span className="radar-ring absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </div>

                {/* Offerings Highlights with Hover Effects */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-techla-400/60 transition-all flex items-center justify-between group shadow-sm hover:scale-[1.02]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-techla-600 dark:text-cyan-400 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-microchip" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">Custom Extreme Gaming & AI Rig</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Intel i9 14900K &bull; RTX 4090 24GB &bull; Custom Loop</p>
                      </div>
                    </div>
                    <span className="text-xs font-tech text-techla-600 dark:text-cyanGlow group-hover:translate-x-1.5 transition-transform">&rarr;</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-techla-400/60 transition-all flex items-center justify-between group shadow-sm hover:scale-[1.02]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-techla-600 dark:text-cyan-400 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-shield-halved" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">Enterprise Network & Firewall</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Cisco / Fortinet Multi-Branch VPN & QoS</p>
                      </div>
                    </div>
                    <span className="text-xs font-tech text-techla-600 dark:text-cyanGlow group-hover:translate-x-1.5 transition-transform">&rarr;</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-techla-400/60 transition-all flex items-center justify-between group shadow-sm hover:scale-[1.02]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-techla-600 dark:text-cyan-400 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-video" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">AI Surveillance & Access Control</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">4K ColorVu IP CCTV & Biometric Attendance</p>
                      </div>
                    </div>
                    <span className="text-xs font-tech text-techla-600 dark:text-cyanGlow group-hover:translate-x-1.5 transition-transform">&rarr;</span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="btn-shine w-full block py-3 rounded-xl bg-techla-50 dark:bg-techla-600/30 hover:bg-techla-100 dark:hover:bg-techla-600/50 text-techla-700 dark:text-cyanGlow border border-techla-200 dark:border-techla-400/30 text-center text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow"
                >
                  Consult An Engineer Now
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
