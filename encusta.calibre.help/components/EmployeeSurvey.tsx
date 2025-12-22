import React, { useState, useEffect } from 'react';
import { CompanyProfile, SurveyResponse } from '../types';
import { submitSurveyToDb } from '../services/supabaseService';
import { saveSurveyResponse } from '../services/mockDataService';
import { ArrowRight, Heart, Zap, Eye, MessageCircle, ShieldCheck, Award, Check } from 'lucide-react';

interface Props {
  company: CompanyProfile;
  onComplete: () => void;
}

interface MetricCardProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  minLabel: string;
  maxLabel: string;
  minDesc: string;
  maxDesc: string;
  icon: React.ElementType;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  onChange, 
  minLabel, 
  maxLabel,
  minDesc,
  maxDesc,
  icon: Icon
}) => {
  
  const getButtonColor = (num: number, isSelected: boolean) => {
    if (!isSelected) return 'bg-secondary text-muted-foreground hover:bg-accent hover:text-accent-foreground';
    
    // Logic: 5 is always Good (Green), 1 is always Bad (Red)
    // 3 is Neutral -> Now BLUE instead of Amber
    if (num >= 4) return 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-200';
    if (num === 3) return 'bg-blue-500 text-white shadow-md ring-2 ring-blue-200';
    return 'bg-destructive text-destructive-foreground shadow-md ring-2 ring-red-200';
  };

  return (
    <div className="mb-6 bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/40 shadow-lg transition-all hover:shadow-xl hover:scale-[1.01]">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl text-primary shadow-inner">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">{label}</h3>
          <p className="text-sm text-muted-foreground mt-1">Selecciona del 1 al 5</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Scale Descriptions */}
        <div className="flex justify-between items-end text-sm">
          <div className="w-2/5 text-left group cursor-default">
            <span className="block font-bold mb-1 text-lg text-destructive">1</span>
            <span className="font-semibold text-foreground block">{minLabel}</span>
            <span className="text-muted-foreground text-xs leading-relaxed">{minDesc}</span>
          </div>
          <div className="w-2/5 text-right group cursor-default">
            <span className="block font-bold mb-1 text-lg text-emerald-600">5</span>
            <span className="font-semibold text-foreground block">{maxLabel}</span>
            <span className="text-muted-foreground text-xs leading-relaxed">{maxDesc}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((num) => {
            const isSelected = value === num;
            return (
              <button
                key={num}
                onClick={() => onChange(num)}
                className={`
                  flex-1 py-3 rounded-lg text-lg font-bold transition-all duration-200
                  ${getButtonColor(num, isSelected)}
                `}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const EmployeeSurvey: React.FC<Props> = ({ company, onComplete }) => {
  const [metrics, setMetrics] = useState({
    emotionalLoad: 3,
    clarity: 3,
    fatigue: 3,
    communication: 3,
    psychologicalSafety: 3,
    recognition: 3
  });
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blobs, setBlobs] = useState<{id: number, x: number, y: number, color: string, scale: number}[]>([]);

  // Generate random background on mount
  useEffect(() => {
    // Removed amber/orange colors, replaced with cool tones
    const colors = ['bg-blue-400', 'bg-violet-400', 'bg-rose-400', 'bg-emerald-400', 'bg-indigo-400', 'bg-sky-400'];
    const newBlobs = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // %
      y: Math.random() * 100, // %
      scale: 1 + Math.random() * 1, // Larger blobs
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setBlobs(newBlobs);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    if (company.id) {
        await submitSurveyToDb(company.id, metrics, comment);
    } else {
        const response: SurveyResponse = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            metrics,
            optionalComment: comment.length > 0 ? comment : undefined
        };
        saveSurveyResponse(response);
    }

    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const questions = [
    {
      key: 'emotionalLoad' as const,
      label: 'Nivel de Entusiasmo',
      icon: Heart,
      minLabel: 'Apático',
      minDesc: 'Me cuesta encontrarle sentido al día.',
      maxLabel: 'Entusiasmado',
      maxDesc: 'Tengo ganas y pasión por lo que hago.',
    },
    {
      key: 'fatigue' as const,
      label: 'Nivel de Vitalidad', // Changed from Fatiga
      icon: Zap,
      minLabel: 'Agotado',
      minDesc: 'Me siento drenado física y mentalmente.',
      maxLabel: 'Energizado',
      maxDesc: 'Tengo energía para afrontar el día.',
    },
    {
      key: 'clarity' as const,
      label: 'Claridad de Rol',
      icon: Eye,
      minLabel: 'Confuso', 
      minDesc: 'No tengo claro qué se espera de mí.',
      maxLabel: 'Muy Claro',
      maxDesc: 'Sé exactamente mis objetivos y rol.',
    },
    {
      key: 'communication' as const,
      label: 'Comunicación',
      icon: MessageCircle,
      minLabel: 'Cerrada',
      minDesc: 'Difícil acceder a la información.',
      maxLabel: 'Fluida',
      maxDesc: 'Información transparente y constante.',
    },
    {
      key: 'psychologicalSafety' as const,
      label: 'Seguridad Psicológica',
      icon: ShieldCheck,
      minLabel: 'Con Miedo',
      minDesc: 'Temo cometer errores o hablar.',
      maxLabel: 'Seguro',
      maxDesc: 'Puedo ser yo mismo y expresar mis ideas.',
    },
    {
      key: 'recognition' as const,
      label: 'Reconocimiento',
      icon: Award,
      minLabel: 'Invisible',
      minDesc: 'Siento que mi esfuerzo no cuenta.',
      maxLabel: 'Valorado',
      maxDesc: 'Recibo reconocimiento frecuente.',
    }
  ];

  return (
    <div className="min-h-screen font-sans relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 transition-colors duration-1000">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {blobs.map((blob) => (
           <div 
             key={blob.id}
             className={`absolute rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse ${blob.color}`}
             style={{
               top: `${blob.y}%`,
               left: `${blob.x}%`,
               width: '600px',
               height: '600px',
               transform: `scale(${blob.scale}) translate(-50%, -50%)`,
               animationDuration: `${15 + Math.random() * 10}s`
             }}
           />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-white/50 mb-6">
             {company.logoUrl ? (
               <img src={company.logoUrl} alt={company.name} className="h-8 w-auto" />
             ) : (
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center bg-white">
                     <div className="w-2 h-2 bg-primary rounded-full"></div>
                   </div>
                   <span className="font-bold text-primary">{company.name}</span>
                </div>
             )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4 drop-shadow-sm">Check-in Emocional</h1>
          <p className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed font-medium">
            Tu opinión es anónima. Ayúdanos a entender el pulso real del equipo.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
          {questions.map((q) => (
             <MetricCard
               key={q.key}
               label={q.label}
               value={metrics[q.key]}
               onChange={(val) => setMetrics({...metrics, [q.key]: val})}
               minLabel={q.minLabel}
               maxLabel={q.maxLabel}
               minDesc={q.minDesc}
               maxDesc={q.maxDesc}
               icon={q.icon}
             />
          ))}

          <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl border border-white/40 shadow-lg mt-8">
             <label className="block text-lg font-bold text-foreground mb-4">
               ¿Algo más que quieras compartir?
             </label>
             <textarea
               className="w-full p-4 bg-white/50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all resize-none text-foreground placeholder-slate-400"
               rows={3}
               placeholder="Comentarios sobre cultura, herramientas o soporte..."
               value={comment}
               onChange={(e) => setComment(e.target.value)}
             />
          </div>

          <div className="pt-8 pb-16">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 ${
                isSubmitting ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-primary text-primary-foreground hover:bg-slate-900'
              }`}
            >
              {isSubmitting ? (
                'Enviando...'
              ) : (
                <>
                  Enviar Respuestas <ArrowRight size={20} />
                </>
              )}
            </button>
            <div className="mt-6 flex flex-col items-center gap-2 text-center">
              <p className="text-sm text-slate-500 flex items-center gap-2 font-medium">
                 <Check size={14} className="text-emerald-600" /> 100% Anónimo y Encriptado
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};