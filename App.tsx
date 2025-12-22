import React, { useState, Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  Activity,
  Brain,
  Battery,
  CheckCircle2,
  Users,
  Zap,
  ArrowRight,
  Menu,
  X,
  MoveRight,
  ShieldCheck,
  PlayCircle,
  MessageCircle,
  Phone,
  Target
} from 'lucide-react';
import { Section } from './components/Section';
import { Button } from './components/Button';
import { MeasurementChart } from './components/MeasurementChart';
import { TherapistCarousel } from './components/TherapistCarousel';
import { RevealOnScroll } from './components/RevealOnScroll';
import { LogoTicker } from './components/LogoTicker';
import { Accordion } from './components/Accordion';
import { Therapist, CountryCode } from './types';
import { CountrySelector } from './components/CountrySelector';
import { countryContent } from './utils/countryContent';

// Lazy Load Pages
const TeamPage = lazy(() => import('./components/TeamPage').then(module => ({ default: module.TeamPage })));
const MeasurementPage = lazy(() => import('./components/MeasurementPage').then(module => ({ default: module.MeasurementPage })));
const TherapistsGuide = lazy(() => import('./components/TherapistsGuide').then(module => ({ default: module.TherapistsGuide })));
const ServicesPage = lazy(() => import('./components/ServicesPage').then(module => ({ default: module.ServicesPage })));
const SurveyApp = lazy(() => import('./components/SurveyApp').then(module => ({ default: module.SurveyApp })));
const ResourceCenter = lazy(() => import('./components/ResourceCenter').then(module => ({ default: module.ResourceCenter })));

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
  </div>
);

// Centralized Data
const therapistsData: Therapist[] = [
  {
    id: '1',
    name: 'Lic. Mariana Vega',
    role: 'Psicóloga Clínica Senior',
    specialty: 'Regulación del Sistema Nervioso y Burnout',
    experience: '15 años',
    image: '/images/mariana.png',
    education: 'UBA, Posgrado en Terapia Cognitivo Conductual',
    bio: 'Especialista en el impacto fisiológico del estrés crónico. Mariana ha liderado programas de intervención en crisis para multinacionales tecnológicas, enfocándose en herramientas somáticas para desactivar la respuesta de lucha-huida en ejecutivos de alto rendimiento.'
  },
  {
    id: '2',
    name: 'Dr. Alejandro Ricci',
    role: 'Psiquiatra Ocupacional',
    specialty: 'Manejo de ansiedad y sueño',
    experience: '12 años',
    image: '/images/alejandro.png',
    education: 'UNAM, Máster en Salud Ocupacional',
    bio: 'Alejandro combina la psiquiatría clásica con la medicina del estilo de vida. Su enfoque no farmacológico prioriza la higiene del sueño y los ritmos circadianos para restaurar la capacidad cognitiva y reducir la irritabilidad en equipos de trabajo.'
  },
  {
    id: '3',
    name: 'Lic. Sofía Kogan',
    role: 'Neuropsicóloga',
    specialty: 'Entrenamiento atencional',
    experience: '10 años',
    image: '/images/sofia.png',
    education: 'Universidad de Palermo, Certificación en Biofeedback',
    bio: 'Experta en rehabilitación cognitiva aplicada al trabajo. Sofía diseña protocolos de "Atención Activa" que ayudan a recuperar la capacidad de concentración profunda (Deep Work) erosionada por la hiperconexión digital.'
  },
  {
    id: '4',
    name: 'Lic. Tomás Funes',
    role: 'Psicólogo Sistémico',
    specialty: 'Dinámicas de equipo',
    experience: '18 años',
    image: '/images/tomas.png',
    education: 'Universidad de Miami, Especialización en Sistemas',
    bio: 'Tomás trabaja sobre los "nudos invisibles" en la comunicación de equipos. Su intervención ayuda a desarticular patrones de conflicto pasivo-agresivos y a establecer acuerdos de convivencia claros y sostenibles.'
  }
];

