import React from 'react';

export default function TechlaLogo({ className = "w-8 h-8" }) {
  return (
    <img
      src="/logo.webp"
      alt="TECHLA Logo"
      className={`${className} object-contain mix-blend-multiply dark:mix-blend-screen drop-shadow-[0_2px_12px_rgba(0,114,255,0.6)]`}
    />
  );
}
