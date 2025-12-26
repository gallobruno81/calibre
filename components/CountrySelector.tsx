import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { CountryCode } from '../types';
import { countryContent } from '../utils/countryContent';

interface CountrySelectorProps {
  selected: CountryCode;
  onChange: (code: CountryCode) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: CountryCode) => {
    onChange(code);
    setIsOpen(false);
  };

  const currentCountry = countryContent[selected];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 text-slate-700 text-sm font-bold"
      >
        <Globe size={16} className="text-slate-500" />
        <span>{currentCountry.name}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="py-2">
            {(Object.keys(countryContent) as CountryCode[]).map((code) => (
              <button
                key={code}
                onClick={() => handleSelect(code)}
                className={`w-full text-left px-5 py-3 text-sm font-bold hover:bg-slate-50 flex items-center gap-3 transition-colors ${selected === code ? 'bg-slate-50 text-[#141414]' : 'text-slate-500'}`}
              >
                {countryContent[code].name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};