
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  // Fix: Removed member variable ai and constructor to instantiate GoogleGenAI inside methods per coding guidelines

  async generateSpeech(winnerName: string, category: string): Promise<string> {
    try {
      // Fix: Always instantiate GoogleGenAI right before making an API call with process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, emotional, and inspiring acceptance speech (about 100 words) in Italian for ${winnerName}, who just won the award for ${category}. The tone should be cinematic and elegant.`,
      });
      return response.text || "Grazie a tutti, questo premio è un sogno che si avvera.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Grazie all'Accademia, alla mia famiglia e a tutti coloro che hanno creduto in questo progetto. Questo riconoscimento è per tutti noi.";
    }
  }

  async generatePresenterIntro(): Promise<string> {
    try {
      // Fix: Always instantiate GoogleGenAI right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a short, formal, and welcoming introduction in Italian for a virtual presenter at the "La Notte delle Stelle" film awards. The introduction should be around 50 words and mention the magic of cinema and technology.`,
      });
      return response.text || "Benvenuti alla Serata di Gala. Stasera la tecnologia incontra l'arte in un palcoscenico senza confini.";
    } catch (error) {
      return "Signore e Signori, è un onore darvi il benvenuto a questa celebrazione straordinaria. Stasera la tecnologia incontra l'arte in un palcoscenico senza confini.";
    }
  }
}

export const gemini = new GeminiService();
