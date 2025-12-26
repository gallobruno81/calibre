import React from 'react';
import { Target, BarChart3, Users, HelpCircle } from 'lucide-react';

interface DemoControlBarProps {
    currentView: 'employee' | 'manager';
    onViewChange: (view: 'employee' | 'manager') => void;
    onShowHelp: () => void;
}

export const DemoControlBar: React.FC<DemoControlBarProps> = ({
    currentView,
    onViewChange,
    onShowHelp
}) => {
    return (
        <div className="w-full bg-slate-50/80 backdrop-blur-md border-b border-slate-200 fixed top-0 z-50 h-16 transition-all duration-300">
            <div className="max-w-[1600px] mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">

                {/* Left: Logo */}
                <div role="button" onClick={() => window.location.href = '/'} className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-8 h-8 bg-[#141414] rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                        <Target size={16} className="text-[#E6F1D5]" />
                    </div>
                    <span className="font-bold text-lg tracking-tight text-[#141414]">Calibre<span className="text-slate-400">.</span><span className="text-xs font-mono text-slate-400 ml-1">DEMO</span></span>
                </div>

                {/* Center: Toggle Switch */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex p-1 bg-white border border-slate-200 rounded-full shadow-sm">
                    <button
                        onClick={() => onViewChange('employee')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${currentView === 'employee'
                            ? 'bg-[#141414] text-[#E6F1D5] shadow-md'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                    >
                        <Users size={14} />
                        <span>Colaborador</span>
                    </button>

                    <button
                        onClick={() => onViewChange('manager')}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${currentView === 'manager'
                            ? 'bg-[#141414] text-[#E6F1D5] shadow-md'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                    >
                        <BarChart3 size={14} />
                        <span>Manager</span>
                    </button>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onShowHelp}
                        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <HelpCircle size={16} />
                        <span className="hidden md:inline">Ayuda</span>
                    </button>
                    <div className="h-4 w-px bg-slate-200 mx-1"></div>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors"
                    >
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
};
