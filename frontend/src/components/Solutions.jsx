import React, { useState, useEffect } from 'react';

const SOLUTIONS = [
  {
    id: 'networking',
    icon: 'fa-network-wired',
    badge: 'High-Bandwidth Infrastructure',
    title: 'Enterprise Structured Networking & Mesh Wi-Fi',
    tagline: 'Zero-deadzone, high-speed connectivity engineered for modern offices, multi-floor buildings & warehouses.',
    desc: 'We design and deploy industrial Cat6/Cat6A structured cabling, server rack cable trays, 10GbE fiber trunking, and high-density Ubiquiti UniFi & Cisco access points capable of supporting 500+ concurrent devices without lag.',
    deliverables: [
      'Ubiquiti UniFi & Cisco Meraki Mesh Wi-Fi 6E/7 Deployments',
      'Structured Cat6A Copper & 10G OM4 Fiber Optic Backbone',
      'VLAN Network Segmentation for Guest, Staff & Security Cameras',
      'Multi-WAN Dual-ISP Auto Failover (Zero Internet Downtime)'
    ],
    brands: ['Ubiquiti UniFi', 'Cisco', 'MikroTik', 'Schneider / APC', 'D-Link'],
    bestFor: 'Corporate Offices, Factories, Hotels, Schools & Co-Working Spaces'
  },
  {
    id: 'cloud-servers',
    icon: 'fa-server',
    badge: 'Mission-Critical Reliability',
    title: 'Hybrid Cloud, VMware & Dedicated Server Deployments',
    tagline: 'Robust on-premise Dell & HP server clusters seamlessly integrated with Microsoft 365, AWS & Azure.',
    desc: 'From deploying centralized Active Directory domain controllers and centralized file storage with granular permission access to virtualization clusters with VMware ESXi and Microsoft Hyper-V, TECHLA ensures your critical data is fast, organized, and resilient.',
    deliverables: [
      'Dell PowerEdge & HPE ProLiant Rack Server Custom Deployment',
      'Windows Server 2022/2025 Active Directory & Domain Security',
      'Microsoft 365 / Google Workspace Migration with Zero Email Loss',
      'Local NAS Arrays with Automated Sync to Cloud Object Storage'
    ],
    brands: ['Dell Technologies', 'HPE', 'VMware', 'Microsoft 365', 'Synology'],
    bestFor: 'Financial Firms, Legal Practices, Importers & Multi-Branch Enterprises'
  },
  {
    id: 'security-firewall',
    icon: 'fa-shield-halved',
    badge: 'Zero-Trust Defense',
    title: 'Next-Gen Cybersecurity, Firewalls & Ransomware Defense',
    tagline: 'Protect your enterprise from data breaches, ransomware, malicious intrusions and unauthorized data leaks.',
    desc: 'Deploy state-of-the-art Fortinet FortiGate and Sophos XGS Next-Gen Hardware Firewalls. We configure deep packet inspection, web content filtering, secure branch-to-branch site VPN tunnels, and automated immutable off-site backups.',
    deliverables: [
      'Fortinet & Sophos Hardware Next-Gen Firewall Configuration',
      'Site-to-Site Encrypted IPsec VPN for Multi-Branch Interconnection',
      'Air-Gapped Immutable Cloud Backup (100% Ransomware Proof)',
      'Employee Web Filtering, Bandwidth Throttling & Threat Protection'
    ],
    brands: ['Fortinet FortiGate', 'Sophos XGS', 'Bitdefender GravityZone', 'Veeam'],
    bestFor: 'Corporations Handling Sensitive Financial, Client & ERP Data'
  },
  {
    id: 'surveillance',
    icon: 'fa-video',
    badge: 'Smart AI Vision',
    title: 'AI 4K CCTV Surveillance & Biometric Access Systems',
    tagline: '24/7 intelligent perimeter protection, night color vision, and seamless employee attendance automation.',
    desc: 'High-definition 4K IP camera arrays with AI human and vehicle detection, full-color night vision, centralized Network Video Recorders (NVR) with long-term RAID storage, and biometric facial recognition / fingerprint door access controls.',
    deliverables: [
      'Hikvision ColorVu & Dahua Full-Color 24/7 Night Vision IP Cameras',
      'AI Smart Perimeter Alarm (Instant Phone Alerts on Intrusion)',
      'Biometric Fingerprint & AI Facial Recognition Access Turnstiles',
      'Centralized NVR Video Wall & Remote Real-Time Mobile App Access'
    ],
    brands: ['Hikvision ColorVu', 'Dahua Technology', 'ZKTeco', 'Seagate SkyHawk'],
    bestFor: 'Commercial Properties, Retail Stores, Luxury Homes & Factories'
  },
  {
    id: 'software-pos',
    icon: 'fa-code',
    badge: 'Tailored Business Logic',
    title: 'Custom ERP, POS, Billing & Corporate Web Systems',
    tagline: 'Stop struggling with off-the-shelf software. Get custom software built around your exact business workflow.',
    desc: 'Custom high-speed inventory tracking systems, point-of-sale (POS) systems for retail & wholesale, billing automation, supply-chain dashboards, and responsive corporate web portals designed to streamline your day-to-day operations.',
    deliverables: [
      'Custom Point of Sale (POS) with Barcode & Thermal Invoice Printing',
      'Multi-Warehouse Inventory Control with Low-Stock Alerts',
      'Modern High-Performance Corporate Websites & Client Portals',
      'Full Database Backups, Cloud Hosting & Dedicated SLA Maintenance'
    ],
    brands: ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind', 'Cloudflare'],
    bestFor: 'Retail Chains, Wholesale Distributors, E-Commerce & Service Providers'
  },
  {
    id: 'amc-sla',
    icon: 'fa-handshake-angle',
    badge: 'Guaranteed 2-Hour SLA',
    title: 'Corporate IT AMC (Annual Maintenance Contracts)',
    tagline: 'Your dedicated outsourced IT department. 24/7 emergency response, routine preventive health audits & zero downtime.',
    desc: 'Never let computer breakdowns or printer network errors stop your business. TECHLA provides comprehensive Annual Maintenance Contracts with scheduled on-site physical cleanups, remote helpdesk support, and standby emergency replacement hardware.',
    deliverables: [
      'Guaranteed 2-Hour Emergency Response On-Site SLA in Colombo',
      'Monthly Scheduled Preventive Hardware & Thermal Maintenance',
      'Unlimited Remote Helpdesk Phone & AnyDesk Support for Staff',
      'Free Standby Loaner Hardware During Warranty Repairs'
    ],
    brands: ['Certified CCNA', 'Microsoft Certified', 'CompTIA A+', 'ITIL Aligned'],
    bestFor: 'Businesses with 10 to 200+ Workstations Seeking Zero IT Headaches'
  }
];

