import React from 'react';
import { CountryCode, CountryContent } from '../types';

export const countryContent: Record<CountryCode, CountryContent> = {
  AR: {
    flag: "🇦🇷",
    name: "Argentina",
    heroTitle: <>La propuesta de valor que tu talento IT valora <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl inline-block text-[#141414]">más que el sueldo.</span></>,
    heroSubtitle: "En un contexto de alta rotación, ofrece estabilidad real. Soporte clínico y métricas de burnout para evitar la rotación y fidelizar al equipo senior.",
    painPoint: "Fidelización de Talento & Escala",
    regulationTag: "Beneficio de Retención",
    currency: "ARS / USD",
    therapyLabel: "Espacios 1:1",
    programLabel: "Programas de Clima"
  },
  MX: {
    flag: "🇲🇽",
    name: "México",
    heroTitle: <>Cumple con la <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl inline-block text-[#141414]">NOM-035</span> sin burocracia y con impacto real.</>,
    heroSubtitle: "Asegura la continuidad del negocio. Diagnóstico de riesgo psicosocial + plan de acción estratégico para evitar multas de la NOM-035.",
    painPoint: "Cumplimiento NOM-035",
    regulationTag: "NOM-035 Compliant",
    currency: "MXN",
    therapyLabel: "Atención rápida",
    programLabel: "Plan de Previsión"
  },
  US: {
    flag: "🇺🇸",
    name: "USA / Miami",
    heroTitle: <>The EAP that your team <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl inline-block text-[#141414]">will actually use.</span></>,
    heroSubtitle: "Culturally competent mental health for Latino workforce. Stop wasting money on 1-800 numbers nobody calls.",
    painPoint: "EAP Replacement",
    regulationTag: "HIPAA Compliant",
    currency: "USD",
    therapyLabel: "Clinical Support 1-on-1",
    programLabel: "Wellness Programs"
  },
  CL: {
    flag: "🇨🇱",
    name: "Chile",
    heroTitle: <>Conciliación y productividad bajo la <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl inline-block text-[#141414]">Ley de 40 Horas.</span></>,
    heroSubtitle: "Eleva el bienestar organizacional con estándares de excelencia clínica. Prevención de riesgos psicosociales y cumplimiento SUSESO/ISTAS.",
    painPoint: "Foco & SUSESO",
    regulationTag: "Normativa SUSESO",
    currency: "CLP",
    therapyLabel: "Soporte Clínico Individual",
    programLabel: "Programas de rendimiento"
  },
  CO: {
    flag: "🇨🇴",
    name: "Colombia",
    heroTitle: <>Reduce el Burnout en tus equipos de <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl inline-block text-[#141414]">Alto Rendimiento.</span></>,
    heroSubtitle: "Protege tu motor humano y evita la fuga de talento. Batería de Riesgo y soporte clínico para equipos de alto rendimiento.",
    painPoint: "Batería Riesgo Psicosocial",
    regulationTag: "Res. 2646",
    currency: "COP",
    therapyLabel: "Atención Clínica",
    programLabel: "Programas de impacto"
  },
  LATAM: {
    flag: "🌎",
    name: "Latam (Otro)",
    heroTitle: <>Recuperamos el <span className="bg-[#E6F1D5] px-3 py-0.5 rounded-xl inline-block text-[#141414]">foco de tu equipo.</span></>,
    heroSubtitle: "Radar Calibre y atención rápida para evitar licencias y renuncias inesperadas. No es bienestar genérico, es eficiencia operativa.",
    painPoint: "Productividad Sostenible",
    regulationTag: "Estándar Clínico",
    currency: "USD",
    therapyLabel: "Espacios 1:1",
    programLabel: "Programas de Impacto"
  }
};