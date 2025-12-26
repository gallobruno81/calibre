
import React, { useEffect, useState } from 'react';
import { CompanyProfile, SurveyResponse, AiAnalysis, Intervention } from '../../types/survey';
import { getSurveyResponses, generateDemoData, clearData, getInterventions } from '../../services/mockDataService';
import { getCompanySurveysFromDb } from '../../services/supabaseService';
import { analyzeWellnessData } from '../../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell, LineChart, Line, ReferenceLine } from 'recharts';
import { Users, Zap, Brain, Activity, Send, RefreshCw, Sparkles, Heart, MessageCircle, ShieldCheck, Award, TrendingUp, AlertTriangle, Calendar, CheckCircle2, LayoutDashboard, FileText, Settings, Bell, Search, Menu, LogOut, ChevronRight, ChevronDown, Check } from 'lucide-react';

interface Props {
    company: CompanyProfile;
    onLogout: () => void;
}

export const ManagerDashboard: React.FC<Props> = ({ company, onLogout }) => {
    const [responses, setResponses] = useState<SurveyResponse[]>([]);
    const [interventions, setInterventions] = useState<Intervention[]>([]);
    const [analysis, setAnalysis] = useState<AiAnalysis | null>(null);
    const [isLoadingAi, setIsLoadingAi] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TEAMS' | 'REPORTS' | 'INTERVENCIONES' | 'AJUSTES'>('OVERVIEW');
    const [selectedTeam, setSelectedTeam] = useState<string>('Todos');
    const [selectedPeriod, setSelectedPeriod] = useState<number>(30); // days
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
    const [isPeriodMenuOpen, setIsPeriodMenuOpen] = useState(false);

    const loadData = async () => {
        setIsLoadingData(true);
        let data: SurveyResponse[] = [];
        let ints: Intervention[] = [];

        if (company.id) {
            data = await getCompanySurveysFromDb(company.id);
            // DB interventions would go here in a real app
        } else {
            data = getSurveyResponses();
            ints = getInterventions();
        }

        setResponses(data);
        setInterventions(ints);
        setIsLoadingData(false);
    };

    useEffect(() => {
        loadData();
        const interval = company.id ? setInterval(loadData, 10000) : null;
        return () => { if (interval) clearInterval(interval); }
    }, [company.id]);

    const handleGenerateDemoData = () => {
        if (company.id) {
            alert("En modo real no se pueden generar datos demo.");
            return;
        }
        generateDemoData();
        loadData();
        setAnalysis(null); // Reset AI on new data
    };

    const handleClearData = () => {
        if (confirm("¿Borrar datos demo?")) {
            if (!company.id) {
                clearData();
                setResponses([]);
                setAnalysis(null);
                location.reload();
            }
        }
    }

    // Filter responses based on selection
    const filteredResponses = selectedTeam === 'Todos'
        ? responses
        : responses.filter(r => r.team === selectedTeam);

    const runAnalysis = async () => {
        setIsLoadingAi(true);
        // Use only recent responses (last 30 days) for current diagnosis
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        const recentResponses = filteredResponses.filter(r => r.timestamp > thirtyDaysAgo);

        // Fallback to all if not enough recent data (for demo purposes)
        const dataToAnalyze = recentResponses.length > 5 ? recentResponses : filteredResponses;

        const result = await analyzeWellnessData(dataToAnalyze);
        setAnalysis(result);
        setIsLoadingAi(false);
    };

    // Prepare data for charts - Scale is 1-5
    // Current Period Data
    const periodStartTime = Date.now() - (selectedPeriod * 24 * 60 * 60 * 1000);
    const displayResponses = filteredResponses.filter(r => r.timestamp > periodStartTime);

    // Helper for comparisons (e.g., 3 months ago)
    const getHistoricalAverage = (monthsAgo: number) => {
        const targetTime = Date.now() - (monthsAgo * 30 * 24 * 60 * 60 * 1000);
        const windowSize = 30 * 24 * 60 * 60 * 1000; // 30 day window around target
        const historicalResponses = filteredResponses.filter(r =>
            r.timestamp > (targetTime - windowSize) && r.timestamp < (targetTime + windowSize)
        );
        if (historicalResponses.length === 0) return null;
        const avg = historicalResponses.reduce((acc, r) =>
            acc + (Object.values(r.metrics).reduce((a, b) => a + b, 0) / 6), 0
        ) / historicalResponses.length;
        return avg;
    };

    const statsHistory = {
        threeMonths: getHistoricalAverage(3),
        sixMonths: getHistoricalAverage(6),
        oneYear: getHistoricalAverage(12)
    };

    const calculateAverage = (metric: keyof typeof responses[0]['metrics'], dataset = displayResponses) => {
        if (dataset.length === 0) return 0;
        return dataset.reduce((acc, r) => acc + r.metrics[metric], 0) / dataset.length;
    };

    const averageMetrics = displayResponses.length > 0 ? [
        { name: 'Entusiasmo', value: calculateAverage('emotionalLoad') },
        { name: 'Vitalidad', value: calculateAverage('fatigue') },
        { name: 'Claridad', value: calculateAverage('clarity') },
        { name: 'Comunic.', value: calculateAverage('communication') },
        { name: 'Seguridad', value: calculateAverage('psychologicalSafety') },
        { name: 'Reconocim.', value: calculateAverage('recognition') },
    ] : [];

    // Unified Score Category Function
    const getScoreCategory = (value: number) => {
        const rounded = Math.round(value * 10) / 10;
        if (rounded >= 4.2) return { color: '#10b981', text: 'text-emerald-600', label: 'Óptimo', bg: 'bg-emerald-50' };
        if (rounded >= 3.4) return { color: '#84cc16', text: 'text-lime-600', label: 'Bueno', bg: 'bg-lime-50' };
        if (rounded >= 2.8) return { color: '#f59e0b', text: 'text-amber-500', label: 'Estable', bg: 'bg-amber-50' };
        if (rounded >= 2.0) return { color: '#f97316', text: 'text-orange-500', label: 'Bajo', bg: 'bg-orange-50' };
        return { color: '#e11d48', text: 'text-rose-600', label: 'Crítico', bg: 'bg-rose-50' };
    };

    // Calculate Overall Health Score (0-100)
    const healthScore = averageMetrics.length > 0
        ? Math.round((averageMetrics.reduce((acc, curr) => acc + curr.value, 0) / 6) * 20)
        : 0;

    const globalCategory = getScoreCategory(healthScore / 20);

    // Calculate Dynamic Trend
    const previousPeriodStartTime = periodStartTime - (selectedPeriod * 24 * 60 * 60 * 1000);
    const previousResponses = filteredResponses.filter(r => r.timestamp > previousPeriodStartTime && r.timestamp < periodStartTime);

    const calculateScoreForDataset = (dataset: SurveyResponse[]) => {
        if (dataset.length === 0) return 0;
        const metrics = ['emotionalLoad', 'fatigue', 'clarity', 'communication', 'psychologicalSafety', 'recognition'] as const;
        const avg = dataset.reduce((acc, r) => {
            const rAvg = metrics.reduce((ma, m) => ma + r.metrics[m], 0) / 6;
            return acc + rAvg;
        }, 0) / dataset.length;
        return avg * 20;
    };

    const previousScore = calculateScoreForDataset(previousResponses);
    const trendValue = previousScore > 0 ? ((healthScore - previousScore) / previousScore) * 100 : 0;
    const trendFormatted = (trendValue >= 0 ? '+' : '') + trendValue.toFixed(1) + '%';

    // --- HISTORICAL TREND LOGIC ---
    const getHistoricalData = () => {
        // IMPORTANT: For the historical chart, we ignore the 'selectedPeriod' 
        // to show the full trend, but we MUST respect the 'selectedTeam'.
        const historicalDataset = responses.filter(r =>
            selectedTeam === 'Todos' || r.team === selectedTeam
        );

        // Group by Month (YYYY-MM)
        const groups: Record<string, { total: number, count: number, timestamp: number }> = {};

        historicalDataset.forEach(r => {
            const date = new Date(r.timestamp);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            const score = (
                r.metrics.emotionalLoad +
                r.metrics.fatigue +
                r.metrics.clarity +
                r.metrics.communication +
                r.metrics.psychologicalSafety +
                r.metrics.recognition
            ) / 6;

            if (!groups[monthKey]) {
                groups[monthKey] = { total: 0, count: 0, timestamp: r.timestamp };
            }
            groups[monthKey].total += score;
            groups[monthKey].count += 1;
        });

        const chartData = Object.entries(groups)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([date, data]) => ({
                date,
                score: parseFloat((data.total / data.count).toFixed(2))
            }));

        return chartData;
    }

    const trendData = getHistoricalData();


    // Helper for bar chart fill colors - With Gradients
    const getBarGradient = (value: number) => {
        const cat = getScoreCategory(value);
        if (cat.label === 'Óptimo' || cat.label === 'Bueno') return 'bg-gradient-to-r from-emerald-400 to-emerald-600';
        if (cat.label === 'Estable') return 'bg-gradient-to-r from-amber-400 to-amber-500';
        return 'bg-gradient-to-r from-rose-500 to-rose-600';
    };

    const teamsList = ['Todos', ...Array.from(new Set(responses.map(r => r.team || 'General')))];

    // Helper to generate natural language insight
    const getInsight = (score: number) => {
        if (score > 80) return "El equipo está en un estado de alto rendimiento y bienestar.";
        if (score > 60) return "El equipo está estable, pero hay focos de fatiga latentes.";
        return "Atención requerida: Los niveles de estrés están impactando la moral.";
    }

    const MetricStat = ({ icon: Icon, label, value, trend = "+0.0%" }: { icon: any, label: string, value: number, trend?: string }) => {
        const percentage = Math.min(100, Math.max(0, ((value - 1) / 4) * 100));
        const category = getScoreCategory(value);

        return (
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between h-52 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group hover:-translate-y-1 relative overflow-hidden">
                {/* Background glow on hover */}
                <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${category.bg}`}></div>

                <div className="flex flex-col justify-between h-full py-2 relative z-10">
                    <div>
                        <span className="text-slate-500 font-bold text-[11px] uppercase tracking-[0.15em] block mb-2 group-hover:text-[#0f172a] transition-colors">{label}</span>
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                            {trend.includes('+') ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                            {trend}
                            <span className="opacity-50 font-medium ml-1">vs mes</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-2xl transition-all duration-500 bg-slate-50 border border-slate-100 group-hover:border-transparent group-hover:scale-110 ${category.text} group-hover:bg-white group-hover:shadow-sm`}>
                                <Icon size={20} />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className={`text-[11px] font-extrabold uppercase tracking-widest ${category.text}`}>
                                        {category.label}
                                    </span>
                                </div>
                                <div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100/50 border border-slate-200/30 group-hover:bg-white transition-colors">
                                    <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest">
                                        {selectedTeam === 'Todos' ? 'Global' : selectedTeam}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-24 h-24 group-hover:scale-105 transition-transform duration-500">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        {/* Track */}
                        <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                        {/* Progress */}
                        <circle
                            cx="50" cy="50" r="40"
                            stroke={category.color}
                            strokeWidth="10"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 40}
                            strokeDashoffset={(2 * Math.PI * 40) * (1 - Math.max(0, percentage / 100))}
                            className="transition-all duration-1000 ease-out"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-3xl font-display font-light leading-none ${category.text}`}>{value.toFixed(1)}</span>
                        <span className="text-[9px] font-bold text-slate-300 uppercase mt-1">Pts</span>
                    </div>
                </div>
            </div>
        )
    };

    const HistoricalComparison = () => (
        <div className="bg-[#1e293b] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden mb-8 group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-xl font-display font-light mb-1">Evolución de <span className="font-normal">Impacto</span></h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Comparativa histórica de Salud Global</p>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/5 flex items-center gap-2">
                    <span className="text-emerald-400 text-sm font-bold">En Tiempo Real</span>
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Estado Ahora</p>
                    <div className={`text-4xl font-display font-light ${globalCategory.text.replace('text-', 'text-emerald-')}`}>
                        {healthScore}<span className="text-xs ml-1 font-bold">pts</span>
                    </div>
                    <div className="mt-4 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                        <TrendingUp size={12} className={trendValue < 0 ? 'rotate-180 text-rose-400' : ''} />
                        <span className={trendValue < 0 ? 'text-rose-400' : ''}>{trendFormatted} vs periodo anterior</span>
                    </div>
                </div>

                {[
                    { label: 'Hace 3 meses', score: statsHistory.threeMonths },
                    { label: 'Hace 6 meses', score: statsHistory.sixMonths },
                    { label: 'Hace 1 año', score: statsHistory.oneYear }
                ].map((item, i) => (
                    <div key={i} className="bg-white/[0.02] p-6 rounded-2xl border border-white/[0.05] hover:bg-white/[0.05] transition-all">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">{item.label}</p>
                        {item.score ? (
                            <>
                                <div className="text-3xl font-display font-light text-slate-300">
                                    {Math.round(item.score * 20)}<span className="text-xs ml-1 font-bold text-slate-500">pts</span>
                                </div>
                                <div className={`mt-4 text-[10px] font-bold flex items-center gap-1 ${healthScore > (item.score * 20) ? 'text-emerald-400' : 'text-slate-400'}`}>
                                    {healthScore > (item.score * 20) ? (
                                        <><TrendingUp size={12} /> Mejos que ahora</>
                                    ) : (
                                        'Estable'
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="text-slate-600 text-sm italic py-2">Sin datos previos</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    // Heatmap Component
    const TeamsHeatmap = () => {
        const teams = getTeamData();
        const metricsList = [
            { key: 'emotionalLoad', label: 'Entusiasmo' },
            { key: 'fatigue', label: 'Vitalidad' },
            { key: 'clarity', label: 'Claridad' },
            { key: 'communication', label: 'Comunic.' },
            { key: 'psychologicalSafety', label: 'Seguridad' },
            { key: 'recognition', label: 'Reconoc.' }
        ] as const;

        return (
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8 overflow-x-auto">
                <h3 className="text-xl font-display font-light text-[#0f172a] mb-6 flex items-center gap-2">
                    <LayoutDashboard size={18} className="text-slate-300" /> Mapa de Calor por <span className="font-normal">Equipos</span>
                </h3>
                <table className="w-full min-w-[600px]">
                    <thead>
                        <tr>
                            <th className="text-left text-[10px] font-semibold text-slate-300 uppercase tracking-widest pb-4">Equipo</th>
                            {metricsList.map(m => (
                                <th key={m.key} className="text-center text-[10px] font-semibold text-slate-300 uppercase tracking-widest pb-4">{m.label}</th>
                            ))}
                            <th className="text-center text-[10px] font-semibold text-slate-900 uppercase tracking-widest pb-4">Promedio</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {Object.entries(teams).map(([teamName, rows]) => {
                            const getM = (k: any) => rows.reduce((a, b) => a + b.metrics[k as keyof typeof rows[0]['metrics']], 0) / rows.length;
                            const tScore = (getM('emotionalLoad') + getM('fatigue') + getM('clarity') + getM('communication') + getM('psychologicalSafety') + getM('recognition')) / 6;

                            return (
                                <tr
                                    key={teamName}
                                    onClick={() => {
                                        setSelectedTeam(teamName);
                                        setActiveTab('OVERVIEW');
                                    }}
                                    className="group hover:bg-[#f8fafc] transition-colors cursor-pointer"
                                >
                                    <td className="py-4 font-display font-light text-slate-800 text-lg group-hover:translate-x-1 transition-transform">{teamName}</td>
                                    {metricsList.map(m => {
                                        const val = getM(m.key);
                                        const category = getScoreCategory(val);
                                        // 1-5 to 0-100%
                                        const percentage = Math.min(100, Math.max(0, ((val - 1) / 4) * 100));
                                        return (
                                            <td key={m.key} className="py-2 px-1">
                                                <div className={`flex flex-col items-center justify-center py-3 rounded-xl transition-all ${category.bg} border border-transparent hover:border-slate-200 group/cell`}>
                                                    <div className="relative w-11 h-11">
                                                        <svg className="w-full h-full -scale-x-100 -rotate-90" viewBox="0 0 100 100">
                                                            <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.5)" strokeWidth="6" fill="none" />
                                                            <circle
                                                                cx="50" cy="50" r="42"
                                                                stroke={category.color}
                                                                strokeWidth="12"
                                                                fill="none"
                                                                strokeLinecap="round"
                                                                strokeDasharray={2 * Math.PI * 42}
                                                                strokeDashoffset={(2 * Math.PI * 42) * (1 - Math.max(0, percentage / 100))}
                                                                className="transition-all duration-1000 ease-out"
                                                            />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <span className={`text-[11px] font-bold ${category.text}`}>{val.toFixed(1)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        )
                                    })}
                                    <td className="py-2 px-1 text-center">
                                        <div className="flex flex-col items-center">
                                            <span className={`text-xl font-display font-light ${getScoreCategory(tScore).text}`}>
                                                {(tScore * 20).toFixed(0)}
                                            </span>
                                            <span className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">Ptos</span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    const TeamCard = ({ name, data }: { name: string, data: SurveyResponse[] }) => {
        const score = data.reduce((acc, curr) =>
            acc + (
                curr.metrics.emotionalLoad +
                curr.metrics.fatigue +
                curr.metrics.clarity +
                curr.metrics.communication +
                curr.metrics.psychologicalSafety +
                curr.metrics.recognition
            ) / 6, 0
        ) / (data.length || 1);

        return (
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-[#e6f1d5] transition-all group">
                <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-[#0f172a] text-lg">{name}</h4>
                    <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500">{data.length} respuestas</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ${getBarGradient(score)}`} style={{ width: `${(score / 5) * 100}%` }}></div>
                    </div>
                    <span className={`font-extrabold text-xl ${getScoreCategory(score).text}`}>{score.toFixed(1)}</span>
                </div>
            </div>
        )
    }

    const getTeamData = () => {
        const teams: Record<string, SurveyResponse[]> = {};
        displayResponses.forEach(r => {
            const team = r.team || 'General';
            if (!teams[team]) teams[team] = [];
            teams[team].push(r);
        });
        return teams;
    }

    if (responses.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center font-sans">
                <div className="max-w-2xl w-full bg-white p-12 rounded-3xl shadow-xl border border-slate-100 text-center">
                    <div className="w-24 h-24 bg-[#e6f1d5] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                        <Activity size={40} className="text-[#0f172a]" />
                    </div>
                    <h2 className="text-4xl font-bold text-[#0f172a] mb-4">Bienvenido a Calibre</h2>
                    <p className="text-slate-500 mb-10 text-lg">
                        Panel de control de bienestar para <span className="font-semibold text-[#0f172a]">{company.name}</span>.<br />
                        {isLoadingData ? "Cargando datos..." : "Aún no hay respuestas registradas."}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => setShowInviteModal(true)}
                            className="px-8 py-4 bg-[#0f172a] text-white rounded-xl font-bold shadow-lg hover:bg-[#0f172a]/90 transition-all flex items-center justify-center gap-2"
                        >
                            <Send size={18} /> Invitar / Link
                        </button>
                        {!company.id && (
                            <button
                                onClick={handleGenerateDemoData}
                                className="px-8 py-4 bg-white text-[#0f172a] border border-slate-200 hover:border-[#e6f1d5] rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={18} /> Datos Demo
                            </button>
                        )}
                    </div>
                    {/* Modal */}
                    {showInviteModal && (
                        <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-2xl border border-slate-100 p-8 max-w-md w-full shadow-2xl">
                                <h3 className="text-xl font-bold text-[#0f172a] mb-2">Invitar Colaboradores</h3>
                                <p className="text-slate-500 text-sm mb-6">Comparte este link con tu equipo.</p>

                                <div className="bg-slate-50 p-4 rounded-lg text-xs font-mono break-all mb-4 text-[#0f172a] border border-slate-200 select-all">
                                    {window.location.origin}?companyId={company.id || 'demo'}
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button onClick={() => setShowInviteModal(false)} className="px-6 py-3 text-slate-500 font-medium hover:text-[#0f172a]">Cerrar</button>
                                    <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}?companyId=${company.id || 'demo'}`); alert('Copiado'); setShowInviteModal(false); }} className="px-6 py-3 bg-[#0f172a] text-white rounded-lg font-bold">Copiar Link</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // FIX: Increased radius and added viewBox to SVG for perfect centering
    const radius = 66;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - ((healthScore / 100) * circumference);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex selection:bg-[#e6f1d5]/50">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 bg-[#0f172a] text-white transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col shadow-2xl ${window.location.pathname.startsWith('/demo') ? 'top-16 h-[calc(100vh-4rem)]' : 'top-0 h-screen'}`}>
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#0f172a] flex-shrink-0 shadow-lg shadow-white/10">
                        <div className="w-3 h-3 border border-[#0f172a] rounded-full"></div>
                    </div>
                    {isSidebarOpen && <span className="ml-3 font-display font-light text-xl tracking-tighter animate-in fade-in duration-300">Calibre<span className="opacity-30">.</span></span>}
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-6 px-3 space-y-1">
                    <button
                        onClick={() => setActiveTab('OVERVIEW')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'OVERVIEW' ? 'bg-[#e6f1d5] text-[#0f172a] font-semibold shadow-md shadow-[#e6f1d5]/10' : 'text-slate-400 hover:bg-white/5 hover:text-white font-normal'}`}
                    >
                        <LayoutDashboard size={18} />
                        {isSidebarOpen && <span className="animate-in fade-in duration-300 text-[11px] tracking-widest uppercase font-semibold">Plataforma</span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('TEAMS')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'TEAMS' ? 'bg-[#e6f1d5] text-[#0f172a] font-semibold shadow-md shadow-[#e6f1d5]/10' : 'text-slate-400 hover:bg-white/5 hover:text-white font-normal'}`}
                    >
                        <Users size={18} />
                        {isSidebarOpen && <span className="animate-in fade-in duration-300 text-[11px] tracking-widest uppercase font-semibold">Equipos</span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('REPORTS')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'REPORTS' ? 'bg-[#e6f1d5] text-[#0f172a] font-semibold shadow-md shadow-[#e6f1d5]/10' : 'text-slate-400 hover:bg-white/5 hover:text-white font-normal'}`}
                    >
                        <TrendingUp size={18} />
                        {isSidebarOpen && <span className="animate-in fade-in duration-300 text-[11px] tracking-widest uppercase font-semibold">Históricos</span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('INTERVENCIONES')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'INTERVENCIONES' ? 'bg-[#e6f1d5] text-[#0f172a] font-semibold shadow-md shadow-[#e6f1d5]/10' : 'text-slate-400 hover:bg-white/5 hover:text-white font-normal'}`}
                    >
                        <Activity size={18} />
                        {isSidebarOpen && <span className="animate-in fade-in duration-300 text-[11px] tracking-widest uppercase font-semibold">Acciones</span>}
                    </button>
                    <div className="pt-4 pb-2 px-3">
                        <div className="h-px bg-slate-800/50 w-full"></div>
                    </div>
                    <button
                        onClick={() => setActiveTab('AJUSTES')}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'AJUSTES' ? 'bg-[#e6f1d5] text-[#0f172a] font-semibold shadow-md shadow-[#e6f1d5]/10' : 'text-slate-400 hover:bg-white/5 hover:text-white font-normal'}`}
                    >
                        <Settings size={18} />
                        {isSidebarOpen && <span className="animate-in fade-in duration-300 text-[11px] tracking-widest uppercase font-semibold">Ajustes</span>}
                    </button>
                </nav>

                {/* User Profile */}
                <div className="p-4 border-t border-slate-800/50 bg-[#0f172a]">
                    <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-white/10">
                            {company.managerName?.charAt(0) || 'M'}
                        </div>
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0 animate-in fade-in duration-300">
                                <p className="text-sm font-bold text-white truncate">{company.managerName}</p>
                                <p className="text-xs text-slate-400 truncate">{company.name}</p>
                            </div>
                        )}
                        {isSidebarOpen && (
                            <button onClick={onLogout} className="text-slate-400 hover:text-rose-400 transition-colors p-2 hover:bg-white/5 rounded-lg">
                                <LogOut size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} bg-[#F8FAFC]`}>
                {/* Top Bar */}
                <header className={`h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky z-40 ${window.location.pathname.startsWith('/demo') ? 'top-16' : 'top-0'}`}>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors">
                            <Menu size={18} />
                        </button>
                        <div className="hidden md:flex items-center text-[10px] text-slate-400 font-semibold tracking-[0.2em] uppercase">
                            <span className="hover:text-[#0f172a] cursor-pointer transition-colors" onClick={() => setActiveTab('OVERVIEW')}>Gral</span>
                            <ChevronRight size={10} className="mx-2 text-slate-200" />
                            <span className="text-[#0f172a]">
                                {activeTab === 'OVERVIEW' ? 'Principal' :
                                    activeTab === 'TEAMS' ? 'Equipos' :
                                        activeTab === 'REPORTS' ? 'Temporal' :
                                            activeTab === 'INTERVENCIONES' ? 'Historias' : 'Settings'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block group">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f172a] transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-[#0f172a]/10 focus:border-[#0f172a] w-56 transition-all"
                            />
                        </div>
                        <div className="h-6 w-px bg-slate-200 mx-1"></div>
                        <button className="relative p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-6 max-w-[1600px] mx-auto">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-display font-light text-[#0f172a] mb-1 tracking-tight">Hola, <span className="font-normal">{company.managerName?.split(' ')[0]}</span> 👋</h1>
                            <p className="text-slate-400 font-normal text-sm">
                                Resumen del estado emocional de tu organización.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                            {/* Custom Team Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsTeamMenuOpen(!isTeamMenuOpen)}
                                    className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-[#0f172a] shadow-sm hover:border-[#0f172a] transition-all min-w-[180px] justify-between group"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#e6f1d5] group-hover:bg-[#0f172a] transition-colors"></div>
                                        <span>{selectedTeam === 'Todos' ? 'Todos los Equipos' : selectedTeam}</span>
                                    </div>
                                    <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isTeamMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isTeamMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsTeamMenuOpen(false)}></div>
                                        <div className="absolute top-full left-0 mt-2 w-full min-w-[200px] bg-white border border-slate-100 rounded-2xl shadow-2xl z-20 py-2 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                                            <div className="px-3 py-1.5 mb-1">
                                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Filtrar por Equipo</p>
                                            </div>
                                            {teamsList.map(t => (
                                                <button
                                                    key={t}
                                                    onClick={() => {
                                                        setSelectedTeam(t);
                                                        setIsTeamMenuOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${selectedTeam === t ? 'bg-[#f8fafc] text-[#0f172a] font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
                                                >
                                                    {t === 'Todos' ? 'Todos los Equipos' : t}
                                                    {selectedTeam === t && <Check size={14} className="text-[#84cc16]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Period Selector */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsPeriodMenuOpen(!isPeriodMenuOpen)}
                                    className="flex items-center gap-3 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm text-[#0f172a] shadow-sm hover:border-[#0f172a] transition-all min-w-[150px] justify-between group"
                                >
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-400" />
                                        <span>
                                            {selectedPeriod === 30 ? 'Últimos 30 días' :
                                                selectedPeriod === 90 ? 'Últimos 3 meses' :
                                                    selectedPeriod === 180 ? 'Últimos 6 meses' : 'Todo el tiempo'}
                                        </span>
                                    </div>
                                    <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isPeriodMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isPeriodMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsPeriodMenuOpen(false)}></div>
                                        <div className="absolute top-full right-0 mt-2 w-full min-w-[180px] bg-white border border-slate-100 rounded-2xl shadow-2xl z-20 py-2 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                                            {[
                                                { label: 'Últimos 30 días', value: 30 },
                                                { label: 'Últimos 3 meses', value: 90 },
                                                { label: 'Últimos 6 meses', value: 180 },
                                                { label: 'Todo el tiempo', value: 1000 }
                                            ].map(p => (
                                                <button
                                                    key={p.value}
                                                    onClick={() => {
                                                        setSelectedPeriod(p.value);
                                                        setIsPeriodMenuOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${selectedPeriod === p.value ? 'bg-[#f8fafc] text-[#0f172a] font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
                                                >
                                                    {p.label}
                                                    {selectedPeriod === p.value && <Check size={14} className="text-[#84cc16]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex gap-1">
                                <button onClick={() => setActiveTab('OVERVIEW')} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${activeTab === 'OVERVIEW' ? 'bg-[#0f172a] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Resumen</button>
                                <button onClick={() => setActiveTab('TEAMS')} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${activeTab === 'TEAMS' ? 'bg-[#0f172a] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Heatmap</button>
                            </div>

                            {!company.id && (
                                <button onClick={handleGenerateDemoData} className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-bold transition flex items-center gap-2 text-sm shadow-sm" title="Regenerar Datos Aleatorios">
                                    <RefreshCw size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {activeTab === 'TEAMS' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-2">
                            <TeamsHeatmap />
                            <h3 className="text-xl font-bold text-[#0f172a] mb-6 px-1">Detalle por Equipo</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Object.entries(getTeamData()).map(([teamName, teamResponses]) => (
                                    <TeamCard key={teamName} name={teamName} data={teamResponses} />
                                ))}
                            </div>
                        </div>
                    ) : activeTab === 'REPORTS' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-2 space-y-8">
                            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                                            <TrendingUp size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-2xl font-display font-light text-[#0f172a]">
                                                    Evolución Histórica e Impacto
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${selectedTeam === 'Todos' ? 'bg-slate-100 text-slate-500' : 'bg-[#e6f1d5] text-[#0f172a]'}`}>
                                                    {selectedTeam === 'Todos' ? 'Global' : `Equipo: ${selectedTeam}`}
                                                </span>
                                            </div>
                                            <p className="text-slate-500 text-sm">Análisis temporal profundo del bienestar y efectividad de las acciones.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {['Óptimo', 'Bueno', 'Estable', 'Bajo', 'Crítico'].map(label => {
                                            const cat = getScoreCategory(['Óptimo', 'Bueno', 'Estable', 'Bajo', 'Crítico'].indexOf(label) === 0 ? 4.5 : 2.5); // dummy for color
                                            // Mapping manually for legend based on our actual colors
                                            const colors: Record<string, string> = { 'Óptimo': '#10b981', 'Bueno': '#84cc16', 'Estable': '#f59e0b', 'Bajo': '#f97316', 'Crítico': '#e11d48' };
                                            return (
                                                <div key={label} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 border border-slate-100">
                                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors[label] }}></div>
                                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="h-[400px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={trendData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="lineScoreGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#10b981" />   {/* Óptimo - Top */}
                                                    <stop offset="25%" stopColor="#84cc16" />  {/* Bueno */}
                                                    <stop offset="50%" stopColor="#f59e0b" />  {/* Estable */}
                                                    <stop offset="75%" stopColor="#f97316" />  {/* Bajo */}
                                                    <stop offset="100%" stopColor="#e11d48" /> {/* Crítico - Bottom */}
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis
                                                dataKey="date"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                domain={[0, 5]}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                                                dx={-10}
                                                ticks={[1, 2, 3, 4, 5]}
                                            />
                                            <Tooltip
                                                content={({ active, payload, label }) => {
                                                    if (active && payload && payload.length) {
                                                        const val = payload[0].value as number;
                                                        const cat = getScoreCategory(val);
                                                        return (
                                                            <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
                                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`text-2xl font-bold ${cat.text}`}>{val.toFixed(2)}</span>
                                                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${cat.bg} ${cat.text}`}>
                                                                        {cat.label}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />

                                            {/* Intervention Reference Lines */}
                                            {interventions.map((inv, idx) => (
                                                <ReferenceLine
                                                    key={idx}
                                                    x={new Date(inv.date).toISOString().slice(0, 7)}
                                                    stroke="#0f172a"
                                                    strokeDasharray="3 3"
                                                    label={{
                                                        value: 'Workshop',
                                                        position: 'top',
                                                        fill: '#0f172a',
                                                        fontSize: 10,
                                                        fontWeight: 800,
                                                        offset: 20
                                                    }}
                                                />
                                            ))}

                                            <Line
                                                type="monotone"
                                                dataKey="score"
                                                stroke="url(#lineScoreGradient)"
                                                strokeWidth={6}
                                                strokeLinecap="round"
                                                connectNulls
                                                animationDuration={1500}
                                                dot={(props: any) => {
                                                    const { cx, cy, payload } = props;
                                                    const cat = getScoreCategory(payload.score);
                                                    return (
                                                        <circle
                                                            cx={cx} cy={cy} r={6}
                                                            fill="white"
                                                            stroke={cat.color}
                                                            strokeWidth={3}
                                                            className="drop-shadow-sm"
                                                        />
                                                    );
                                                }}
                                                activeDot={{ r: 8, strokeWidth: 0, fill: '#0f172a' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                    <h4 className="font-bold mb-4">Mejores Equipos del Mes</h4>
                                    <div className="space-y-4">
                                        {Object.entries(getTeamData())
                                            .sort((a, b) => calculateAverage('emotionalLoad', b[1]) - calculateAverage('emotionalLoad', a[1]))
                                            .slice(0, 3)
                                            .map(([name, data]) => (
                                                <div key={name} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                                                    <span className="font-bold">{name}</span>
                                                    <span className="text-emerald-600 font-extrabold">{(calculateAverage('emotionalLoad', data) + calculateAverage('fatigue', data)) / 2 * 20} pts</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                    <h4 className="font-bold mb-4">Alertas de Burnout</h4>
                                    <div className="space-y-4">
                                        {Object.entries(getTeamData())
                                            .sort((a, b) => calculateAverage('fatigue', a[1]) - calculateAverage('fatigue', b[1]))
                                            .slice(0, 2)
                                            .map(([name, data]) => (
                                                <div key={name} className="flex justify-between items-center p-4 bg-rose-50 rounded-2xl border border-rose-100">
                                                    <span className="font-bold">{name}</span>
                                                    <span className="text-rose-600 font-extrabold">Crítico</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'INTERVENCIONES' ? (
                        <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Bitácora de Intervenciones</h2>
                                <button className="px-4 py-2 bg-[#0f172a] text-white rounded-xl font-bold text-sm">+ Nueva Intervención</button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {interventions.map(inv => (
                                    <div key={inv.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-6 items-center">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                            <Calendar size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-lg">{inv.title}</h4>
                                                    <p className="text-slate-500">{inv.description}</p>
                                                </div>
                                                <span className="text-xs font-bold text-slate-400">{new Date(inv.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="mt-4 flex gap-2">
                                                <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold uppercase tracking-wider">Eficacia: Alta</span>
                                                <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold uppercase tracking-widest">Participación: 92%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-gradient-to-br from-[#0f172a] to-slate-800 text-white p-8 rounded-3xl mt-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <Sparkles className="text-[#e6f1d5]" />
                                    <h3 className="text-xl font-bold">Talleres Sugeridos por Calibre AI</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-[#e6f1d5] mb-2">Refuerzo de Seguridad Psicológica</h4>
                                        <p className="text-sm text-slate-300">Basado en las respuestas de Ventas, recomendamos un taller de CNV (Comunicación No Violenta).</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                        <h4 className="font-bold text-[#e6f1d5] mb-2">Micro-pausas Activas</h4>
                                        <p className="text-sm text-slate-300">La vitalidad general ha bajado un 5%. Implementar bloques de 5 min obligatorios entre reuniones.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : activeTab === 'AJUSTES' ? (
                        <div className="animate-in fade-in zoom-in-95 space-y-8 max-w-2xl">
                            <div className="bg-white p-8 rounded-3xl border border-slate-200">
                                <h3 className="text-xl font-bold mb-6">Configuración de la Organización</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Nombre de Empresa</label>
                                        <input type="text" defaultValue={company.name} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Manager Responsable</label>
                                        <input type="text" defaultValue={company.managerName} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" />
                                    </div>
                                    <div className="pt-4">
                                        <button className="px-6 py-3 bg-[#0f172a] text-white rounded-xl font-bold">Guardar Cambios</button>
                                        <button onClick={handleClearData} className="ml-4 px-6 py-3 text-rose-500 font-bold hover:bg-rose-50 rounded-xl transition">Borrar Datos Demo</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={selectedTeam} className="animate-in fade-in zoom-in-95 duration-500">
                            {/* Executive Summary Hero */}
                            <div className="bg-white rounded-3xl p-8 mb-8 border border-slate-200 shadow-sm relative overflow-hidden">
                                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">

                                    {/* Left: Score & Donut */}
                                    <div className="flex flex-col items-center">
                                        <div className="relative w-44 h-44">
                                            <svg className="w-full h-full -scale-x-100 -rotate-90" viewBox="0 0 160 160">
                                                <circle cx="80" cy="80" r="72" stroke="#f1f5f9" strokeWidth="8" fill="none" />
                                                <circle
                                                    cx="80" cy="80" r="72"
                                                    stroke={globalCategory.color}
                                                    strokeWidth="10"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeDasharray={2 * Math.PI * 72}
                                                    strokeDashoffset={(2 * Math.PI * 72) * (1 - healthScore / 100)}
                                                    className="transition-all duration-1000 ease-out"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className={`text-6xl font-display font-light tracking-tighter ${globalCategory.text}`}>{healthScore}</span>
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-1">Global</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Center: Insight */}
                                    <div className="flex-1 text-center lg:text-left">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6 border border-slate-100">
                                            <Sparkles size={12} className="text-[#b4d481]" /> Diagnóstico Actual
                                        </div>
                                        <h2 className="text-4xl font-display font-light text-[#0f172a] mb-4 leading-[1.1] tracking-tight">
                                            {getInsight(healthScore).split(':').map((part, i) => i === 0 ? <span key={i} className="font-normal block mb-1">{part}</span> : part)}
                                        </h2>
                                        <p className="text-slate-400 text-lg font-light leading-relaxed">
                                            Análisis clínico consolidado del último período.
                                        </p>
                                    </div>

                                    {/* Right: Key Stats */}
                                    <div className="grid grid-cols-2 gap-4 min-w-[240px]">
                                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                            <div className="text-slate-400 font-bold text-[10px] uppercase mb-1">Tendencia</div>
                                            <div className={`font-extrabold text-2xl flex items-center justify-center gap-1 ${trendValue >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                                                <TrendingUp size={18} className={trendValue < 0 ? 'rotate-180' : ''} /> {trendFormatted}
                                            </div>
                                        </div>
                                        <div className={`p-4 rounded-2xl border transition-all ${globalCategory.bg} ${globalCategory.text.replace('text-', 'border-').replace('-600', '-100').replace('-500', '-100')} text-center`}>
                                            <div className="text-slate-400 font-bold text-[10px] uppercase mb-1">Riesgo</div>
                                            <div className={`font-extrabold text-2xl flex items-center justify-center gap-1 ${globalCategory.text}`}>
                                                <AlertTriangle size={18} /> {healthScore < 40 ? 'Crítico' : healthScore < 60 ? 'Alto' : healthScore < 80 ? 'Medio' : 'Bajo'}
                                            </div>
                                        </div>
                                        <button className="col-span-2 py-3 bg-[#0f172a] text-white rounded-xl font-bold hover:bg-[#0f172a]/90 transition-all text-sm shadow-lg shadow-slate-900/10">
                                            Ver Recomendaciones
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 3x2 Grid for 6 Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <MetricStat
                                    label="Nivel de Entusiasmo"
                                    icon={Heart}
                                    value={averageMetrics.find(m => m.name === 'Entusiasmo')?.value || 0}
                                    trend="+3.2%"
                                />
                                <MetricStat
                                    label="Nivel de Vitalidad"
                                    icon={Zap}
                                    value={averageMetrics.find(m => m.name === 'Vitalidad')?.value || 0}
                                    trend="-1.5%"
                                />
                                <MetricStat
                                    label="Claridad de Rol"
                                    icon={Brain}
                                    value={averageMetrics.find(m => m.name === 'Claridad')?.value || 0}
                                    trend="+0.8%"
                                />
                                <MetricStat
                                    label="Comunicación"
                                    icon={MessageCircle}
                                    value={averageMetrics.find(m => m.name === 'Comunic.')?.value || 0}
                                    trend="+4.1%"
                                />
                                <MetricStat
                                    label="Seguridad Psicológica"
                                    icon={ShieldCheck}
                                    value={averageMetrics.find(m => m.name === 'Seguridad')?.value || 0}
                                    trend="-0.5%"
                                />
                                <MetricStat
                                    label="Reconocimiento"
                                    icon={Award}
                                    value={averageMetrics.find(m => m.name === 'Reconocim.')?.value || 0}
                                    trend="+1.2%"
                                />
                            </div>

                            {/* Historical Trend Chart */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-[#0f172a]">
                                                Evolución Histórica e Impacto
                                            </h3>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${selectedTeam === 'Todos' ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-600'}`}>
                                                {selectedTeam === 'Todos' ? 'Global' : `Equipo: ${selectedTeam}`}
                                            </span>
                                        </div>
                                        <p className="text-slate-400 text-sm font-medium">Análisis temporal profundo del bienestar y efectividad de las acciones.</p>
                                    </div>
                                </div>

                                <div className="h-72 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={trendData} margin={{ left: 0, right: 20, top: 20, bottom: 20 }}>
                                            <defs>
                                                <linearGradient id="lineScoreGradientOverview" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#10b981" />
                                                    <stop offset="25%" stopColor="#84cc16" />
                                                    <stop offset="50%" stopColor="#f59e0b" />
                                                    <stop offset="75%" stopColor="#f97316" />
                                                    <stop offset="100%" stopColor="#e11d48" />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} tickLine={false} axisLine={false} />
                                            <YAxis domain={[1, 5]} tickCount={5} tick={{ fontSize: 12, fontWeight: 700, fill: '#0f172a' }} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                content={({ active, payload, label }) => {
                                                    if (active && payload && payload.length) {
                                                        const val = payload[0].value as number;
                                                        const cat = getScoreCategory(val);
                                                        return (
                                                            <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
                                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`text-2xl font-bold ${cat.text}`}>{val.toFixed(2)}</span>
                                                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${cat.bg} ${cat.text}`}>
                                                                        {cat.label}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />

                                            {/* Intervention Reference Lines */}
                                            {interventions.map((inv, idx) => (
                                                <ReferenceLine
                                                    key={idx}
                                                    x={new Date(inv.date).toISOString().slice(0, 7)}
                                                    stroke="#0f172a"
                                                    strokeDasharray="3 3"
                                                    label={{
                                                        value: 'Workshop',
                                                        position: 'top',
                                                        fill: '#0f172a',
                                                        fontSize: 10,
                                                        fontWeight: 800,
                                                        offset: 20
                                                    }}
                                                />
                                            ))}

                                            <Line
                                                type="monotone"
                                                dataKey="score"
                                                stroke="url(#lineScoreGradientOverview)"
                                                strokeWidth={6}
                                                strokeLinecap="round"
                                                connectNulls
                                                animationDuration={1500}
                                                dot={(props: any) => {
                                                    const { cx, cy, payload } = props;
                                                    const cat = getScoreCategory(payload.score);
                                                    return (
                                                        <circle
                                                            cx={cx} cy={cy} r={6}
                                                            fill="white"
                                                            stroke={cat.color}
                                                            strokeWidth={3}
                                                            className="drop-shadow-sm"
                                                        />
                                                    );
                                                }}
                                                activeDot={{ r: 8, strokeWidth: 0, fill: '#0f172a' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Timeline of Interventions */}
                                <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {interventions.map(inv => (
                                        <div key={inv.id} className="flex gap-4 items-start p-3 rounded-xl bg-slate-50 border border-slate-100">
                                            <div className="mt-1 p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                                                <Calendar size={16} />
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                                                    {new Date(inv.date).toLocaleDateString()}
                                                </span>
                                                <h4 className="font-bold text-slate-800 text-sm">{inv.title}</h4>
                                                <p className="text-xs text-slate-500 mt-1">{inv.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {interventions.length === 0 && (
                                        <p className="text-slate-400 text-sm italic col-span-2 text-center py-2">
                                            No hay talleres o intervenciones registradas en este período.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Pulse Comments Section */}
                                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                        <h3 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
                                            <MessageCircle className="text-blue-500" size={20} /> Comentarios del Equipo (Anónimos)
                                        </h3>
                                        <div className="space-y-4">
                                            {filteredResponses.filter(r => r.optionalComment).slice(0, 4).map((r, i) => (
                                                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                                                    <div className="absolute top-4 right-4 text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-100">
                                                        {new Date(r.timestamp).toLocaleDateString()}
                                                    </div>
                                                    <p className="text-sm text-slate-600 italic leading-relaxed pr-12">"{r.optionalComment}"</p>
                                                    <div className="mt-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.team || 'General'}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            {filteredResponses.filter(r => r.optionalComment).length === 0 && (
                                                <div className="text-center py-8 text-slate-400 italic text-sm">No hay comentarios recientes.</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                        <h3 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
                                            <Activity className="text-[#10b981]" size={20} /> Mapa Hexagonal
                                        </h3>
                                        <div className="h-80 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={averageMetrics} startAngle={60} endAngle={-300}>
                                                    <PolarGrid stroke="#e2e8f0" />
                                                    <PolarAngleAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }} />
                                                    <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} axisLine={false} />
                                                    <Radar name="Promedio" dataKey="value" stroke="#0f172a" strokeWidth={3} fill="#e6f1d5" fillOpacity={0.7} />
                                                    <Tooltip
                                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                        itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                                                    />
                                                </RadarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                </div>

                                <div className="space-y-6">
                                    <div className="bg-[#0f172a] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group min-h-[500px] flex flex-col justify-between">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6f1d5] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity duration-1000"></div>
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

                                        <div className="relative z-10">
                                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 shadow-lg">
                                                <Sparkles className="text-[#e6f1d5]" size={24} />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2">Diagnóstico Clínico AI</h3>
                                            <p className="text-slate-300 text-sm mb-8 leading-relaxed font-medium">
                                                Evaluación automática de los 6 vectores de bienestar generada por Gemini AI para el equipo: <strong className="text-white">{selectedTeam}</strong>.
                                            </p>

                                            {!analysis ? (
                                                <button
                                                    onClick={runAnalysis}
                                                    disabled={isLoadingAi}
                                                    className="w-full py-4 bg-[#e6f1d5] text-[#0f172a] font-bold rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg"
                                                >
                                                    {isLoadingAi ? 'Analizando...' : 'Generar Diagnóstico'}
                                                </button>
                                            ) : (
                                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                    <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
                                                        <h4 className="font-bold text-xs uppercase tracking-widest text-[#e6f1d5] mb-3">Sintomatología</h4>
                                                        <p className="text-sm font-medium leading-relaxed text-slate-100">"{analysis.summary}"</p>
                                                    </div>

                                                    <div>
                                                        <h4 className="font-bold text-xs uppercase tracking-widest text-[#e6f1d5] mb-4">Tratamiento Sugerido</h4>
                                                        <ul className="space-y-3">
                                                            {analysis.recommendations.map((rec, i) => (
                                                                <li key={i} className="text-sm flex gap-3 items-start text-slate-200">
                                                                    <span className="text-[#e6f1d5] mt-1.5 text-[10px]">●</span> {rec}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <button onClick={runAnalysis} className="w-full py-3 border border-white/20 rounded-xl text-sm font-bold hover:bg-white/10 transition">Actualizar Análisis</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

