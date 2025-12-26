import React, { useEffect } from 'react';
import { Section } from './Section';
import { RevealOnScroll } from './RevealOnScroll';
import { Button } from './Button';
import {
    BarChart3,
    TrendingUp,
    ShieldCheck,
    ArrowRight,
    Download,
    Target,
    Users,
    Briefcase
} from 'lucide-react';

interface ProposalLandingProps {
    onBack: () => void;
    onContact: () => void;
}

export const ProposalLanding: React.FC<ProposalLandingProps> = ({ onBack, onContact }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white selection:bg-[#E9F5DB] selection:text-slate-900 font-sans text-slate-900">
            {/* Header for Corporate View */}
            <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 h-20 flex items-center shadow-sm">
                <div className="max-w-[1400px] mx-auto px-6 w-full flex justify-between items-center">
                    <div className="flex items-center gap-2 font-bold text-xl cursor-pointer" onClick={onBack}>
                        <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white">
                            <Target size={16} className="text-[#E9F5DB]" />
                        </div>
                        <span>Calibre Business<span className="text-slate-400">.</span></span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Vista Exclusiva Gerencia</span>
                        <Button variant="primary" onClick={onContact} className="text-sm py-2 px-6 rounded-full">Solicitar Propuesta PDF</Button>
                    </div>
                </div>
            </nav>

            {/* Hero: Economic Rational */}
            <Section className="pt-40 pb-20 md:pt-48">
                <div className="max-w-4xl mx-auto text-center">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-8">
                            Confidencial • Business Case 24/25
                        </div>
                        <h1 className="text-4xl md:text-6xl font-medium text-slate-900 leading-[1.1] mb-8 tracking-tight">
                            Salud Mental como <br />
                            <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900 mt-2">Activo Estratégico.</span>
                        </h1>
                        <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                            No es solo bienestar. Es una herramienta de mitigación de riesgo financiero y optimización de capital humano con impacto directo en el P&L.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="primary" onClick={onContact} withArrow className="px-8 py-4">Ver Modelo de ROI</Button>
                            <Button onClick={onContact} className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-8 py-4 rounded-full font-bold flex items-center">
                                <Download size={18} className="mr-2" /> Business Case (PDF)
                            </Button>
                        </div>
                    </RevealOnScroll>
                </div>
            </Section>

            {/* Hard Data Grid */}
            <Section className="bg-[#F8FAFC] py-24 rounded-[4rem] mx-4">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <RevealOnScroll className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:border-slate-200 transition-all duration-500">
                            <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-8 border border-slate-100">
                                <BarChart3 size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Reducción de Costos</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                                Disminuimos el ausentismo y las licencias médicas psiquiátricas mediante intervención clínica temprana.
                            </p>
                            <div className="text-slate-900 font-medium text-4xl tracking-tighter">-28% <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] pl-2">Sector Avg</span></div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={100} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:border-slate-200 transition-all duration-500">
                            <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mb-8 border border-slate-100">
                                <TrendingUp size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Retención de Talento</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                                Aumentamos el Life Time Value del colaborador clave reduciendo la tasa de rotación voluntaria por burnout.
                            </p>
                            <div className="text-slate-900 font-medium text-4xl tracking-tighter">+15% <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] pl-2">Retention</span></div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={200} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:border-slate-200 transition-all duration-500">
                            <div className="w-14 h-14 bg-slate-900 text-[#E9F5DB] rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-slate-900/10">
                                <ShieldCheck size={24} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Compliance Legal</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                                Mitigación de riesgos bajo normativas locales (NOM-035, Ley 40hs, SUSESO) con trazabilidad total.
                            </p>
                            <div className="text-slate-900 font-medium text-4xl tracking-tighter">100% <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] pl-2">Compliance</span></div>
                        </RevealOnScroll>
                    </div>
                </div>
            </Section>

            {/* The "SafePath" Framework */}
            <Section className="py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-5xl font-medium text-slate-900 mb-8 tracking-tight leading-tight">
                            Marco de gestión <br />
                            <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900 mt-2">SafePath™ Corporativo.</span>
                        </h2>
                        <div className="space-y-12">
                            <div className="flex gap-8 group/step">
                                <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 shrink-0 flex items-center justify-center font-bold border border-slate-100 shadow-sm group-hover/step:bg-slate-900 group-hover/step:text-white transition-all duration-500">1</div>
                                <div>
                                    <h4 className="font-bold text-xl mb-2 text-slate-900 tracking-tight">Diagnóstico de Pulso</h4>
                                    <p className="text-slate-500 text-base leading-relaxed font-medium">Medición anonimizada de 3 variables críticas: Carga Emocional, Foco Cognitivo y Energía Organizacional.</p>
                                </div>
                            </div>
                            <div className="flex gap-8 group/step">
                                <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 shrink-0 flex items-center justify-center font-bold border border-slate-100 shadow-sm group-hover/step:bg-slate-900 group-hover/step:text-white transition-all duration-500">2</div>
                                <div>
                                    <h4 className="font-bold text-xl mb-2 text-slate-900 tracking-tight">Intervención de Precisión</h4>
                                    <p className="text-slate-500 text-base leading-relaxed font-medium">Ejecución de talleres técnicos y soporte clínico 1:1 donde el dashboard detecta criticidad operativa.</p>
                                </div>
                            </div>
                            <div className="flex gap-8 group/step">
                                <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 shrink-0 flex items-center justify-center font-bold border border-slate-100 shadow-sm group-hover/step:bg-slate-900 group-hover/step:text-white transition-all duration-500">3</div>
                                <div>
                                    <h4 className="font-bold text-xl mb-2 text-slate-900 tracking-tight">Validación de Impacto (RoI)</h4>
                                    <p className="text-slate-500 text-base leading-relaxed font-medium">Reporte ejecutivo mensual sobre la mejora de indicadores de salud y métricas de clima para Gerencia.</p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={200}>
                        <div className="bg-[#F8FAFC] p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-lime-500/5 rounded-full blur-[80px]"></div>

                            <h3 className="text-2xl font-medium mb-10 italic leading-relaxed text-slate-700 border-l-4 border-lime-400 pl-8">
                                "En un mercado dominado por el dato, gestionar la salud neurofisiológica del equipo es la ventaja competitiva más subestimada de la década."
                            </h3>

                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                                    <Briefcase className="text-slate-400" size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-lg">Dirección Estratégica</p>
                                    <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">Health & Profitability Index</p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </Section>

            {/* Footer CTA: Aligned to light aesthetic */}
            <Section className="bg-white py-32 border-t border-slate-100 rounded-t-[4rem]">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-8">
                            Próximos Pasos
                        </div>
                        <h2 className="text-4xl md:text-6xl font-medium text-slate-900 mb-8 tracking-tight leading-tight">
                            ¿Diseñamos tu <br />
                            <span className="text-[#84cc16] italic">Business Case?</span>
                        </h2>
                        <p className="text-slate-500 mb-12 text-xl max-w-xl mx-auto leading-relaxed">
                            Agenda un encuentro de consultoría técnica de 15 minutos exclusiva para niveles directivos.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Button variant="lime" onClick={onContact} className="px-12 py-5 text-lg shadow-xl shadow-lime-500/10">Agendar Llamada Directa</Button>
                            <Button onClick={onBack} className="bg-slate-100 text-slate-600 hover:bg-slate-200 px-12 py-5 rounded-full font-bold transition-all">Regresar a Home</Button>
                        </div>
                    </RevealOnScroll>
                </div>
            </Section>
        </div>
    );
};
