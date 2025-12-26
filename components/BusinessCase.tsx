import React from 'react';
import { FileText, Download, TrendingUp, Users, Heart } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export const BusinessCase: React.FC = () => {
    return (
        <div className="w-full max-w-[1400px] mx-auto py-24 px-6">
            <RevealOnScroll>
                <div className="bg-[#E6F1D5] rounded-[3.5rem] p-8 md:p-16 lg:p-20 relative overflow-hidden text-[#141414] shadow-xl border border-[#d3e8b9]">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/20 rounded-full blur-[80px] -mr-24 -mt-24 pointer-events-none"></div>

                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        {/* Left Content */}
                        <div className="lg:col-span-7 relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="bg-slate-900 text-white text-[10px] font-extrabold px-4 py-2 rounded-full uppercase tracking-widest">
                                    Toolkit para RRHH
                                </span>
                                <div className="h-px w-12 bg-slate-400"></div>
                                <span className="text-slate-600 text-xs font-bold uppercase tracking-widest">Aprobación Asegurada</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-normal tracking-tight mb-8 leading-[1.1] text-slate-900">
                                Haz que el proyecto <br />
                                <span className="font-bold">se apruebe solo.</span>
                            </h2>

                            <p className="text-[#365314] text-lg md:text-xl mb-12 leading-relaxed font-medium">
                                Sabemos que a veces RRHH quiere el servicio, pero no sabe cómo pedírselo al CEO/CFO. Te damos el trabajo hecho con argumentos financieros irrefutables.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-white/40 backdrop-blur-sm p-6 rounded-[2rem] border border-white/50">
                                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center mb-4">
                                        <TrendingUp size={18} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 leading-snug">
                                        "Este proyecto se paga solo evitando la renuncia de solo 2 ingenieros senior al año."
                                    </p>
                                </div>
                                <div className="bg-white/40 backdrop-blur-sm p-6 rounded-[2rem] border border-white/50">
                                    <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center mb-4">
                                        <Users size={18} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 leading-snug">
                                        "Reducimos el ausentismo por estrés clínico en un 32% en los primeros 6 meses."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Download Card */}
                        <div className="lg:col-span-5 relative">
                            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center text-[#E6F1D5] mb-8 shadow-xl shadow-slate-900/20">
                                    <FileText size={40} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Business Case para Directorio</h3>
                                <p className="text-slate-500 text-sm font-medium mb-10 leading-relaxed">
                                    Un PDF listo para presentar con KPIs, proyecciones de ahorro y roadmap estratégico.
                                </p>

                                <button className="w-full py-5 bg-[#141414] text-white rounded-full font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 transition-all hover:scale-[1.02] shadow-xl shadow-slate-900/10">
                                    <Download size={18} />
                                    Descargar PDF Gratis
                                </button>

                                <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                    Formato: PDF / 1.2 MB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
    );
};
