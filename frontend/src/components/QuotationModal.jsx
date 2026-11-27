import React, { useState } from 'react';

export default function QuotationModal({ isOpen, onClose, items, totalAmount }) {
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  if (!isOpen) return null;

  const quoteNumber = `QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const validUntil = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* INDEPENDENT VIEWPORT-FIXED CLOSE BUTTON (Always visible at top-right of screen) */}
      <button
        onClick={onClose}
        aria-label="Close Quotation"
        className="fixed top-3 right-3 sm:top-5 sm:right-6 z-[450] px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-2xl ring-4 ring-black/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-white/20 print:hidden"
      >
        <i className="fa-solid fa-xmark text-base" />
        <span>CLOSE (✕)</span>
      </button>

      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-3xl shadow-2xl z-10 my-auto overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Controls Bar (Not Printed) */}
        <div className="print:hidden px-4 sm:px-6 py-3 bg-slate-900 text-white flex items-center justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-file-invoice text-cyan-400" />
            <span className="font-heading font-bold text-xs uppercase tracking-wider">
              TECHLA Official Quotation Generator
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isGenerated && (
              <button
                onClick={handlePrint}
                className="px-3 sm:px-4 py-1.5 rounded-xl bg-techla-600 hover:bg-techla-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <i className="fa-solid fa-print text-sm" />
                <span className="hidden sm:inline">Print / Save as PDF</span>
                <span className="sm:hidden">Print</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-xmark" />
              <span>Dismiss</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 font-sans">
          
          {/* STEP 1: Customer Details Input (if not generated) */}
          {!isGenerated ? (
            <div className="max-w-xl mx-auto space-y-5 py-4">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-techla-50 text-techla-600 flex items-center justify-center text-xl mb-2">
                  <i className="fa-solid fa-file-contract" />
                </div>
                <h3 className="font-heading font-black text-2xl text-slate-900">
                  Generate Formal Quotation
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your personal or company details to generate an official quotation document for office approvals, loans, or POs.
                </p>
              </div>

              {/* Items Preview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <span className="font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Quotation Items ({items?.length || 0}):
                </span>
                {items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between font-semibold">
                    <span className="truncate pr-2">{item.quantity || item.qty || 1}x {item.title || item.name}</span>
                    <span className="font-tech shrink-0 font-bold">LKR {Number(item.price * (item.quantity || item.qty || 1)).toLocaleString()}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-sm text-techla-700">
                  <span>Grand Total</span>
                  <span className="font-tech">LKR {Number(totalAmount).toLocaleString()}</span>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setIsGenerated(true); }} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Attn / Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. Kasun Perera"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:border-techla-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Company / Organization (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Commercial Bank / ABC Pvt Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:border-techla-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Contact Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0771234567"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:border-techla-600"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="info@company.lk"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:border-techla-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">Delivery / Office Address</label>
                  <textarea
                    rows={2}
                    placeholder="No, Street, City"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:outline-none focus:border-techla-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-techla-600 hover:bg-techla-700 text-white font-bold text-sm shadow-lg shadow-techla-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-file-pdf" />
                  <span>Generate Official Quotation Document</span>
                </button>
              </form>
            </div>
          ) : (
            /* STEP 2: FORMAL OFFICIAL PRINTABLE QUOTATION SHEET */
            <div id="printable-quotation" className="space-y-6">
              
              {/* Header Letterhead */}
              <div className="flex flex-wrap items-start justify-between border-b-2 border-slate-900 pb-5 gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="font-heading font-black text-3xl tracking-wider text-slate-900">
                      TECH<span className="text-blue-600">LA</span>
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      ELECTRONICS & APPLIANCES
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    TECHLA (PVT) LTD • Authorized Sourcing Partner for Home Appliances, Consumer Electronics, Computers & CCTV Systems.
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Colombo, Sri Lanka • Hotline: +94 77 123 4567 • Web: www.techla.lk
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-heading text-2xl font-black text-slate-900 uppercase tracking-widest block">
                    PRICE QUOTATION
                  </span>
                  <p className="font-mono font-bold text-xs text-blue-700 mt-1">Ref: {quoteNumber}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Date: {today}</p>
                  <p className="text-xs font-bold text-emerald-700 mt-0.5">Valid Until: {validUntil}</p>
                </div>
              </div>

              {/* Bill To & Quotation Info */}
              <div className="grid grid-cols-2 gap-6 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">QUOTATION ISSUED TO:</span>
                  <p className="font-bold text-sm text-slate-900">{customerName || 'Valued Customer'}</p>
                  {companyName && <p className="font-semibold text-slate-700">{companyName}</p>}
                  {customerPhone && <p className="text-slate-600">Tel: {customerPhone}</p>}
                  {customerEmail && <p className="text-slate-600">Email: {customerEmail}</p>}
                  {customerAddress && <p className="text-slate-600 mt-1">{customerAddress}</p>}
                </div>

                <div className="text-right">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block mb-1">SUPPLIED BY:</span>
                  <p className="font-bold text-slate-900">Techla Commercial Sales Dept.</p>
                  <p className="text-slate-600">Island-wide Courier & Logistics</p>
                  <p className="text-slate-600">Warranty: Direct Importer RMA Service</p>
                  <p className="text-slate-600">Payment: Cash on Delivery / Bank Transfer</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-extrabold">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Description / Product Model</th>
                      <th className="py-3 px-4">Warranty Terms</th>
                      <th className="py-3 px-4 text-center">Qty</th>
                      <th className="py-3 px-4 text-right">Unit Price (LKR)</th>
                      <th className="py-3 px-4 text-right">Total (LKR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                    {items?.map((item, idx) => {
                      const qty = item.quantity || item.qty || 1;
                      const sub = item.price * qty;
                      return (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono font-bold text-slate-400">{idx + 1}</td>
                          <td className="py-3 px-4 font-bold text-slate-900">{item.title || item.name}</td>
                          <td className="py-3 px-4 text-emerald-700 font-semibold">{item.condition || 'Official Importer Barcode Warranty'}</td>
                          <td className="py-3 px-4 text-center font-bold font-tech">{qty}</td>
                          <td className="py-3 px-4 text-right font-tech">{Number(item.price).toLocaleString()}</td>
                          <td className="py-3 px-4 text-right font-tech font-bold">{sub.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-900 text-slate-900">
                    <tr>
                      <td colSpan={5} className="py-3 px-4 text-right text-xs uppercase tracking-wider">Subtotal:</td>
                      <td className="py-3 px-4 text-right font-tech text-sm">{Number(totalAmount).toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="py-2 px-4 text-right text-xs uppercase tracking-wider text-emerald-700">Island-wide Delivery:</td>
                      <td className="py-2 px-4 text-right font-tech text-xs text-emerald-700">INCLUDED</td>
                    </tr>
                    <tr className="text-sm font-black bg-blue-50 text-blue-900">
                      <td colSpan={5} className="py-3 px-4 text-right uppercase tracking-wider">TOTAL ESTIMATED PRICE:</td>
                      <td className="py-3 px-4 text-right font-tech text-base font-black">LKR {Number(totalAmount).toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Terms and Sign-off */}
              <div className="grid grid-cols-2 gap-6 pt-4 text-[11px] text-slate-600 border-t border-slate-200">
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-900 uppercase">Commercial Terms & Warranty:</h5>
                  <p>1. Prices quoted above are strictly valid for 14 calendar days from the issued date.</p>
                  <p>2. Products are 100% brand new, original sealed packs with official manufacturer / distributor barcode warranty cards.</p>
                  <p>3. Island-wide courier delivery within 24 to 48 business hours upon order confirmation.</p>
                </div>

                <div className="text-right flex flex-col justify-end items-end space-y-2">
                  <div className="w-48 border-b-2 border-slate-400 mt-8" />
                  <span className="font-bold text-slate-800 text-xs">TECHLA Authorized Signatory</span>
                  <span className="text-[10px] text-slate-400">Computer Generated Official Quotation</span>
                </div>
              </div>

              {/* Action Buttons (Not printed) */}
              <div className="print:hidden flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  onClick={() => setIsGenerated(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  ← Edit Details
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-6 py-2.5 rounded-xl bg-techla-600 hover:bg-techla-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg"
                  >
                    <i className="fa-solid fa-print" />
                    <span>Print Quotation / Download PDF</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
