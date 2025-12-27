/// <reference types="vite/client" />
import React, { useState, Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { RadarEvolution } from './components/RadarEvolution';
import {
  Activity,
  Brain,
  Battery,
  CheckCircle2,
  Check,
  Users,
  Zap,
  ArrowRight,
  Menu,
  X,
  MoveRight,
  ShieldCheck,
  PlayCircle,
  Sparkles,
  MessageCircle,
  Phone,
  Target,
  TrendingUp,
  BarChart3
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
import { AntiEAPTable } from './components/AntiEAPTable';
import { ImplementationRoadmap } from './components/ImplementationRoadmap';
import { ManagerView } from './components/ManagerView';
import { BusinessCase } from './components/BusinessCase';


// Lazy Load Pages
const TeamPage = lazy(() => import('./components/TeamPage').then(module => ({ default: module.TeamPage })));
const MeasurementPage = lazy(() => import('./components/MeasurementPage').then(module => ({ default: module.MeasurementPage })));
const TherapistsGuide = lazy(() => import('./components/TherapistsGuide').then(module => ({ default: module.TherapistsGuide })));
const ServicesPage = lazy(() => import('./components/ServicesPage').then(module => ({ default: module.ServicesPage })));
const SurveyApp = lazy(() => import('./components/SurveyApp').then(module => ({ default: module.SurveyApp })));
const ResourceCenter = lazy(() => import('./components/ResourceCenter').then(module => ({ default: module.ResourceCenter })));
const ProposalLanding = lazy(() => import('./components/ProposalLanding').then(module => ({ default: module.ProposalLanding })));

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
    role: 'Consultora Clínica Senior',
    specialty: 'Regulación del Sistema Nervioso y Burnout',
    experience: '15 años',
    image: `${import.meta.env.BASE_URL}images/mariana.png`,
    education: 'UBA, Posgrado en Terapia Cognitivo Conductual',
    bio: 'Especialista en el impacto fisiológico del estrés crónico. Mariana ha liderado programas de intervención en crisis para multinacionales tecnológicas, enfocándose en herramientas somáticas para desactivar la respuesta de lucha-huida en ejecutivos de alto rendimiento.'
  },
  {
    id: '2',
    name: 'Dr. Alejandro Ricci',
    role: 'Médico Ocupacional',
    specialty: 'Manejo de ansiedad y sueño',
    experience: '12 años',
    image: `${import.meta.env.BASE_URL}images/alejandro.png`,
    education: 'UNAM, Máster en Salud Ocupacional',
    bio: 'Alejandro combina la psiquiatría clásica con la medicina del estilo de vida. Su enfoque no farmacológico prioriza la higiene del sueño y los ritmos circadianos para restaurar la capacidad cognitiva y reducir la irritabilidad en equipos de trabajo.'
  },
  {
    id: '3',
    name: 'Lic. Sofía Kogan',
    role: 'Especialista en Neurociencia',
    specialty: 'Entrenamiento atencional',
    experience: '10 años',
    image: `${import.meta.env.BASE_URL}images/sofia.png`,
    education: 'Universidad de Palermo, Certificación en Biofeedback',
    bio: 'Experta en rehabilitación cognitiva aplicada al trabajo. Sofía diseña protocolos de "Atención Activa" que ayudan a recuperar la capacidad de concentración profunda (Deep Work) erosionada por la hiperconexión digital.'
  },
  {
    id: '4',
    name: 'Lic. Tomás Funes',
    role: 'Consultor Sistémico',
    specialty: 'Dinámicas de equipo',
    experience: '18 años',
    image: `${import.meta.env.BASE_URL}images/tomas.png`,
    education: 'Universidad de Miami, Especialización en Sistemas',
    bio: 'Tomás trabaja sobre los "nudos invisibles" en la comunicación de equipos. Su intervención ayuda a desarticular patrones de conflicto pasivo-agresivos y a establecer acuerdos de convivencia claros y sostenibles.'
  }
];

