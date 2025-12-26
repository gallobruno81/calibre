import React from 'react';
import { Mail, BarChart3, ShieldCheck, ArrowRight } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export const ImplementationRoadmap: React.FC = () => {
    const steps = [
        {
            day: "Día 1",
            title: "Conexión simple",
            desc: "Integración sin fricción vía Slack, Teams o Email. Sin carga manual de datos ni Excels interminables.",
            icon: <Mail className="text-[#365314]" size={24} />,
            badge: "Cero Esfuerzo"
        },
        {
            day: "Día 3",
            title: "Lanzamiento del Pulso",
            desc: "Envío automático del primer Audit de Pulso Calibre (6 preguntas). Recolectamos la primera radiografía real.",
            icon: <BarChart3 className="text-[#365314]" size={24} />,
            badge: "Primer Impacto"
        },
        {
            day: "Día 7",
            title: "Dashboard de Riesgo",
            desc: "Obtienes tus primeros datos accionables. Ya sabes dónde actuar antes de que RRHH reciba el primer reclamo.",
            icon: <ShieldCheck className="text-[#365314]" size={24} />,
            badge: "Control Total"
        }
    ];

    return (
        <div className="w-full max-w-6xl mx-auto py-24">
            <RevealOnScroll>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-[#141414] mb-6">
                            Implementación <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl text-[#141414]">Cero Fricción.</span>
                        </h2>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed">
                            Sabemos que tu equipo de RRHH ya está desbordado. Diseñamos un despliegue que no te agrega trabajo administrativo.
                        </p>
                    </div>
                    <div className="bg-[#141414] text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm font-bold tracking-tight">En funcionamiento en 48 horas</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connector Line */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t border-dashed border-slate-200 -z-0" aria-hidden="true"></div>

                    {steps.map((step, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-500 group relative z-10 flex flex-col h-full">
                            <div className="text-[#141414]/10 text-6xl font-bold absolute top-6 right-8 pointer-events-none group-hover:text-[#141414]/20 transition-colors uppercase">
                                {step.day.split(' ')[1]}
                            </div>

                            <div className="mb-8 flex items-center justify-between">
                                <div className="w-14 h-14 rounded-2xl bg-[#E6F1D5] flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-lg shadow-[#E6F1D5]/20">
                                    {step.icon}
                                </div>
                                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full">
                                    {step.badge}
                                </span>
                            </div>

                            <div className="mb-2">
                                <span className="text-sm font-bold text-[#84cc16] mb-1 block">{step.day}</span>
                                <h3 className="text-2xl font-bold text-[#141414] mb-4 tracking-tight">{step.title}</h3>
                            </div>

                            <p className="text-slate-500 text-sm font-medium leading-relaxed flex-grow">
                                {step.desc}
                            </p>

                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-2 text-[#141414] font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                Ver detalle <ArrowRight size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            </RevealOnScroll>
        </div>
    );
};
