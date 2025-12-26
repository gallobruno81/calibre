import React from 'react';
import { Check, X, ShieldAlert, Zap, BarChart3, Users } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';

export const AntiEAPTable: React.FC = () => {
    const comparisons = [
        {
            feature: "Naturaleza",
            eap: "Pasivo: El empleado tiene que llamar.",
            calibre: "Activo: Nosotros detectamos el riesgo antes.",
            icon: <ShieldAlert size={18} />
        },
        {
            feature: "Reportes",
            eap: "Reportes básicos anuales.",
            calibre: "Dashboard en tiempo real con alertas.",
            icon: <BarChart3 size={18} />
        },
        {
            feature: "Atención",
            eap: "Generalista (un psicólogo para todo).",
            calibre: "Especialistas clínicos asignados a tu equipo.",
            icon: <Users size={18} />
        },
        {
            feature: "Uso / Adopción",
            eap: "Uso bajo (<3%).",
            calibre: "Uso alto (>40%) por integración constante.",
            icon: <Zap size={18} />
        }
    ];

    return (
        <div className="w-full max-w-5xl mx-auto mt-12 overflow-hidden">
            <RevealOnScroll>
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-[#141414] mb-4">
                        Calibre <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl text-[#141414]">no es un EAP tradicional.</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                        Dejamos atrás las líneas 0-800 que nadie usa para pasar a una intervención clínica activa y medible.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="p-6 md:p-8 text-left text-xs font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 w-1/3">Criterio</th>
                                <th className="p-6 md:p-8 text-left text-xs font-bold text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 w-1/3">Beneficio Tradicional (EAP)</th>
                                <th className="p-6 md:p-8 text-left text-xs font-bold text-[#365314] uppercase tracking-[0.2em] border-b border-slate-100 bg-[#E6F1D5]/20 w-1/3">Modelo Calibre (Audit & Action)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisons.map((row, i) => (
                                <tr key={i} className="group hover:bg-slate-50/30 transition-colors">
                                    <td className="p-6 md:p-8 border-b border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                                {row.icon}
                                            </div>
                                            <span className="font-bold text-[#141414]">{row.feature}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 md:p-8 border-b border-slate-100">
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <X size={16} className="shrink-0" />
                                            <span className="text-sm font-medium">{row.eap}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 md:p-8 border-b border-slate-100 bg-[#E6F1D5]/10">
                                        <div className="flex items-center gap-3 text-[#365314]">
                                            <Check size={16} className="shrink-0" />
                                            <span className="text-sm font-bold">{row.calibre}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="p-6 md:p-8 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#E6F1D5] flex items-center justify-center text-[#141414]">
                                <Zap size={24} fill="#141414" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white mb-0.5">Diferencia de Impacto</p>
                                <p className="text-xs text-slate-400 font-medium whitespace-nowrap">Pasamos del cumplimiento a la transformación real.</p>
                            </div>
                        </div>
                        <div className="text-4xl font-bold text-[#E6F1D5]">10x <span className="text-xs text-white uppercase tracking-widest font-bold ml-1">más adopción</span></div>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
    );
};
