import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Therapist } from '../types';

interface TherapistImageProps {
  therapist: Therapist;
  className?: string;
  imgClassName?: string;
  children?: React.ReactNode;
}

export const TherapistImage: React.FC<TherapistImageProps> = ({
  therapist,
  className = "",
  imgClassName = "",
  children
}) => {
  const [imageSrc, setImageSrc] = useState(therapist.image);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // @ts-ignore
      if (window.aistudio && !await window.aistudio.hasSelectedApiKey()) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }

      // @ts-ignore
      if (window.aistudio && !await window.aistudio.hasSelectedApiKey()) return;

      setIsLoading(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      const prompt = `Professional corporate headshot of ${therapist.name}, a ${therapist.role}. 
      Specialty: ${therapist.specialty}. 
      Appearance description based on bio: ${therapist.bio}. 
      High quality, photorealistic, 4k, soft studio lighting, neutral background, looking at camera, confident smile.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        },
      });

      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            const newImageUrl = `data:image/png;base64,${base64EncodeString}`;
            setImageSrc(newImageUrl);
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Error generating image. Please ensure you have selected a valid API Key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative group/image ${className}`}>
      <img
        src={imageSrc}
        alt={therapist.name}
        className={`w-full h-full object-cover transition-transform duration-700 ${imgClassName}`}
      />

      {/* AI Generation Button Overlay */}
      <button
        onClick={generateImage}
        disabled={isLoading}
        className="absolute top-3 right-3 p-2.5 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white hover:bg-white hover:text-indigo-600 transition-all duration-300 opacity-0 group-hover/image:opacity-100 disabled:opacity-100 disabled:bg-white/50 z-30 shadow-lg"
        title="Generar retrato con IA (Nano Banana Pro)"
      >
        {isLoading ? <Loader2 size={18} className="animate-spin text-indigo-600" /> : <Sparkles size={18} />}
      </button>

      {/* Overlays passed as children */}
      {children}
    </div>
  );
};