const faqItems = [
  {
    title: "¿Los resultados son confidenciales?",
    content: "Absolutamente. Utilizamos un sistema de 'doble ciego' para las métricas. RRHH recibe un dashboard con tendencias agregadas (ej: 'Nivel de fatiga del equipo de Marketing'), pero nunca datos individuales de empleados. La terapia 1:1 es 100% confidencial entre paciente y terapeuta."
  },
  {
    title: "¿En qué se diferencia del coaching o mindfulness tradicional?",
    content: "Nuestro enfoque es clínico, no motivacional. No buscamos 'inspirar', sino regular el sistema nervioso con herramientas basadas en neurociencia. Todos nuestros profesionales son psicólogos colegiados, lo que nos permite abordar problemáticas reales de salud mental que un coach no puede tratar."
  },
  {
    title: "¿Cuánto tiempo toma ver resultados?",
    content: "Las herramientas de 'Atención Activa' generan alivio sintomático inmediato (en la primera sesión). Los cambios estructurales en el clima del equipo y los indicadores de burnout suelen estabilizarse a partir del tercer mes de trabajo sostenido."
  },
  {
    title: "¿Cómo se adapta a equipos remotos?",
    content: "Nacimos digitales. Todas nuestras intervenciones (grupales e individuales) funcionan perfectamente vía Zoom/Meet. Tenemos terapeutas en múltiples zonas horarias para cubrir equipos en Argentina, México y Miami sin fricción."
  }
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<CountryCode>('LATAM');
  const navigate = useNavigate();
  const location = useLocation();

  // Get dynamic content based on state
  const content = countryContent[currentCountry];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigateTo = (path: string, sectionId?: string, state?: any) => {
    navigate(path, { state });
    setIsMenuOpen(false);

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isWebApp = location.pathname.startsWith('/demo');

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#E9F5DB] selection:text-slate-900">

      {/* Floating WhatsApp Button - Hide in WebApp */}
      {!isWebApp && (
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group flex items-center justify-center"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle size={32} fill="white" className="text-white" />
          <span className="absolute right-full mr-4 bg-slate-900 text-white text-xs font-bold py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Hablemos por WhatsApp
          </span>
        </a>
      )}

      {/* Navigation - Hide in WebApp */}
      {!isWebApp && (
        <nav className="fixed w-full z-50 transition-all duration-300 top-0 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
            <div
              className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 cursor-pointer"
              onClick={() => navigateTo('/')}
            >
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white">
                <Target size={20} className="text-[#E9F5DB]" />
              </div>
              <span>Calibre<span className="text-slate-400">.</span></span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => navigateTo('/', 'metodologia')}
                className="px-5 py-2 rounded-full text-sm font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all capitalize"
              >
                Metodología
              </button>
              <button
                onClick={() => navigateTo('/programas')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all capitalize ${location.pathname === '/programas' ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Programas
              </button>
              <button
                onClick={() => navigateTo('/diagnostico')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all capitalize ${location.pathname === '/diagnostico' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Plataforma Diagnóstico
              </button>
              <button
                onClick={() => navigateTo('/equipo')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all capitalize ${location.pathname === '/equipo' ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Equipo
              </button>
              <button
                onClick={() => navigateTo('/recursos')}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all capitalize ${location.pathname === '/recursos' ? 'bg-[#0F172A] text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Recursos
              </button>

              {/* Country Selector */}
              <div className="ml-2 border-l border-slate-200 pl-4">
                <CountrySelector selected={currentCountry} onChange={setCurrentCountry} />
              </div>
            </div>

            <div className="hidden md:block">
              <Button variant="primary" onClick={() => navigateTo('/', 'contacto')} className="py-3 px-6 text-sm" withArrow>
                Propuesta
              </Button>
            </div>

            <button className="md:hidden text-slate-600 p-2" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-24 left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5">
              <div className="py-2 flex justify-center border-b border-slate-50">
                <CountrySelector selected={currentCountry} onChange={setCurrentCountry} />
              </div>
              <button onClick={() => navigateTo('/', 'metodologia')} className="text-left py-3 font-bold text-slate-600 border-b border-slate-50">Metodología</button>
              <button onClick={() => navigateTo('/programas')} className="text-left py-3 font-bold text-slate-600 border-b border-slate-50">Programas</button>
              <button onClick={() => navigateTo('/diagnostico')} className="text-left py-3 font-bold text-slate-600 border-b border-slate-50">Plataforma Diagnóstico</button>
              <button onClick={() => navigateTo('/equipo')} className="text-left py-3 font-bold text-slate-600 border-b border-slate-50">Equipo</button>
              <button onClick={() => navigateTo('/recursos')} className="text-left py-3 font-bold text-slate-600 border-b border-slate-50">Recursos</button>
              <Button onClick={() => navigateTo('/', 'contacto')} className="w-full justify-center mt-2">
                Solicitar Propuesta
              </Button>
            </div>
          )}
        </nav>
      )}

      {/* Main Content Router */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <Section className="pt-40 md:pt-48 pb-20 relative">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                  <RevealOnScroll>
                    {/* Pill Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[#84cc16]"></span>
                      {content.name} • {content.regulationTag}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-slate-900 leading-[1.1] mb-6">
                      {content.heroTitle}
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                      {content.heroSubtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Button onClick={() => navigateTo('/', 'contacto')} variant="primary" withArrow>
                        Solicitar propuesta {currentCountry === 'MX' ? 'NOM-035' : ''}
                      </Button>
                      <Button onClick={() => navigateTo('/demo/impacto')} variant="lime">
                        <Zap size={16} className="mr-1" />
                        Plataforma Diagnóstico
                      </Button>
                    </div>
                  </RevealOnScroll>
                </div>

                {/* Hero Image / Dashboard Preview */}
                <RevealOnScroll delay={200} className="mt-24 max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-12 gap-6">
                    {/* Large Image Card */}
                    <div className="md:col-span-8 relative rounded-[2.5rem] overflow-hidden group">
                      <img
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
                        alt="Reunión corporativa relajada"
                        className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="absolute bottom-8 left-8">
                        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-bold text-slate-900">Sesiones Grupales Activas</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Card */}
                    <div className="md:col-span-4 bg-[#F2F5F9] rounded-[2.5rem] p-8 flex flex-col justify-center relative overflow-hidden">
                      {/* Decorative background circle */}
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#E9F5DB] rounded-full blur-3xl opacity-50"></div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Resultados <br />Tangibles</h3>
                      <p className="text-slate-500 text-sm mb-8 font-medium">Promedio de mejora en 3 meses</p>

                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between">
                          <span className="font-bold text-slate-700">Foco</span>
                          <span className="font-extrabold text-green-600">+62%</span>
                        </div>
                        <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between">
                          <span className="font-bold text-slate-700">Estrés</span>
                          <span className="font-extrabold text-slate-400">-45%</span>
                        </div>
                        <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between">
                          <span className="font-bold text-slate-700">Retención</span>
                          <span className="font-extrabold text-green-600">+28%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              </Section>

              {/* Logo Ticker - TRUST BAR */}
              <LogoTicker />

              {/* SECTION: METODOLOGIA / HOW IT WORKS */}
              <Section id="metodologia" className="bg-white py-24">
                <RevealOnScroll className="text-center max-w-3xl mx-auto mb-20">
                  <div className="inline-block border border-slate-200 bg-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-slate-500">
                    Ciclo Calibre
                  </div>
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-slate-900 leading-[1.1]">
                    Mejora contínua, <br />
                    <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block mt-2 text-slate-900">no eventos aislados.</span>
                  </h2>
                  <p className="text-slate-500 text-lg font-medium leading-relaxed">
                    Nuestra metodología combina tecnología (IA) y clínica humana en un ciclo constante de 4 pasos.
                  </p>
                </RevealOnScroll>

                <div className="grid md:grid-cols-4 gap-8 relative px-4">
                  {/* Connecting Line (Desktop only) */}
                  <div className="hidden md:block absolute top-[60px] left-0 w-full h-0.5 border-t-2 border-dashed border-slate-200 -z-0" aria-hidden="true"></div>

                  {/* Step 1 */}
                  <RevealOnScroll delay={0} className="relative z-10 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-bold text-2xl mb-6 mx-auto shadow-xl shadow-slate-900/20">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Diagnóstico</h3>
                    <p className="text-slate-500 text-sm font-medium text-center leading-relaxed">
                      Radiografía inicial veloz: 6 preguntas (pulso) o 20 (profunda) para detectar focos rojos sin fatigar al equipo.
                    </p>
                  </RevealOnScroll>

                  {/* Step 2 */}
                  <RevealOnScroll delay={100} className="relative z-10 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#E9F5DB] text-[#365314] flex items-center justify-center font-bold text-2xl mb-6 mx-auto">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Plan de Acción</h3>
                    <p className="text-slate-500 text-sm font-medium text-center leading-relaxed">
                      Nuestra IA + equipo clínico generan recomendaciones automáticas personalizadas por equipo.
                    </p>
                  </RevealOnScroll>

                  {/* Step 3 */}
                  <RevealOnScroll delay={200} className="relative z-10 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-bold text-2xl mb-6 mx-auto shadow-xl shadow-slate-900/20">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Intervención</h3>
                    <p className="text-slate-500 text-sm font-medium text-center leading-relaxed">
                      Ejecución de talleres o sesiones 1:1. Cada acción se registra en plataforma para trazabilidad.
                    </p>
                  </RevealOnScroll>

                  {/* Step 4 */}
                  <RevealOnScroll delay={300} className="relative z-10 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg hover:-translate-y-2 transition-transform duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#E9F5DB] text-[#365314] flex items-center justify-center font-bold text-2xl mb-6 mx-auto">
                      4
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">Impacto Real</h3>
                    <p className="text-slate-500 text-sm font-medium text-center leading-relaxed">
                      Re-medición mensual automática. Verificamos si los KPIs (Burnout/Foco) mejoraron realmente.
                    </p>
                  </RevealOnScroll>
                </div>
              </Section>

              {/* Measurement Section (Clean Layout) */}
              <Section id="medicion" className="bg-white">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <RevealOnScroll>
                    <div className="inline-block bg-[#E9F5DB] text-[#365314] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                      Sin invadir privacidad
                    </div>
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 text-slate-900 leading-tight">
                      Diagnóstico Clínico <br />
                      <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block mt-1 text-slate-900">en tiempo real.</span>
                    </h2>
                    <p className="text-slate-500 mb-8 leading-relaxed text-lg font-medium">
                      Utilizamos una encuesta anónima de 3 variables antes y después de cada intervención. KPIs claros para RRHH.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      {[
                        { title: "Carga Emocional", value: "Tensión" },
                        { title: "Claridad Mental", value: "Foco" },
                        { title: "Nivel de Fatiga", value: "Energía" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#F8FAFC] p-6 rounded-[2rem] border border-slate-100 text-center hover:bg-[#F2F5F9] transition-colors">
                          <div className="text-slate-900 font-bold text-xl mb-1">{item.title}</div>
                          <div className="text-slate-400 text-sm font-bold uppercase tracking-wide">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                      <Button variant="lime" onClick={() => navigateTo('/demo/pulso')} withArrow className="text-sm">
                        Ver Demo Empleado
                      </Button>
                      <Button variant="primary" onClick={() => navigateTo('/demo/impacto')} withArrow className="shadow-xl shadow-slate-900/20 text-sm">
                        Ver Dashboard Resultados
                      </Button>
                    </div>
                  </RevealOnScroll>

                  <RevealOnScroll delay={200}>
                    <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50">
                      <div className="flex justify-between items-center mb-8">
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">Reporte de Calibre</h3>
                          <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Ciclo Bimestral</p>
                        </div>
                        <div className="bg-[#E9F5DB] p-2 rounded-full">
                          <Activity size={20} className="text-[#365314]" />
                        </div>
                      </div>
                      <MeasurementChart />
                    </div>
                  </RevealOnScroll>
                </div>
              </Section>

              {/* Team Preview Section */}
              <Section id="equipo-preview" className="bg-[#F8FAFC] rounded-t-[4rem]">
                <RevealOnScroll className="flex flex-col md:flex-row justify-between items-end mb-12">
                  <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-slate-900 mb-4">
                      Nuestro <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl text-slate-900">Equipo Clínico</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-medium">
                      Psicólogos y neurocientíficos colegiados. <br /> Sin coaches motivacionales, solo salud mental real.
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0">
                    <Button variant="lime" onClick={() => navigateTo('/equipo')} withArrow>
                      Ver todos los perfiles
                    </Button>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={100}>
                  <TherapistCarousel data={therapistsData} />
                </RevealOnScroll>
              </Section>

              {/* Services Section Preview */}
              <Section id="servicios-summary" className="bg-[#F8FAFC] pb-32">
                <RevealOnScroll className="text-center max-w-2xl mx-auto mb-16">
                  <div className="inline-block border border-slate-200 bg-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-slate-500">
                    Intervenciones
                  </div>
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-slate-900">
                    Programas <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl text-slate-900">de Impacto</span>
                  </h2>
                  <p className="text-slate-500 font-medium">
                    Soluciones diseñadas para mover indicadores específicos de salud mental.
                  </p>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Wide */}
                  <RevealOnScroll className="md:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 relative group overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-[#E9F5DB] rounded-full blur-[80px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-[#F2F5F9] rounded-2xl text-slate-900"><Users size={24} /></div>
                        <span className="text-xs font-bold text-[#365314] uppercase tracking-widest bg-[#E9F5DB] px-3 py-1.5 rounded-full">Programa Core</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">Programa Sostenido</h3>
                      <p className="text-slate-500 mb-8 max-w-md font-medium">Ciclos mensuales o bimestrales que combinan grupos de regulación, sesiones 1:1 y medición continua.</p>

                      <div className="flex flex-wrap gap-3 mb-8">
                        {['Grupos quincenales', 'Soporte 1:1', 'Reportes de clima'].map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full border border-slate-200 text-xs font-bold text-slate-600 bg-slate-50">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button onClick={() => navigateTo('/programas')} variant="primary" withArrow className="w-full md:w-auto">Ver Catálogo Completo</Button>
                    </div>
                  </RevealOnScroll>

                  {/* Card 2: Vertical */}
                  <RevealOnScroll delay={100} className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
                    <div className="p-3 bg-[#F2F5F9] rounded-2xl text-slate-900 w-fit mb-6"><Brain size={24} /></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Terapia 1:1</h3>
                    <p className="text-slate-500 text-sm mb-6 flex-grow font-medium">Espacio confidencial para empleados con psicólogos clínicos. Packs de 4 sesiones o demanda espontánea.</p>
                    <Button onClick={() => navigateTo('/', 'contacto')} variant="lime" className="w-full">
                      Agendar Pack
                    </Button>
                  </RevealOnScroll>

                  {/* Card 3: Taller Flash */}
                  <RevealOnScroll delay={200} className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
                    <div className="p-3 bg-[#F2F5F9] rounded-2xl text-slate-900 w-fit mb-6"><Zap size={24} /></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Taller Flash</h3>
                    <p className="text-slate-500 text-sm mb-6 flex-grow font-medium">Sesión única de 60 minutos. Diagnóstico + Herramientas de alivio inmediato.</p>
                    <Button onClick={() => navigateTo('/programas')} variant="lime" className="w-full">
                      Ver Opciones
                    </Button>
                  </RevealOnScroll>
                </div>
              </Section>

              {/* Why It Works - Simple Grid */}
              <Section className="bg-white">
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { title: "Clínico", desc: "Protocolos terapéuticos, no coaching." },
                    { title: "Pragmático", desc: "Herramientas de uso inmediato." },
                    { title: "Medible", desc: "KPIs de salud mental claros." },
                    { title: "Humano", desc: "Trato real, sin bots ni scripts." }
                  ].map((item, i) => (
                    <RevealOnScroll delay={i * 100} key={i} className="bg-[#F8FAFC] p-8 rounded-[2rem] text-center border border-slate-100 hover:border-slate-200 transition-all">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                    </RevealOnScroll>
                  ))}
                </div>
              </Section>

              {/* FAQ Section */}
              <Section className="bg-white py-12">
                <div className="grid md:grid-cols-12 gap-12">
                  <div className="md:col-span-4">
                    <RevealOnScroll>
                      <div className="inline-block border border-slate-200 bg-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 text-slate-500">
                        Preguntas Frecuentes
                      </div>
                      <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6 text-slate-900 leading-tight">
                        Dudas <br />
                        <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block mt-1 text-slate-900">habituales.</span>
                      </h2>
                      <p className="text-slate-500 font-medium mb-8">
                        Todo lo que necesitas saber antes de contratar el servicio para tu equipo.
                      </p>
                      <Button variant="lime" onClick={() => navigateTo('/', 'contacto')} withArrow>
                        Hacer otra pregunta
                      </Button>
                    </RevealOnScroll>
                  </div>
                  <div className="md:col-span-8">
                    <RevealOnScroll delay={100}>
                      <Accordion items={faqItems} />
                    </RevealOnScroll>
                  </div>
                </div>
              </Section>

              {/* CTA / Contact Section */}
              <Section id="contacto" className="pb-24">
                <RevealOnScroll className="max-w-6xl mx-auto bg-[#F2F5F9] rounded-[3rem] p-4 md:p-6 relative overflow-hidden">
                  {/* Decorative */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#E9F5DB] rounded-full blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                  <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden grid md:grid-cols-2 relative z-10">

                    <div className="p-10 md:p-14 flex flex-col justify-center">
                      <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-6 leading-tight">
                        Hablemos de <br />
                        <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block mt-1 text-slate-900">tu equipo.</span>
                      </h2>
                      <p className="text-slate-500 mb-8 font-medium text-lg leading-relaxed">
                        Agenda una llamada de 15 minutos para obtener una propuesta a medida y un diagnóstico inicial sin costo.
                      </p>

                      <div className="flex flex-col gap-4 mt-auto">
                        <div className="flex items-center gap-4 p-4 rounded-3xl bg-[#F8FAFC] border border-slate-50">
                          <div className="w-10 h-10 rounded-full bg-[#E9F5DB] flex items-center justify-center text-[#365314] font-bold text-sm border border-[#d3e8b9]">
                            <Phone size={20} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Llamada Directa</p>
                            <p className="text-slate-900 font-bold text-lg">+54 9 11 1234 5678</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-10 md:p-14 bg-slate-50/50 border-l border-slate-100">
                      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-2">Nombre</label>
                            <input type="text" className="w-full px-5 py-3.5 rounded-full bg-white border border-slate-200 text-slate-900 focus:border-slate-900 focus:ring-0 outline-none transition-all placeholder:text-slate-300" placeholder="Tu nombre" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-2">Apellido</label>
                            <input type="text" className="w-full px-5 py-3.5 rounded-full bg-white border border-slate-200 text-slate-900 focus:border-slate-900 focus:ring-0 outline-none transition-all placeholder:text-slate-300" placeholder="Tu apellido" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-2">Email Corporativo</label>
                          <input type="email" className="w-full px-5 py-3.5 rounded-full bg-white border border-slate-200 text-slate-900 focus:border-slate-900 focus:ring-0 outline-none transition-all placeholder:text-slate-300" placeholder="nombre@empresa.com" />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-2">¿Qué buscas?</label>
                          <div className="relative">
                            <select className="w-full px-5 py-3.5 rounded-full bg-white border border-slate-200 text-slate-900 focus:border-slate-900 outline-none transition-all appearance-none cursor-pointer">
                              <option>Taller Inicial (Prueba)</option>
                              <option>Programa Completo</option>
                              <option>Terapia 1:1</option>
                              <option>Consulta General</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                              <ArrowRight size={16} className="rotate-90" />
                            </div>
                          </div>
                        </div>
                        <Button variant="primary" className="w-full justify-center pt-2" withArrow>
                          Enviar Solicitud
                        </Button>
                      </form>
                    </div>
                  </div>
                </RevealOnScroll>
              </Section>
            </>
          } />

          <Route path="/equipo" element={<TeamPage therapists={therapistsData} onBack={() => navigateTo('/')} />} />
          <Route path="/diagnostico" element={<MeasurementPage onBack={() => navigateTo('/')} />} />
          <Route path="/terapeutas" element={<TherapistsGuide onBack={() => navigateTo('/')} />} />
          <Route path="/programas" element={<ServicesPage onBack={() => navigateTo('/')} onContact={() => navigateTo('/', 'contacto')} country={currentCountry} />} />

          {/* Demo Routes */}
          <Route path="/demo" element={<SurveyAppWrapper onBack={() => navigateTo('/')} />} />
          <Route path="/demo/pulso" element={<SurveyAppWrapper onBack={() => navigateTo('/')} mode="employee-demo" />} />
          <Route path="/demo/impacto" element={<SurveyAppWrapper onBack={() => navigateTo('/')} mode="manager-demo" />} />

          <Route path="/recursos" element={<ResourceCenter onBack={() => navigateTo('/')} />} />
        </Routes>
      </Suspense>

      {/* Footer - Hide in WebApp */}
      {!isWebApp && (
        <div className="px-4 pb-4 bg-white">
          <footer className="bg-[#E3E8F5] py-16 px-8 md:px-16 rounded-[3rem] relative mx-auto max-w-[1400px]">

            <div className="grid md:grid-cols-12 gap-12 mb-20">
              {/* Brand / Description Column */}
              <div className="md:col-span-4">
                <div className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-slate-900 mb-6">
                  <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white">
                    <Target size={16} className="text-[#E9F5DB]" />
                  </div>
                  <span>Calibre<span className="text-slate-400">.</span></span>
                </div>
                <p className="text-slate-600 text-base font-medium max-w-xs leading-relaxed mb-8">
                  Plataforma de bienestar emocional para empresas enfocada en medición, terapia y regulación sin clichés.
                </p>
                <div className="flex gap-4">
                  {/* Social placeholders if needed, or just keep clean */}
                </div>
              </div>

              {/* Navigation Columns */}
              <div className="md:col-span-2">
                <h4 className="font-bold text-slate-900 mb-6 text-lg">Explorar</h4>
                <ul className="space-y-4 text-base font-medium text-slate-600">
                  <li><button onClick={() => navigateTo('/', 'metodologia')} className="hover:text-slate-900 transition-colors">Metodología</button></li>
                  <li><button onClick={() => navigateTo('/programas')} className="hover:text-slate-900 transition-colors">Programas</button></li>
                  <li><button onClick={() => navigateTo('/equipo')} className="hover:text-slate-900 transition-colors">Equipo</button></li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-bold text-slate-900 mb-6 text-lg">Recursos</h4>
                <ul className="space-y-4 text-base font-medium text-slate-600">
                  <li><button onClick={() => navigateTo('/terapeutas')} className="hover:text-slate-900 transition-colors">Soy Terapeuta</button></li>
                  <li><a href="#" className="hover:text-slate-900 transition-colors">Blog</a></li>
                  <li><button onClick={() => navigateTo('/recursos')} className="hover:text-slate-900 transition-colors">Guías y Recursos</button></li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-bold text-slate-900 mb-6 text-lg">Legal</h4>
                <ul className="space-y-4 text-base font-medium text-slate-600">
                  <li><a href="#" className="hover:text-slate-900 transition-colors">Privacidad</a></li>
                  <li><a href="#" className="hover:text-slate-900 transition-colors">Términos</a></li>
                </ul>
              </div>

              {/* CTA Column */}
              <div className="md:col-span-2 flex flex-col items-start md:items-end">
                <button
                  onClick={() => navigateTo('/', 'contacto')}
                  className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-sm hover:shadow-md transition-all whitespace-nowrap"
                >
                  Contactar Ahora
                </button>
                <div className="flex gap-2 mt-4">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-sm hover:scale-110 transition-transform">
                    <MessageCircle size={18} />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-sm hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section with Central Icon */}
            <div className="relative border-t border-slate-300/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-wider">

              {/* Central Icon */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg ring-8 ring-[#E3E8F5]">
                <Target size={24} />
              </div>

              <div className="mt-8 md:mt-0">
                info@calibre.lat
              </div>

              <div className="mt-4 md:mt-0">
                © 2024 Calibre Bienestar
              </div>
            </div>

          </footer>
        </div>
      )}
    </div>
  );
};

// Wrapper for SurveyApp to handle location state or direct route mode
const SurveyAppWrapper = ({ onBack, mode }: { onBack: () => void, mode?: 'employee-demo' | 'manager-demo' }) => {
  const location = useLocation();
  // Priority: explicit prop (from route) > location state (from navigation)
  const initialMode = mode || location.state?.initialMode;
  return <SurveyApp onBack={onBack} initialMode={initialMode} />;
};

export default App;