import React, { useState } from 'react';

export default function CustomSourcingSection() {
  const [partName, setPartName] = useState('');
  const [targetBudget, setTargetBudget] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const submitInquiry = (e) => {
    e.preventDefault();
    if (!partName) return;

    const msg = `*🔍 CUSTOM PART SOURCING INQUIRY - TECHLA*%0A-------------------------------------%0A` +
      `*Item / Model Required:* ${encodeURIComponent(partName)}%0A` +
      `*Target Budget:* ${encodeURIComponent(targetBudget || 'Best Market Rate')}%0A` +
      `*Client Contact:* ${encodeURIComponent(contactNumber || 'Via WhatsApp')}%0A%0A` +
      `Please check current distributor stock, best pricing, and warranty options for this item.`;

    window.open(`https://wa.me/94771234567?text=${msg}`, '_blank');
  };

  return (
    <section id="custom-order" className="py-14 bg-gradient-to-r from-blue-900 via-techla-900 to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold font-tech uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-white/10 border border-white/15">
              Don't See What You Need?
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold leading-tight">
              Looking for a Specific Computer Part or CCTV System?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Since we operate on a direct buying & selling model with all major Sri Lankan authorized distributors, we can source virtually <strong>any GPU, CPU, motherboard, RAM, or CCTV camera kit</strong> for you at the most competitive price within 24 hours.
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-check text-cyan-400" /> No Old Stock Markups
              </span>
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-check text-cyan-400" /> Fresh Agent Barcode Warranty
              </span>
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-check text-cyan-400" /> Island-wide Express Delivery
              </span>
            </div>
          </div>

          {/* Quick Request Form */}
          <div className="lg:col-span-6">
            <form
              onSubmit={submitInquiry}
              className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 space-y-4 shadow-2xl"
            >
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <i className="fa-solid fa-paper-plane text-cyan-400 text-sm" /> Request Price & Availability
              </h3>

              <div>
                <label className="text-[11px] text-slate-300 block mb-1">
                  Part Name / Model / CCTV Specs *
                </label>
                <input
                  type="text"
                  required
                  value={partName}
                  onChange={(e) => setPartName(e.target.value)}
                  placeholder="e.g. RTX 4060 Ti 16GB, or 4-Cam Hikvision ColorVu Setup..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">
                    Target Budget (Optional)
                  </label>
                  <input
                    type="text"
                    value={targetBudget}
                    onChange={(e) => setTargetBudget(e.target.value)}
                    placeholder="e.g. LKR 150,000"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-300 block mb-1">
                    Your Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="07X XXX XXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-techla-500 hover:from-cyan-600 hover:to-techla-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <i className="fa-brands fa-whatsapp text-sm" />
                <span>Get Instant Price Quote on WhatsApp</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

