import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface MetricData {
  name: string;
  antes: number;
  despues: number;
  description: string;
}

export interface Plan {
  title: string;
  features: string[];
  recommendedFor: string;
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
  education: string;
  bio: string;
}

export type CountryCode = 'AR' | 'MX' | 'US' | 'CL' | 'CO' | 'LATAM';

export interface CountryContent {
  flag: string;
  name: string;
  heroTitle: ReactNode;
  heroSubtitle: string;
  painPoint: string;
  regulationTag?: string;
  currency: string;
  therapyLabel: string;
  programLabel: string;
}