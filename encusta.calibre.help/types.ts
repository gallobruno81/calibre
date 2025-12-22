
export interface CompanyProfile {
  id?: string; // Optional because it might not exist before creation
  name: string;
  logoUrl: string | null;
  primaryColor: string;
  managerName: string;
  emailList: string[];
}

export interface SurveyMetric {
  id: string;
  label: string;
  description: string;
  value: number; // 1-5
}

export interface SurveyResponse {
  id: string;
  timestamp: number;
  team?: string; // Optional team/department
  metrics: {
    // ALL METRICS: 1 = Bad, 5 = Good
    emotionalLoad: number; // Represents 'Nivel de Entusiasmo' (1=Apathetic, 5=Enthusiastic)
    clarity: number; // 1=Confused, 5=Clear
    fatigue: number; // Represents 'Vitality' (1=Exhausted, 5=Energized)
    communication: number; // 1=Closed, 5=Open
    psychologicalSafety: number; // 1=Fear, 5=Safe
    recognition: number; // 1=Invisible, 5=Valued
  };
  optionalComment?: string;
}

export interface Intervention {
  id: string;
  date: number; // timestamp
  title: string;
  description: string;
  type: 'WORKSHOP' | 'COACHING' | 'SURVEY';
}

export enum AppView {
  LANDING = 'LANDING',
  MANAGER_SETUP = 'MANAGER_SETUP',
  MANAGER_DASHBOARD = 'MANAGER_DASHBOARD',
  EMPLOYEE_SURVEY = 'EMPLOYEE_SURVEY',
  SURVEY_COMPLETE = 'SURVEY_COMPLETE'
}

export interface AiAnalysis {
  summary: string;
  recommendations: string[];
  alertLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}
