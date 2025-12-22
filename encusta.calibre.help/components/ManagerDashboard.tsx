
import React, { useEffect, useState } from 'react';
import { CompanyProfile, SurveyResponse, AiAnalysis, Intervention } from '../types';
import { getSurveyResponses, generateDemoData, clearData, getInterventions } from '../services/mockDataService';
import { getCompanySurveysFromDb } from '../services/supabaseService';
import { analyzeWellnessData } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Cell, LineChart, Line, ReferenceLine } from 'recharts';
import { Users, Zap, Brain, Activity, Send, RefreshCw, Sparkles, Heart, MessageCircle, ShieldCheck, Award, TrendingUp, AlertTriangle, Calendar, CheckCircle2 } from 'lucide-react';

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
  const [viewMode, setViewMode] = useState<'OVERVIEW' | 'TEAMS'>('OVERVIEW');
  const [selectedTeam, setSelectedTeam] = useState<string>('Todos');

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
    return () => { if(interval) clearInterval(interval); }
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
    if(confirm("¿Borrar datos demo?")) {
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

  // Prepare data for charts - Scale is 1-5 (All Positives now: High is Good)
  // We only use Recent Data for the "Current State" charts
  const recentResponses = filteredResponses.filter(r => r.timestamp > (Date.now() - (45 * 24 * 60 * 60 * 1000)));
  const displayResponses = recentResponses.length > 0 ? recentResponses : filteredResponses;

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

  // Calculate Overall Health Score (0-100)
  const healthScore = averageMetrics.length > 0 
    ? Math.round((averageMetrics.reduce((acc, curr) => acc + curr.value, 0) / 6) * 20) 
    : 0;

  // --- HISTORICAL TREND LOGIC ---
  const getHistoricalData = () => {
     // Group by Month (YYYY-MM)
     const groups: Record<string, { total: number, count: number, timestamp: number }> = {};
     
     // Use ALL historical responses for the trend, not just recent
     filteredResponses.forEach(r => {
        const date = new Date(r.timestamp);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
        
        // Calculate single response average score (1-5)
        const score = (
            r.metrics.emotionalLoad + 
            r.metrics.fatigue + 
            r.metrics.clarity + 
            r.metrics.communication + 
            r.metrics.psychologicalSafety + 
            r.metrics.recognition
        ) / 6;

        if (!groups[key]) {
            groups[key] = { total: 0, count: 0, timestamp: r.timestamp };
        }
        groups[key].total += score;
        groups[key].count += 1;
     });

     const chartData = Object.entries(groups).map(([dateKey, data]) => ({
        date: dateKey,
        score: parseFloat((data.total / data.count).toFixed(2)),
        timestamp: data.timestamp // keep one ts for sorting
     })).sort((a, b) => a.date.localeCompare(b.date));

     return chartData;
  }
  
  const trendData = getHistoricalData();

  // Helper for text colors in cards (High is always Green, Low is Red, Mid is Blue)
  const getScoreColor = (value: number) => {
    return value > 3.5 ? 'text-emerald-600' : value > 2.5 ? 'text-blue-600' : 'text-rose-600';
  }

  // Helper for bar chart fill colors - No Amber/Orange
  const getBarColor = (value: number) => {
    // Green > 3.5, Blue > 2.5, Red <= 2.5
    return value > 3.5 ? '#10b981' : value > 2.5 ? '#3b82f6' : '#e11d48';
  }

  const teamsList = ['Todos', ...Array.from(new Set(responses.map(r => r.team || 'General')))];

  const MetricStat = ({ icon: Icon, label, value }: { icon: any, label: string, value: number }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-36 hover:shadow-md transition-all group hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <span className="text-slate-500 font-bold text-sm tracking-wide">{label}</span>
        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-[#e6f1d5]/30 transition-colors">
            <Icon size={20} className="text-slate-400 group-hover:text-[#0f172a]" />
        </div>
      </div>
      <div className="flex items-end gap-3">
        <h3 className={`text-4xl font-extrabold ${getScoreColor(value)}`}>{value.toFixed(1)}</h3>
        <div className="mb-2 h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${(value/5)*100}%`, backgroundColor: getBarColor(value) }}></div>
        </div>
      </div>
    </div>
  );

  const TeamCard = ({ name, data }: {name: string, data: SurveyResponse[]}) => {
    // Only use recent data for team cards too
    const recent = data.filter(r => r.timestamp > (Date.now() - (45 * 24 * 60 * 60 * 1000)));
    const dataset = recent.length > 0 ? recent : data;

    const score = dataset.reduce((acc, curr) => 
        acc + (
            curr.metrics.emotionalLoad + 
            curr.metrics.fatigue + 
            curr.metrics.clarity + 
            curr.metrics.communication + 
            curr.metrics.psychologicalSafety + 
            curr.metrics.recognition
        ) / 6, 0
    ) / (dataset.length || 1);

    return (
        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-[#e6f1d5] transition-all group">
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-[#0f172a] text-lg">{name}</h4>
                <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500">{dataset.length} respuestas</span>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000 group-hover:bg-[#0f172a]" style={{ width: `${(score/5)*100}%`, backgroundColor: getBarColor(score) }}></div>
                </div>
                <span className={`font-extrabold text-xl ${getScoreColor(score)}`}>{score.toFixed(1)}</span>
            </div>
        </div>
    )
  }

  const getTeamData = () => {
    const teams: Record<string, SurveyResponse[]> = {};
    responses.forEach(r => {
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
             Panel de control de bienestar para <span className="font-semibold text-[#0f172a]">{company.name}</span>.<br/>
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

  // Calculate Ring Color and Attributes - No Amber
  const scoreColor = healthScore > 75 ? '#10b981' : healthScore > 50 ? '#3b82f6' : '#e11d48';
  // FIX: Increased radius and added viewBox to SVG for perfect centering
  const radius = 66; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - ((healthScore / 100) * circumference);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20 font-sans text-slate-900">
      <nav className="bg-white px-8 py-6 sticky top-0 z-30 shadow-sm border-b border-slate-200/50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 bg-[#0f172a] rounded-xl flex items-center justify-center shadow-md">
                <div className="w-3 h-3 border-2 border-[#e6f1d5] rounded-full"></div>
             </div>
             <span className="font-extrabold text-2xl text-[#0f172a] tracking-tight">Calibre.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-lg hidden sm:block border border-slate-200">
              {company.managerName} @ {company.name}
            </span>
            <button onClick={onLogout} className="text-sm font-bold text-[#0f172a] hover:text-rose-600 transition">Salir</button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-[#0f172a] mb-2 tracking-tight">Resultados en Tiempo Real</h1>
            <p className="text-slate-500 font-medium">
               Mostrando <span className="text-[#0f172a] font-bold">{displayResponses.length}</span> respuestas recientes de {filteredResponses.length} históricas.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
             {/* Team Selector */}
             <select 
               className="px-4 py-2.5 rounded-lg border border-slate-200 font-bold text-sm bg-white text-slate-600 outline-none focus:ring-2 focus:ring-[#0f172a] shadow-sm hover:border-[#0f172a] transition-colors cursor-pointer"
               value={selectedTeam}
               onChange={(e) => setSelectedTeam(e.target.value)}
             >
                {teamsList.map(t => <option key={t} value={t}>{t === 'Todos' ? 'Todos los Equipos' : t}</option>)}
             </select>

             <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex gap-1">
                <button onClick={() => setViewMode('OVERVIEW')} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${viewMode === 'OVERVIEW' ? 'bg-[#0f172a] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Visión General</button>
                <button onClick={() => setViewMode('TEAMS')} className={`px-4 py-2 rounded-lg font-bold text-sm transition ${viewMode === 'TEAMS' ? 'bg-[#0f172a] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>Por Equipos</button>
             </div>
             
             {!company.id && (
                 <button onClick={handleGenerateDemoData} className="px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-bold transition flex items-center gap-2 text-sm shadow-sm" title="Regenerar Datos Aleatorios">
                     <RefreshCw size={16} />
                 </button>
             )}
          </div>
        </div>
        
        {viewMode === 'TEAMS' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2">
                {Object.entries(getTeamData()).map(([teamName, teamResponses]) => (
                    <TeamCard key={teamName} name={teamName} data={teamResponses} />
                ))}
            </div>
        ) : (
            <div key={selectedTeam} className="animate-in fade-in zoom-in-95 duration-500">
                {/* Health Score Banner */}
                <div className="bg-white rounded-3xl p-8 mb-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 w-full">
                         {/* Large Progress Ring */}
                         <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center">
                             <svg className="w-full h-full transform -rotate-90 drop-shadow-xl" viewBox="0 0 160 160">
                                 {/* Background Track */}
                                 <circle 
                                    cx="80" cy="80" r={radius} 
                                    stroke="#f1f5f9" 
                                    strokeWidth="12" 
                                    fill="none" 
                                 />
                                 {/* Progress */}
                                 <circle 
                                    cx="80" cy="80" r={radius} 
                                    stroke={scoreColor} 
                                    strokeWidth="12" 
                                    fill="none" 
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    className="transition-all duration-1000 ease-out"
                                 />
                             </svg>
                             <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                                 <span className={`text-5xl font-extrabold tracking-tighter ${getScoreColor(healthScore)}`}>
                                     {healthScore}
                                 </span>
                             </div>
                         </div>

                         <div className="flex-1 text-center md:text-left">
                             <h2 className="text-3xl font-bold text-[#0f172a] mb-2">Índice de Salud Organizacional</h2>
                             <p className="text-slate-500 text-lg font-medium">
                                 {healthScore > 75 ? 'Excelente estado. Cultura sólida y resiliente.' : healthScore > 50 ? 'Estado regular. Hay áreas de fricción que requieren atención.' : 'Estado crítico. Riesgo alto de rotación y burnout.'}
                             </p>
                         </div>

                         <div className="flex gap-8 relative z-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <div className="text-right">
                               <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tendencia</span>
                               <span className="flex items-center justify-end gap-1 text-emerald-600 font-extrabold text-xl">
                                  <TrendingUp size={20}/> +2.4%
                               </span>
                            </div>
                            <div className="w-px bg-slate-200"></div>
                            <div className="text-right">
                               <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nivel Riesgo</span>
                               <span className={`flex items-center justify-end gap-1 font-extrabold text-xl ${healthScore < 60 ? 'text-rose-500' : 'text-slate-600'}`}>
                                  <AlertTriangle size={20}/> {healthScore < 60 ? 'Alto' : 'Bajo'}
                               </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3x2 Grid for 6 Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <MetricStat 
                        label="Nivel de Entusiasmo" 
                        icon={Heart} 
                        value={averageMetrics.find(m => m.name === 'Entusiasmo')?.value || 0}
                    />
                    <MetricStat 
                        label="Nivel de Vitalidad" 
                        icon={Zap} 
                        value={averageMetrics.find(m => m.name === 'Vitalidad')?.value || 0}
                    />
                    <MetricStat 
                        label="Claridad de Rol" 
                        icon={Brain} 
                        value={averageMetrics.find(m => m.name === 'Claridad')?.value || 0}
                    />
                    <MetricStat 
                        label="Comunicación" 
                        icon={MessageCircle} 
                        value={averageMetrics.find(m => m.name === 'Comunic.')?.value || 0}
                    />
                    <MetricStat 
                        label="Seguridad Psicológica" 
                        icon={ShieldCheck} 
                        value={averageMetrics.find(m => m.name === 'Seguridad')?.value || 0}
                    />
                    <MetricStat 
                        label="Reconocimiento" 
                        icon={Award} 
                        value={averageMetrics.find(m => m.name === 'Reconocim.')?.value || 0}
                    />
                </div>

                 {/* Historical Trend Chart */}
                 <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-[#0f172a] flex items-center gap-2">
                                <TrendingUp className="text-[#3b82f6]" size={20}/> Evolución Histórica e Impacto
                            </h3>
                            <p className="text-slate-400 text-sm font-medium mt-1">Cómo han evolucionado las métricas y el efecto de los talleres.</p>
                        </div>
                    </div>
                    
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ left: 0, right: 20, top: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="date" tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} />
                            <YAxis domain={[1, 5]} tickCount={5} tick={{fontSize: 12, fontWeight: 700, fill: '#0f172a'}} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                labelStyle={{ color: '#64748b', marginBottom: '0.5rem' }}
                            />
                            {/* Render Interventions as Vertical Lines */}
                            {interventions.map(inv => {
                                const date = new Date(inv.date);
                                const label = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                                return (
                                    <ReferenceLine 
                                        key={inv.id} 
                                        x={label} 
                                        stroke="#10b981" 
                                        strokeDasharray="3 3" 
                                        label={{ 
                                            value: '⚡', 
                                            position: 'insideTop', 
                                            fill: '#10b981', 
                                            fontSize: 20 
                                        }} 
                                    />
                                );
                            })}
                            <Line 
                                type="monotone" 
                                dataKey="score" 
                                stroke="#0f172a" 
                                strokeWidth={3} 
                                dot={{ fill: '#0f172a', r: 4, strokeWidth: 2, stroke: '#fff' }} 
                                activeDot={{ r: 6 }} 
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
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
                        <Activity className="text-[#10b981]" size={20}/> Mapa Hexagonal
                    </h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={averageMetrics}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12, fontWeight: 700 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                            <Radar name="Promedio" dataKey="value" stroke="#0f172a" strokeWidth={3} fill="#e6f1d5" fillOpacity={0.7} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                            />
                        </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
                        <Activity className="text-[#3b82f6]" size={20}/> Ranking de Indicadores
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={averageMetrics} layout="vertical" margin={{ left: 40, right: 40, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#f1f5f9" />
                            <XAxis type="number" domain={[0, 5]} tickCount={6} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} />
                            <YAxis dataKey="name" type="category" width={90} tick={{fontSize: 11, fontWeight: 700, fill: '#0f172a'}} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={28}>
                                {averageMetrics.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                                ))}
                            </Bar>
                        </BarChart>
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
      </main>
    </div>
  );
};
