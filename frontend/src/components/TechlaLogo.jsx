import React from 'react';

export default function TechlaLogo({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <defs>
        <linearGradient id="tTopGradFrontend" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D2FF" />
          <stop offset="100%" stopColor="#0055FE" />
        </linearGradient>
        <linearGradient id="tStemGradFrontend" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0075FF" />
          <stop offset="60%" stopColor="#0048D9" />
          <stop offset="100%" stopColor="#002B99" />
        </linearGradient>
        <linearGradient id="tFoldGradFrontend" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#0080FF" />
        </linearGradient>
      </defs>
      {/* Top slanting bar */}
      <polygon points="12,18 90,18 78,35 24,35" fill="url(#tTopGradFrontend)" />
      {/* Wing accent on top right */}
      <polygon points="86,30 96,30 79,56 69,56" fill="url(#tTopGradFrontend)" />
      {/* Inner folding wing */}
      <polygon points="33,35 60,35 44,53 33,53" fill="url(#tFoldGradFrontend)" />
      {/* Vertical faceted stem */}
      <polygon points="46,35 63,35 63,74 46,95" fill="url(#tStemGradFrontend)" />
    </svg>
  );
}

