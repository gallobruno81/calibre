import React, { useState, useEffect } from 'react';
import { CompanyProfile, SurveyResponse } from '../../types/survey';
import { submitSurveyToDb } from '../../services/supabaseService';
import { saveSurveyResponse } from '../../services/mockDataService';
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
  const [blobs, setBlobs] = useState<{ id: number, x: number, y: number, color: string, scale: number }[]>([]);

  // New State for Single Question Flow
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Generate random background on mount
  useEffect(() => {
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
      label: 'Nivel de Vitalidad',
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

  const totalSteps = questions.length + 1; // Questions + Comment/Submit
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleMetricChange = (key: string, val: number) => {
    setMetrics({ ...metrics, [key]: val });

    // Auto-advance with fade
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsVisible(true);
      }, 300); // Wait for fade out
    }, 400); // Small delay to see selection
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsVisible(true);
      }, 300);
    }
  };

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

  const currentQuestion = questions[currentStep];
  const isCommentStep = currentStep === questions.length;

  return (
    <div className="min-h-screen font-sans relative overflow-hidden bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 transition-colors duration-1000 flex flex-col">

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

      {/* Top Bar */}
      <header className="relative z-30 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#0f172a] rounded-lg flex items-center justify-center text-white shadow-md">
            <span className="font-bold text-xs">{company.name.charAt(0)}</span>
          </div>
          <div>
            <span className="block font-bold text-[#0f172a] text-sm tracking-tight leading-none">{company.name}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Check-in Emocional</span>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100/80 px-3 py-1.5 rounded-full border border-slate-200/50">
          {currentStep + 1} / {totalSteps}
        </div>
      </header>

      {/* Progress Bar */}
      <div className="relative z-20 w-full h-1.5 bg-slate-200/50">
        <div
          className="h-full bg-[#0f172a] transition-all duration-500 ease-out shadow-[0_0_10px_rgba(15,23,42,0.3)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-12 pb-8 flex-grow flex flex-col w-full">

        {/* Welcome Header */}
        <div className={`mb-12 text-center transition-all duration-700 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <h2 className="text-3xl md:text-4xl font-display font-light text-[#0f172a] mb-4 tracking-tight">
            Hola, <span className="font-normal italic">queremos escucharte.</span>
          </h2>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Este es un pulso rápido para entender cómo estás hoy. Tu respuesta es <span className="text-[#0f172a] font-bold">100% anónima</span> y nos ayuda a construir un mejor lugar para todos.
          </p>
        </div>

        {/* Question / Step Container */}
        <div className={`transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {!isCommentStep && currentQuestion && (
            <MetricCard
              label={currentQuestion.label}
              value={metrics[currentQuestion.key]}
              onChange={(val) => handleMetricChange(currentQuestion.key, val)}
              minLabel={currentQuestion.minLabel}
              maxLabel={currentQuestion.maxLabel}
              minDesc={currentQuestion.minDesc}
              maxDesc={currentQuestion.maxDesc}
              icon={currentQuestion.icon}
            />
          )}

          {isCommentStep && (
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl border border-white/50 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                  <MessageCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#0f172a]">Feedback Abierto</h3>
              </div>

              <label className="block text-sm font-bold text-slate-700 mb-4">
                ¿Hay algo más que quieras compartir? (Opcional)
              </label>
              <textarea
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0f172a] outline-none transition-all resize-none text-slate-900 placeholder-slate-400 min-h-[150px] font-medium"
                placeholder="Comentarios sobre cultura, herramientas, liderazgo o soporte..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                autoFocus
              />

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full mt-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 ${isSubmitting ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-[#0f172a] text-white hover:bg-[#0f172a]/90'}`}
              >
                {isSubmitting ? 'Enviando...' : <>Finalizar Check-in <ArrowRight size={20} /></>}
              </button>
            </div>
          )}

        </div>

        {/* Navigation Controls */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
            className={`text-slate-600 font-bold text-sm hover:text-[#0f172a] transition-colors px-4 py-2 rounded-lg hover:bg-white/50 ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            ← Anterior
          </button>

          {!isCommentStep && (
            <div className="text-xs text-slate-500 font-bold bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm">
              Selecciona una opción para avanzar
            </div>
          )}
        </div>

      </div>
    </div>
  );
};