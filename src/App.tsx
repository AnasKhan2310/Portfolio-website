import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { motion } from 'motion/react';
import SpotifyDashboard from './components/SpotifyDashboard';
import NetworkBackground from './components/NetworkBackground';
import GlowingCursor from './components/GlowingCursor';
import TerminalTyping from './components/TerminalTyping';
import Counter from './components/Counter';
import picImage from './pic.png';
import { 
  Send, 
  X, 
  Bot, 
  Github, 
  Linkedin, 
  Mail, 
  CheckCircle, 
  Brain, 
  Menu,
  TrendingUp,
  Cpu,
  Phone,
  MapPin,
  ChevronRight
} from 'lucide-react';

// Define structures for messaging
interface ChatMessage {
  role: 'user' | 'assistant';
  parts: { text: string }[];
}

export default function App() {
  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Floating Chatbot controls
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      parts: [{
        text: "Hi! I'm Anas's AI Assistant. I can tell you all about Muhammad Anas Khan's projects, experience, machine learning expertise, and how he can help your business. What would you like to know?"
      }]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Project Category Filter State
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'MACHINE LEARNING' | 'DEEP LEARNING' | 'DATA ANALYSIS' | 'AI & CHATBOTS' | 'SAAS PRODUCT'>('ALL');

  // Spotify Dashboard Interactive Modal State
  const [isSpotifyDashboardOpen, setIsSpotifyDashboardOpen] = useState(false);

  // Message scroll reference
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Contact form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto scroll to chatbot message updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    }, 4000);
  };

  // Helper system instruction for representation
  const systemInstruction = `You are "Anas's AI Assistant", representing Muhammad Anas Khan, an exceptional and visionary "AI Solutions Engineer". Your goal is to represent Anas in the most professional, accurate, elegant, and impressive manner. You can speak fluently in English, Roman Urdu (e.g., "Anas aik behtareen AI engineer hain"), and standard Urdu as requested by the user.

About Muhammad Anas Khan:
1. Role: AI Solutions Engineer
2. Location: Karachi, Pakistan
3. Contact Details:
   - Email: anaskhanz1980@gmail.com
   - Phone/WhatsApp: +92 311 2813828
   - GitHub: https://github.com/AnasKhan2310
   - LinkedIn: https://linkedin.com/in/muhammadanaskhan

Education & Specializations:
- Degree: BS in Computer Science from Federal Urdu University, Karachi.
- Specialty focus: Artificial Intelligence, Data Science, Deep Learning, and Neural Networks.
- Expert-level competencies with TensorFlow, Convolutional Neural Networks (CNNs), Long Short-Term Memory (LSTM) models, and fine-tuning open-source LLMs.

Core Skill Proficiency:
- Python (96%) - Advanced scripting, analytics, machine learning pipeline development.
- RAG Systems (93%) - Designing custom Retrieval-Augmented Generation architectures with high semantic accuracy.
- Workflow Automation (93%) - Multi-step operations, scheduling, and automatic data parsing.
- LangChain (92%) - Agentic orchestration, tool-calling loops, and multi-agent systems.
- API Development & Integration (91%) - Fast, robust REST endpoints using FastAPI (90%).
- Intelligent AI Agents - MCP (Model Context Protocol) integration, custom autonomous agent pipelines.
- Data Visualization - Business Intelligence Dashboards (88%), Power BI (87%), Recharts, and data insights.

Pillars of Anas's Work (What Anas Does):
1. AI SaaS Development: Designing and launching fully secure, subscription-ready SaaS products integrated with custom-designed AI systems (like RAG models, LangChain, serverless hosting).
2. Workflow Automation: Automating legacy business operations using state-of-the-art n8n workflows, Custom MCP Tool integrations, and advanced Python automated background processes.
3. Intelligent AI Agents: Architecting adaptive, collaborative multi-agent teams using cutting-edge agentic frameworks to optimize sales pipelines, lead generation, customer care, and operations.

Detailed Project Portfolio:
1. ZESTFIT (SaaS Product / Live Demo: https://zestfitmanagement.vercel.app/)
   - Description: A premium, subscription-ready SaaS fitness & nutrition tracking platform. Features personalized exercise logs, dynamic gym routines, and health analytics with custom progress metrics.
   - Codebase: https://github.com/AnasKhan2310/ZESTFIT-GYM-MANAGEMENT
2. AI OPERATIONS MANAGER (AI & Chatbots / Live Demo: https://ais-pre-ww4f45uamngffnxonvsnb5-307342142062.asia-east1.run.app/)
   - Description: An advanced operations manager built to coordinate autonomous AI workflows, manage tool execution context, and optimize enterprise integrations seamlessly. Integrates model tools and MCP.
   - Codebase: https://github.com/AnasKhan2310/AI-Operations-Manager
3. MEDISCAN AI (Machine Learning / Live Demo: https://medi-scan-ai-theta.vercel.app/)
   - Description: A high-precision healthcare screening model designed to identify early-stage cardiovascular and heart disease risks using advanced statistical patterns.
   - Codebase: https://github.com/AnasKhan2310
4. AI INVOICE PRO (AI & Chatbots / Live Demo: https://freeinvoicepro.netlify.app/)
   - Description: Streamlines financial workflows using Generative AI. This system automates professional invoice management, reducing manual work and error rates.
   - Codebase: https://github.com/AnasKhan2310
5. AI IMAGE CLASSIFIER PRO (Deep Learning / Live Demo: https://teachablemachice.netlify.app/)
   - Description: Custom computer vision solutions for real-time recognition. Built specialized models that perform complex visual tasks with extreme speed.
   - Codebase: https://github.com/AnasKhan2310
6. HEART DISEASE PREDICTOR (Machine Learning / Live Demo: https://heartdiseasepredictorai.netlify.app/)
   - Description: A supervised Machine Learning project that analyzes patient health metrics to predict cardiovascular risks with exceptionally high statistical confidence.
   - Codebase: https://github.com/AnasKhan2310
7. SPOTIFY DATA ANALYSIS (Data Analysis)
   - Description: Decoding consumer streaming behavior and music trends by analyzing massive Spotify datasets to uncover trends that drive strategic marketing decisions.
   - Codebase: https://github.com/AnasKhan2310/Spotify-Data-Analysis

Interaction Guidelines & Tone:
- Professional, confident, elegant, and friendly. Speak like a highly intelligent, premium executive AI representative.
- Emphasize Anas's capabilities in scaling businesses, reducing operational expenses, and building automated revenue streams through AI and n8n.
- If asked about how Anas can help a business scale, explain his specialized workflows: creating custom AI agents, automated lead qualification, auto-responding chatbots, n8n databases integrations, and interactive dashboards.
- Speak in Roman Urdu/Hindi if the user messages in Roman Urdu/Hindi or asks for it. E.g., "Main Anas Khan ka AI assistant hoon. Main aap ko Anas ke projects aur unki AI expertise ke baare mein bata sakta hoon."
- Make sure to share direct links to projects, GitHub, or contact info when relevant. Keep responses concise but highly valuable.`;

  // Quick prompt suggestions
  const suggestions = [
    "Tell me about his AI Agents",
    "What are his n8n capabilities?",
    "How does Anas scale businesses?"
  ];

  // Send message to Server
  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    // Add user message to state
    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text }]
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setChatError(null);

    // Format content history correctly for prompt parameters
    const updatedHistory = [...messages, userMessage].map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: msg.parts
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: updatedHistory,
          systemInstruction
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("GEMINI_API_KEY_MISSING");
        }
        
        let errMessage = "Failed to fetch response";
        try {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const errData = await response.json();
            errMessage = errData.error || errMessage;
          } else {
            const text = await response.text();
            // Try to extract a clean string from HTML or fallback to generic message
            if (text.includes("<title>")) {
              const match = text.match(/<title>(.*?)<\/title>/);
              errMessage = match ? `Server Error: ${match[1]}` : `Server returned HTML error (${response.status})`;
            } else {
              errMessage = text.substring(0, 150) || `Server returned status code ${response.status}`;
            }
          }
        } catch (e) {
          errMessage = `Server error status: ${response.status}`;
        }
        throw new Error(errMessage);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setMessages(prev => [...prev, {
          role: 'assistant',
          parts: [{ text: data.text }]
        }]);
      } else {
        const text = await response.text();
        throw new Error(`Invalid non-JSON response from server: ${text.substring(0, 150)}`);
      }
    } catch (error: any) {
      console.error("Chatbot query error:", error);
      if (error.message === "GEMINI_API_KEY_MISSING" || error.message.includes("401")) {
        setChatError("API Key is missing. Please configure GEMINI_API_KEY in AI Studio to try out the AI assistant.");
      } else {
        setChatError(`Error: ${error.message || "Something went wrong. Please check your connection."}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Skill proficiency metrics directly aligned with portfolio projects
  const skillsData = [
    { name: "AI SaaS Development", level: 96 },
    { name: "Autonomous AI Agents & MCP", level: 96 },
    { name: "Machine Learning & Deep Learning", level: 95 },
    { name: "Computer Vision & Image Models", level: 93 },
    { name: "Generative AI & LLM Automation", level: 94 },
    { name: "Data Science & BI Dashboards", level: 92 },
    { name: "Python & FastAPI Backend", level: 95 }
  ];

  // Projects list
  const projectsData = [
    {
      id: "zestfit",
      title: "ZESTFIT",
      category: "SAAS PRODUCT" as const,
      tag: "SAAS PRODUCT",
      icon: (
        <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 text-2xl font-semibold shadow-sm shrink-0">
          💪
        </div>
      ),
      description: "A premium, subscription-ready SaaS fitness & nutrition tracking platform featuring personalized exercise logs, dynamic gym routines, and health analytics with custom progress metrics.",
      githubUrl: "https://github.com/AnasKhan2310/ZESTFIT-GYM-MANAGEMENT",
      liveDemoUrl: "https://zestfitmanagement.vercel.app/",
      isHighlighted: true
    },
    {
      id: "ai-operations-manager",
      title: "AI OPERATIONS MANAGER",
      category: "AI & CHATBOTS" as const,
      tag: "AI & CHATBOTS",
      icon: (
        <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-2xl font-semibold shadow-sm shrink-0">
          ⚙️
        </div>
      ),
      description: "An advanced operations manager built to coordinate autonomous AI workflows, manage tool execution context, and optimize enterprise integrations seamlessly.",
      githubUrl: "https://github.com/AnasKhan2310/AI-Operations-Manager",
      liveDemoUrl: "https://ais-pre-ww4f45uamngffnxonvsnb5-307342142062.asia-east1.run.app/",
      isHighlighted: true
    },
    {
      id: "mediscan",
      title: "MEDISCAN AI",
      category: "MACHINE LEARNING" as const,
      tag: "MACHINE LEARNING",
      icon: (
        <div className="h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 text-2xl font-semibold shadow-sm shrink-0">
          💉
        </div>
      ),
      description: "A high-precision healthcare model designed to save lives by identifying early-stage heart disease risks through advanced statistical patterns.",
      githubUrl: "https://github.com/AnasKhan2310",
      liveDemoUrl: "https://medi-scan-ai-theta.vercel.app/",
      isHighlighted: false
    },
    {
      id: "invoice",
      title: "AI INVOICE PRO",
      category: "AI & CHATBOTS" as const,
      tag: "AI & CHATBOTS",
      icon: (
        <div className="h-12 w-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 text-2xl font-semibold shadow-sm shrink-0">
          🚀
        </div>
      ),
      description: "Streamlining financial workflows with generative AI. This system automates professional invoice management, reducing manual labor and improving accuracy.",
      githubUrl: "https://github.com/AnasKhan2310",
      liveDemoUrl: "https://freeinvoicepro.netlify.app/",
      isHighlighted: false
    },
    {
      id: "classifier",
      title: "AI IMAGE CLASSIFIER PRO",
      category: "DEEP LEARNING" as const,
      tag: "DEEP LEARNING",
      icon: (
        <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 text-2xl font-semibold shadow-sm shrink-0">
          📷
        </div>
      ),
      description: "Custom computer vision solutions for real-time recognition. I build specialized models that perform complex visual tasks with extreme speed and accuracy.",
      githubUrl: "https://github.com/AnasKhan2310",
      liveDemoUrl: "https://teachablemachice.netlify.app/",
      isHighlighted: false
    },
    {
      id: "heart",
      title: "HEART DISEASE PREDICTOR",
      category: "MACHINE LEARNING" as const,
      tag: "MACHINE LEARNING",
      icon: (
        <div className="h-12 w-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 text-2xl font-semibold shadow-sm animate-pulse shrink-0">
          ❤️
        </div>
      ),
      description: "A supervised Machine Learning project that analyzes health metrics to predict cardiovascular risks with high confidence.",
      githubUrl: "https://github.com/AnasKhan2310",
      liveDemoUrl: "https://heartdiseasepredictorai.netlify.app/",
      isHighlighted: true // Specialized Yellow/Amber border
    },
    {
      id: "spotify",
      title: "SPOTIFY DATA ANALYSIS",
      category: "DATA ANALYSIS" as const,
      tag: "DATA ANALYSIS",
      icon: (
        <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 text-2xl font-semibold shadow-sm shrink-0">
          🎵
        </div>
      ),
      description: "Decoding consumer behavior through data. I analyze massive streaming datasets to uncover trends that drive strategic content and marketing decisions.",
      githubUrl: "https://github.com/AnasKhan2310/Spotify-Data-Analysis",
      liveDemoUrl: "#",
      isHighlighted: false
    }
  ];

  // Filtering Logic
  const filteredProjects = activeFilter === 'ALL' 
    ? projectsData 
    : projectsData.filter(proj => proj.category === activeFilter);

  // Framer Motion Animation Variants
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div id="app-root" className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2825] selection:bg-amber-500/20 selection:text-amber-800 scroll-smooth overflow-x-hidden font-sans relative">
      
      {/* 60fps Glowing Interactive Network Canvas Background */}
      <NetworkBackground />

      {/* Floating Blurred Color Blobs representing Stripe/Linear aesthetic */}
      <div className="absolute top-[10%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-orange-500/5 blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-[35%] right-[-5%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '11s' }} />
      <div className="absolute bottom-[20%] left-[15%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '9s' }} />

      {/* Dynamic Glowing Cursor Trail following precise mouse coordinates (optimally disabled on mobile) */}
      <GlowingCursor />

      {/* HEADER / NAVIGATION BAR with Glassmorphic styling */}
      <nav id="navbar" className="sticky top-0 z-40 bg-[#FAF8F5]/80 backdrop-blur-xl border-b border-[#2C2825]/5 px-6 py-4 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Name & Icon with glowing subtle border */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-xl flex items-center justify-center font-bold text-white text-lg tracking-wider shadow-[0_4px_15px_rgba(245,158,11,0.25)] group-hover:rotate-6 duration-350 transition-all">
              AK
            </div>
            <div className="font-sans">
              <span className="font-extrabold text-[#2C2825] text-base tracking-tight block leading-tight">Muhammad Anas Khan</span>
              <span className="text-[10px] text-amber-600 font-mono font-bold tracking-widest uppercase block mt-0.5">AI SOLUTIONS ENGINEER</span>
            </div>
          </div>

          {/* Desktop Navigation Links (Linear styled, elegant tracking) */}
          <div className="hidden md:flex items-center gap-8">
            {['home', 'about', 'resume', 'projects', 'contact'].map((section) => (
              <a 
                key={section}
                href={`#${section}`} 
                className="text-[11px] font-bold uppercase tracking-widest text-[#2C2825]/60 hover:text-amber-600 transition-colors duration-200 relative group"
              >
                {section}
                <span className="absolute left-0 bottom-[-4px] w-0 h-[1.5px] bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-[#2C2825] hover:text-amber-600 p-2 border border-[#2C2825]/10 bg-white rounded-xl transition-all shadow-sm"
            >
              <Menu size={20} />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-4 pb-2 border-t border-[#2C2825]/10 mt-4 flex flex-col gap-3 font-sans max-w-6xl mx-auto px-2"
          >
            {['home', 'about', 'resume', 'projects', 'contact'].map((section) => (
              <a 
                key={section}
                href={`#${section}`} 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-[#2C2825]/75 hover:text-amber-600 py-2.5 px-3 rounded-xl bg-white border border-[#2C2825]/5 text-xs font-bold uppercase tracking-widest transition-all shadow-sm"
              >
                {section}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Page Content Fade In Wrapper */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 w-full flex flex-col"
      >
        
        {/* ==================================== */}
        {/* HERO SECTION - Premium AI SaaS Vibe */}
        {/* ==================================== */}
        <section id="home" className="relative pt-4 pb-12 px-6 lg:px-12 max-w-6xl w-full mx-auto border-b border-[#2C2825]/5">
          
          {/* Subtle Grid overlay representing Vercel mesh */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#2c282504_1px,transparent_1px),linear-gradient(to_bottom,#2c282504_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Header Title on a Single Line */}
          <motion.div 
            variants={itemVariants} 
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col gap-1.5 mb-8 relative z-10"
          >
            <span className="text-[#2C2825]/60 font-bold text-xs sm:text-sm tracking-widest uppercase font-mono">HELLO, I'M</span>
            <h1 className="text-[6.5vw] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-[#2C2825] via-[#4A4440] to-[#7A7068] bg-clip-text text-transparent leading-none tracking-tight whitespace-nowrap overflow-hidden text-ellipsis select-none py-1">
              Muhammad Anas Khan
            </h1>
            <div className="w-full h-[1px] bg-[#2C2825]/10 mt-2" />
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col md:flex-row gap-10 items-start relative z-10"
          >
            
            {/* Profile Portrait Pic on the Left Side */}
            <motion.div 
              variants={itemVariants}
              className="w-full md:w-56 shrink-0 relative flex justify-center md:justify-start"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-orange-500/5 blur-2xl rounded-full pointer-events-none scale-110" />
              <div className="relative w-44 sm:w-48 md:w-56 aspect-[4/5] bg-white border border-[#2C2825]/10 rounded-[2rem] p-1.5 shadow-md overflow-hidden hover:border-amber-500/40 transition-colors duration-500">
                <img 
                  src={picImage} 
                  alt="Muhammad Anas Khan" 
                  className="w-full h-full object-cover object-top rounded-[1.75rem] block"
                />
              </div>
            </motion.div>

            {/* Narrative details right next to the portrait */}
            <div className="flex-1 flex flex-col items-start w-full">
              {/* Tagline Role */}
              <motion.h3 
                variants={itemVariants}
                className="text-[#2C2825] font-extrabold text-base sm:text-lg md:text-xl tracking-tight mb-4 uppercase leading-tight font-sans"
              >
                I BUILD AI SYSTEMS THAT{" "}
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">SCALE BUSINESSES.</span>
              </motion.h3>

              {/* Narrative Content */}
              <motion.div 
                variants={itemVariants}
                className="space-y-4 mb-6 text-[#2C2825]/80 text-xs sm:text-sm md:text-base leading-relaxed"
              >
                <p>
                  Hey, I'm Anas Khan, an AI Solutions Engineer focused on building AI-powered SaaS products, intelligent automation systems, and custom AI agents that solve real business problems.
                </p>
                <p>
                  I help businesses automate operations using LLMs, n8n, MCP, APIs, and modern AI workflows, from lead generation and customer support to internal operations and data processing.
                </p>
                <p>
                  Whether it's launching an AI SaaS product, integrating AI into existing software, or building end-to-end automation, I create production-ready solutions that save time, reduce manual work, and help businesses grow faster.
                </p>
              </motion.div>

              {/* Interactive Magnetic Specialty Badges */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6 w-full">
                {[
                  "AI SaaS",
                  "AI Agents",
                  "n8n Automation",
                  "MCP",
                  "LLM Integration",
                  "Workflow Automation",
                  "APIs",
                  "Dashboards"
                ].map((spec, sIdx) => (
                  <motion.span 
                    key={sIdx} 
                    whileHover={{ scale: 1.05, borderColor: 'rgba(217,119,6,0.4)', color: '#d97706' }}
                    className="bg-white border border-[#2C2825]/10 text-[#2C2825]/80 text-[10px] sm:text-xs font-semibold font-mono tracking-wider uppercase px-3 py-1.5 rounded-lg transition-all cursor-default shadow-sm"
                  >
                    {spec}
                  </motion.span>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center w-full">
                <motion.a 
                  href="#about" 
                  whileHover={{ scale: 1.03, boxShadow: '0 4px 15px rgba(245,158,11,0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-[0_4px_15px_rgba(245,158,11,0.15)] transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <span className="font-extrabold text-white">Explore My Systems</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 duration-300 text-white" />
                </motion.a>
              </motion.div>
            </div>

          </motion.div>
        </section>


        {/* ==================================== */}
        {/* ABOUT ME SECTION - Bento-style Grid */}
        {/* ==================================== */}
        <section id="about" className="scroll-mt-24 py-20 px-6 lg:px-12 max-w-6xl w-full mx-auto border-b border-[#2C2825]/5">
          
          {/* Subheading: WHAT I DO? */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 mb-12"
          >
            <span className="w-1.5 h-6 bg-amber-500 block rounded-full shadow-[0_2px_10px_rgba(245,158,11,0.3)]"></span>
            <h3 className="font-extrabold text-[#2C2825] text-xs font-mono uppercase tracking-widest">
              WHAT I DO
            </h3>
          </motion.div>

          {/* Grids representing 3 functional pillars with subtle glow and scroll-reveal triggers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ 
                y: -5, 
                borderColor: 'rgba(217,119,6,0.3)', 
                boxShadow: '0 10px 30px -10px rgba(217,119,6,0.08)' 
              }}
              className="bg-white border border-[#2C2825]/10 p-8 rounded-3xl transition-all duration-300 flex flex-col gap-5 relative group overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
              <div className="h-10 w-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
                <Brain size={18} />
              </div>
              <div>
                <h4 className="font-bold text-[#2C2825] text-sm font-mono tracking-wider uppercase mb-3">
                  AI SaaS Development
                </h4>
                <p className="text-[#2C2825]/75 text-xs leading-relaxed">
                  Designing secure full-stack software products integrated with localized RAG models, LangChain workflows, and serverless hosting infrastructures.
                </p>
              </div>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ 
                y: -5, 
                borderColor: 'rgba(217,119,6,0.3)', 
                boxShadow: '0 10px 30px -10px rgba(217,119,6,0.08)' 
              }}
              className="bg-white border border-[#2C2825]/10 p-8 rounded-3xl transition-all duration-300 flex flex-col gap-5 relative group overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
              <div className="h-10 w-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
                <TrendingUp size={18} />
              </div>
              <div>
                <h4 className="font-bold text-[#2C2825] text-sm font-mono tracking-wider uppercase mb-3">
                  Workflow Automation
                </h4>
                <p className="text-[#2C2825]/75 text-xs leading-relaxed">
                  Automating multi-step operational tasks using n8n workflows, custom MCP tool integrations, and custom Python automated scripts.
                </p>
              </div>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ 
                y: -5, 
                borderColor: 'rgba(217,119,6,0.3)', 
                boxShadow: '0 10px 30px -10px rgba(217,119,6,0.08)' 
              }}
              className="bg-white border border-[#2C2825]/10 p-8 rounded-3xl transition-all duration-300 flex flex-col gap-5 relative group overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
              <div className="h-10 w-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
                <Cpu size={18} />
              </div>
              <div>
                <h4 className="font-bold text-[#2C2825] text-sm font-mono tracking-wider uppercase mb-3">
                  Intelligent AI Agents
                </h4>
                <p className="text-[#2C2825]/75 text-xs leading-relaxed">
                  Architecting adaptive multi-agent teams using state-of-the-art frameworks to optimize operations and support lead processing pipelines.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Animated Statistics Counters matching clean professional telemetry */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            
            {/* Stat Item 1 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-[#2C2825]/10 p-6 rounded-2xl text-center flex flex-col justify-center items-center shadow-sm transition-colors hover:border-amber-500/20"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-[#2C2825] font-sans tracking-tight">
                <Counter target={7} suffix="+" />
              </span>
              <span className="text-[10px] text-[#2C2825]/60 font-bold font-mono tracking-widest uppercase mt-2">FEATURED PROJECTS</span>
            </motion.div>
 
            {/* Stat Item 2 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white border border-[#2C2825]/10 p-6 rounded-2xl text-center flex flex-col justify-center items-center shadow-sm transition-colors hover:border-amber-500/20"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-[#2C2825] font-sans tracking-tight">
                <Counter target={8} suffix="+" />
              </span>
              <span className="text-[10px] text-[#2C2825]/60 font-bold font-mono tracking-widest uppercase mt-2">CORE AI FRAMEWORKS</span>
            </motion.div>
 
            {/* Stat Item 3 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white border border-[#2C2825]/10 p-6 rounded-2xl text-center flex flex-col justify-center items-center shadow-sm transition-colors hover:border-amber-500/20"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-[#2C2825] font-sans tracking-tight">
                <Counter target={100} suffix="%" />
              </span>
              <span className="text-[10px] text-[#2C2825]/60 font-bold font-mono tracking-widest uppercase mt-2">CLIENT SATISFACTION</span>
            </motion.div>
 
          </div> 

          {/* Interactive Terminal Typing Simulator relocated to About Me section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 w-full max-w-4xl mx-auto relative z-10"
          >
            <div className="flex flex-col items-center text-center mb-8">
              <span className="text-[10px] text-amber-600 font-bold font-mono tracking-widest uppercase">INTERACTIVE DEMO</span>
              <h4 className="text-2xl font-extrabold text-[#2C2825] tracking-tight uppercase mt-1">AI Agent Pipeline Terminal</h4>
              <p className="text-[#2C2825]/60 text-xs sm:text-sm max-w-lg mt-2">
                Simulate active server deployments and background prompt executions below to watch automated MCP tool chains and web crawler loops in real-time.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-orange-500/5 blur-3xl pointer-events-none rounded-full" />
              <TerminalTyping />
            </div>
          </motion.div>

        </section>


        {/* ==================================== */}
        {/* RESUME SECTION - Sleek Tech Timeline */}
        {/* ==================================== */}
        <section id="resume" className="scroll-mt-24 py-20 px-6 lg:px-12 max-w-6xl w-full mx-auto border-b border-[#2C2825]/5 relative">
          
          <div className="absolute inset-0 bg-[#2C2825]/[0.01] pointer-events-none" />

          {/* Resume Main Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#2C2825] uppercase mb-16"
          >
            RESUME DATA
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            
            {/* EDUCATION COLUMN (Left) */}
            <div className="lg:col-span-5 flex flex-col">
              
              {/* Category Underline Header */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-8"
              >
                <span className="w-1.5 h-6 bg-amber-500 block rounded-full"></span>
                <h3 className="font-extrabold text-[#2C2825] text-base font-mono uppercase tracking-wider">
                  EDUCATION
                </h3>
              </motion.div>

              {/* Study Timeline Items with glowing circles */}
              <div className="relative border-l-2 border-[#2C2825]/15 pl-6 space-y-10 ml-3 py-2">
                
                {/* Degree 1 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="relative group"
                >
                  <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-amber-500 bg-[#FAF8F5] group-hover:bg-amber-500 duration-300 transition-colors inline-block"></span>
                  <div className="text-xs text-amber-600 font-extrabold font-mono tracking-wider uppercase">
                    FEDERAL URDU UNIVERSITY, KARACHI
                  </div>
                  <h4 className="text-base font-extrabold text-[#2C2825] mt-1 uppercase">
                    BS COMPUTER SCIENCE
                  </h4>
                  <p className="text-sm text-[#2C2825]/75 mt-2 leading-relaxed">
                    Specializing in Artificial Intelligence & Data Science. Gaining deep knowledge in machine learning pipelines, RAG, and automated flows.
                  </p>
                </motion.div>

                {/* Spec 2 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative group"
                >
                  <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-amber-600 bg-[#FAF8F5] group-hover:bg-amber-600 duration-300 transition-colors inline-block"></span>
                  <div className="text-xs text-amber-700 font-extrabold font-mono tracking-wider uppercase">
                    SPECIALIZATION
                  </div>
                  <h4 className="text-base font-extrabold text-[#2C2825] mt-1 uppercase">
                    DEEP LEARNING & NEURAL NETWORKS
                  </h4>
                  <p className="text-sm text-[#2C2825]/75 mt-2 leading-relaxed">
                    Hands-on experience with TensorFlow, CNNs, LSTMs, and fine-tuning open-source LLMs for specialized client tasks.
                  </p>
                </motion.div>

                {/* Spec 3 */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative group"
                >
                  <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-orange-500 bg-[#FAF8F5] group-hover:bg-orange-500 duration-300 transition-colors inline-block"></span>
                  <div className="text-xs text-orange-600 font-extrabold font-mono tracking-wider uppercase">
                    SPECIALIZATION
                  </div>
                  <h4 className="text-base font-extrabold text-[#2C2825] mt-1 uppercase">
                    MACHINE LEARNING CORES
                  </h4>
                  <p className="text-sm text-[#2C2825]/75 mt-2 leading-relaxed">
                    Statistical models using Scikit-learn for forecasting, predictive segmentation, and analyzing health-analytics with high reliability.
                  </p>
                </motion.div>

              </div>
            </div>

            {/* MY SKILLS PROGRESS BARS (Right) */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Category Underline Header */}
              <motion.div 
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-8"
              >
                <span className="w-1.5 h-6 bg-amber-500 block rounded-full"></span>
                <h3 className="font-extrabold text-[#2C2825] text-base font-mono uppercase tracking-wider">
                  SKILL PROFICIENCY
                </h3>
              </motion.div>

              {/* Skills Progress layout holding the values in a 2-column grid */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-[#2C2825]/10 p-8 rounded-3xl shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5"
              >
                {skillsData.map((skill, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#2C2825] text-xs font-mono tracking-tight">{skill.name}</span>
                      <span className="font-bold text-amber-600 text-xs font-mono">{skill.level}%</span>
                    </div>
                    {/* Sleek range bar inside custom gray block */}
                    <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </motion.div>

            </div>

          </div>
        </section>


        {/* ==================================== */}
        {/* PROJECTS SECTION - Bento Grid filter */}
        {/* ==================================== */}
        <section id="projects" className="scroll-mt-24 py-20 px-6 lg:px-12 max-w-6xl w-full mx-auto border-b border-[#2C2825]/5">
          
          {/* Projects Main Header */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#2C2825] uppercase mb-8"
          >
            PROJECT PORTFOLIO
          </motion.h2>

          {/* Interactive filter pills container */}
          <div className="flex flex-wrap gap-2 mb-10 select-none">
            {(['ALL', 'MACHINE LEARNING', 'DEEP LEARNING', 'DATA ANALYSIS', 'AI & CHATBOTS', 'SAAS PRODUCT'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[9px] sm:text-[10px] font-extrabold tracking-wider px-4 py-2.5 rounded-lg font-mono uppercase transition-all duration-300 border cursor-pointer ${
                  activeFilter === filter 
                    ? 'bg-amber-500 text-white border-amber-600 shadow-[0_4px_15px_rgba(245,158,11,0.2)] font-black' 
                    : 'bg-white hover:bg-neutral-50 text-[#2C2825]/75 border-[#2C2825]/10 shadow-sm'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid list of structural project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  y: -5,
                  borderColor: project.isHighlighted ? '#d97706' : '#f59e0b',
                  boxShadow: '0 10px 25px -5px rgba(44,40,37,0.08)'
                }}
                key={project.id}
                className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[300px] p-6.5 border relative group shadow-sm ${
                  project.isHighlighted 
                    ? 'border-amber-500 shadow-[0_4px_20px_rgba(245,158,11,0.08)]'
                    : 'border-[#2C2825]/10'
                }`}
              >
                {project.isHighlighted && (
                  <span className="absolute top-3 right-3 text-[8px] font-black tracking-widest font-mono text-amber-700 bg-amber-500/15 px-2 py-0.5 rounded uppercase">
                    Top Prediction
                  </span>
                )}
                
                <div>
                  
                  {/* Top line with Icon and category name */}
                  <div className="flex justify-between items-start mb-6">
                    {project.icon}
                    <span className="bg-[#FAF8F5] text-[#2C2825]/75 border border-[#2C2825]/10 text-[9px] font-extrabold font-mono tracking-wider uppercase px-2.5 py-1 rounded-md">
                      {project.tag}
                    </span>
                  </div>

                  {/* Title & paragraph */}
                  <h4 className="text-lg font-bold text-[#2C2825] mb-2 leading-tight">
                    {project.title}
                  </h4>
                  <p className="text-[#2C2825]/75 text-xs leading-relaxed">
                    {project.description}
                  </p>

                </div>

                {/* Lower Action buttons */}
                <div className="mt-6 pt-4 border-t border-[#2C2825]/10 flex items-center justify-between">
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="text-[10px] uppercase font-mono font-bold text-[#2C2825]/50 hover:text-amber-600 transition-colors flex items-center gap-1"
                  >
                    <span>Codebase</span>
                    <Github size={12} />
                  </a>

                  {project.id === "spotify" ? (
                    <button 
                      onClick={() => setIsSpotifyDashboardOpen(true)}
                      className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono font-black text-[#1db954] hover:text-[#1ed760] cursor-pointer transition-colors"
                    >
                      <span>Interactive Dashboard</span>
                      <ChevronRight size={14} strokeWidth={2.5} />
                    </button>
                  ) : project.liveDemoUrl && (
                    <a 
                      href={project.liveDemoUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono font-black text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <span>Launch App</span>
                      <ChevronRight size={14} />
                    </a>
                  )}
                </div>

              </motion.div>
            ))}
          </div>

          {/* GitHub Bottom CTA */}
          <div className="flex justify-center items-center mt-12">
            <motion.a 
              href="https://github.com/AnasKhan2310"
              target="_blank"
              referrerPolicy="no-referrer"
              whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(44,40,37,0.1)' }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-white text-[#2C2825] font-bold text-xs uppercase tracking-wider px-8 py-4.5 rounded-full border border-[#2C2825]/10 shadow-sm transition-all cursor-pointer"
            >
              <span>View All on GitHub</span>
              <Github size={15} className="text-[#2C2825]" />
            </motion.a>
          </div>

        </section>


        {/* ==================================== */}
        {/* CONTACT SECTION - Premium Dark Cards */}
        {/* ==================================== */}
        <section id="contact" className="scroll-mt-24 py-20 px-6 lg:px-12 max-w-6xl w-full mx-auto border-b border-[#2C2825]/5 rounded-t-[2.5rem] bg-white border border-[#2C2825]/10 shadow-sm mt-12">
          
          {/* Section Heading */}
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#2C2825] uppercase mb-4"
          >
            GET IN TOUCH
          </motion.h2>

          {/* GET IN TOUCH tag bar header */}
          <div className="flex items-center gap-2.5 mb-12">
            <span className="w-1.5 h-6 bg-amber-500 block rounded-full"></span>
            <h3 className="font-extrabold text-[#2C2825]/60 text-xs font-mono uppercase tracking-widest">
              LET'S INVENT SOMETHING AMAZING
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Contact details blocks (Left Column) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Location Card */}
              <div className="flex items-center gap-4 bg-[#FAF8F5] border border-[#2C2825]/10 p-5 rounded-2xl hover:border-amber-500/30 transition-all duration-300 shadow-sm">
                <div className="h-12 w-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-[#2C2825]/50 font-bold uppercase tracking-widest block font-mono">Location</span>
                  <span className="text-[#2C2825] text-sm font-semibold block mt-1">Karachi, Pakistan</span>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-center gap-4 bg-[#FAF8F5] border border-[#2C2825]/10 p-5 rounded-2xl hover:border-amber-500/30 transition-all duration-300 shadow-sm">
                <div className="h-12 w-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-[#2C2825]/50 font-bold uppercase tracking-widest block font-mono">Email Address</span>
                  <a href="mailto:anaskhanz1980@gmail.com" className="text-[#2C2825] hover:text-amber-600 text-sm font-semibold block transition-colors mt-1">anaskhanz1980@gmail.com</a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-center gap-4 bg-[#FAF8F5] border border-[#2C2825]/10 p-5 rounded-2xl hover:border-amber-500/30 transition-all duration-300 shadow-sm">
                <div className="h-12 w-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-[#2C2825]/50 font-bold uppercase tracking-widest block font-mono">Phone Number</span>
                  <a href="tel:+923112813828" className="text-[#2C2825] hover:text-amber-600 text-sm font-semibold block transition-colors mt-1">+92 311 2813828</a>
                </div>
              </div>

              {/* LinkedIn Card */}
              <div className="flex items-center gap-4 bg-[#FAF8F5] border border-[#2C2825]/10 p-5 rounded-2xl hover:border-amber-500/30 transition-all duration-300 shadow-sm">
                <div className="h-12 w-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                  <Linkedin size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-[#2C2825]/50 font-bold uppercase tracking-widest block font-mono">LinkedIn Profile</span>
                  <a href="https://www.linkedin.com/in/anas-khan1290/" target="_blank" referrerPolicy="no-referrer" className="text-[#2C2825] hover:text-amber-600 text-sm font-semibold block transition-colors mt-1">linkedin.com/in/anas-khan1290</a>
                </div>
              </div>

            </div>

            {/* Message submission client form (Right Column) */}
            <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#2C2825]/10 p-8 rounded-3xl shadow-sm">
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[#2C2825]/60 font-bold text-[11px] tracking-widest uppercase block mb-1.5 font-mono">Your Name</label>
                    <input 
                      type="text" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="My full name..." 
                      required
                      className="w-full bg-white focus:bg-neutral-50 text-[#2C2825] text-xs sm:text-sm font-medium border border-[#2C2825]/10 focus:border-amber-500 focus:outline-none rounded-xl px-4 py-3.5 transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="text-[#2C2825]/60 font-bold text-[11px] tracking-widest uppercase block mb-1.5 font-mono">Your Email</label>
                    <input 
                      type="email" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="email@organization.com" 
                      required
                      className="w-full bg-white focus:bg-neutral-50 text-[#2C2825] text-xs sm:text-sm font-medium border border-[#2C2825]/10 focus:border-amber-500 focus:outline-none rounded-xl px-4 py-3.5 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#2C2825]/60 font-bold text-[11px] tracking-widest uppercase block mb-1.5 font-mono">Subject</label>
                  <input 
                    type="text" 
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="E.g., AI Solutions Consulting..." 
                    required
                    className="w-full bg-white focus:bg-neutral-50 text-[#2C2825] text-xs sm:text-sm font-medium border border-[#2C2825]/10 focus:border-amber-500 focus:outline-none rounded-xl px-4 py-3.5 transition-all shadow-inner"
                  />
                </div>

                <div>
                  <label className="text-[#2C2825]/60 font-bold text-[11px] tracking-widest uppercase block mb-1.5 font-mono">Your Message</label>
                  <textarea 
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Hi Anas, let's discuss expanding our operations using agents..." 
                    required
                    className="w-full bg-white focus:bg-neutral-50 text-[#2C2825] text-xs sm:text-sm font-medium border border-[#2C2825]/10 focus:border-amber-500 focus:outline-none rounded-xl px-4 py-3.5 transition-all resize-none shadow-inner"
                  ></textarea>
                </div>

                {/* Glassmorphic Solid Submit button */}
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-sans font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full transition-all duration-300 inline-flex items-center gap-2 self-start shadow-md hover:shadow-amber-500/20 cursor-pointer"
                >
                  <span className="font-extrabold text-white">Send Message</span>
                  <Send size={13} className="text-white" />
                </motion.button>

                {isSubmitted && (
                  <div className="bg-emerald-500/10 text-emerald-600 flex items-center gap-2.5 p-4 rounded-2xl border border-emerald-500/20 text-xs font-semibold animate-fade-in font-mono">
                    <CheckCircle size={15} className="text-emerald-600" />
                    <span>Your request details have been dispatched to Anas!</span>
                  </div>
                )}

              </form>
            </div>

          </div>
        </section>

      </motion.main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#2C2825]/10 text-[#2C2825]/50 px-6 py-10 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#2C2825] text-xs font-bold font-mono tracking-widest uppercase">Muhammad Anas Khan</span>
            <span className="text-neutral-300">|</span>
            <span className="text-[#2C2825]/75 text-xs font-mono uppercase tracking-wider">AI Portfolio Pipeline</span>
          </div>
          <div className="text-[10px] text-[#2C2825]/40 font-mono tracking-wider">
            &copy; {new Date().getFullYear()} Muhammad Anas Khan. All Rights Saved.
          </div>
        </div>
      </footer>


      {/* ======================================================== */}
      {/* PERSISTENT FLOATING CHAT WIDGET - Professional Overlay */}
      {/* ======================================================== */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
        
        {/* Floating rounded bubble button to open Chat */}
        {!isChatOpen ? (
          <button 
            id="chatbot-trigger-bubble"
            onClick={() => {
              setIsChatOpen(true);
            }}
            className="h-14 w-14 rounded-full bg-amber-500 hover:bg-amber-600 border-2 border-[#FAF8F5] text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 duration-300 group cursor-pointer"
            title="Ask Anas's AI"
          >
            <Bot size={26} className="text-white group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-emerald-500 border-2 border-[#FAF8F5] rounded-full animate-pulse"></span>
          </button>
        ) : (
          /* Main expandable chatbot overlay card */
          <div className="w-[340px] sm:w-[380px] h-[500px] bg-white border border-[#2C2825]/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative animate-fade-in">
            
            {/* Chatbot overlay Header */}
            <div className="bg-[#FAF8F5] px-4.5 py-4 border-b border-[#2C2825]/10 flex items-center justify-between text-[#2C2825]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-white border border-[#2C2825]/10 rounded-xl flex items-center justify-center shadow-sm">
                  <Bot size={18} className="text-amber-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-[11px] tracking-wider uppercase leading-none font-mono text-amber-600">ANAS'S AI ASSISTANT</h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block -ml-3"></span>
                    <span className="text-[8.5px] font-bold text-[#2C2825]/50 uppercase tracking-widest leading-none">ACTIVE</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 bg-white hover:bg-neutral-50 border border-[#2C2825]/10 transition-colors rounded-xl text-[#2C2825]/60 hover:text-[#2C2825] cursor-pointer shadow-sm"
                title="Minimize AI Chat"
              >
                <X size={14} />
              </button>
            </div>

            {/* Chat History scroll panel */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 flex flex-col bg-[#FAF8F5]">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex gap-2 max-w-[85%] items-end">
                    {msg.role === 'assistant' && (
                      <div className="h-5 w-5 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 text-[9px] font-bold shrink-0">
                        AI
                      </div>
                    )}
                    
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-amber-500 text-white rounded-br-none font-semibold' 
                        : 'bg-white text-[#2C2825]/90 border border-[#2C2825]/10 rounded-bl-none'
                    }`}>
                      {msg.parts[0].text}
                    </div>

                    {msg.role === 'user' && (
                      <div className="h-5 w-5 rounded-md bg-neutral-200 text-[#2C2825]/60 flex items-center justify-center text-[9px] font-bold shrink-0">
                        U
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] items-end">
                    <div className="h-5 w-5 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 text-[9px] shrink-0">
                      AI
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-[#2C2825]/10 text-xs text-neutral-400 rounded-bl-none flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce"></span>
                      <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}

              {chatError && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex flex-col gap-2 font-mono shadow-sm">
                  <p className="font-bold uppercase text-[9px] text-red-600">API Error:</p>
                  <p className="leading-relaxed text-[11px]">{chatError}</p>
                  <button 
                    onClick={() => handleSendMessage(messages[messages.length - 1]?.parts[0]?.text || "Hello")}
                    className="bg-red-100 hover:bg-red-200 text-red-800 border border-red-300 px-3 py-1.5 rounded-lg font-bold text-[9px] self-start uppercase transition-colors cursor-pointer"
                  >
                    Retry Request
                  </button>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggested Prompts below chatbot history */}
            {messages.length === 1 && (
              <div className="px-4 py-3 border-t border-[#2C2825]/10 flex flex-col gap-2 bg-[#FAF8F5] shrink-0 select-none">
                <span className="text-[8.5px] text-[#2C2825]/50 font-bold uppercase tracking-wider block font-mono">Suggested Inquiries</span>
                <div className="flex flex-col gap-1.5">
                  {suggestions.map((prompt, sIdx) => (
                    <button 
                      key={sIdx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left text-xs text-[#2C2825]/80 hover:text-amber-600 hover:border-amber-500/30 bg-white border border-[#2C2825]/10 px-3 py-2 rounded-xl transition-all leading-snug cursor-pointer shadow-sm"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation text input area */}
            <div className="p-3 border-t border-[#2C2825]/10 bg-white flex items-center gap-2">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(inputMessage);
                }}
                disabled={isLoading}
                placeholder="Ask Anas's AI Assistant..." 
                className="flex-1 bg-[#FAF8F5] focus:bg-white text-[#2C2825] text-xs border border-[#2C2825]/10 focus:border-amber-500 focus:outline-none rounded-xl px-4 py-3 transition-colors disabled:opacity-50 shadow-inner"
              />
              <button 
                onClick={() => handleSendMessage(inputMessage)}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-xl transition-all flex items-center justify-center disabled:bg-neutral-100 disabled:text-neutral-400 shrink-0 cursor-pointer shadow-sm"
                title="Submit text"
              >
                <Send size={15} />
              </button>
            </div>

          </div>
        )}
 
      </div>

      <Analytics />
      <SpotifyDashboard isOpen={isSpotifyDashboardOpen} onClose={() => setIsSpotifyDashboardOpen(false)} />
    </div>
  );
}
