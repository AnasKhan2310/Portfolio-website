import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import chatHandler from './api/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// API route for Chatbot
app.post("/api/chat", chatHandler);

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
