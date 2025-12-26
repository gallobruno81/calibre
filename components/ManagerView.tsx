import React from 'react';
import { Target, MessageCircle, BarChart3, Zap, ArrowRight, UserCheck } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export const ManagerView: React.FC = () => {
    return (
        <div className="w-full max-w-[1400px] mx-auto py-24 px-6">
            <RevealOnScroll>
                <div className="bg-slate-900 rounded-[3.5rem] p-8 md:p-16 lg:p-20 relative overflow-hidden text-white shadow-2xl">
                    {/* Decorative background elements */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E6F1D5]/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none"></div>

                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        {/* Left Content */}
                        <div className="lg:col-span-6 relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="bg-[#E6F1D5] text-[#141414] text-[10px] font-extrabold px-4 py-2 rounded-full uppercase tracking-widest">
                                    Empoderamiento
                                </span>
                                <div className="h-px w-12 bg-slate-700"></div>
                                <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Devuelve la autonomía</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-normal tracking-tight mb-8 leading-[1.1]">
                                Vista del Manager: <br />
                                <span className="text-slate-400">Líderes que se hacen cargo.</span>
                            </h2>

                            <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed font-medium">
                                RRHH ya no es el embudo donde caen todos los problemas de equipo. Dale herramientas a tus líderes para que gestionen la salud de su gente en tiempo real.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-8 mb-12">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E6F1D5]">
                                        <UserCheck size={24} />
                                    </div>
                                    <h4 className="text-xl font-bold tracking-tight">Mini-Dashboard Propio</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed font-medium">Cada Manager ve únicamente los KPIs de su equipo directo para tomar decisiones ágiles.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[#E6F1D5] flex items-center justify-center text-slate-900">
                                        <Zap size={24} />
                                    </div>
                                    <h4 className="text-xl font-bold tracking-tight text-[#E6F1D5]">Sugerencias de IA</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed font-medium">"Tu equipo está con el foco bajo, agenda este taller de 15 min". El sistema empuja la acción.</p>
                                </div>
                            </div>

                            <button className="flex items-center gap-3 text-white font-bold text-sm uppercase tracking-widest group border-b-2 border-[#E6F1D5] pb-2 hover:text-[#E6F1D5] transition-colors">
                                Ver demo de la vista manager <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Right Visual - Dashboard Mockup */}
                        <div className="lg:col-span-6 relative">
                            <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-4 md:p-8 shadow-2xl relative">
                                {/* Mockup Elements */}
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xs italic">Team Alpha</div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-0.5">Manager View</p>
                                            <p className="text-sm font-bold">Marketing & Growth</p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full uppercase tracking-widest border border-green-500/30 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                                        Saludable
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                                        <p className="text-xs text-slate-500 font-bold mb-2">Foco del Equipo</p>
                                        <div className="text-2xl font-bold text-[#E6F1D5]">84%</div>
                                        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                                            <div className="w-[84%] h-full bg-[#E6F1D5] rounded-full"></div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                                        <p className="text-xs text-slate-500 font-bold mb-2">Riesgo de Burnout</p>
                                        <div className="text-2xl font-bold text-slate-400">12%</div>
                                        <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                                            <div className="w-[12%] h-full bg-slate-400 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* AI Recommendation Card */}
                                <div className="bg-[#E6F1D5] p-6 rounded-[2rem] text-slate-900 shadow-xl transform translate-x-4 translate-y-4 md:translate-x-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg">
                                            <Zap size={14} />
                                        </div>
                                        <h5 className="font-bold text-sm tracking-tight">Acción Sugerida Calibre</h5>
                                    </div>
                                    <p className="text-xs font-medium leading-relaxed mb-4">
                                        "Detectamos una baja en el vector <b>Claridad</b> esta semana. Recomendamos agendar el taller flash de 15 min sobre 'Priorización A/B'."
                                    </p>
                                    <button className="w-full py-3 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-transform">
                                        Agendar Taller
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
    );
};
