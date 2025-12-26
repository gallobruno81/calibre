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
  const baseStyles = "px-7 py-3 font-bold rounded-full transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.05em] active:scale-95 shadow-sm hover:shadow-md";

  const variants = {
    // Solid Black - The main CTA style in the reference (#141414)
    primary: "bg-[#141414] hover:bg-black text-white border border-transparent",

    // Pastel Lime/Green - The secondary CTA style in the reference (#E6F1D5)
    lime: "bg-[#E6F1D5] hover:bg-[#d8e8c0] text-[#141414] border border-transparent",

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