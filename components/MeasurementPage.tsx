import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Section } from './Section';
import { RevealOnScroll } from './RevealOnScroll';
import { Button } from './Button';
import { ShieldCheck, Lock, Zap, BarChart3, Activity, Brain, Battery, AlertTriangle, ArrowRight, MessageCircle, Sparkles, CheckCircle2, Phone, Users, TrendingUp, Clock, LayoutGrid, Award } from 'lucide-react';
import { MeasurementChart } from './MeasurementChart';

interface MeasurementPageProps {
  onBack: () => void;
}

export const MeasurementPage: React.FC<MeasurementPageProps> = ({ onBack }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] selection:bg-[#E9F5DB] selection:text-slate-900 font-sans">

      {/* 1. HERO SECTION */}
      <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto">
        <RevealOnScroll>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 lg:pl-12">


              <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Medimos lo que
                <span className="bg-[#E9F5DB] px-3 py-1 rounded-xl inline-block text-slate-900 ml-2">
                  realmente importa.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-lg font-medium">
                Indicadores claros para prevenir burnout y mejorar la retención. Deje de adivinar, empiece a saber.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" onClick={() => document.querySelector('#action-section')?.scrollIntoView({ behavior: 'smooth' })} withArrow>
                  Solicitar Propuesta
                </Button>
                <Button variant="lime" onClick={() => navigate('/demo/impacto')}>
                  Ver Demo (Panel)
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-4 text-sm font-bold text-slate-400">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p>+50 directores confían en nosotros</p>
              </div>
            </div>

            {/* Right Image (Complex Composition) */}
            <div className="order-1 lg:order-2 relative px-4">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="/assets/hr_hero_modern.png"
                  alt="HR Manager"
                  className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Overlay Card 1: Stat */}
                <div className="absolute top-10 right-10 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-slate-100 max-w-[180px] animate-in slide-in-from-right-10 fade-in duration-1000">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg text-green-700"><TrendingUp size={18} /></div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Vitalidad</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">+18%</p>
                  <p className="text-xs text-green-600 font-bold mt-1">vs mes anterior</p>
                </div>

                {/* Overlay Card 2: Status */}
                <div className="absolute bottom-10 left-10 bg-slate-900 p-6 rounded-3xl shadow-xl text-white max-w-[240px] animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold opacity-80">Sistema Activo</span>
                  </div>
                  <p className="text-sm opacity-80 leading-relaxed">
                    "Calibre detectó el problema de comunicación en el Q2."
                  </p>
                </div>
              </div>
              {/* Decorative Blob */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#E9F5DB]/50 to-purple-50/50 rounded-full blur-3xl opacity-60"></div>
            </div>
          </div>
        </RevealOnScroll>
      </div>



      {/* 3. CYCLE SECTION (Landing Style) */}
      <Section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: Content & Steps */}
            <div>
              <div className="inline-block bg-[#E9F5DB] text-[#365314] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                Nuestra Metodología
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
                Ciclo de Salud <br /> Corporativa.
              </h2>
              <p className="text-slate-500 mb-10 leading-relaxed text-lg font-medium max-w-lg">
                Un sistema continuo de medición, análisis e intervención que se repite y mejora en el tiempo.
              </p>



              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "1. Pulso Mensual",
                    desc: "Encuestas breves de 6 preguntas.",
                    sub: "Frecuencia mensual para detectar tendencias ágiles.",
                    link: "/demo/pulso",
                    linkText: "Ver Demo Pulso"
                  },
                  {
                    title: "2. Análisis IA",
                    desc: "Patrones de riesgo automáticos.",
                    sub: "Identificación de burnout y fricción en equipos.",
                    link: "/demo/impacto",
                    linkText: "Ver Demo Panel"
                  },
                  {
                    title: "3. Programas de Bienestar",
                    desc: "Intervenciones dirigidas.",
                    sub: "Sesiones terapéuticas, espacios grupales o trabajo con managers.",
                    link: "/programas",
                    linkText: "Ver Programas"
                  },
                  {
                    title: "4. Medición de Impacto",
                    desc: " Validación de resultados.",
                    sub: "Reportes comparativos para verificar la mejora real del bienestar.",
                    link: null,
                    linkText: null
                  }
                ].map((step, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative group">
                    <div className="text-slate-900 font-bold text-lg mb-1">{step.title}</div>
                    <div className="text-slate-400 text-sm font-medium mb-3">{step.desc}</div>
                    <div className="text-slate-400 text-xs leading-relaxed mb-4">{step.sub}</div>

                    {step.link && (
                      <button
                        onClick={() => navigate(step.link!)}
                        className="text-[10px] font-bold uppercase tracking-wider text-[#84cc16] flex items-center gap-1 hover:underline opacity-80 hover:opacity-100"
                      >
                        {step.linkText} <ArrowRight size={10} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-slate-400 text-xs font-medium mt-6 italic">
                El ciclo se repite trimestralmente, generando mejora continua basada en datos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button variant="lime" onClick={() => navigate('/demo/impacto')} withArrow>
                  Ver Dashboard
                </Button>
              </div>
            </div>

            {/* Right: Big Visual Card - Matching "Reporte de Calibre" Style */}
            <div className="relative">
              <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Reporte de Calibre</h3>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Ciclo Trimestral</p>
                  </div>
                  <div className="bg-[#E9F5DB] p-2 rounded-full">
                    <Activity size={20} className="text-[#365314]" />
                  </div>
                </div>

                <MeasurementChart />

                <p className="text-[10px] text-slate-400 text-center mt-4 font-medium opacity-80">
                  Resultados agregados en equipos intervenidos. No datos individuales.
                </p>
              </div>
            </div>

          </div>
        </div>
      </Section>



      {/* 4. TRANSFORM SECTION (From Demo) */}
      <div id="action-section" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-block p-4 bg-[#E9F5DB] rounded-2xl text-[#0f172a] mb-8 shadow-sm">
              <MessageCircle size={32} />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-[#0f172a] leading-tight">Transformamos sensaciones en datos.</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">
              Utilizamos una encuesta anónima de 6 variables (Entusiasmo, Vitalidad, Claridad, Comunicación, Seguridad y Reconocimiento) para darte KPIs clínicos claros y accionables, que se repite en el tiempo para medir cambio real, no percepciones aisladas.
            </p>
            <div className="flex flex-wrap gap-4 items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"><div className="w-2 h-2 bg-[#10b981] rounded-full"></div> Claro</span>
              <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"><div className="w-2 h-2 bg-[#10b981] rounded-full"></div> Medible</span>
              <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"><div className="w-2 h-2 bg-[#10b981] rounded-full"></div> Accionable</span>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl relative border border-slate-100 ring-1 ring-slate-900/5">


            <h3 className="text-2xl font-bold mb-6 text-[#0f172a]">Crear Perfil de Manager</h3>
            <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#0f172a] mb-2">Nombre de la Empresa</label>
                <input
                  type="text"
                  readOnly
                  className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0f172a] outline-none transition font-medium cursor-pointer"
                  placeholder="Ej. Tech Solutions Inc."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#0f172a] mb-2">Tu Nombre (Manager)</label>
                <input
                  type="text"
                  readOnly
                  className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0f172a] outline-none transition font-medium cursor-pointer"
                  placeholder="Ej. Ana García"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="primary" type="submit" className="w-full justify-center" withArrow>
                  Comenzar Medición
                </Button>
                <Button variant="lime" type="button" onClick={() => navigate('/demo/impacto')} className="w-full justify-center" withArrow>
                  Ver Demo (Panel)
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>

  );
};