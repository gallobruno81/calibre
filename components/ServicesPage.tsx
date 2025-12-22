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

      {/* Hero Section - Immersive Card Style */}
      <Section className="pt-24 pb-4 md:pt-28 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className="relative rounded-[2rem] overflow-hidden h-[80vh] min-h-[600px] w-full shadow-2xl group border border-slate-100">

            {/* Background Image - Doctor/Professional */}
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2864&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover object-[center_30%] transition-transform duration-1000 group-hover:scale-105"
              alt="Professional Doctor"
            />

            {/* Gradient Overlay for Text Readability - Fade from White on Left */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent"></div>

            {/* Content Container - Aligned Bottom Left */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-8 md:px-12 lg:px-16 max-w-2xl">
              <RevealOnScroll>
                {/* Badge - Smaller and cleaner */}
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]"></span>
                  Soluciones Clínicas
                </div>

                {/* Headline - Significantly Smaller to match reference */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-slate-900 leading-[1.1] mb-6 tracking-tight">
                  Intervenciones que <br />
                  <span className="bg-[#E9F5DB] px-2 py-0 rounded-lg inline-block text-slate-900 mx-1">mueven</span>
                  indicadores
                </h1>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed font-medium max-w-md">
                  Soluciones clínicas que combinan medición, intervención y validación de impacto.
                </p>

                {/* Buttons - Only Primary */}
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="primary"
                    onClick={onContact}
                    withArrow
                    className="shadow-lg hover:shadow-xl hover:scale-105 border-none px-6 py-3 text-sm rounded-full"
                  >
                    Conocer plataforma
                  </Button>
                </div>
              </RevealOnScroll>
            </div>

            {/* Floating Card - Bottom Right - Replaced with "Logical" Value Prop (Retention/Climate) */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 bg-white/95 backdrop-blur-md p-5 rounded-[1.5rem] shadow-xl max-w-[320px] animate-in slide-in-from-bottom-10 fade-in duration-700 border border-slate-100 hidden md:block">
              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=200"
                    className="w-full h-full object-cover"
                    alt="Team"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Impacto en Retención</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">
                    Reducimos la rotación y mejoramos el clima laboral con datos.
                  </p>
                </div>
              </div>
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
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                    PASO 1: PUNTO DE PARTIDA
                  </div>

                  <h2 className="text-3xl md:text-5xl font-medium mb-6 leading-[1.1] tracking-tight text-slate-900">
                    Diagnóstico <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900">Inicial</span>
                  </h2>

                  <p className="text-slate-500 text-lg md:text-xl mb-8 leading-relaxed font-normal">
                    Te ayudamos a entender qué necesita tu equipo hoy. Sin compromiso, escuchamos tus desafíos y te asesoramos sobre el mejor camino a seguir.
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
                    className="w-full md:w-auto px-8"
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
      <Section className="bg-white py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <RevealOnScroll>
            <div className="flex items-center justify-between mb-16 gap-4">
              {/* Left: Social Icons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  aria-label="Youtube"
                >
                  <svg className="w-4 h-4 text-slate-700" fill="currentColor" viewBox="0 0 576 512">
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  aria-label="Help"
                >
                  <HelpCircle size={16} className="text-slate-700" />
                </a>
              </div>

              {/* Center: Title with Highlight */}
              <div className="flex-1 text-center min-w-0">
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium tracking-tight text-slate-900 leading-[1.1]">
                  Programas <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block mt-2 text-slate-900">intensivos</span>
                </h2>
              </div>

              {/* Right: Button */}
              <div className="flex items-center flex-shrink-0">
                <Button onClick={onContact} variant="primary" withArrow className="text-xs md:text-sm whitespace-nowrap">
                  Catálogo PDF
                </Button>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Taller 1: Liderazgo */}
            <RevealOnScroll>
              <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                {/* Abstract wave line - single wide line like API Integration */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                  <path d="M-20,60 C60,100 140,80 220,120 C300,160 360,120 420,160" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                </svg>

                <div className="relative z-10 flex flex-col flex-grow justify-end">
                  {/* Header with icon and explore button */}
                  <div className="flex items-start justify-between mb-auto">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                      <Users size={20} className="text-slate-700" />
                    </div>
                    <button
                      onClick={onContact}
                      className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-medium flex items-center gap-2 hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                      Explorar <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Category and hours */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Liderazgo</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500">4 horas</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Liderazgo seguro y cuidado</h3>

                  {/* Description */}
                  <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                    Entrenamiento para managers: cómo dar soporte emocional sin convertirse en terapeuta de sus empleados.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Taller 2: Regulación Emocional */}
            <RevealOnScroll delay={100}>
              <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                {/* Abstract wave line - single wide U like White label */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                  <path d="M-20,80 C80,20 160,20 240,40 C320,60 360,50 420,70" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                </svg>

                <div className="relative z-10 flex flex-col flex-grow justify-end">
                  <div className="flex items-start justify-between mb-auto">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                      <Heart size={20} className="text-slate-700" />
                    </div>
                    <button
                      onClick={onContact}
                      className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-medium flex items-center gap-2 hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                      Explorar <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Estrés</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500">3 horas</span>
                  </div>

                  <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Regulación emocional y resiliencia</h3>

                  <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                    Herramientas fisiológicas para desactivar la respuesta de lucha/huida en equipos de alta presión.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Taller 3: Mindfulness */}
            <RevealOnScroll delay={200}>
              <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                {/* Abstract wave line - single wide S shape like Quality Assurance */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                  <path d="M420,30 C360,5 280,20 240,5 C200,-10 160,5 120,20 C80,35 40,25 -20,40" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                </svg>

                <div className="relative z-10 flex flex-col flex-grow justify-end">
                  <div className="flex items-start justify-between mb-auto">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                      <Brain size={20} className="text-slate-700" />
                    </div>
                    <button
                      onClick={onContact}
                      className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-medium flex items-center gap-2 hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                      Explorar <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Productividad</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500">2 horas</span>
                  </div>

                  <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Mindfulness aplicado a reuniones</h3>

                  <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                    Prácticas breves de 3 minutos para "limpiar la memoria RAM" del equipo antes de tomar decisiones.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Taller 4: Comunicación */}
            <RevealOnScroll delay={300}>
              <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                {/* Abstract wave line - single wide diagonal S */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                  <path d="M-20,50 C50,90 120,70 190,110 C260,150 330,110 420,130" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                </svg>

                <div className="relative z-10 flex flex-col flex-grow justify-end">
                  <div className="flex items-start justify-between mb-auto">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                      <MessageCircle size={20} className="text-slate-700" />
                    </div>
                    <button
                      onClick={onContact}
                      className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-medium flex items-center gap-2 hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                      Explorar <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Comunicación</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500">3 horas</span>
                  </div>

                  <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Feedback efectivo y comunicación</h3>

                  <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                    Desarticulación de patrones pasivo-agresivos. Diferencia entre queja, pedido y reclamo.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Taller 5: Crisis */}
            <RevealOnScroll delay={400}>
              <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                {/* Abstract wave line - single wide flowing U */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                  <path d="M-20,70 C80,20 180,20 280,40 C330,50 360,45 420,55" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                </svg>

                <div className="relative z-10 flex flex-col flex-grow justify-end">
                  <div className="flex items-start justify-between mb-auto">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                      <ShieldCheck size={20} className="text-slate-700" />
                    </div>
                    <button
                      onClick={onContact}
                      className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-medium flex items-center gap-2 hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                      Explorar <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Crisis</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500">2.5 horas</span>
                  </div>

                  <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Gestión de crisis y estrés</h3>

                  <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                    Protocolos de recuperación inmediata para momentos críticos del negocio.
                  </p>
                </div>
              </div>
            </RevealOnScroll>

            {/* Taller 6: Equilibrio y Bienestar */}
            <RevealOnScroll delay={500}>
              <div className="bg-[#F8F8F8] p-8 rounded-[2.5rem] relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full aspect-square min-h-[320px]">
                {/* Abstract wave line - single wide gentle U */}
                <svg className="absolute top-0 left-0 w-full h-full opacity-70" viewBox="0 0 400 300" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
                  <path d="M-20,60 C100,15 220,15 340,40 C360,45 370,50 420,55" stroke="#D0E3F5" strokeWidth="18" fill="none" strokeLinecap="round" />
                </svg>

                <div className="relative z-10 flex flex-col flex-grow justify-end">
                  <div className="flex items-start justify-between mb-auto">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                      <Activity size={20} className="text-slate-700" />
                    </div>
                    <button
                      onClick={onContact}
                      className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-medium flex items-center gap-2 hover:border-slate-300 hover:shadow-sm transition-all"
                    >
                      Explorar <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Bienestar</span>
                    <span className="text-xs text-slate-300">•</span>
                    <span className="text-xs font-medium text-slate-500">3.5 horas</span>
                  </div>

                  <h3 className="text-2xl font-medium text-black mb-3 leading-tight">Equilibrio trabajo-vida y prevención</h3>

                  <p className="text-slate-500 text-base mb-0 leading-relaxed font-normal">
                    Estrategias prácticas para mantener límites saludables y prevenir el agotamiento crónico en equipos de alto rendimiento.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Section>

      {/* PASO 3: Acompañamiento Organizacional */}
      <Section className="bg-white py-0">
        <div className="max-w-[1400px] mx-auto">
          <RevealOnScroll>
            <div className="relative w-full h-[600px] md:h-[700px] rounded-[2.5rem] overflow-hidden">
              {/* Background Image */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1400"
                alt="Profesional de salud mental"
                className="w-full h-full object-cover"
              />

              {/* White Overlay Box - Bottom Left */}
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-md bg-white rounded-[2rem] p-8 shadow-2xl">
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 text-slate-900 leading-tight">
                  Acompañamiento <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900">organizacional</span>
                </h2>

                <p className="text-slate-600 mb-6 leading-relaxed text-base font-medium">
                  Asignamos un profesional fijo a tu equipo que entiende el contexto, la cultura y la historia. Es como tener un psicólogo in-house, pero flexible.
                </p>

                <div className="space-y-3 mb-6">
                  {[
                    "Mismo terapeuta para todo el equipo",
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
      <Section className="bg-[#F8FAFC] py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-4">
                • LO QUE NOS DISTINGUE
              </div>
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

          {/* Lo que NO ofrecemos */}
          <RevealOnScroll>
            <div className="bg-white rounded-[2.5rem] p-10 shadow-lg border border-slate-100">
              <div className="text-center mb-8">
                <div className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-4">
                  Lo que NO ofrecemos
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {[
                  "Bienestar genérico",
                  "Mindfulness universal",
                  "Charlas sin seguimiento",
                  "Cursos grabados",
                  "Promesas mágicas"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
                    <X size={16} className="text-slate-400" />
                    <span className="text-sm font-bold text-slate-500">{item}</span>
                  </div>
                ))}
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
                Agenda una llamada de 15 minutos para obtener una propuesta a medida y un diagnóstico inicial sin costo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={onContact} variant="primary" withArrow>
                  Solicitar Propuesta
                </Button>
                <Button onClick={() => navigate('/diagnostico')} variant="lime" withArrow>
                  Ver Diagnóstico
                </Button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Section>

    </div>
  );
};
