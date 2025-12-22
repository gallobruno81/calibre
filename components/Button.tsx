import React, { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'lime' | 'outline' | 'white';
  className?: string;
  onClick?: () => void | Promise<void>;
  withArrow?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  withArrow = false,
  type = 'button'
}) => {
  // Base: Fully rounded pills, font-bold
  const baseStyles = "px-8 py-4 font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide active:scale-95";

  const variants = {
    // Solid Black - The main CTA style in the reference
    primary: "bg-[#0F172A] hover:bg-black text-white border border-transparent",

    // Pastel Lime/Green - The secondary CTA style in the reference (#E9F5DB approx)
    lime: "bg-[#E9F5DB] hover:bg-[#dcedc8] text-[#1a2e05] border border-transparent",

    // Outline - Standard secondary
    outline: "bg-white border border-slate-200 hover:border-slate-400 text-slate-900",

    // White - For cards with color
    white: "bg-white text-slate-900 hover:bg-slate-50 border border-transparent shadow-sm"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
      {withArrow && <ArrowRight size={16} className="ml-1" />}
    </button>
  );
};