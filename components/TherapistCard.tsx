import React from 'react';
import { Therapist } from '../types';
import { Award, BookOpen } from 'lucide-react';
import { TherapistImage } from './TherapistImage';

interface TherapistCardProps {
  therapist: Therapist;
}

export const TherapistCard: React.FC<TherapistCardProps> = ({ therapist }) => {
  return (
    <div className="min-w-[300px] md:min-w-[340px] bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 snap-center group">
      <TherapistImage 
        therapist={therapist} 
        className="h-64 m-2 rounded-[1.5rem] overflow-hidden"
        imgClassName="group-hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 pointer-events-none">
          <p className="text-white font-bold text-lg mb-1">{therapist.name}</p>
          <p className="text-[#E9F5DB] text-xs font-bold tracking-wide uppercase bg-black/20 backdrop-blur-sm px-2 py-1 rounded-lg inline-block">{therapist.role}</p>
        </div>
      </TherapistImage>
      
      <div className="p-6 pt-2 space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-[#F2F5F9] p-2 rounded-full text-slate-500 shrink-0 mt-0.5">
             <BookOpen size={14} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Formación</p>
            <p className="text-sm text-slate-700 leading-snug font-semibold">{therapist.education}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-[#F2F5F9] p-2 rounded-full text-slate-500 shrink-0 mt-0.5">
            <Award size={14} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Especialidad</p>
            <p className="text-sm text-slate-700 leading-snug font-semibold">{therapist.specialty}</p>
          </div>
        </div>
      </div>
    </div>
  );
};