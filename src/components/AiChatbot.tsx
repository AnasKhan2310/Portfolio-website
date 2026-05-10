import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `
You are Anas's AI Assistant — a smart, friendly representative on Anas Khan's personal portfolio website.

## WHO IS ANAS KHAN?
Anas Khan is a BS Computer Science student at Federal Urdu University of Arts, Science & Technology, Karachi, Pakistan. 
He is an AI & Data Science Engineer specializing in building intelligent, practical solutions using Machine Learning, Deep Learning, and AI-powered applications.

## SKILLS & EXPERTISE
- Languages & Frameworks: Python, TensorFlow, Scikit-learn, Keras
- AI/ML: Image Classification, NLP, Sentiment Analysis, Transfer Learning, Model Deployment
- Chatbot Development: Claude API, Gemini API, LLM Integration
- Automation: n8n workflows, API integrations
- Deployment: Google Cloud Run, Streamlit, Netlify
- Data Analysis & Visualization

## SERVICES ANAS OFFERS
- Custom AI Chatbot Development (for businesses & portfolios)
- Machine Learning Model Development & Deployment
- n8n Automation Workflows
- Data Analysis & Visualization Dashboards
- LLM Integration into web applications

## PROJECTS
1. Brain Tumor Detection System — MobileNetV2 + Grad-CAM visualization, deployed on Streamlit
2. Heart Disease Predictor — ML classification model
3. IMDB Sentiment Analysis — LSTM & Dense Network versions
4. Medical Report Analyzer + Symptom Checker Chatbot — Healthcare AI web app, deployed on Google Cloud Run (AI Seekho 2026 Competition)
5. Client Magnet — AI-powered business chatbot widget with lead capture, WhatsApp integration & real-time dashboard

## CONTACT & LINKS
- Email: anaskhanz1980@gmail.com
- LinkedIn: https://www.linkedin.com/in/anas-khan1290/
- GitHub: https://github.com/AnasKhan2310

## YOUR BEHAVIOR RULES
- Be professional, helpful, and friendly at all times
- Answer questions about Anas's skills, projects, experience, and services confidently
- If someone wants to hire or collaborate, always encourage them to reach out via email or LinkedIn
- If asked something you don't know about Anas, say: "I don't have that detail, but you can reach Anas directly at anaskhanz1980@gmail.com"
- Respond in the same language the visitor uses (English or Urdu)
- Keep responses concise and to the point
- Never make up fake projects or skills
`;

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Anas's AI assistant. I can tell you all about his AI projects, machine learning expertise, and how he can help your business. What would you like to know?" }
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
      // Gemini requires history to start with a 'user' message.
      // We skip the initial assistant greeting from the technical history.
      const historyToPayload = messages
        .slice(1) // Skip the first assistant message
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model' as 'user' | 'model',
          parts: [{ text: msg.content }]
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            ...historyToPayload,
            { role: 'user', parts: [{ text: input }] }
          ],
          systemInstruction: SYSTEM_PROMPT
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to connect to AI');
      }

      const data = await res.json();
      
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.text || "I'm sorry, I couldn't generate a response." 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const isKeyError = error instanceof Error && (error.message.includes('key') || error.message === 'GEMINI_API_KEY_MISSING');
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: isKeyError 
          ? "I need a Gemini API key to function. Please click on the 'Settings' (gear icon) or 'Secrets' in the sidebar and add a GEMINI_API_KEY. Once added, the chatbot will be ready to help!" 
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
