import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ReactionResult {
  equation: string;
  phenomena: string;
  properties: string;
  imageDescription: string;
  safetyWarning: string;
  indicatorColor?: string;
  hex_color: string;
  has_gas: boolean;
  has_precipitate: boolean;
  precipitate_color?: string;
}

export async function simulateReaction(
  chemicals: { name: string; formula: string; category: string }[],
  options: { concentration: 'dilute' | 'concentrated'; useIndicator: boolean }
): Promise<ReactionResult> {
  const model = "gemini-3-flash-preview";
  
  const prompt = `You are a distinguished Professor of Chemistry. Analyze the interaction between exactly these substances: ${chemicals.map(c => `${c.name} (${c.formula}, Category: ${c.category})`).join(", ")}.

  Context:
  - Concentration: ${options.concentration}
  - Phenolphthalein Indicator: ${options.useIndicator ? "Present" : "Absent"}

  Your Task:
  1. Determine if a chemical reaction occurs.
  2. If a reaction occurs, provide the FULLY BALANCED chemical equation including all stoichiometric coefficients (e.g., 2H2 + O2 -> 2H2O). Ensure the number of atoms for each element is equal on both sides.
  3. If NO reaction occurs, you MUST state "No Reaction" in the equation field, but still provide a scientifically accurate hex_color for the resulting mixture of the two substances.

  Return the result in strict JSON format:
  {
    "equation": "Balanced equation with coefficients (e.g., '2NaOH + H2SO4 -> Na2SO4 + 2H2O') or 'No Reaction'",
    "phenomena": "Detailed visual description (color, gas, precipitate, heat, etc.)",
    "properties": "Chemical/physical properties of the system",
    "imageDescription": "A prompt for an image generator to visualize the final state",
    "safetyWarning": "Specific safety advice for these chemicals",
    "hex_color": "The final solution's hex color code (e.g., '#FF0000')",
    "has_gas": boolean,
    "has_precipitate": boolean,
    "precipitate_color": "Color name or null"
  }

  Be scientifically precise. Consider the concentration and indicator effects.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          equation: { type: Type.STRING, description: "The balanced chemical equation or 'No Reaction'." },
          phenomena: { type: Type.STRING, description: "Visual phenomena." },
          properties: { type: Type.STRING, description: "Key properties." },
          imageDescription: { type: Type.STRING, description: "Visual description for image generation." },
          safetyWarning: { type: Type.STRING, description: "Safety precautions." },
          hex_color: { type: Type.STRING, description: "Hex color code of the final mixture/solution." },
          has_gas: { type: Type.BOOLEAN, description: "Whether gas is evolved." },
          has_precipitate: { type: Type.BOOLEAN, description: "Whether a precipitate forms." },
          precipitate_color: { type: Type.STRING, description: "Color of the precipitate if any." }
        },
        required: ["equation", "phenomena", "properties", "imageDescription", "safetyWarning", "hex_color", "has_gas", "has_precipitate"]
      }
    }
  });

  try {
    return JSON.parse(response.text || "{}") as ReactionResult;
  } catch (error) {
    console.error("Failed to parse reaction result:", error);
    throw new Error("Could not simulate reaction.");
  }
}
