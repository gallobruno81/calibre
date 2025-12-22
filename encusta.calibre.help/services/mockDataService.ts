
import { CompanyProfile, SurveyResponse, Intervention } from '../types';

const COMPANY_KEY = 'emopulse_company';
const RESPONSES_KEY = 'emopulse_responses';
const INTERVENTIONS_KEY = 'emopulse_interventions';

export const saveCompanyProfile = (profile: CompanyProfile) => {
  localStorage.setItem(COMPANY_KEY, JSON.stringify(profile));
};

export const getCompanyProfile = (): CompanyProfile | null => {
  const data = localStorage.getItem(COMPANY_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveSurveyResponse = (response: SurveyResponse) => {
  const current = getSurveyResponses();
  const updated = [...current, response];
  localStorage.setItem(RESPONSES_KEY, JSON.stringify(updated));
};

export const getSurveyResponses = (): SurveyResponse[] => {
  const data = localStorage.getItem(RESPONSES_KEY);
  return data ? JSON.parse(data) : [];
};

export const getInterventions = (): Intervention[] => {
  const data = localStorage.getItem(INTERVENTIONS_KEY);
  return data ? JSON.parse(data) : [];
}

export const clearData = () => {
  localStorage.removeItem(COMPANY_KEY);
  localStorage.removeItem(RESPONSES_KEY);
  localStorage.removeItem(INTERVENTIONS_KEY);
};

// Helper to generate fake data for the demo
export const generateDemoData = () => {
  const responses: SurveyResponse[] = [];
  const interventions: Intervention[] = [];
  
  const now = Date.now();
  const teams = ['Ingeniería', 'Ventas', 'Marketing', 'RRHH', 'Producto'];
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  
  // Phase 1: 6-9 Months ago (Crisis Phase)
  // Low scores
  for (let i = 0; i < 30; i++) {
    const daysAgo = 180 + Math.floor(Math.random() * 90); // 6-9 months ago
    responses.push({
      id: `phase1-${i}`,
      timestamp: now - (daysAgo * MS_PER_DAY),
      team: teams[Math.floor(Math.random() * teams.length)],
      metrics: {
        emotionalLoad: 1 + Math.random() * 2, // Low Enthusiasm
        fatigue: 1 + Math.random() * 2, // Low Vitality
        clarity: 2 + Math.random() * 2,
        communication: 1 + Math.random() * 2,
        psychologicalSafety: 1 + Math.random() * 2,
        recognition: 1 + Math.random() * 1.5,
      }
    });
  }

  // INTERVENTION 1: 5 Months ago
  interventions.push({
    id: 'int-1',
    date: now - (150 * MS_PER_DAY),
    title: 'Taller: Gestión del Estrés y Burnout',
    description: 'Sesiones grupales para identificar disparadores de fatiga.',
    type: 'WORKSHOP'
  });

  // Phase 2: 3-5 Months ago (Recovery Phase)
  // Medium scores
  for (let i = 0; i < 40; i++) {
    const daysAgo = 90 + Math.floor(Math.random() * 60); // 3-5 months ago
    responses.push({
      id: `phase2-${i}`,
      timestamp: now - (daysAgo * MS_PER_DAY),
      team: teams[Math.floor(Math.random() * teams.length)],
      metrics: {
        emotionalLoad: 2.5 + Math.random() * 2,
        fatigue: 2.5 + Math.random() * 2,
        clarity: 3 + Math.random() * 2,
        communication: 3 + Math.random() * 2,
        psychologicalSafety: 2.5 + Math.random() * 2,
        recognition: 2 + Math.random() * 2,
      }
    });
  }

  // INTERVENTION 2: 2 Months ago
  interventions.push({
    id: 'int-2',
    date: now - (60 * MS_PER_DAY),
    title: 'Programa de Liderazgo Empático',
    description: 'Coaching 1:1 para managers enfocado en seguridad psicológica.',
    type: 'COACHING'
  });

  // Phase 3: Last 30 days (Current State)
  // High/Good scores
  for (let i = 0; i < 35; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    responses.push({
      id: `phase3-${i}`,
      timestamp: now - (daysAgo * MS_PER_DAY),
      team: teams[Math.floor(Math.random() * teams.length)],
      metrics: {
        emotionalLoad: 3.5 + Math.random() * 1.5, // High Enthusiasm
        fatigue: 3 + Math.random() * 2, // High Vitality
        clarity: 4 + Math.random() * 1,
        communication: 3.5 + Math.random() * 1.5,
        psychologicalSafety: 4 + Math.random() * 1,
        recognition: 3.5 + Math.random() * 1.5,
      },
      optionalComment: Math.random() > 0.8 ? "Se nota el cambio en el ambiente últimamente." : undefined
    });
  }

  localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
  localStorage.setItem(INTERVENTIONS_KEY, JSON.stringify(interventions));
  
  return responses;
};
