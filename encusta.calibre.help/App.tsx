import React, { useState, useEffect } from 'react';
import { AppView, CompanyProfile } from './types';
import { getCompanyProfile, saveCompanyProfile, generateDemoData } from './services/mockDataService';
import { createCompanyInDb } from './services/supabaseService';
import { EmployeeSurvey } from './components/EmployeeSurvey';
import { ManagerDashboard } from './components/ManagerDashboard';
import { isSupabaseConfigured, saveSupabaseConfig, clearSupabaseConfig, LS_SUPABASE_URL, LS_SUPABASE_KEY } from './lib/supabaseClient';
import { ArrowRight, MessageCircle, Eye, CheckCircle, Database, Lock, X, Wind, Sun, Coffee, Smile, Move, Quote, Heart, LayoutDashboard, Brain, Users, Zap, Sparkles } from 'lucide-react';

// --- Wellness Capsules Data (COLORS UPDATED TO COOL TONES) ---
const CAPSULES = [
  { type: 'BREATH', icon: Wind, title: 'Respiración de Caja', text: 'Inhala en 4s, mantén 4s, exhala en 4s, espera 4s. Repite 3 veces para reducir el estrés inmediatamente.', color: 'bg-blue-50 text-blue-600' },
  { type: 'MOVE', icon: Move, title: 'Regla 20-20-20', text: 'Mira un objeto a 6 metros de distancia durante 20 segundos. Tus ojos te lo agradecerán.', color: 'bg-emerald-50 text-emerald-600' },
  { type: 'BODY', icon: Smile, title: 'Escaneo de Tensión', text: 'Suelta la mandíbula. Baja los hombros. Despega la lengua del paladar. Respira.', color: 'bg-purple-50 text-purple-600' },
  { type: 'MIND', icon: Sun, title: 'Micro-Desconexión', text: 'Cierra los ojos por 60 segundos. No hagas nada. Solo existe.', color: 'bg-indigo-50 text-indigo-600' },
  { type: 'HYDRATE', icon: Coffee, title: 'Hidratación', text: 'Si no has tomado agua en la última hora, este es tu recordatorio. Tu cerebro la necesita.', color: 'bg-cyan-50 text-cyan-600' },
  { type: 'QUOTE', icon: Quote, title: 'Perspectiva', text: '"No tienes que poder con todo a la vez. Solo con lo siguiente."', color: 'bg-secondary text-foreground' },
  { type: 'GRATITUDE', icon: Heart, title: 'Gratitud Rápida', text: 'Piensa en una persona del trabajo que te haya ayudado recientemente. Mándale un gracias mental (o real).', color: 'bg-rose-50 text-rose-600' },
  { type: 'POSTURE', icon: Move, title: 'Check de Postura', text: 'Imagina un hilo tirando de tu coronilla hacia el techo. Endereza esa espalda.', color: 'bg-indigo-50 text-indigo-600' },
  { type: 'QUOTE', icon: Quote, title: 'Recordatorio', text: '"Descansar no es una pérdida de tiempo, es una inversión en productividad."', color: 'bg-teal-50 text-teal-600' },
  { type: 'BREATH', icon: Wind, title: 'Doble Inhalación', text: 'Dos inhalaciones cortas por la nariz, una exhalación larga por la boca. La forma más rápida de calmarse.', color: 'bg-blue-50 text-blue-600' },
  { type: 'FOCUS', icon: Sun, title: 'Una cosa a la vez', text: 'Cierra todas las pestañas del navegador que no estés usando ahora mismo.', color: 'bg-sky-50 text-sky-600' }
];

