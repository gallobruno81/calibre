import React from 'react';
import { CountryCode, CountryContent } from '../types';

export const countryContent: Record<CountryCode, CountryContent> = {
  AR: {
    flag: "🇦🇷",
    name: "Argentina",
    heroTitle: <>El beneficio que tu talento IT valora <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900">más que el sueldo.</span></>,
    heroSubtitle: "En un mercado volátil, ofrece estabilidad mental. Terapia premium y medición de burnout para fidelizar a tus equipos clave.",
    painPoint: "Retención de Talento & Inflación",
    regulationTag: "Beneficio Exento",
    currency: "ARS / USD"
  },
  MX: {
    flag: "🇲🇽",
    name: "México",
    heroTitle: <>Cumple con la <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900">NOM-035</span> sin burocracia y con impacto real.</>,
    heroSubtitle: "Evita multas y protege a tu equipo. Diagnóstico de riesgo psicosocial + plan de acción clínico inmediato.",
    painPoint: "Cumplimiento NOM-035",
    regulationTag: "NOM-035 Compliant",
    currency: "MXN"
  },
  US: {
    flag: "🇺🇸",
    name: "USA / Miami",
    heroTitle: <>The EAP that your team <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900">will actually use.</span></>,
    heroSubtitle: "Culturally competent mental health for Latino workforce. Stop wasting money on 1-800 numbers nobody calls.",
    painPoint: "EAP Replacement",
    regulationTag: "HIPAA Compliant",
    currency: "USD"
  },
  CL: {
    flag: "🇨🇱",
    name: "Chile",
    heroTitle: <>Calidad de vida laboral para la <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900">Ley de 40 Horas.</span></>,
    heroSubtitle: "Adapta tu cultura a los nuevos estándares de bienestar. Prevención de riesgos psicosociales (SUSESO/ISTAS).",
    painPoint: "Ley 40hs & SUSESO",
    regulationTag: "Protocolo ISTAS",
    currency: "CLP"
  },
  CO: {
    flag: "🇨🇴",
    name: "Colombia",
    heroTitle: <>Reduce el Burnout en tus equipos de <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900">Alto Rendimiento.</span></>,
    heroSubtitle: "Para startups y BPOs que necesitan cuidar su motor humano. Batería de Riesgo Psicosocial y terapia ágil.",
    painPoint: "Batería Riesgo Psicosocial",
    regulationTag: "Res. 2646",
    currency: "COP"
  },
  LATAM: {
    flag: "🌎",
    name: "Latam (Otro)",
    heroTitle: <>Bienestar emocional para <span className="bg-[#E9F5DB] px-3 py-0.5 rounded-xl inline-block text-slate-900">el trabajo real.</span></>,
    heroSubtitle: "Terapia individual, trabajo grupal y medición emocional simple. Sin clichés espirituales. Basado en datos clínicos.",
    painPoint: "Productividad Sostenible",
    regulationTag: "Estándar Clínico",
    currency: "USD"
  }
};