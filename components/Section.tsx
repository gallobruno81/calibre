import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean; // Keep prop for backward compatibility but style is unified
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  return (
    <section
      id={id}
      className={`py-20 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden ${className}`}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};