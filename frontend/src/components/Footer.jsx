import React from 'react';
import TechlaLogo from './TechlaLogo';

export default function Footer() {
  return (
    <footer className="bg-slate-950 dark:bg-[#03060d] border-t border-slate-800 dark:border-white/10 py-16 text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800 dark:border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-techla-500/20 border border-techla-500/40 flex items-center justify-center text-cyanGlow">
                <TechlaLogo className="w-5 h-5" />
              </div>
              <span className="font-heading font-black text-xl text-white">
                TECH<span className="text-cyanGlow">LA</span> <span className="text-xs font-normal text-slate-400">(PVT) LTD</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              TECHLA (Pvt) Ltd is Sri Lanka's premier emerging technology enterprise, providing end-to-end IT services, enterprise networking, CCTV surveillance, and high-performance custom computer solutions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-techla-500/20 text-slate-300 hover:text-cyanGlow border border-white/10 flex items-center justify-center transition-all">
                <i className="fa-brands fa-facebook-f text-xs" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-techla-500/20 text-slate-300 hover:text-cyanGlow border border-white/10 flex items-center justify-center transition-all">
                <i className="fa-brands fa-instagram text-xs" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-techla-500/20 text-slate-300 hover:text-cyanGlow border border-white/10 flex items-center justify-center transition-all">
                <i className="fa-brands fa-linkedin-in text-xs" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-techla-500/20 text-slate-300 hover:text-cyanGlow border border-white/10 flex items-center justify-center transition-all">
                <i className="fa-brands fa-youtube text-xs" />
              </a>
            </div>
          </div>

          {/* Solutions Links */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider font-tech">IT Solutions</h4>
            <ul className="space-y-2">
              <li><a href="#solutions" className="hover:text-cyanGlow transition-colors">Enterprise Networking</a></li>
              <li><a href="#solutions" className="hover:text-cyanGlow transition-colors">Server Virtualization</a></li>
              <li><a href="#solutions" className="hover:text-cyanGlow transition-colors">Cloud Migrations & M365</a></li>
              <li><a href="#solutions" className="hover:text-cyanGlow transition-colors">CCTV & Biometrics</a></li>
              <li><a href="#solutions" className="hover:text-cyanGlow transition-colors">POS & Custom Software</a></li>
            </ul>
          </div>

          {/* Hardware */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider font-tech">Hardware Hub</h4>
            <ul className="space-y-2">
              <li><a href="#pc-builder" className="hover:text-cyanGlow transition-colors">Custom PC Builder</a></li>
              <li><a href="#hardware" className="hover:text-cyanGlow transition-colors">Graphics Cards (RTX 40 Series)</a></li>
              <li><a href="#hardware" className="hover:text-cyanGlow transition-colors">Intel & Ryzen Processors</a></li>
              <li><a href="#hardware" className="hover:text-cyanGlow transition-colors">DDR5 RAM & Gen4 NVMe</a></li>
              <li><a href="#showroom" className="hover:text-cyanGlow transition-colors">Flagship Showroom</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider font-tech">Quick Support</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-cyanGlow transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-cyanGlow transition-colors">Request a Quote</a></li>
              <li><a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" className="hover:text-cyanGlow transition-colors">Emergency WhatsApp</a></li>
              <li><a href="#contact" className="hover:text-cyanGlow transition-colors">Warranty & RMA Policy</a></li>
              <li><a href="#contact" className="hover:text-cyanGlow transition-colors">Corporate AMC Inquiries</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>&copy; 2026 TECHLA (PVT) LTD. All Rights Reserved. Registered in Sri Lanka.</p>
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>All Systems Operational &bull; High Reliability</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