export default function Solutions() {
  const [selectedSolution, setSelectedSolution] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedSolution) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedSolution]);

  const inquireSolutionWhatsApp = (title) => {
    const msg = `Hello TECHLA (Pvt) Ltd! 🚀%0AI would like to consult with an IT Systems Engineer regarding your solution:* ${encodeURIComponent(title)} * for our company.%0APlease share available meeting times or proposal details.`;
    window.open(`https://wa.me/94771234567?text=${msg}`, '_blank');
  };

  return (
    <section id="solutions" className="py-24 scroll-mt-24 relative bg-slate-100/70 dark:bg-[#070d1d]/80 border-t border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-techla-500/10 border border-techla-500/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-techla-500 dark:bg-cyanGlow animate-ping" />
            <span className="text-xs font-bold font-tech uppercase tracking-widest text-techla-600 dark:text-cyanGlow">
              Enterprise IT Infrastructure & SLA Support
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white transition-colors leading-tight">
            Engineered for <span className="animate-gradient-text text-transparent bg-clip-text bg-gradient-to-r from-techla-600 via-cyan-500 to-techla-400 dark:from-techla-400 dark:via-cyanGlow dark:to-blue-500">Unstoppable Performance</span> & Bulletproof Reliability
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            From single-office startups to multi-branch enterprises, TECHLA (Pvt) Ltd is Sri Lanka’s premier turnkey technology partner. We architect, implement, and maintain the mission-critical systems that power your growth.
          </p>
        </div>

        {/* Corporate Trust Highlights Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1630] border border-slate-200 dark:border-techla-500/20 shadow-sm flex items-center gap-3.5 card-hover-fx">
            <div className="w-10 h-10 rounded-xl bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0 text-lg transition-transform hover:rotate-12">
              <i className="fa-solid fa-clock" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">2-Hour Rapid SLA</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Guaranteed on-site engineer</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1630] border border-slate-200 dark:border-techla-500/20 shadow-sm flex items-center gap-3.5 card-hover-fx">
            <div className="w-10 h-10 rounded-xl bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0 text-lg transition-transform hover:rotate-12">
              <i className="fa-solid fa-shield-halved" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">100% Zero Data Loss</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Air-gapped cloud snapshots</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1630] border border-slate-200 dark:border-techla-500/20 shadow-sm flex items-center gap-3.5 card-hover-fx">
            <div className="w-10 h-10 rounded-xl bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0 text-lg transition-transform hover:rotate-12">
              <i className="fa-solid fa-user-check" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Certified Engineers</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Cisco, Microsoft, CompTIA</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1630] border border-slate-200 dark:border-techla-500/20 shadow-sm flex items-center gap-3.5 card-hover-fx">
            <div className="w-10 h-10 rounded-xl bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0 text-lg transition-transform hover:rotate-12">
              <i className="fa-solid fa-receipt" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">Formal Tax Invoicing</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">SVAT / VAT Registered Pvt Ltd</p>
            </div>
          </div>
        </div>

        {/* 6 Flagship IT Solutions Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {SOLUTIONS.map((s) => (
            <div
              key={s.id}
              className="card-hover-fx group p-8 rounded-3xl bg-white dark:bg-[#0b1429] border border-slate-200/90 dark:border-white/5 hover:border-techla-500/60 shadow-md hover:shadow-2xl dark:shadow-none hover:shadow-techla-500/20 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-techla-500/15 to-cyan-500/15 dark:from-techla-500/25 dark:to-cyan-500/25 border border-techla-500/30 flex items-center justify-center text-techla-600 dark:text-cyanGlow text-2xl group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300">
                    <i className={`fa-solid ${s.icon}`} />
                  </div>
                  <span className="text-[10px] font-bold font-tech uppercase tracking-wider px-2.5 py-1 rounded-full bg-techla-500/10 text-techla-600 dark:text-cyanGlow border border-techla-500/20 group-hover:border-techla-500/40 transition-colors">
                    {s.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white group-hover:text-techla-600 dark:group-hover:text-cyanGlow transition-colors leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs font-medium text-techla-600 dark:text-cyanGlow/90 mt-1">
                    {s.tagline}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mt-3 line-clamp-3">
                    {s.desc}
                  </p>
                </div>

                {/* Key Deliverables Bullet Points */}
                <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                  {s.deliverables.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 group-hover:translate-x-1 transition-transform duration-300">
                      <i className="fa-solid fa-circle-check text-techla-500 text-[11px] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 dark:border-white/5 mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedSolution(s)}
                  className="text-xs font-bold text-slate-800 dark:text-white hover:text-techla-600 dark:hover:text-cyanGlow transition-all flex items-center gap-1.5 group-hover:translate-x-1"
                >
                  <span>View Full Scope</span>
                  <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => inquireSolutionWhatsApp(s.title)}
                  className="btn-shine px-3.5 py-2 rounded-xl bg-techla-500/10 hover:bg-techla-500 text-techla-600 dark:text-cyanGlow hover:text-white border border-techla-500/30 transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <i className="fa-brands fa-whatsapp text-sm" />
                  <span>Inquire Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Free Audit Card */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0d1d42] via-[#081533] to-[#040c1e] text-white border border-techla-500/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden card-hover-fx">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-techla-500/25 rounded-full blur-3xl animate-float pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold font-tech uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                100% Free Corporate IT Consultation & Audit
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Is Your Business Network Safe from Ransomware & Slowdowns?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Book a <strong className="text-white font-bold">Complimentary On-Site IT Health Assessment</strong>. Our certified Systems Engineer will audit your office network, server security, Wi-Fi coverage, and data backup policies — delivering a comprehensive report with zero obligations.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-cyanGlow font-tech font-semibold">
                <span>&bull; In-Depth Wi-Fi Heatmap</span>
                <span>&bull; Firewall & Vulnerability Scan</span>
                <span>&bull; Backup Recovery Verification</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => {
                  const msg = 'Hello TECHLA (Pvt) Ltd! 🏢%0AI would like to claim the *Free Corporate IT Infrastructure & Network Audit* for our office.%0APlease let me know the engineer availability.';
                  window.open(`https://wa.me/94771234567?text=${msg}`, '_blank');
                }}
                className="btn-shine w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm tracking-wide shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <i className="fa-brands fa-whatsapp text-lg" />
                <span>Claim Free IT Audit</span>
              </button>

              <a
                href="#contact"
                className="btn-shine w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-center text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
              >
                Request Proposal / RFP
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Solution Scope Modal - Fixed z-[100] and viewport spacing */}
      {selectedSolution && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          
          <div className="fixed inset-0 -z-10" onClick={() => setSelectedSolution(null)} />

          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0b1429] border border-slate-200 dark:border-techla-500/40 p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto my-auto">
            
            <button
              onClick={() => setSelectedSolution(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shadow-md hover:rotate-90 duration-300"
              title="Close Dialog"
            >
              <i className="fa-solid fa-xmark text-base" />
            </button>

            <div className="space-y-6 pt-2">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center text-2xl shrink-0">
                  <i className={`fa-solid ${selectedSolution.icon}`} />
                </div>
                <div>
                  <span className="text-[11px] font-bold font-tech text-techla-600 dark:text-cyanGlow uppercase tracking-widest">
                    {selectedSolution.badge}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedSolution.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedSolution.desc}
              </p>

              <div>
                <h4 className="text-xs font-bold font-tech text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  Comprehensive Project Scope & Deliverables:
                </h4>
                <div className="space-y-2.5">
                  {selectedSolution.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-xs text-slate-800 dark:text-slate-200">
                      <i className="fa-solid fa-check text-emerald-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-tech">AUTHORIZED HARDWARE STACK:</span>
                  <p className="text-xs font-bold text-slate-800 dark:text-white mt-1">
                    {selectedSolution.brands.join(', ')}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-tech">RECOMMENDED FOR:</span>
                  <p className="text-xs font-bold text-slate-800 dark:text-white mt-1">
                    {selectedSolution.bestFor}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    inquireSolutionWhatsApp(selectedSolution.title);
                    setSelectedSolution(null);
                  }}
                  className="btn-shine w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <i className="fa-brands fa-whatsapp text-base" />
                  <span>Consult An Engineer On WhatsApp</span>
                </button>
                <button
                  onClick={() => setSelectedSolution(null)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
