import { GoogleGenAI } from "@google/genai";
import { SurveyResponse, AiAnalysis } from "../types";

const parseGeminiResponse = (text: string): AiAnalysis => {
  try {
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : text;
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return {
      summary: "No se pudo generar el análisis automático en este momento.",
      recommendations: ["Revise los datos manualmente."],
      alertLevel: 'LOW'
    };
  }
};

export const analyzeWellnessData = async (responses: SurveyResponse[]): Promise<AiAnalysis> => {
  if (responses.length === 0) {
    return {
      summary: "No hay datos suficientes para realizar un análisis.",
      recommendations: ["Invite a más empleados a completar la encuesta."],
      alertLevel: 'LOW'
    };
  }

  const totals = responses.reduce((acc, curr) => ({
    load: acc.load + curr.metrics.emotionalLoad,
    clarity: acc.clarity + curr.metrics.clarity,
    fatigue: acc.fatigue + curr.metrics.fatigue,
    comm: acc.comm + curr.metrics.communication,
    safety: acc.safety + curr.metrics.psychologicalSafety,
    recognition: acc.recognition + curr.metrics.recognition,
  }), { load: 0, clarity: 0, fatigue: 0, comm: 0, safety: 0, recognition: 0 });

  const count = responses.length;
  const avgs = {
    emotionalLoad: (totals.load / count).toFixed(1), // Now represents 'Entusiasmo'
    clarity: (totals.clarity / count).toFixed(1),
    fatigue: (totals.fatigue / count).toFixed(1), // Now represents 'Vitality'
    communication: (totals.comm / count).toFixed(1),
    psychologicalSafety: (totals.safety / count).toFixed(1),
    recognition: (totals.recognition / count).toFixed(1)
  };

  const prompt = `
    Actúa como un psicólogo organizacional senior analizando una empresa.
    Analiza los siguientes datos de una encuesta de bienestar (Escala 1 al 5).
    
    NOTA IMPORTANTE: Para TODAS las métricas, 1 es MALO y 5 es EXCELENTE.

    METRICAS:
    - Nivel de Entusiasmo: ${avgs.emotionalLoad} (1=Apático/Sin sentido, 5=Entusiasmado/Con pasión)
    - Vitalidad: ${avgs.fatigue} (1=Agotado, 5=Energizado/Vital)
    - Claridad de Rol: ${avgs.clarity} (1=Confuso, 5=Claro)
    - Comunicación: ${avgs.communication} (1=Mala/Cerrada, 5=Fluida/Abierta)
    - Seguridad Psicológica: ${avgs.psychologicalSafety} (1=Miedo, 5=Seguro/Confianza)
    - Reconocimiento: ${avgs.recognition} (1=Invisible, 5=Valorado)

    Genera un JSON con el siguiente formato:
    {
      "summary": "Diagnóstico clínico directo y profesional (max 2 oraciones). Enfócate en los puntos de dolor (valores cercanos a 1 o 2) y la relación entre Entusiasmo y Vitalidad.",
      "recommendations": ["Tratamiento/Acción 1", "Tratamiento/Acción 2", "Tratamiento/Acción 3"],
      "alertLevel": "LOW" | "MEDIUM" | "HIGH"
    }

    Regla: Si Vitalidad < 2.5 o Seguridad Psicológica < 2.5, alertLevel debe ser HIGH.
  `;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return parseGeminiResponse(response.text);
  } catch (error) {
    console.error("Gemini API Error", error);
     return {
      summary: "Error conectando con el servicio de análisis inteligente.",
      recommendations: ["Verifique su conexión a internet.", "Intente nuevamente más tarde."],
      alertLevel: 'LOW'
    };
  }
};