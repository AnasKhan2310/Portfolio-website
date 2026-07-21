import express from 'express';
import { GoogleGenAI } from "@google/genai";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// API route for Chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { contents, systemInstruction } = req.body;
    
    // Check for Secrets in environment variables
    const apiKey = process.env.MY_AI_KEY || process.env.GEMINI_API_KEY || process.env.CHAT_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === "" || apiKey === "undefined") {
      console.error("No valid API key found in environment variables");
      return res.status(401).json({ error: "GEMINI_API_KEY_MISSING" });
    }

    // Initialize GoogleGenAI SDK with server-safe API key and required httpOptions for AI Studio telemetry
    const ai = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Helper sleep function for backoff
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    // Try fallback models to ensure high availability and bypass transient 503/429 high-demand errors
    const modelsToTry = [
      "gemini-3.6-flash",
      "gemini-3.5-flash",
      "gemini-flash-latest",
      "gemini-3.1-flash-lite"
    ];

    let lastError = null;
    let text = "";

    for (const model of modelsToTry) {
      // Retry up to 3 times per model with exponential backoff for transient 503/429 errors
      const maxRetries = 3;
      let success = false;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction: systemInstruction || "You are an AI Assistant.",
              temperature: 0.7,
            },
          });

          if (response && response.text) {
            text = response.text;
            success = true;
            break; // Success! Exit the retry loop
          }
        } catch (err: any) {
          console.warn(`Gemini warning: Model '${model}' (attempt ${attempt}/${maxRetries}) failed.`, err);
          lastError = err;
          
          // If it is a 503 or 429 error, wait and retry
          if (attempt < maxRetries) {
            const backoffTime = attempt * 800; // 800ms, 1600ms backoff
            await sleep(backoffTime);
          }
        }
      }

      if (success) {
        break; // Success! Exit the fallback loop
      }
    }

    if (!text) {
      throw lastError || new Error("All Gemini models are currently experiencing high demand. Please try again in a moment.");
    }

    res.json({ text });
  } catch (error: any) {
    console.error("Gemini Server Error:", error);
    res.status(500).json({ 
      error: error.message || "Failed to generate response"
    });
  }
});

const PORT = 3000;

// Set up combined frontend and backend serving
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Integrate Vite Dev Server middleware
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { 
      middlewareMode: true
    },
    appType: 'spa'
  });
  app.use(vite.middlewares);
}

app.listen(PORT, () => {
  console.log(`Server successfully started at http://localhost:${PORT}`);
});
