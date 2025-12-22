
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { CompanyProfile, SurveyResponse } from '../types/survey';

export const createCompanyInDb = async (name: string, managerName: string): Promise<CompanyProfile | null> => {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase credentials missing. Falling back to local demo mode.");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('companies')
      .insert([
        { name, manager_name: managerName }
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      managerName: data.manager_name,
      logoUrl: null,
      primaryColor: '#0f172a',
      emailList: []
    };
  } catch (error) {
    console.error('Error creating company:', error);
    return null;
  }
};

export const submitSurveyToDb = async (companyId: string, metrics: any, comment?: string) => {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured. Cannot submit to DB.");
    return false;
  }

  try {
    const { error } = await supabase
      .from('survey_responses')
      .insert([
        {
          company_id: companyId,
          emotional_load: metrics.emotionalLoad,
          fatigue: metrics.fatigue,
          clarity: metrics.clarity,
          communication: metrics.communication,
          psychological_safety: metrics.psychologicalSafety,
          recognition: metrics.recognition,
          comment: comment || null
        }
      ]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error submitting survey:', error);
    return false;
  }
};

export const getCompanySurveysFromDb = async (companyId: string): Promise<SurveyResponse[]> => {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((row: any) => ({
      id: row.id,
      timestamp: new Date(row.created_at).getTime(),
      metrics: {
        emotionalLoad: row.emotional_load,
        fatigue: row.fatigue,
        clarity: row.clarity,
        communication: row.communication,
        psychologicalSafety: row.psychological_safety || 3, // Default for old records
        recognition: row.recognition || 3, // Default for old records
      },
      optionalComment: row.comment || undefined
    }));
  } catch (error) {
    console.error('Error fetching surveys:', error);
    return [];
  }
};
