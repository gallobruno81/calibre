import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from './Section';
import { RevealOnScroll } from './RevealOnScroll';
import { Button } from './Button';
import {
  CheckCircle2,
  X,
  Users,
  Brain,
  Zap,
  ArrowRight,
  Activity,
  ShieldCheck,
  Target,
  TrendingUp,
  Clock,
  MessageCircle,
  BarChart3,
  Heart,
  Sparkles,
  Play,
  HelpCircle,
  Download
} from 'lucide-react';
import { CountryCode } from '../types';

interface ServicesPageProps {
  onBack: () => void;
  onContact: () => void;
  country: CountryCode;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onBack, onContact, country }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] selection:bg-[#E9F5DB] selection:text-slate-900 font-sans">

      {/* Hero Section - AyaRX Inspired Layout */}
      <Section className="pt-24 pb-12 md:pt-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">

            {/* Left Content - Text and Controls */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <RevealOnScroll>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-slate-900 leading-[1.05] mb-8 tracking-tight text-balance">
                  Intervenciones que <br />
                  <span className="bg-[#E9F5DB] px-3 py-1 rounded-2xl inline-block text-slate-900">mueven</span> <br />
                  indicadores
                </h1>

                <p className="text-xl md:text-2xl text-slate-500 mb-10 leading-relaxed font-normal max-w-xl">
                  Soluciones clínicas que evitan la rotación y recuperan el foco de tu equipo.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Button
                    variant="primary"
                    onClick={() => document.getElementById('programas-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="border-none"
                  >
                    Ver programas de impacto
                  </Button>
                  <Button
                    variant="lime"
                    onClick={() => navigate('/diagnostico')}
                    className="border-none font-medium"
                  >
                    Radar Calibre (demo)
                  </Button>
                </div>

                {/* Trust Indicator - Avatars and Number */}
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[
                      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=100",
                      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100",
                      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100",
                      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                    ].map((avatar, idx) => (
                      <div key={idx} className="w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-slate-100 shadow-sm">
                        <img src={avatar} className="w-full h-full object-cover" alt="User" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 leading-none">50000+</div>
                    <div className="text-slate-500 text-sm font-medium mt-1">talentos protegidos</div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Right Content - Tall Image with Floating Cards */}
            <div className="w-full lg:w-1/2 relative">
              <RevealOnScroll>
                <div className="relative rounded-[3rem] overflow-hidden h-[750px] w-full shadow-2xl border border-slate-100">
                  <img
                    src="/images/latino-psychologist.png"
                    className="h-full w-full object-cover object-center transition-transform duration-1000 hover:scale-105"
                    alt="Psicólogo Profesional"
                  />

                  {/* Floating Identity Component - Top Right (Ver Demo) */}
                  <div className="absolute top-8 right-8">
                    <button
                      onClick={() => window.location.href = '/demo/impacto'}
                      className="bg-[#E9F5DB]/90 backdrop-blur-md text-slate-900 px-6 h-14 rounded-full font-bold flex items-center gap-2 shadow-lg hover:bg-[#E9F5DB] transition-all"
                    >
                      Ver Radar de Impacto <ArrowRight size={18} />
                    </button>
                  </div>

                  {/* Floating Card 1: Impact / Status */}
                  <div className="absolute bottom-10 right-8 bg-white/95 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl max-w-[340px] animate-in slide-in-from-right-10 fade-in duration-700 border border-slate-100">
                    <div className="flex gap-4 items-start">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-slate-100 ring-4 ring-slate-100/50">
                        <img
                          src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200"
                          className="w-full h-full object-cover"
                          alt="Health Professional"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base mb-1">Acompañamiento Estratégico</h4>
                        <div className="bg-[#FEF9C3] text-[#854d0e] text-[10px] font-bold px-2 py-1 rounded-md inline-block uppercase tracking-wider mb-0.5">
                          Atención rápida y eficaz
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>

          </div>
        </div>
      </Section>

      {/* PASO 1: Taller Diagnóstico Inicial - Light Theme Card */}
      <Section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <RevealOnScroll>
            <div className="bg-[#F8F9FA] rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden group">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                {/* Left Content */}
                <div className="lg:col-span-6 relative z-10">


                  <h2 className="text-3xl md:text-5xl font-medium mb-6 leading-[1.1] tracking-tight text-slate-900">
                    Diagnóstico <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900">Inicial</span>
                  </h2>

                  <p className="text-slate-500 text-lg md:text-xl mb-8 leading-relaxed font-normal">
                    Te ayudamos a entender qué necesita tu equipo hoy. Evitamos licencias y renuncias inesperadas escuchando tus desafíos antes de proponer.
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-start gap-3">
                      <div className="p-1 bg-[#E9F5DB] rounded-full">
                        <CheckCircle2 size={18} className="text-[#4d7c0f]" />
                      </div>
                      <div>
                        <span className="text-slate-900 font-bold block">Encuesta Calibre Bonificada (3 Meses)</span>
                        <span className="text-slate-500 text-sm">Medición completa de clima y bienestar sin costo.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-1 bg-[#E9F5DB] rounded-full">
                        <CheckCircle2 size={18} className="text-[#4d7c0f]" />
                      </div>
                      <div>
                        <span className="text-slate-900 font-bold block">Asesoría de Expertos</span>
                        <span className="text-slate-500 text-sm">Escuchamos y diagnosticamos antes de proponer.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-1 bg-[#E9F5DB] rounded-full">
                        <CheckCircle2 size={18} className="text-[#4d7c0f]" />
                      </div>
                      <div>
                        <span className="text-slate-900 font-bold block">Hoja de Ruta Personalizada</span>
                        <span className="text-slate-500 text-sm">Plan de acción adaptado a tu presupuesto.</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    onClick={onContact}
                    className="w-full md:w-auto"
                    withArrow
                  >
                    Agendar Asesoría
                  </Button>
                </div>

                {/* Right: Image Illustration */}
                <div className="lg:col-span-6 relative">
                  <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
                    <img
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000"
                      alt="Sesión de diagnóstico"
                      className="w-full h-[500px] object-cover"
                    />

                    {/* Floating Badge - 3 Months Free */}
                    <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-6 rounded-[2rem] shadow-lg max-w-xs border border-slate-100">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#E9F5DB] flex items-center justify-center text-[#365314]">
                          <Sparkles size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Beneficio Exclusivo</p>
                          <p className="text-slate-900 font-bold">3 Meses Bonificados</p>
                        </div>
                      </div>
                      <p className="text-slate-500 text-sm font-medium leading-normal">
                        Acceso total a nuestra plataforma de medición para que pruebes el valor antes de invertir.
                      </p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#E9F5DB] rounded-full blur-[60px] opacity-60 pointer-events-none"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-slate-200 rounded-full blur-[60px] opacity-40 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* PASO 2: Talleres Intensivos - Estilo AyaRX */}
      <Section id="programas-section" className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
              <div className="flex items-center gap-3">
                <span className="bg-[#141414] text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
                  Fase II
                </span>
                <h3 className="text-2xl md:text-3xl font-medium text-slate-900 tracking-tight">
                  Programas de Rendimiento Clínico
                </h3>
              </div>

              {/* Right: Button */}
              <div className="flex items-center flex-shrink-0">
                <Button onClick={onContact} variant="primary" withArrow className="text-xs md:text-sm whitespace-nowrap">
                  Propuesta Estratégica
                </Button>
              </div>
            </div>
          </RevealOnScroll>

          {/* CATEGORY 1: INTERVENCIONES TÉCNICAS (GAP FILLING) */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-[#E9F5DB] text-[#365314] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-[#d3e8b9]">
                Módulo A
              </span>
              <h3 className="text-xl font-medium text-slate-900 tracking-tight">
                Intervención de Crisis (Shock)
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Taller 1: Liderazgo */}
              <RevealOnScroll>
                <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                  <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                    <path d="M-20,60 C60,100 140,80 220,120 C300,160 360,120 420,160" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                  </svg>
                  <div className="relative z-10 flex flex-col flex-grow justify-end">
                    <div className="flex items-start justify-between mb-auto">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                        <Users size={20} className="text-slate-700" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Gestión</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs font-medium text-slate-500">4 horas</span>
                    </div>
                    <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Herramientas de Liderazgo y Contención</h3>
                    <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                      Entrenamiento para managers: cómo gestionar equipos bajo presión y brindar contención sin cruzar límites clínicos.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Taller 4: Comunicación -> Comunicación Asertiva */}
              <RevealOnScroll delay={100}>
                <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                  <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                    <path d="M-20,50 C50,90 120,70 190,110 C260,150 330,110 420,130" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                  </svg>
                  <div className="relative z-10 flex flex-col flex-grow justify-end">
                    <div className="flex items-start justify-between mb-auto">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                        <MessageCircle size={20} className="text-slate-700" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Comunicación</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs font-medium text-slate-500">3 horas</span>
                    </div>
                    <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Comunicación Asertiva y Resolución de Conflictos</h3>
                    <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                      Desarticulación de patrones pasivo-agresivos. Herramientas técnicas para conversaciones difíciles y acuerdos de equipo.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* Taller 5: Crisis */}
              <RevealOnScroll delay={200}>
                <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                  <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                    <path d="M-20,70 C80,20 180,20 280,40 C330,50 360,45 420,55" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                  </svg>
                  <div className="relative z-10 flex flex-col flex-grow justify-end">
                    <div className="flex items-start justify-between mb-auto">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                        <ShieldCheck size={20} className="text-slate-700" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Crisis</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs font-medium text-slate-500">2.5 horas</span>
                    </div>
                    <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Gestión de Crisis y Estrés Agudo</h3>
                    <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                      Protocolos de recuperación inmediata para momentos críticos del negocio o cambios estructurales profundos.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          {/* CATEGORY 2: SALUD ORGANIZACIONAL (CONSCIOUS TEAMS) */}
          <div className="mt-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-[#E9F5DB] text-[#365314] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-[#d3e8b9]">
                Módulo B
              </span>
              <h3 className="text-xl font-medium text-slate-900 tracking-tight">
                Rendimiento Organizacional (Conscious Teams)
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Taller 3: Mindfulness -> Entrenamiento de Foco */}
              <RevealOnScroll>
                <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                  <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                    <path d="M420,30 C360,5 280,20 240,5 C200,-10 160,5 120,20 C80,35 40,25 -20,40" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                  </svg>
                  <div className="relative z-10 flex flex-col flex-grow justify-end">
                    <div className="flex items-start justify-between mb-auto">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                        <Brain size={20} className="text-slate-700" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Productividad</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs font-medium text-slate-500">2 horas</span>
                    </div>
                    <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Entrenamiento de Atención y Foco</h3>
                    <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                      Más que meditación: herramientas para gestionar la fatiga digital y mejorar la capacidad de concentración profunda (Deep Work).
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* NEW: Pausas Activas y Dinámicas Grupales */}
              <RevealOnScroll delay={100}>
                <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                  <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                    <path d="M-20,60 C100,15 220,15 340,40 C360,45 370,50 420,55" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                  </svg>
                  <div className="relative z-10 flex flex-col flex-grow justify-end">
                    <div className="flex items-start justify-between mb-auto">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                        <Activity size={20} className="text-slate-700" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Engagement</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs font-medium text-slate-500">Periódico</span>
                    </div>
                    <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Pausas Activas y Dinámicas de Integración</h3>
                    <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                      Instancias lúdicas semanales: estiramientos, dinámicas grupales y juegos para afiatar equipos y reducir el sedentarismo emocional.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>

              {/* NEW: Retiros Conscientes y Team Building */}
              <RevealOnScroll delay={200}>
                <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                  <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                    <path d="M-20,80 C80,20 160,20 240,40 C320,60 360,50 420,70" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                  </svg>
                  <div className="relative z-10 flex flex-col flex-grow justify-end">
                    <div className="flex items-start justify-between mb-auto">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                        <Sparkles size={20} className="text-slate-700" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Cultura</span>
                      <span className="text-xs text-slate-300">•</span>
                      <span className="text-xs font-medium text-slate-500">1-2 días</span>
                    </div>
                    <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Retiros de Equipos Conscientes</h3>
                    <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                      Experiencias fuera del entorno laboral: dinámicas de propósito, coherencia y valores para generar vínculos humanos profundos.
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </Section>

      {/* PASO 3: Acompañamiento Organizacional */}
      <Section className="bg-white py-0">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll>
            <div className="relative w-full h-[500px] md:h-[600px] rounded-[2.5rem] overflow-hidden">
              {/* Background Image - Latina Professional - Pushed further right */}
              <img
                src="/images/latina-professional-health.png"
                alt="Profesional asignado a la organización"
                className="w-full h-full object-cover object-[85%_center]"
              />

              {/* White Overlay Box - Bottom Left */}
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-md bg-white rounded-[2rem] p-8 shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 text-slate-900 leading-tight">
                  Rendimiento <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900">organizacional</span>
                </h2>

                <p className="text-slate-600 mb-6 leading-relaxed text-base font-medium">
                  Asignamos un profesional dedicado a tu organización que entiende el contexto, la cultura y la historia. Una pieza clave integrada a tu equipo, pero con la flexibilidad de Calibre.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    "Mismo profesional asignado para todo el equipo",
                    "Conoce la cultura y dinámicas internas",
                    "Disponibilidad flexible y continua"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#84cc16] flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Two Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={onContact} variant="primary" withArrow className="flex-1 justify-center">
                    Solicitar Asignación
                  </Button>
                  <Button onClick={onContact} variant="lime" className="flex-1 justify-center">
                    <Download size={16} className="mr-2" />
                    Descargar Brochure
                  </Button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Lo que nos distingue */}
      <Section className="bg-[#F8FAFC] py-12 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-12">

              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-12 text-slate-900 leading-tight">
                Calibre <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900">te cubre</span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: BarChart3, title: "Activados por datos", desc: "Decisiones basadas en métricas reales" },
              { icon: Target, title: "Integrados a medición", desc: "Seguimiento continuo de impacto" },
              { icon: Sparkles, title: "Intervenciones concretas", desc: "Acciones específicas, no teoría" },
              { icon: TrendingUp, title: "Impacto validado", desc: "Resultados medibles y comprobables" },
              { icon: ShieldCheck, title: "Privacidad absoluta", desc: "Confidencialidad garantizada" },
              { icon: Brain, title: "Sin cursos genéricos", desc: "Contenido personalizado por equipo" }
            ].map((item, idx) => (
              <RevealOnScroll key={idx} delay={idx * 100}>
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-full bg-[#E9F5DB] flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-[#365314]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Garantía de Seguridad y Límites (Refined to Ayarx Style) */}
          <RevealOnScroll>
            <div className="bg-white rounded-[3.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden group border border-slate-100 mx-auto max-w-[1300px]">
              {/* Abstract decorative background - Subtler */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E9F5DB]/20 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>

              <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-12 mb-2 text-center md:text-left">

                  <h2 className="text-3xl md:text-5xl lg:text-[46px] font-normal text-slate-900 mb-8 tracking-tight leading-[1.2]">
                    Límites claros para la <br />
                    <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block mt-2 text-slate-900">seguridad de tu equipo.</span>
                  </h2>
                </div>

                <div className="md:col-span-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: "No es Terapia", desc: "Instancias de regulación y aprendizaje, no sesiones abiertas." },
                    { title: "Sin Obligación", desc: "Nadie es forzado a compartir experiencias personales o vulnerables." },
                    { title: "Espacios Cuidados", desc: "Facilitadores profesionales que aseguran el respeto y la confidencialidad." },
                    { title: "Foco en el Rol", desc: "Trabajamos sobre la persona dentro de su contexto profesional." }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#F8F8F8] p-6 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group/card">
                      <div className="flex items-center gap-3 text-[#141414] mb-4">
                        <CheckCircle2 size={18} className="text-slate-400 group-hover/card:text-[#84cc16] transition-colors" strokeWidth={2.5} />
                        <h4 className="font-bold text-base text-slate-900 tracking-tight">{item.title}</h4>
                      </div>
                      <p className="text-slate-500 text-[13px] leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-12 mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="max-w-xl text-center md:text-left">
                    <h4 className="text-slate-900 font-bold mb-1 tracking-tight text-sm">Transparencia Organizacional</h4>
                    <p className="text-slate-500 text-xs font-medium">¿Cómo medimos el éxito? Entregamos reportes de impacto anónimos para la gerencia sin comprometer la privacidad individual.</p>
                  </div>
                  <Button onClick={onContact} variant="primary" className="px-10 py-4 text-xs rounded-full shadow-xl shadow-slate-900/5 hover:scale-105">Agendar Consulta Técnica</Button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-white py-20">
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto text-center bg-[#F2F5F9] rounded-[3rem] p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E9F5DB] rounded-full blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 text-slate-900 leading-tight">
                ¿Listo para transformar el <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block mt-1 text-slate-900">bienestar de tu equipo?</span>
              </h2>
              <p className="text-slate-500 mb-8 font-medium text-lg leading-relaxed">
                Agenda una llamada de 15 minutos para evitar la rotación y recuperar el foco de tu equipo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={onContact} variant="primary" withArrow>
                  Solicitar Propuesta
                </Button>
                <Button onClick={() => navigate('/diagnostico')} variant="lime" withArrow>
                  Ver Radar de Impacto
                </Button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Section>

    </div>
  );
};