const faqItems = [
  {
    title: "¿Cómo se garantiza la confidencialidad de los datos?",
    content: "Utilizamos protocolos de protección de datos clínicos y anonimato 'doble ciego'. La Gerencia recibe métricas agregadas por equipo para toma de decisiones estratégicas, mientras que el historial clínico individual permanece bajo secreto profesional 100% confidencial."
  },
  {
    title: "¿Cuál es la diferencia con un Employee Assistance Program (EAP) tradicional?",
    content: "A diferencia de los EAPs pasivos (líneas 1-800 con baja adopción), Calibre es una solución activa. Integramos diagnóstico clínico mensual con intervenciones directas. No somos un servicio de beneficios genérico; somos un aliado preventivo de salud organizacional con impacto directo en el clima laboral."
  },
  {
    title: "¿Qué indicadores de negocio permite mover?",
    content: "Nuestros programas están diseñados para impactar en KPIs clave: reducción de licencias médicas por estrés, evitar rotación de talento y mejora en la productividad percibida a través del entrenamiento de foco y atención profunda."
  },
  {
    title: "¿Requiere mucho tiempo de ejecución para el equipo?",
    content: "Diseñamos intervenciones de 'Precisión Clínica' que maximizan el impacto en tiempos breves (60 (m) a 120 (m)). El personal no necesita salir de su entorno laboral para obtener herramientas de regulación inmediata del sistema nervioso."
  }
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<CountryCode>(() => {
    const saved = localStorage.getItem('calibre_country') as CountryCode;
    return saved || 'LATAM';
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Automatic Location Detection
  useEffect(() => {
    const detectLocation = async () => {
      // Don't override if user already has a saved preference in this session
      if (localStorage.getItem('calibre_country')) return;

      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const detectedCode = data.country_code as string;

        const validCodes: Record<string, CountryCode> = {
          'AR': 'AR',
          'MX': 'MX',
          'US': 'US',
          'CL': 'CL',
          'CO': 'CO'
        };

        if (validCodes[detectedCode]) {
          setCurrentCountry(validCodes[detectedCode]);
          localStorage.setItem('calibre_country', validCodes[detectedCode]);
        }
      } catch (error) {
        console.error("Error detecting location:", error);
      }
    };

    detectLocation();
  }, []);

  // Update localStorage when country changes manually
  const handleCountryChange = (code: CountryCode) => {
    setCurrentCountry(code);
    localStorage.setItem('calibre_country', code);
  };

  // NEW: Hero Message Rotation (Local vs Default)
  const [heroMessageIndex, setHeroMessageIndex] = useState(0);
  useEffect(() => {
    // Only rotate if current country is NOT LATAM (to avoid rotating to the same content)
    if (currentCountry === 'LATAM') return;

    const rotationInterval = setInterval(() => {
      setHeroMessageIndex((prev) => (prev === 0 ? 1 : 0));
    }, 6000); // Rotate every 6 seconds

    return () => clearInterval(rotationInterval);
  }, [currentCountry]);

  // Reset rotation when country changes
  useEffect(() => {
    setHeroMessageIndex(0);
  }, [currentCountry]);

  // Get dynamic content based on state
  const localizedContent = countryContent[currentCountry];
  const defaultContent = countryContent['LATAM'];
  const content = localizedContent;

  // Decide which content to show in the Hero
  const displayHeroContent = heroMessageIndex === 0 ? localizedContent : defaultContent;

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

  // We want to show the main navbar/footer even in demo now
  const isWebApp = location.pathname.startsWith('/demo');

  return (
    <div className="min-h-screen bg-white text-[#141414] font-sans selection:bg-[#E6F1D5] selection:text-[#141414]">

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
          <span className="absolute right-full mr-4 bg-[#141414] text-white text-xs font-bold py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Hablemos por WhatsApp
          </span>
        </a>
      )}

      {/* Navigation - Hide in WebApp */}
      {!isWebApp && (
        <nav className="fixed w-full z-50 transition-all duration-300 top-0 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <div className={`max-w-[1400px] mx-auto px-6 flex items-center justify-between transition-all duration-300 ${location.pathname.startsWith('/demo') ? 'h-16' : 'h-24'}`}>
            <div
              className="flex items-center gap-2 font-bold text-xl tracking-tight text-[#141414] cursor-pointer"
              onClick={() => navigateTo('/')}
            >
              <div className="w-10 h-10 bg-[#141414] rounded-full flex items-center justify-center text-white">
                <Target size={20} className="text-[#E6F1D5]" />
              </div>
              <span>Calibre<span className="text-slate-400">.</span></span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => navigateTo('/', 'metodologia')}
                className="px-4 py-2 rounded-full text-[11px] font-bold text-slate-500 hover:text-[#141414] hover:bg-slate-50 transition-all uppercase tracking-widest"
              >
                Metodología
              </button>
              <button
                onClick={() => navigateTo('/programas')}
                className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all uppercase tracking-widest ${location.pathname === '/programas' ? 'bg-[#141414] text-white shadow-md' : 'text-slate-500 hover:text-[#141414] hover:bg-slate-50'}`}
              >
                Programas
              </button>
              <button
                onClick={() => navigateTo('/diagnostico')}
                className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all uppercase tracking-widest ${location.pathname === '/diagnostico' ? 'bg-slate-100 text-[#141414] shadow-sm' : 'text-slate-500 hover:text-[#141414] hover:bg-slate-50'}`}
              >
                Radar Calibre
              </button>
              <button
                onClick={() => navigateTo('/equipo')}
                className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all uppercase tracking-widest ${location.pathname === '/equipo' ? 'bg-[#141414] text-white shadow-md' : 'text-slate-500 hover:text-[#141414] hover:bg-slate-50'}`}
              >
                Equipo
              </button>
              <button
                onClick={() => navigateTo('/recursos')}
                className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all uppercase tracking-widest ${location.pathname === '/recursos' ? 'bg-[#141414] text-white shadow-md' : 'text-slate-500 hover:text-[#141414] hover:bg-slate-50'}`}
              >
                Recursos
              </button>

              {/* Country Selector */}
              <div className="ml-2 border-l border-slate-200 pl-4">
                <CountrySelector selected={currentCountry} onChange={handleCountryChange} />
              </div>
            </div>

            <div className="hidden md:block">
              <Button variant="primary" onClick={() => navigateTo('/', 'contacto')} withArrow>
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
                <CountrySelector selected={currentCountry} onChange={handleCountryChange} />
              </div>
              <button onClick={() => navigateTo('/', 'metodologia')} className="text-left py-3 font-bold text-slate-600 border-b border-slate-50">Metodología</button>
              <button onClick={() => navigateTo('/programas')} className="text-left py-3 font-bold text-slate-600 border-b border-slate-50">Programas</button>
              <button onClick={() => navigateTo('/diagnostico')} className="text-left py-3 font-bold text-slate-600 border-b border-slate-50">Radar Calibre</button>
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
                    <div className={`transition-all duration-700 ease-in-out transform ${heroMessageIndex === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 hidden'}`}>
                      <h1 className="text-4xl md:text-6xl lg:text-[64px] font-medium tracking-tight text-[#141414] leading-[1.1] mb-6">
                        {localizedContent.heroTitle}
                      </h1>
                      <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                        {localizedContent.heroSubtitle}
                      </p>
                    </div>

                    <div className={`transition-all duration-700 ease-in-out transform ${heroMessageIndex === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
                      <h1 className="text-4xl md:text-6xl lg:text-[64px] font-medium tracking-tight text-[#141414] leading-[1.1] mb-6">
                        {defaultContent.heroTitle}
                      </h1>
                      <h2 className="sr-only">Frenamos la rotación y recuperamos el foco de tu equipo</h2> {/* SEO Header */}
                      <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                        {defaultContent.heroSubtitle}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <Button onClick={() => navigateTo('/', 'contacto')} variant="primary" withArrow>
                        Solicitar propuesta {currentCountry === 'MX' ? 'NOM-035' : ''}
                      </Button>
                      <Button onClick={() => navigateTo('/demo/impacto')} variant="lime">
                        <Zap size={16} className="mr-1" />
                        Radar de Impacto
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
                          <span className="text-sm font-bold text-[#141414]">Talleres Grupales Activos</span>
                        </div>
                      </div>
                    </div>

                    {/* Stats Card */}
                    <div className="md:col-span-4 bg-[#F2F5F9] rounded-[2.5rem] p-8 flex flex-col justify-center relative overflow-hidden">
                      {/* Decorative background circle */}
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#E6F1D5] rounded-full blur-3xl opacity-50"></div>

                      <h3 className="text-2xl font-bold text-[#141414] mb-2">Resultados <br />Tangibles</h3>
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
                        <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between">
                          <span className="font-bold text-slate-700">Engagement</span>
                          <span className="font-extrabold text-green-600">+41%</span>
                        </div>
                        <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between">
                          <span className="font-bold text-slate-700">Burnout</span>
                          <span className="font-extrabold text-slate-400">-32%</span>
                        </div>
                        <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between">
                          <span className="font-bold text-slate-700">Productividad</span>
                          <span className="font-extrabold text-green-600">+30%</span>
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
                  <h2 className="text-4xl md:text-5xl lg:text-[46px] font-normal tracking-tight mb-6 text-[#141414] leading-[1.2]">
                    Mejora contínua, <br />
                    <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl inline-block mt-2 text-[#141414]">antes de que el equipo colapse.</span>
                  </h2>
                  <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed">
                    Nuestra metodología combina tecnología (IA) y clínica humana en un ciclo constante de 4 pasos.
                  </p>
                </RevealOnScroll>

                <div className="grid md:grid-cols-4 gap-8 relative px-4">
                  {/* Connecting Line (Desktop only) */}
                  <div className="hidden md:block absolute top-[60px] left-0 w-full h-0.5 border-t-2 border-dashed border-slate-200 -z-0" aria-hidden="true"></div>

                  {/* Step 1 */}
                  <RevealOnScroll delay={0} className="relative z-10 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg hover:-translate-y-2 hover:border-[#84cc16] hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-bold text-2xl mb-6 mx-auto shadow-xl shadow-slate-900/20">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-[#141414] mb-3 text-center">Diagnóstico</h3>
                    <p className="text-slate-500 text-sm font-medium text-center leading-relaxed">
                      Radiografía inicial veloz: 6 preguntas (Pulso Calibre) para detectar focos rojos sin fatigar al equipo.
                    </p>
                  </RevealOnScroll>

                  {/* Step 2 */}
                  <RevealOnScroll delay={100} className="relative z-10 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg hover:-translate-y-2 hover:border-[#84cc16] hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#E6F1D5] text-[#365314] flex items-center justify-center font-bold text-2xl mb-6 mx-auto">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-[#141414] mb-3 text-center">Plan de Acción</h3>
                    <p className="text-slate-500 text-sm font-medium text-center leading-relaxed">
                      Nuestra IA + equipo clínico generan recomendaciones automáticas personalizadas por equipo.
                    </p>
                  </RevealOnScroll>

                  {/* Step 3 */}
                  <RevealOnScroll delay={200} className="relative z-10 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg hover:-translate-y-2 hover:border-[#84cc16] hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-bold text-2xl mb-6 mx-auto shadow-xl shadow-slate-900/20">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-[#141414] mb-3 text-center">Intervención</h3>
                    <p className="text-slate-500 text-sm font-medium text-center leading-relaxed">
                      Ejecución de talleres o atención 1:1. Cada acción se registra en plataforma para trazabilidad.
                    </p>
                  </RevealOnScroll>

                  {/* Step 4 */}
                  <RevealOnScroll delay={300} className="relative z-10 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg hover:-translate-y-2 hover:border-[#84cc16] hover:shadow-xl transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-[#E6F1D5] text-[#365314] flex items-center justify-center font-bold text-2xl mb-6 mx-auto">
                      4
                    </div>
                    <h3 className="text-xl font-bold text-[#141414] mb-3 text-center">Impacto Real</h3>
                    <p className="text-slate-500 text-sm font-medium text-center leading-relaxed">
                      Pulso Calibre mensual automático. Verificamos si los KPIs (Burnout/Foco) mejoraron realmente.
                    </p>
                  </RevealOnScroll>
                </div>
              </Section>

              {/* SECTION: BUSINESS IMPACT - Precisely aligned to Ayarx compact style */}
              <Section className="py-12 md:py-24">
                <div className="max-w-[1400px] mx-auto bg-[#F8F8F8] rounded-[3.5rem] px-8 md:px-16 lg:px-20 py-12 md:py-16 border border-slate-100/50 shadow-sm relative overflow-hidden">
                  <RevealOnScroll>
                    {/* Top Row: Heading and Small Description */}
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12 lg:mb-16">
                      <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-5xl lg:text-[46px] font-normal tracking-tight text-[#141414] leading-[1.2]">
                          Evita licencias y <br />
                          <span className="text-[#868686] font-normal">renuncias inesperadas.</span>
                        </h2>
                      </div>
                      <div className="max-w-[280px] lg:pt-4">
                        <div className="flex gap-4">
                          <div className="mt-1 shrink-0">
                            <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[11px] text-slate-400 font-bold">?</div>
                          </div>
                          <p className="text-[11px] text-slate-500/70 leading-relaxed font-medium">
                            Evita la fuga de talento senior a través de tecnología clínica diseñada para el impacto real de tu negocio.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Feature Grid: 3 columns with checkmarks (Ayarx Compact Style) */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                      {[
                        { title: "Reducción de Riesgo Legal" },
                        { title: "Optimización de Costos" },
                        { title: "Employer Branding" },
                        { title: "Trazabilidad Clínica" },
                        { title: "Evitar Rotación" },
                        { title: "ROI Validado" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-5 group">
                          <div className="shrink-0 w-12 h-12 rounded-full bg-[#DBE4F5] flex items-center justify-center transition-colors group-hover:bg-[#DBE4F5]/80">
                            <Check size={20} className="text-[#141414]" strokeWidth={2.5} />
                          </div>
                          <h4 className="text-xl lg:text-[26px] font-normal text-[#141414] tracking-tight leading-tight">{item.title}</h4>
                        </div>
                      ))}
                    </div>

                  </RevealOnScroll>
                </div>
              </Section>

              {/* NEW: Anti-EAP Table */}
              <Section className="py-12 md:py-24 bg-white">
                <AntiEAPTable />
              </Section>



              {/* NEW: Measurement Section - 6 Vectors & AI (Comparison) */}
              <Section id="medicion-avanzada" className="bg-white pt-0 pb-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <RevealOnScroll>
                    <div className="flex items-center gap-3 mb-6">
                      {/* Badge Removed */}
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-[46px] font-normal tracking-tight mb-6 text-[#141414] leading-[1.2]">
                      Diagnóstico Clínico <br />
                      <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl inline-block mt-1 text-[#141414]">Radar de Riesgo y Foco.</span>
                    </h2>
                    <p className="text-slate-500 mb-8 leading-relaxed text-lg md:text-xl font-medium">
                      Sabemos quién necesita un respiro hoy. Evaluamos <strong>6 vectores críticos</strong> de riesgo con soporte de <strong>IA (Gemini)</strong> para detectar fricciones invisibles.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                      {[
                        {
                          title: "Entusiasmo",
                          value: "Motivación",
                          desc: "Nivel de pasión y compromiso emocional con el trabajo."
                        },
                        {
                          title: "Vitalidad",
                          value: "Energía",
                          desc: "Energía física y mental disponible para afrontar desafíos."
                        },
                        {
                          title: "Claridad",
                          value: "Foco",
                          desc: "Comprensión clara de objetivos, roles y expectativas."
                        },
                        {
                          title: "Comunicación",
                          value: "Vínculos",
                          desc: "Calidad y fluidez en el intercambio de información."
                        },
                        {
                          title: "Seguridad",
                          value: "Confianza",
                          desc: "Sensación de seguridad psicológica y estabilidad."
                        },
                        {
                          title: "Reconocimiento",
                          value: "Valoración",
                          desc: "Percepción de ser valorado y apreciado por el aporte."
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#F8FAFC] p-4 rounded-[1.5rem] border border-slate-100 text-center hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group relative overflow-hidden h-32 flex items-center justify-center cursor-default">

                          {/* Default Content */}
                          <div className="w-full transition-all duration-300 group-hover:opacity-0 group-hover:scale-90 absolute">
                            <div className="w-2 h-2 rounded-full bg-slate-200 mx-auto mb-3"></div>
                            <div className="text-[#141414] font-bold text-base mb-1">{item.title}</div>
                            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wide">{item.value}</div>
                          </div>

                          {/* Hover Content */}
                          <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 scale-95 group-hover:scale-100">
                            <p className="text-slate-600 text-xs font-medium leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                      <Button variant="lime" onClick={() => navigateTo('/demo/pulso')} withArrow className="text-sm">
                        Ver Demo del Pulso
                      </Button>
                      <Button variant="primary" onClick={() => navigateTo('/demo/impacto')} withArrow className="shadow-xl shadow-slate-900/20 text-sm">
                        Radar de Impacto
                      </Button>
                    </div>
                  </RevealOnScroll>

                  <RevealOnScroll delay={200}>
                    <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                      {/* AI Badge */}
                      <div className="absolute top-8 right-8 bg-[#E9F5DB] text-[#365314] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-[#d3e8b9] flex items-center gap-2">
                        <Sparkles size={12} />
                        Powered by Gemini AI
                      </div>

                      <div className="mb-10">
                        <h3 className="font-bold text-[#141414] text-lg">Radar de Impacto</h3>
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Análisis de Vectores</p>
                      </div>

                      <div className="relative w-full aspect-square max-w-md mx-auto">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <RadarEvolution />
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                </div>
              </Section>


              {/* NEW: Manager View (Empowerment) */}
              <Section className="bg-white">
                <ManagerView />
              </Section>

              {/* Team Preview Section */}
              <Section id="equipo-preview" className="bg-[#F8FAFC] rounded-t-[4rem]">
                <RevealOnScroll className="flex flex-col md:flex-row justify-between items-end mb-12">
                  <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl lg:text-[46px] font-normal tracking-tight text-[#141414] mb-4">
                      Nuestro <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl text-[#141414]">Equipo de Especialistas</span>
                    </h2>
                    <p className="text-slate-500 text-lg md:text-xl font-medium">
                      Consultores clínicos y neurocientíficos colegiados. <br /> Sin gurús ni charlas genéricas, solo salud mental real.
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
                  <h2 className="text-3xl md:text-4xl lg:text-[46px] font-normal tracking-tight mb-4 text-[#141414]">
                    Programas <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl text-[#141414]">de Impacto</span>
                  </h2>
                  <p className="text-slate-500 text-lg md:text-xl font-medium">
                    Soluciones diseñadas para mover indicadores específicos de salud mental.
                  </p>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Wide */}
                  <RevealOnScroll className="md:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 relative group overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-[#E6F1D5] rounded-full blur-[80px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-[#F2F5F9] rounded-2xl text-[#141414]"><Users size={24} /></div>
                        <span className="text-xs font-bold text-[#365314] uppercase tracking-widest bg-[#E6F1D5] px-3 py-1.5 rounded-full">Programa Core</span>
                      </div>
                      <h3 className="text-xl lg:text-[26px] font-normal text-[#141414] mb-3">{content.programLabel}</h3>
                      <p className="text-slate-500 mb-8 max-w-md font-medium text-lg leading-relaxed">Ciclos mensuales o bimestrales que combinan grupos de regulación, atención 1:1 y Pulsos continuos.</p>

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
                    <div className="p-3 bg-[#F2F5F9] rounded-2xl text-[#141414] w-fit mb-6"><Brain size={24} /></div>
                    <h3 className="text-xl lg:text-[26px] font-normal text-[#141414] mb-3">{content.therapyLabel}</h3>
                    <p className="text-slate-500 mb-6 flex-grow font-medium leading-relaxed">Espacio confidencial para empleados con consultores clínicos. Packs de 4 encuentros o demanda espontánea.</p>
                    <Button onClick={() => navigateTo('/', 'contacto')} variant="lime" className="w-full">
                      Agendar Pack
                    </Button>
                  </RevealOnScroll>

                  {/* Card 3: Taller Flash */}
                  <RevealOnScroll delay={200} className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
                    <div className="p-3 bg-[#F2F5F9] rounded-2xl text-[#141414] w-fit mb-6"><Zap size={24} /></div>
                    <h3 className="text-xl lg:text-[26px] font-normal text-[#141414] mb-3">Taller Flash</h3>
                    <p className="text-slate-500 mb-6 flex-grow font-medium leading-relaxed">Intervención única de 60 minutos. Diagnóstico + Herramientas de alivio inmediato.</p>
                    <Button onClick={() => navigateTo('/programas')} variant="lime" className="w-full">
                      Ver Opciones
                    </Button>
                  </RevealOnScroll>
                </div>
              </Section>

              {/* NEW: Implementation Roadmap */}
              <Section className="bg-[#F8FAFC]">
                <ImplementationRoadmap />
              </Section>

              {/* NEW: Business Case */}
              <Section className="bg-white">
                <BusinessCase />
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
                    <RevealOnScroll delay={i * 100} key={i} className="bg-[#F8F8F8] p-8 rounded-[2rem] text-center border border-slate-100/50 hover:border-slate-200 transition-all">
                      <h3 className="text-xl font-normal text-[#141414] mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </RevealOnScroll>
                  ))}
                </div>
              </Section>

              {/* FAQ Section */}
              <Section className="bg-white py-12">
                <div className="grid md:grid-cols-12 gap-12">
                  <div className="md:col-span-4">
                    <RevealOnScroll>
                      <h2 className="text-3xl md:text-4xl lg:text-[46px] font-normal tracking-tight mb-6 text-[#141414] leading-tight">
                        Dudas <br />
                        <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl inline-block mt-1 text-[#141414]">habituales.</span>
                      </h2>
                      <p className="text-slate-500 text-lg md:text-xl font-medium mb-8 leading-relaxed">
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
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6F1D5] rounded-full blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                  <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden grid md:grid-cols-2 relative z-10">

                    <div className="p-10 md:p-14 flex flex-col justify-center">
                      <h2 className="text-3xl md:text-5xl lg:text-[46px] font-normal tracking-tight text-[#141414] mb-6 leading-tight">
                        Hablemos de <br />
                        <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl inline-block mt-1 text-[#141414]">tu equipo.</span>
                      </h2>
                      <p className="text-slate-500 mb-8 font-medium text-lg md:text-xl leading-relaxed">
                        Agenda una llamada de 15 minutos para obtener una propuesta a medida y un diagnóstico inicial sin costo.
                      </p>

                      <div className="flex flex-col gap-4 mt-auto">
                        <div className="flex items-center gap-4 p-4 rounded-3xl bg-[#F8FAFC] border border-slate-50">
                          <div className="w-10 h-10 rounded-full bg-[#E6F1D5] flex items-center justify-center text-[#365314] font-bold text-sm border border-[#d3e8b9]">
                            <Phone size={20} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Llamada Directa</p>
                            <p className="text-[#141414] font-bold text-lg">+54 9 11 1234 5678</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-10 md:p-14 bg-slate-50/50 border-l border-slate-100">
                      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-2">Nombre</label>
                            <input type="text" className="w-full px-5 py-3.5 rounded-full bg-white border border-slate-200 text-[#141414] focus:border-slate-900 focus:ring-0 outline-none transition-all placeholder:text-slate-300" placeholder="Tu nombre" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-2">Apellido</label>
                            <input type="text" className="w-full px-5 py-3.5 rounded-full bg-white border border-slate-200 text-[#141414] focus:border-slate-900 focus:ring-0 outline-none transition-all placeholder:text-slate-300" placeholder="Tu apellido" />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-2">Email Corporativo</label>
                          <input type="email" className="w-full px-5 py-3.5 rounded-full bg-white border border-slate-200 text-[#141414] focus:border-slate-900 focus:ring-0 outline-none transition-all placeholder:text-slate-300" placeholder="nombre@empresa.com" />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-2">¿Qué buscas?</label>
                          <div className="relative">
                            <select className="w-full px-5 py-3.5 rounded-full bg-white border border-slate-200 text-[#141414] focus:border-slate-900 outline-none transition-all appearance-none cursor-pointer">
                              <option>Taller Inicial (Prueba)</option>
                              <option>Programa Completo</option>
                              <option>Soporte Clínico 1:1</option>
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
          <Route path="/exclusive" element={<ProposalLanding onBack={() => navigateTo('/')} onContact={() => navigateTo('/', 'contacto')} />} />

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
                <div className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-[#141414] mb-6">
                  <div className="w-8 h-8 bg-[#141414] rounded-full flex items-center justify-center text-white">
                    <Target size={16} className="text-[#E6F1D5]" />
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
                <h4 className="font-bold text-[#141414] mb-6 text-lg">Explorar</h4>
                <ul className="space-y-4 text-base font-medium text-slate-600">
                  <li><button onClick={() => navigateTo('/', 'metodologia')} className="hover:text-[#141414] transition-colors">Metodología</button></li>
                  <li><button onClick={() => navigateTo('/programas')} className="hover:text-[#141414] transition-colors">Programas</button></li>
                  <li><button onClick={() => navigateTo('/equipo')} className="hover:text-[#141414] transition-colors">Equipo</button></li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-bold text-[#141414] mb-6 text-lg">Recursos</h4>
                <ul className="space-y-4 text-base font-medium text-slate-600">
                  <li><button onClick={() => navigateTo('/terapeutas')} className="hover:text-[#141414] transition-colors">Soy Profesional</button></li>
                  <li><a href="#" className="hover:text-[#141414] transition-colors">Blog</a></li>
                  <li><button onClick={() => navigateTo('/recursos')} className="hover:text-[#141414] transition-colors">Guías y Recursos</button></li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-bold text-[#141414] mb-6 text-lg">Legal</h4>
                <ul className="space-y-4 text-base font-medium text-slate-600">
                  <li><a href="#" className="hover:text-[#141414] transition-colors">Privacidad</a></li>
                  <li><a href="#" className="hover:text-[#141414] transition-colors">Términos</a></li>
                </ul>
              </div>

              {/* CTA Column */}
              <div className="md:col-span-2 flex flex-col items-start md:items-end">
                <button
                  onClick={() => navigateTo('/', 'contacto')}
                  className="bg-white text-[#141414] px-6 py-3 rounded-full font-bold shadow-sm hover:shadow-md transition-all whitespace-nowrap"
                >
                  Contactar Ahora
                </button>
                <div className="flex gap-2 mt-4">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#141414] shadow-sm hover:scale-110 transition-transform">
                    <MessageCircle size={18} />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#141414] shadow-sm hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section with Central Icon */}
            <div className="relative border-t border-slate-300/30 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">

              {/* Central Icon - More refined styling */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#141414] text-[#E6F1D5] w-12 h-12 rounded-full flex items-center justify-center shadow-2xl ring-[6px] ring-[#E3E8F5]">
                <Target size={20} strokeWidth={2.5} />
              </div>

              <div className="mt-8 md:mt-0 flex items-center gap-6">
                <span className="hover:text-slate-600 transition-colors cursor-pointer">info@calibre.lat</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="hover:text-slate-600 transition-colors cursor-pointer">Argentina / México / Chile</span>
              </div>

              <div className="mt-4 md:mt-0">
                © 2024 Calibre • Clinical Solutions
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