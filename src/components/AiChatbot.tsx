import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '@/src/lib/utils';

// Initialize Gemini API
// AIS environment provides GEMINI_API_KEY as an environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `
You are an AI assistant for Anas Khan's portfolio website. 
Anas Khan is a results-driven AI & Data Science Engineer focused on building high-ROI AI systems.
He has 2+ years of experience in Machine Learning, Deep Learning, and Data Analysis.

Key Skills:
- Machine Learning (Scikit-learn, Python, Logistic Regression)
- Deep Learning (TensorFlow, Keras, CNNs, LSTMs)
- Data Analysis (Pandas, Matplotlib, Seaborn)
- AI Automation & Chatbots (NLP, LLMs, LangChain)

Featured Projects:
1. MediScan AI: Early-stage heart disease identification using ML classification.
2. AI Invoice Pro: Financial workflow automation using generative AI (Gemini).
3. AI Image Classifier Pro: Real-time computer vision recognition.
4. Spotify Data Analysis: Consumer behavior analysis through massive streaming datasets.
5. Intelligent Customer Support Bot: RAG-based AI with LangChain and OpenAI.

Your goal is to answer questions about Anas, his projects, and his skills in a professional, helpful, and concise manner. 
Keep your responses relatively short but informative. 
If someone asks how to contact him, point them to the contact section or mention his GitHub (AnasKhan2310).
Always be polite and represent Anas's professional image.
`;

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Anas's AI assistant. Ask me anything about his work, skills, or projects!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'undefined') {
        throw new Error('Gemini API key is not configured. Please add it to your environment variables in Settings.');
      }

      // Gemini requires history to start with a 'user' message.
      // We skip the initial assistant greeting from the technical history.
      const historyToPayload = messages
        .slice(1) // Skip the first assistant message
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model' as 'user' | 'model',
          parts: [{ text: msg.content }]
        }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        },
        contents: [
          ...historyToPayload,
          { role: 'user', parts: [{ text: input }] }
        ]
      });

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response.text || "I'm sorry, I couldn't generate a response." 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage.includes('key') 
          ? "I need a Gemini API key to function. Please make sure the GEMINI_API_KEY is set in the environment variables." 
          : "Sorry, I'm having trouble connecting right now. Please try again later!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-[90vw] md:w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-accent p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Anas's AI Assistant</h3>
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] opacity-80 uppercase font-black tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-lg transition-colors"
                id="close-chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex gap-3",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    msg.role === 'user' ? "bg-accent text-white" : "bg-white border text-accent shadow-sm"
                  )}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-accent text-white rounded-tr-none shadow-md shadow-accent/20" 
                      : "bg-white text-dark shadow-sm border border-gray-100 rounded-tl-none"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-white border text-accent shadow-sm flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white text-dark shadow-sm border border-gray-100 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-accent" />
                    <span className="text-xs font-medium text-muted-text">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow bg-gray-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-accent outline-none transition-all"
                id="ai-chat-input"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-accent text-white p-2 rounded-xl hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                id="send-ai-chat"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
          isOpen ? "bg-white text-accent border" : "bg-accent text-white"
        )}
        id="toggle-ai-chat"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
