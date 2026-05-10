import { GoogleGenAI } from "@google/genai";

export const handler = async (event: any) => {
  // Allow only POST requests
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: "Method Not Allowed" }) 
    };
  }

  try {
    const { contents, systemInstruction } = JSON.parse(event.body);
    
    // Check for API Key in environment variables
    const apiKey = process.env.MY_AI_KEY || process.env.GEMINI_API_KEY || process.env.CHAT_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === "" || apiKey === "undefined") {
      console.error("Netlify Function: No API key found");
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "GEMINI_API_KEY_MISSING" }),
      };
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: response.text }),
    };
  } catch (error: any) {
    console.error("Netlify Function Gemini Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: error.message || "Failed to generate response",
      }),
    };
  }
};
