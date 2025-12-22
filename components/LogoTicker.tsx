import React from 'react';

const logos = [
  { name: "FinTech Global", opacity: "opacity-40" },
  { name: "Mercado Libre", opacity: "opacity-40" },
  { name: "Globant", opacity: "opacity-40" },
  { name: "Nubank", opacity: "opacity-40" },
  { name: "Despegar", opacity: "opacity-40" },
  { name: "Miami Ventures", opacity: "opacity-40" },
  { name: "TechLatam", opacity: "opacity-40" },
  { name: "Banco Galicia", opacity: "opacity-40" },
];

export const LogoTicker: React.FC = () => {
  return (
    <div className="w-full bg-white border-y border-slate-50 py-10 overflow-hidden relative">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-white via-transparent to-white"></div>
      
      <div className="flex w-max animate-ticker gap-16 md:gap-24 items-center">
        {/* Original Set */}
        {logos.map((logo, i) => (
          <div key={i} className={`text-2xl md:text-3xl font-bold text-slate-900 ${logo.opacity} whitespace-nowrap uppercase tracking-tighter select-none hover:opacity-80 transition-opacity`}>
            {logo.name}
          </div>
        ))}
        {/* Duplicate Set for Loop */}
        {logos.map((logo, i) => (
          <div key={`dup-${i}`} className={`text-2xl md:text-3xl font-bold text-slate-900 ${logo.opacity} whitespace-nowrap uppercase tracking-tighter select-none hover:opacity-80 transition-opacity`}>
            {logo.name}
          </div>
        ))}
        {/* Third Set to ensure smoothness on huge screens */}
        {logos.map((logo, i) => (
          <div key={`dup2-${i}`} className={`text-2xl md:text-3xl font-bold text-slate-900 ${logo.opacity} whitespace-nowrap uppercase tracking-tighter select-none hover:opacity-80 transition-opacity`}>
            {logo.name}
          </div>
        ))}
      </div>
    </div>
  );
};