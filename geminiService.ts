
import { GoogleGenAI, Modality } from "@google/genai";

export class GeminiService {
  private getClient() {
    // Utilizzo rigoroso di process.env.API_KEY
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateSpeech(winnerName: string, category: string): Promise<string> {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, emotional, and inspiring acceptance speech (about 100 words) in Italian for ${winnerName}, who just won the award for ${category}. The tone should be cinematic and elegant.`,
      });
      return response.text || "Grazie a tutti, questo premio è un sogno che si avvera.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Grazie all'Accademia, alla mia famiglia e a tutti coloro che hanno creduto in questo progetto.";
    }
  }

  async generatePresenterIntro(): Promise<string> {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a short, formal, and welcoming introduction in Italian for a virtual presenter at the "La Notte delle Stelle" film awards.`,
      });
      return response.text || "Benvenuti alla Serata di Gala.";
    } catch (error) {
      return "Signore e Signori, benvenuti a questa celebrazione straordinaria.";
    }
  }

  async textToSpeech(prompt: string, voiceName: string = 'Kore'): Promise<string | undefined> {
    try {
      const ai = this.getClient();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });
      return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    } catch (error) {
      console.error("TTS Error:", error);
      return undefined;
    }
  }
}

export const gemini = new GeminiService();
