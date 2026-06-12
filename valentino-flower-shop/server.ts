import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize the Google Gemini GenAI SDK on the server side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("GEMINI_API_KEY holds no value. We will use elegant mock fallbacks when API is unavailable.");
}

app.use(express.json());

// API: Curate a digital botanical masterpiece based on user parameters
app.post("/api/curate-flower", async (req, res) => {
  const { species, petalCount, symmetry, glowness, customPrompt, themeColor } = req.body;

  if (!ai) {
    // Elegant artistic mock fallback if API key is not yet set
    const fallbackName = `${species === "rose" ? "Gül" : "Lale"} - ${customPrompt ? customPrompt.substring(0, 15) : "Dijital Hibrit"} Sınıfı`;
    return res.json({
      name: `Sanal ${fallbackName} v1.9`,
      scentProfile: "Kuru silisyum, buharlaşmış kadife ve serin sabah çiği aroması.",
      lore: `Bu yapay botanik şaheser, ${petalCount} ideal taç yaprak ve %${(symmetry * 100).toFixed(0)} algoritmik simetriyle şekillendirildi. ${customPrompt ? `"${customPrompt}" temasından esinlenen` : "Doğal kaos ve piksellerin"} eşsiz bir uyumudur.`,
      careGuide: "%30 kontrast seviyesinde tutulmalı ve her simülasyonda OLED pikselleriyle beslenmelidir.",
      colorPalette: [themeColor || "#685682", "#1C1B1B", "#E5E2E1"],
      pricing: "1,240 € (Dijital Lisans)",
    });
  }

  try {
    const promptText = `A premium luxury digital flower creation request.
Species target: ${species}
Petal density: ${petalCount} petals
Symmetry balance: ${symmetry * 100}% mathematically perfect
Glow effect scale: ${glowness * 100}% luminous intensity
Selected base hue: ${themeColor}
User creative concept input: "${customPrompt || "Aetheria Floral dawn collection"}"

Based on this mathematical composition of a 3D procedural flower, curate an elegant, luxury botanical response in Turkish. Return a JSON object with the following schema:
- name: A highly artistic, poetic luxury Turkish name for this digital flower (e.g. "Kozmik Selenit Goncası", "Luminous Kehribar Lalası")
- scentProfile: A poetic, beautiful olfactory aroma profile (e.g., "Metalik vanilya, ozonlu yağmur ve kadifemsi lüks şakayık özü")
- lore: A luxurious, sophisticated narrative in Turkish (~3-4 deep, conceptual sentences) explaining the digital-organic symbiosis, mentioning the ${petalCount} virtual petals or the symmetry concept.
- careGuide: An elegant, stylized "digital care instruction" in Turkish (e.g. "Doğrudan mavi ışıktan sakının, aylık %15 parlaklık döngüleriyle şarj edin.")
- colorPalette: Array of exactly 3 elegant hex color strings that harmonize with the base hue (${themeColor}) and the flower's theme.
- pricing: An exclusive boutique pricing string in Euro (e.g., "1,450 € (Lisanslı Eser)")

Structure the response exactly matching the requested JSON fields. Work in a premium haute-couture flower boutique voice. Place Playfair Display luxury aesthetic in your mind.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            scentProfile: { type: Type.STRING },
            lore: { type: Type.STRING },
            careGuide: { type: Type.STRING },
            colorPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            pricing: { type: Type.STRING }
          },
          required: ["name", "scentProfile", "lore", "careGuide", "colorPalette", "pricing"]
        }
      }
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini curation error:", error);
    res.status(500).json({ error: "Yapay zeka çiçek kürasyonu başarısız oldu." });
  }
});

async function start() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Boutique server operational at http://localhost:${PORT}`);
  });
}

start();