const INSIGHTS = [
  { type: 'MIND', icon: Brain, title: 'La Regla de los 2 Minutos', text: 'Si una tarea te lleva menos de 2 minutos, hazla ya. Esto libera carga cognitiva inmediata.', color: 'bg-emerald-50 text-emerald-700' },
  { type: 'FOCUS', icon: Zap, title: 'Deep Work', text: 'Tu cerebro tarda 23 minutos en volver a concentrarse tras una interrupción. Protege tus bloques de foco.', color: 'bg-blue-50 text-blue-700' },
  { type: 'LEADERSHIP', icon: Users, title: 'Seguridad Psicológica', text: 'Los mejores equipos no son los que no fallan, son los que se sienten seguros para admitir fallos rápidamente.', color: 'bg-purple-50 text-purple-700' },
  { type: 'DATA', icon: Database, title: 'Ley de Pareto', text: 'El 20% de tus actividades generan el 80% de tus resultados. Identifica ese 20% hoy.', color: 'bg-indigo-50 text-indigo-700' },
  { type: 'REST', icon: Coffee, title: 'Descanso Activo', text: 'Caminar 5 minutos es más efectivo para la creatividad que mirar el celular. Oxigena, no scrollees.', color: 'bg-teal-50 text-teal-700' }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [company, setCompany] = useState<CompanyProfile | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Setup state fields
  const [companyName, setCompanyName] = useState('');
  const [managerName, setManagerName] = useState('');

  // Config Modal State
  const [showConfig, setShowConfig] = useState(false);
  const [configUrl, setConfigUrl] = useState('');
  const [configKey, setConfigKey] = useState('');
  const [isDbConnected, setIsDbConnected] = useState(false);

  // Wellness Capsule State
  const [capsule, setCapsule] = useState<typeof INSIGHTS[0] | null>(null);

  useEffect(() => {
    const configured = isSupabaseConfigured();
    setIsDbConnected(configured);
    
    // Pre-fill config state from localStorage
    const storedUrl = localStorage.getItem(LS_SUPABASE_URL);
    const storedKey = localStorage.getItem(LS_SUPABASE_KEY);
    
    // Use stored values if available.
    if (storedUrl) setConfigUrl(storedUrl);
    if (storedKey) setConfigKey(storedKey);

    // 1. Check URL params (Survey Mode)
    const params = new URLSearchParams(window.location.search);
    const urlCompanyId = params.get('companyId');

    if (urlCompanyId) {
        setCompany({
            id: urlCompanyId,
            name: 'Tu Organización', 
            managerName: '',
            logoUrl: null,
            primaryColor: '#0f172a',
            emailList: []
        });
        setCurrentView(AppView.EMPLOYEE_SURVEY);
        return;
    }

    // 2. Check Local Storage (Manager Mode)
    const storedCompany = getCompanyProfile();
    if (storedCompany) {
      setCompany(storedCompany);
      setCurrentView(AppView.MANAGER_DASHBOARD); // Auto-login manager
    }
  }, []);

  // Pick a random capsule when view changes to COMPLETE
  useEffect(() => {
    if (currentView === AppView.SURVEY_COMPLETE) {
      const randomCapsule = INSIGHTS[Math.floor(Math.random() * INSIGHTS.length)];
      setCapsule(randomCapsule);
    }
  }, [currentView]);

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !managerName) return;
    setIsCreating(true);

    // Try creating in Supabase
    const dbCompany = await createCompanyInDb(companyName, managerName);
    
    // Fallback or use DB result
    const newCompany: CompanyProfile = dbCompany || {
      name: companyName,
      managerName: managerName,
      logoUrl: null, 
      primaryColor: '#0f172a',
      emailList: []
    };

    saveCompanyProfile(newCompany);
    setCompany(newCompany);
    setCurrentView(AppView.MANAGER_DASHBOARD);
    setIsCreating(false);
  };

  const handleStartEmployeeDemo = () => {
    if (!company) {
      setCompany({
        name: 'Empresa Demo',
        managerName: 'Demo Manager',
        logoUrl: null,
        primaryColor: '#0f172a',
        emailList: []
      });
    }
    setCurrentView(AppView.EMPLOYEE_SURVEY);
  };

  const handleStartResultsDemo = () => {
    // Generate fake data
    generateDemoData();
    
    // Setup fake company
    setCompany({
        name: 'Tech Corp (Demo)',
        managerName: 'Alex Manager',
        logoUrl: null,
        primaryColor: '#0f172a',
        emailList: []
    });
    
    setCurrentView(AppView.MANAGER_DASHBOARD);
  };

  const handleLogout = () => {
      setCurrentView(AppView.LANDING);
  };

  const handleBackToHome = () => {
      // Clear URL params without reload
      window.history.pushState({}, document.title, window.location.pathname);
      
      const storedCompany = getCompanyProfile();
      if (storedCompany) {
          setCompany(storedCompany);
          setCurrentView(AppView.MANAGER_DASHBOARD);
      } else {
          setCompany(null);
          setCurrentView(AppView.LANDING);
      }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if(configUrl && configKey) {
      saveSupabaseConfig(configUrl, configKey);
    }
  };

  const renderLanding = () => (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#e6f1d5] selection:text-[#0f172a] flex flex-col relative overflow-hidden">
      
      {/* Background Decor - Orbes de Luz */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob"></div>
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-[#e6f1d5] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-indigo-50 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>

      {/* Navbar */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-[#0f172a] rounded-full flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 border-2 border-[#e6f1d5] rounded-full"></div>
           </div>
           <span className="font-bold text-xl tracking-tight text-[#0f172a]">Calibre.</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-600">
           <a href="#" className="hover:text-[#0f172a] transition-colors">Metodología</a>
           <a href="#" className="hover:text-[#0f172a] transition-colors">Servicios</a>
           <a href="#" className="hover:text-[#0f172a] transition-colors">Equipo</a>
        </div>
        <button 
            onClick={() => {
                const form = document.getElementById('create-form');
                form?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 bg-[#0f172a] text-white rounded-full text-sm font-bold hover:bg-[#0f172a]/90 transition shadow-lg hover:shadow-xl"
        >
            Solicitar Propuesta <ArrowRight size={16} className="inline ml-1"/>
        </button>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex-grow flex flex-col justify-center">
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-20 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-slate-200 text-[11px] font-bold tracking-widest text-slate-500 mb-8 bg-white/50 backdrop-blur-sm shadow-sm">
              ARGENTINA • MIAMI • MÉXICO
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tight text-[#0f172a]">
            Bienestar emocional <br/>
            <span className="relative inline-block">
              <span className="relative z-10">para el trabajo real</span>
              <span className="absolute bottom-3 left-0 w-full h-4 bg-[#e6f1d5] -z-0 rounded-full transform -rotate-1 opacity-80"></span>
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
              Terapia individual, trabajo grupal y medición emocional simple. <br className="hidden md:block"/>
              Sin clichés espirituales. Basado en datos clínicos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                  onClick={() => {
                      const form = document.getElementById('create-form');
                      form?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-[#0f172a] text-white rounded-full font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full sm:w-auto"
              >
                  Configurar Empresa
              </button>
              
              <button 
                  onClick={handleStartEmployeeDemo}
                  className="px-8 py-4 bg-white text-[#0f172a] border border-slate-200 hover:border-[#e6f1d5] rounded-full font-bold text-lg hover:bg-[#e6f1d5]/20 transition-all w-full sm:w-auto flex items-center justify-center gap-2 shadow-sm"
              >
                  <Eye size={20} /> Demo Empleado
              </button>

              <button 
                  onClick={handleStartResultsDemo}
                  className="px-8 py-4 bg-white text-[#0f172a] border border-slate-200 hover:border-[#e6f1d5] rounded-full font-bold text-lg hover:bg-[#e6f1d5]/20 transition-all w-full sm:w-auto flex items-center justify-center gap-2 shadow-sm"
              >
                  <LayoutDashboard size={20} /> Demo Resultados
              </button>
          </div>
        </div>

        {/* Feature Section / Form */}
        <div id="create-form" className="bg-white py-24 border-t border-slate-100 relative">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                <div className="inline-block p-4 bg-[#e6f1d5] rounded-2xl text-[#0f172a] mb-8 shadow-sm">
                    <MessageCircle size={32} />
                </div>
                <h2 className="text-4xl font-bold mb-6 text-[#0f172a] leading-tight">Transformamos sensaciones en datos.</h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                    Utilizamos una encuesta anónima de 6 variables (Entusiasmo, Vitalidad, Claridad, Comunicación, Seguridad y Reconocimiento) para darte KPIs clínicos claros y accionables.
                </p>
                <div className="flex flex-wrap gap-4 items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"><div className="w-2 h-2 bg-[#10b981] rounded-full"></div> Clínico</span>
                    <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"><div className="w-2 h-2 bg-[#10b981] rounded-full"></div> Pragmático</span>
                    <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"><div className="w-2 h-2 bg-[#10b981] rounded-full"></div> Medible</span>
                </div>
              </div>

              <div className="bg-white p-10 rounded-3xl shadow-2xl relative border border-slate-100 ring-1 ring-slate-900/5">
                {!isDbConnected && (
                   <div className="absolute -top-4 -right-4 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold shadow-sm z-20 border border-slate-200">
                     Modo Demo (Offline)
                   </div>
                )}
                {isDbConnected && (
                   <div className="absolute -top-4 -right-4 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg text-xs font-bold shadow-sm z-20 flex items-center gap-1 border border-emerald-200">
                     <CheckCircle size={12}/> DB Conectada
                   </div>
                )}

                <h3 className="text-2xl font-bold mb-6 text-[#0f172a]">Crear Perfil de Manager</h3>
                <form onSubmit={handleCreateCompany} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-[#0f172a] mb-2">Nombre de la Empresa</label>
                      <input 
                        type="text" 
                        required
                        className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0f172a] outline-none transition font-medium"
                        placeholder="Ej. Tech Solutions Inc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#0f172a] mb-2">Tu Nombre (Manager)</label>
                      <input 
                        type="text" 
                        required
                        className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0f172a] outline-none transition font-medium"
                        placeholder="Ej. Ana García"
                        value={managerName}
                        onChange={(e) => setManagerName(e.target.value)}
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isCreating}
                      className="w-full py-4 bg-[#0f172a] text-white rounded-xl font-bold hover:shadow-lg hover:bg-[#0f172a]/90 transition-all flex justify-center items-center gap-2 text-lg"
                    >
                      {isCreating ? 'Creando...' : 'Comenzar Medición'} <ArrowRight size={20} />
                    </button>
                </form>
              </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200 text-center text-slate-500 text-sm">
         <div className="flex justify-center mb-6">
            <Sparkles size={24} className="text-[#e6f1d5] fill-[#0f172a]" />
         </div>
         <p className="mb-6 font-medium">© 2024 Calibre Bienestar. Todos los derechos reservados.</p>
         <div className="flex gap-2 justify-center">
             <button 
                onClick={() => window.location.reload()}
                className="text-xs px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
             >
                Recargar App
             </button>
             <button 
                onClick={() => setShowConfig(true)}
                className={`text-xs flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg transition-colors border ${isDbConnected ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
             >
                <Database size={12} /> {isDbConnected ? 'DB Conectada' : 'Configurar DB'}
             </button>
         </div>
         <p className="text-[10px] mt-6 opacity-40 font-mono">v2.1 Hexagonal Model • AyaRX UI</p>
      </footer>
    </div>
  );

  return (
    <>
      {currentView === AppView.LANDING && renderLanding()}
      
      {currentView === AppView.MANAGER_DASHBOARD && company && (
        <ManagerDashboard 
          company={company} 
          onLogout={handleLogout} 
        />
      )}
      
      {currentView === AppView.EMPLOYEE_SURVEY && company && (
        <EmployeeSurvey 
          company={company} 
          onComplete={() => setCurrentView(AppView.SURVEY_COMPLETE)} 
        />
      )}

      {currentView === AppView.SURVEY_COMPLETE && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex items-center justify-center p-6 animate-in fade-in duration-700 font-sans relative overflow-hidden">
           {/* Background Decoration */}
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#e6f1d5] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-pulse animation-delay-2000"></div>

           <div className="max-w-md w-full text-center relative z-10">
              
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl mb-8 relative overflow-hidden border border-white/50">
                 <div className="w-16 h-16 bg-[#e6f1d5] text-[#0f172a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <CheckCircle size={32} />
                 </div>
                 <h2 className="text-3xl font-bold text-[#0f172a] mb-2 tracking-tight">¡Registro Exitoso!</h2>
                 <p className="text-slate-600 font-medium">Tus respuestas son 100% anónimas.</p>
              </div>

              {/* Wellness Capsule Card */}
              {capsule && (
                <div className="bg-white p-8 rounded-3xl shadow-xl transform transition-all hover:scale-[1.02] border border-slate-100 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#0f172a]"></div>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${capsule.color} bg-opacity-20`}>
                     <capsule.icon size={14} /> Insight del Día
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#0f172a] mb-4 leading-tight">{capsule.title}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
                    {capsule.text}
                  </p>
                  
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-[#0f172a] animate-[width_3s_ease-out]"></div>
                  </div>
                </div>
              )}

              <button 
                onClick={handleBackToHome}
                className="mt-8 text-slate-500 font-bold hover:text-[#0f172a] transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                Volver al inicio <ArrowRight size={16} />
              </button>
           </div>
        </div>
      )}

      {/* Config Modal */}
      {showConfig && (
         <div className="fixed inset-0 bg-[#0f172a]/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative border border-slate-100">
               <button onClick={() => setShowConfig(false)} className="absolute top-6 right-6 text-slate-400 hover:text-[#0f172a] transition-colors">
                  <X size={24} />
               </button>
               
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white shadow-lg">
                     <Database size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0f172a]">Conectar Supabase</h3>
               </div>

               <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Ingresa las credenciales API de tu proyecto para habilitar la persistencia de datos real.
                  Encuéntralas en <strong>Project Settings</strong> {'>'} <strong>API</strong>.
               </p>

               <form onSubmit={handleSaveConfig} className="space-y-4">
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Project URL</label>
                     <div className="relative">
                        <input 
                           type="text" 
                           className="w-full p-4 pl-10 bg-slate-50 rounded-xl border border-slate-200 text-sm font-mono focus:ring-2 focus:ring-[#0f172a] outline-none text-[#0f172a] transition"
                           placeholder="https://your-project.supabase.co"
                           value={configUrl}
                           onChange={(e) => setConfigUrl(e.target.value)}
                        />
                        <Database size={16} className="absolute left-3.5 top-4.5 text-slate-400" />
                     </div>
                  </div>
                  
                  <div>
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Anon / Public Key</label>
                     <div className="relative">
                        <input 
                           type="password" 
                           className="w-full p-4 pl-10 bg-slate-50 rounded-xl border border-slate-200 text-sm font-mono focus:ring-2 focus:ring-[#0f172a] outline-none text-[#0f172a] transition"
                           placeholder="eyJxh..."
                           value={configKey}
                           onChange={(e) => setConfigKey(e.target.value)}
                        />
                        <Lock size={16} className="absolute left-3.5 top-4.5 text-slate-400" />
                     </div>
                     <p className="text-[10px] text-slate-400 mt-2 ml-1">
                        Asegúrate de copiar la clave que dice "anon" y "public". NO uses la "service_role" ni "publishable" si empieza con sb_.
                     </p>
                  </div>

                  <div className="pt-4 flex gap-3">
                     {isDbConnected && (
                        <button 
                           type="button" 
                           onClick={clearSupabaseConfig}
                           className="flex-1 py-4 text-rose-600 font-bold text-sm hover:bg-rose-50 rounded-xl transition"
                        >
                           Desconectar
                        </button>
                     )}
                     <button 
                        type="submit" 
                        className="flex-1 py-4 bg-[#0f172a] text-white rounded-xl font-bold hover:shadow-lg hover:bg-[#0f172a]/90 transition"
                     >
                        {isDbConnected ? 'Actualizar Conexión' : 'Conectar Base de Datos'}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      )}
    </>
  );
};

export default App;