import React, { useEffect } from 'react';
import { Therapist } from '../types';
import { Section } from './Section';
import { RevealOnScroll } from './RevealOnScroll';
import { Award, BookOpen, Clock } from 'lucide-react';
import { Button } from './Button';
import { TherapistImage } from './TherapistImage';

interface TeamPageProps {
  therapists: Therapist[];
  onBack: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ therapists, onBack }) => {

  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <Section className="pb-10 pt-10">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#84cc16]"></span>
              Equipo Clínico Certificado
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Expertos en salud mental,<br />
              <span className="relative inline-block px-2">
                <span className="absolute inset-0 bg-[#E9F5DB] rounded-full transform -skew-x-3 w-full h-full -z-10 block"></span>
                no motivadores.
              </span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              Nuestro equipo está compuesto exclusivamente por psicólogos, psiquiatras y neurocientíficos con matrícula habilitante y un mínimo de 10 años de experiencia clínica.
            </p>
          </div>
        </RevealOnScroll>

        {/* Grid of Profiles */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {therapists.map((therapist, index) => (
            <RevealOnScroll key={therapist.id} delay={index * 100}>
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  {/* Avatar con Generador IA */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0 rounded-[1.5rem] overflow-hidden relative shadow-md">
                    <TherapistImage
                      therapist={therapist}
                      className="w-full h-full"
                      imgClassName="group-hover:scale-105"
                    />
                  </div>

                  {/* Header Info */}
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{therapist.name}</h3>
                    <div className="inline-block bg-[#F2F5F9] px-3 py-1 rounded-full text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">
                      {therapist.role}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-1">
                      <Clock size={16} className="text-[#84cc16]" />
                      <span>{therapist.experience} de práctica</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Award size={16} className="text-[#84cc16]" />
                      <span>Matrícula Verificada</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-slate-100 mb-6"></div>

                {/* Details */}
                <div className="space-y-4 flex-grow">
                  <div className="bg-[#F8FAFC] p-4 rounded-3xl">
                    <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <BookOpen size={14} /> Formación
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{therapist.education}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Enfoque Clínico</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {therapist.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <Button variant="outline" className="w-full justify-center text-sm" onClick={() => { window.open('mailto:contacto@regulacion.corp'); }}>
                    Solicitar sesión con {therapist.name.split(' ')[1]}
                  </Button>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      <Section className="bg-[#F2F5F9] py-24 rounded-t-[3rem]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">¿Buscas un perfil específico?</h2>
          <p className="text-slate-500 mb-8 max-w-2xl mx-auto">
            Contamos con una red de más de 50 especialistas en distintas áreas de la salud mental ocupacional.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" onClick={onBack}>Volver al Inicio</Button>
            <Button variant="white" onClick={() => { window.location.href = '#contacto'; }}>Contactar Soporte</Button>
          </div>
        </div>
      </Section>
    </div>
  );
};