import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Proxy Route - Keeping the API Key safe on the server
  app.post("/api/chat", async (req, res) => {
    try {
      const { contents, systemInstruction } = req.body;
      const apiKey = process.env.MY_AI_KEY || process.env.GEMINI_API_KEY || process.env.CHAT_API_KEY || process.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        console.error("No API key found in environment variables (tried GEMINI_API_KEY, CHAT_API_KEY, VITE_GEMINI_API_KEY)");
        return res.status(500).json({ error: "GEMINI_API_KEY_MISSING" });
      }

      // Safe logging for debugging
      console.log(`Using API key. Length: ${apiKey.length}, Starts with: ${apiKey.substring(0, 3)}...`);

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const text = response.text || "I'm sorry, I couldn't generate a response.";
      res.json({ text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Vite middleware for development
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
