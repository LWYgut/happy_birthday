import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBirthdayMessage = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Write a very short, romantic, and magical 4-line poem for my girlfriend's 24th birthday. Call her 'Princess'. Focus on stars, love, and a bright future.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            poem: {
              type: Type.STRING,
            },
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) return "Happy 24th Birthday,\nMy beautiful Princess,\nMay your wishes come true,\nWith love endless.";
    
    const data = JSON.parse(jsonText) as GeminiResponse;
    return data.poem;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Happy 24th Birthday,\nMy beautiful Princess,\nMay your wishes come true,\nWith love endless.";
  }
};
