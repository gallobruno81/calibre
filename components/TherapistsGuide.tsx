import React, { useEffect } from 'react';
import { Section } from './Section';
import { RevealOnScroll } from './RevealOnScroll';
import { Button } from './Button';
import { ArrowLeft, MessageSquare, Brain, Sparkles, ShieldCheck, Activity, Users, AlertTriangle, Fingerprint, Mic } from 'lucide-react';

interface TherapistsGuideProps {
  onBack: () => void;
}

export const TherapistsGuide: React.FC<TherapistsGuideProps> = ({ onBack }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const translations = [
    { 
      original: "Círculo de la palabra", 
      corporate: "Protocolo de Comunicación Segura", 
      icon: MessageSquare,
      why: "Las empresas temen la 'catarsis' sin estructura. 'Protocolo' implica reglas, tiempos y contención."
    },
    { 
      original: "Sanar el trauma / Herida", 
      corporate: "Regulación del Sistema Nervioso", 
      icon: Activity,
      why: "La palabra 'trauma' asusta a RRHH y estigmatiza al empleado. 'Regulación' suena a mantenimiento preventivo de alto rendimiento."
    },
    { 
      original: "Mover la energía estancada", 
      corporate: "Completar el ciclo de estrés", 
      icon: Sparkles,
      why: "La energía es abstracta y subjetiva. El 'ciclo de estrés' es un concepto fisiológico medible (cortisol/adrenalina)."
    },
    { 
      original: "Dinámicas ocultas / Constelación", 
      corporate: "Patrones sistémicos de equipo", 
      icon: Users,
      why: "Elimina el misticismo ('el campo') pero mantiene la mirada sobre la estructura, las lealtades invisibles y los roles."
    },
    { 
      original: "Darse cuenta (Awareness)", 
      corporate: "Inteligencia de Liderazgo", 
      icon: Brain,
      why: "Convierte una habilidad blanda introspectiva en una competencia ejecutiva clave para la toma de decisiones."
    },
  ];

  const scripts = [
    {
      situation: "Inicio de sesión (Centramiento)",
      dont: "Vamos a cerrar los ojos, respirar luz y conectar con nuestra intención sagrada.",
      do: "Para que esta reunión sea eficiente, necesitamos 'limpiar' la memoria RAM del cerebro. Haremos un ejercicio de 90 segundos de respiración fisiológica para bajar revoluciones y enfocar la atención."
    },
    {
      situation: "Conflicto en el equipo",
      dont: "Siento una energía muy densa y cargada entre ustedes, hay cosas no dichas que nos bloquean.",
      do: "Detecto un nivel de fricción operativa alto. Parece que el canal de comunicación tiene ruido. Vamos a usar un protocolo de feedback limpio para destrabar esto sin juicios personales."
    },
    {
      situation: "Empleado desbordado",
      dont: "Necesitas abrazar tu vulnerabilidad y dejarte sentir el dolor para sanar.",
      do: "Tu sistema nervioso está en una respuesta simpática crónica (lucha/huida). No es debilidad, es biología. Diseñemos una estrategia para recuperar tu capacidad de descanso."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-24 font-sans text-slate-900">
      {/* Header */}
      <Section className="py-20">
        <RevealOnScroll>
          <Button variant="outline" onClick={onBack} className="mb-8 border-slate-200 bg-white">
            <ArrowLeft size={16} className="mr-2"/> Volver al sitio
          </Button>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 text-xs font-bold uppercase tracking-wider mb-6">
               <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
               Manual de Operaciones Clínicas v2.0
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Estrategia de Intervención <br/>
              <span className="text-indigo-600">Alta Clínica / Bajo Perfil</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-3xl">
              Este no es un manual para "disfrazarse" de consultor. Es una guía para traducir tu profundidad clínica al único idioma que el sistema corporativo respeta: <strong>Eficiencia, Seguridad y Datos.</strong>
            </p>
          </div>
        </RevealOnScroll>
      </Section>

      {/* The Strategy: Trojan Horse */}
      <Section className="py-10">
        <RevealOnScroll>
           <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-sm">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">La Estrategia del "Caballo de Troya"</h2>
                    <p className="text-slate-500 font-medium mb-6 leading-relaxed">
                      Si entras hablando de "amor", "alma" o "sanación", activas las defensas cínicas de la organización. Te etiquetarán como "el recreo de bienestar" y perderás influencia.
                    </p>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      En Calibre, vendemos <strong>Rendimiento Sostenible</strong>. Una vez que tenemos la confianza del Board, entregamos lo que realmente necesitan: conexión humana, verdad y salud mental. <span className="text-slate-900 font-bold">Usamos la lógica para abrir la puerta, y la clínica para transformar la sala.</span>
                    </p>
                 </div>
                 <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <AlertTriangle className="text-amber-500" size={20}/>
                      Líneas Rojas (Safety Protocols)
                    </h3>
                    <ul className="space-y-4 text-sm font-medium text-slate-600">
                       <li className="flex gap-3">
                         <span className="text-red-500 font-bold">✘</span>
                         <span>No provocar catarsis explosivas (llanto descontrolado) en espacios públicos de trabajo. Es iatrogénico en este contexto.</span>
                       </li>
                       <li className="flex gap-3">
                         <span className="text-red-500 font-bold">✘</span>
                         <span>No tocar físicamente a los participantes sin consentimiento explícito y contexto ultra-seguro.</span>
                       </li>
                       <li className="flex gap-3">
                         <span className="text-red-500 font-bold">✘</span>
                         <span>Nunca cuestionar la autoridad de un líder frente a su equipo. El trabajo sistémico con la jerarquía se hace en privado.</span>
                       </li>
                    </ul>
                 </div>
              </div>
           </div>
        </RevealOnScroll>
      </Section>

      {/* The Translation Dictionary */}
      <Section className="py-10">
        <RevealOnScroll>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Diccionario de Traducción</h2>
            <p className="text-slate-500">Cómo decir lo mismo, pero con autoridad técnica.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {translations.map((item, idx) => (
               <div key={idx} className="bg-white rounded-[2rem] border border-slate-200 p-8 hover:shadow-lg transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 mb-6">
                    <item.icon size={20} />
                  </div>
                  
                  <div className="mb-4 pb-4 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Lenguaje Holístico</p>
                    <p className="text-base font-medium text-slate-400 line-through decoration-slate-300">{item.original}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1">Lenguaje Calibre</p>
                    <p className="text-lg font-bold text-slate-900">{item.corporate}</p>
                  </div>
                  
                  <p className="text-xs text-slate-500 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl">
                    <span className="font-bold">Por qué:</span> {item.why}
                  </p>
               </div>
             ))}
          </div>
        </RevealOnScroll>
      </Section>

      {/* The "Anti-Robot" Section */}
      <Section className="py-10">
        <RevealOnScroll>
           <div className="bg-[#0F172A] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-12">
                 <div>
                   <div className="inline-flex items-center gap-2 bg-indigo-500/20 px-3 py-1 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
                      <Fingerprint size={14} /> Autenticidad
                   </div>
                   <h2 className="text-3xl font-bold mb-4">No seas un Robot Corporativo</h2>
                   <p className="text-slate-300 font-medium leading-relaxed mb-6">
                     Adaptar el lenguaje no significa perder el alma. No uses palabras como "sinergia", "asertividad" o "resiliencia" si suenan vacías.
                   </p>
                   <p className="text-slate-300 font-medium leading-relaxed">
                     Tu valor diferencial es que <strong>NO eres de RRHH</strong>. Eres un clínico. Mantén cierta distancia técnica. No te rías de chistes malos por compromiso. Tu autoridad viene de tu capacidad de ver lo que otros no ven, no de caer simpático.
                   </p>
                 </div>
                 
                 <div className="space-y-6">
                    {scripts.map((script, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                         <div className="flex items-center gap-2 mb-3 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                           <Mic size={14} /> Script: {script.situation}
                         </div>
                         <div className="mb-3 opacity-50 text-sm line-through decoration-red-400 decoration-2">
                            "{script.dont}"
                         </div>
                         <div className="text-white font-medium text-sm border-l-2 border-emerald-500 pl-3">
                            "{script.do}"
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </RevealOnScroll>
      </Section>

      <Section className="py-12 text-center">
        <RevealOnScroll>
           <h2 className="text-2xl font-bold text-slate-900 mb-4">¿Listo para operar en este nivel?</h2>
           <p className="text-slate-500 mb-8 max-w-xl mx-auto">
             Buscamos terapeutas senior que entiendan la delicada danza entre la clínica profunda y la estrategia organizacional.
           </p>
           <Button variant="primary" onClick={() => window.location.href = 'mailto:rrhh@calibre-bienestar.com'} withArrow>
             Aplicar como Terapeuta Calibre
           </Button>
        </RevealOnScroll>
      </Section>
    </div>
  );
};
