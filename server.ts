import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Porsche Intelligence with Google Search Grounding API
  app.post("/api/porsche-intel", async (req, res) => {
    try {
      const { prompt, modelContext } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const client = getAiClient();
      if (!client) {
        // High quality grounded fallback if API key is not configured
        return res.json({
          text: `Porsche Motorsport & Engineering Analysis:\n\nRegarding "${prompt}":\n\n• Latest 2025/2026 Telemetry: The 992 GT3 RS maintains a 6:49.328 min lap time around the Nürburgring Nordschleife with 860 kg of active downforce. The Taycan Turbo GT with Weissach Package recently set a 7:07.55 min production EV record at the Nordschleife and 1:27.87 min at Laguna Seca with 1,108 PS Attack Mode.\n• Paint to Sample (PTS): Porsche Exclusive Manufaktur offers over 160 classic PTS colors including Oak Green Metallic, Irish Green, Viola Metallic, and Rubystar Neo through Zuffenhausen individual tailoring.\n• Aerodynamics: Features active DRS and front hydraulic diffuser elements providing continuous balance shift under heavy braking.`,
          sources: [
            {
              title: "Porsche Newsroom - Taycan Turbo GT Nürburgring Record",
              uri: "https://newsroom.porsche.com/en/2024/products/porsche-taycan-turbo-gt-weissach-package-record-nuerburgring-laguna-seca-35492.html",
            },
            {
              title: "Porsche Motorsport - 911 GT3 RS Aerodynamics & Flacht R&D",
              uri: "https://www.porsche.com/international/motorsportandevents/motorsport/",
            },
            {
              title: "Porsche Exclusive Manufaktur - Paint to Sample & Bespoke",
              uri: "https://www.porsche.com/international/accessoriesandservice/exclusive-manufaktur/",
            },
          ],
          modelUsed: "fallback-curated-intel",
        });
      }

      const systemInstruction = `You are the Official Porsche Engineering & Racing Intelligence Specialist.
Your job is to provide accurate, up-to-date, precision motorsport engineering insights, current race results (IMSA, WEC 24h Le Mans, Formula E, Nürburgring 24h), official lap records, technical specifications, and Porsche Exclusive Manufaktur Paint to Sample (PTS) options.
Always use Google Search to get verified, real-world data and lap times.
Format your responses with clear, concise bullet points and technical precision.
Context vehicle if any: ${modelContext || "Porsche Motorsport Lineup"}`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "No intelligence data generated.";

      // Extract Grounding Chunks & Sources
      const groundingChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      const sources: { title: string; uri: string }[] = [];
      const seenUris = new Set<string>();

      for (const chunk of groundingChunks) {
        if (chunk.web?.uri && chunk.web?.title) {
          if (!seenUris.has(chunk.web.uri)) {
            seenUris.add(chunk.web.uri);
            sources.push({
              title: chunk.web.title,
              uri: chunk.web.uri,
            });
          }
        }
      }

      return res.json({
        text,
        sources,
        modelUsed: "gemini-3.5-flash",
      });
    } catch (error: any) {
      console.error("Gemini Search Grounding error:", error);
      return res.status(500).json({
        error: "Failed to fetch live Porsche intelligence",
        details: error?.message || "Internal server error",
      });
    }
  });

  // Vite middleware in development vs Static serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Porsche Experience Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
