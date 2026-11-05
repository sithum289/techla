import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Custom High-End PC Build',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const fullMsg = `*New Inquiry for TECHLA (Pvt) Ltd*%0A%0A` +
      `*Client Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Company:* ${encodeURIComponent(formData.company || 'Individual')}%0A` +
      `*Mobile:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Email:* ${encodeURIComponent(formData.email)}%0A` +
      `*Required Solution:* ${encodeURIComponent(formData.service)}%0A` +
      `*Details:* ${encodeURIComponent(formData.message || 'Requesting quotation and consultation')}`;

    setTimeout(() => {
      window.open(`https://wa.me/94771234567?text=${fullMsg}`, '_blank');
    }, 600);
  };

  return (
    <section id="contact" className="py-24 scroll-mt-24 relative bg-slate-50 dark:bg-[#070c18] border-t border-slate-200 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Details */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold font-tech uppercase tracking-widest text-techla-600 dark:text-cyanGlow px-3 py-1 rounded-full bg-techla-500/10 border border-techla-500/20">
              Get In Touch
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white transition-colors">
              Let's Engineer Your Next{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-techla-600 to-techla-400 dark:from-techla-400 dark:to-cyanGlow">
                Tech Project
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Have a requirement for corporate networking, computer parts wholesale, custom workstation builds or software development? Reach out to our specialized team today.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#0b1429] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                <div className="w-12 h-12 rounded-xl bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0 text-lg">
                  <i className="fa-solid fa-location-dot" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-tech">HEAD OFFICE & SHOWROOM</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">TECHLA (PVT) LTD, Galle Rd, Colombo 03</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#0b1429] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                <div className="w-12 h-12 rounded-xl bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0 text-lg">
                  <i className="fa-solid fa-phone-volume" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-tech">DIRECT HOTLINE</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">+94 77 123 4567 / +94 11 234 5678</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-[#0b1429] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                <div className="w-12 h-12 rounded-xl bg-techla-500/10 dark:bg-techla-500/20 text-techla-600 dark:text-cyanGlow flex items-center justify-center shrink-0 text-lg">
                  <i className="fa-solid fa-envelope" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-tech">OFFICIAL EMAIL</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">info@techla.lk / sales@techla.lk</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-white to-emerald-500/10 dark:from-emerald-950/40 dark:to-[#0b1429] border border-emerald-500/30 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <i className="fa-brands fa-whatsapp text-3xl text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Instant WhatsApp Response</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Average response time: &lt; 5 minutes</p>
                </div>
              </div>
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-sm"
              >
                Chat Now
              </a>
            </div>
          </div>

          {/* Form Right */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white dark:bg-[#0b1429] border border-slate-200 dark:border-techla-500/30 p-8 shadow-xl dark:shadow-2xl relative transition-colors">
              <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2">Request an Official Proposal / Quotation</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Fill in your requirements below and our technical sales team will reply within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kasun Perera"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#060c1c] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-techla-500 dark:focus:border-cyanGlow transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Company / Organization</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Lanka (Pvt) Ltd"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#060c1c] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-techla-500 dark:focus:border-cyanGlow transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="kasun@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#060c1c] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-techla-500 dark:focus:border-cyanGlow transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="077 123 4567"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#060c1c] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-techla-500 dark:focus:border-cyanGlow transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Service Category Required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#060c1c] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-techla-500 dark:focus:border-cyanGlow transition-colors"
                  >
                    <option value="Custom High-End PC Build">Custom High-End PC / Workstation Build</option>
                    <option value="Enterprise Networking & Wi-Fi Setup">Enterprise Networking & Wi-Fi Infrastructure</option>
                    <option value="Computer Parts & Hardware Procurement">Computer Hardware & Parts Procurement</option>
                    <option value="CCTV & Smart Biometric Surveillance">CCTV & Smart Biometric Surveillance</option>
                    <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC) for Office</option>
                    <option value="Custom Software / POS / Web Solution">Custom Software / POS / Web Solution</option>
                    <option value="Diagnostic / Chip Level Motherboard Repair">Diagnostic / Chip Level Motherboard Repair</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Project Details & Specifications</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your requirements, timeline, or requested hardware specs..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#060c1c] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-techla-500 dark:focus:border-cyanGlow transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-techla-600 via-techla-500 to-cyan-500 hover:from-techla-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-techla-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-paper-plane text-xs" />
                  <span>Submit Inquiry via WhatsApp / Email</span>
                </button>
              </form>

              {submitted && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-3">
                  <i className="fa-solid fa-circle-check text-base" />
                  <span>Thank you! Inquiry prepared. Opening WhatsApp to connect with TECHLA sales...</span>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
