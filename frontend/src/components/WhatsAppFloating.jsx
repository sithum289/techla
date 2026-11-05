import React from 'react';

export default function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/94771234567?text=Hello%20TECHLA,%20I%20am%20interested%20in%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-[0_4px_25px_rgba(16,185,129,0.5)] transition-all hover:scale-105 group"
      title="Chat directly with TECHLA Support"
    >
      <i className="fa-brands fa-whatsapp text-xl text-slate-950" />
      <span className="hidden sm:inline font-sans font-bold">Chat with TECHLA</span>
    </a>
  );
}

