import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content, isOpen, onClick }) => {
  return (
    <div className={`mb-4 rounded-[2rem] border transition-all duration-300 ${isOpen ? 'bg-white border-slate-200 shadow-lg shadow-slate-200/50' : 'bg-[#F8FAFC] border-transparent hover:bg-white hover:border-slate-100'}`}>
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-600'}`}>
          {title}
        </span>
        <div className={`p-2 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#E9F5DB] rotate-180' : 'bg-white text-slate-400'}`}>
          {isOpen ? <ChevronDown size={20} className="text-[#365314]" /> : <Plus size={20} />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-6 md:px-8 pb-8 pt-0 text-slate-500 font-medium leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { title: string; content: string }[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};