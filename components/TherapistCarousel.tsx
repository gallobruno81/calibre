import React, { useRef } from 'react';
import { Therapist } from '../types';
import { TherapistCard } from './TherapistCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TherapistCarouselProps {
  data: Therapist[];
}

export const TherapistCarousel: React.FC<TherapistCarouselProps> = ({ data }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 350; // Width of card approx
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative group/carousel">
      {/* Controls */}
      <div className="hidden md:flex justify-end gap-2 mb-4">
        <button 
          onClick={() => scroll('left')}
          className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 transition-colors shadow-sm"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="p-2 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 transition-colors shadow-sm"
          aria-label="Siguiente"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {data.map((therapist) => (
          <TherapistCard key={therapist.id} therapist={therapist} />
        ))}
      </div>
    </div>
  );
};