import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { motion } from 'motion/react';
import SpotifyDashboard from './components/SpotifyDashboard';
import { ResumeModal } from './components/ResumeModal';
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
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Download,
  Layers,
  Code2,
  Sparkles
} from 'lucide-react';

// Define structures for messaging
interface ChatMessage {
  role: 'user' | 'assistant';
  parts: { text: string }[];
}

export default function App() {
  // Navigation active tab & mobile menu
  const [activeNav, setActiveNav] = useState<'about' | 'services' | 'portfolio' | 'story' | 'contact'>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Floating Chatbot controls
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      parts: [{
        text: "Hi! I'm Anas's AI Assistant. I can tell you all about Muhammad Anas Khan's projects, experience, machine learning expertise, and how he can help your business scale. What would you like to know?"
      }]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Project Category Filter State
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'AI SAAS' | 'AGENTS & MCP' | 'MACHINE LEARNING' | 'DEEP LEARNING' | 'DATA ANALYSIS'>('ALL');

  // Spotify Dashboard Interactive Modal State
  const [isSpotifyDashboardOpen, setIsSpotifyDashboardOpen] = useState(false);

  // Resume / CV Modal State
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

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
1. Role: AI Solutions Engineer & Full-Stack AI Developer
2. Location: Karachi, Pakistan
3. Contact Details:
   - Email: anaskhanz1980@gmail.com
   - Phone/WhatsApp: +92 311 2813828
   - GitHub: https://github.com/AnasKhan2310
   - LinkedIn: https://www.linkedin.com/in/anas-khan1290/

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

Pillars of Anas's Work:
1. AI SaaS Development: Designing and launching fully secure, subscription-ready SaaS products integrated with custom-designed AI systems (like RAG models, LangChain, serverless hosting).
2. Workflow Automation: Automating legacy business operations using state-of-the-art n8n workflows, Custom MCP Tool integrations, and advanced Python automated background processes.
3. Intelligent AI Agents: Architecting adaptive, collaborative multi-agent teams using cutting-edge agentic frameworks to optimize sales pipelines, lead generation, customer care, and operations.

Detailed Project Portfolio:
1. ZESTFIT (SaaS Product / Live Demo: https://zestfitmanagement.vercel.app/)
2. AI OPERATIONS MANAGER (AI & Chatbots / Live Demo: https://ais-pre-ww4f45uamngffnxonvsnb5-307342142062.asia-east1.run.app/)
3. MEDISCAN AI (Machine Learning / Live Demo: https://medi-scan-ai-theta.vercel.app/)
4. AI IMAGE CLASSIFIER PRO (Deep Learning / Live Demo: https://teachablemachice.netlify.app/)
5. HEART DISEASE PREDICTOR (Machine Learning / Live Demo: https://heartdiseasepredictorai.netlify.app/)
6. SPOTIFY DATA ANALYSIS (Data Analysis / GitHub: https://github.com/AnasKhan2310/Spotify-Data-Analysis)`;

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

    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text }]
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setChatError(null);

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

  // Projects list
  const projectsData = [
    {
      id: "zestfit",
      title: "ZESTFIT - AI Fitness SaaS",
      category: "AI SAAS" as const,
      tag: "AI SAAS PRODUCT",
      description: "A subscription-ready SaaS fitness & nutrition tracking platform featuring personalized exercise logs, dynamic gym routines, and health analytics with custom progress metrics.",
      githubUrl: "https://github.com/AnasKhan2310/ZESTFIT-GYM-MANAGEMENT",
      liveDemoUrl: "https://zestfitmanagement.vercel.app/",
      isHighlighted: false
    },
    {
      id: "ai-operations-manager",
      title: "AI Operations Manager",
      category: "AGENTS & MCP" as const,
      tag: "AUTONOMOUS AGENTS",
      description: "An advanced operations manager built to coordinate autonomous AI workflows, manage tool execution context, and optimize enterprise integrations seamlessly.",
      githubUrl: "https://github.com/AnasKhan2310/AI-Operations-Manager",
      liveDemoUrl: "https://ais-pre-ww4f45uamngffnxonvsnb5-307342142062.asia-east1.run.app/",
      isHighlighted: true // Highlighted in solid orange card in portfolio grid
    },
    {
      id: "mediscan",
      title: "MediScan AI Healthcare",
      category: "MACHINE LEARNING" as const,
      tag: "MACHINE LEARNING",
      description: "A high-precision healthcare screening model designed to identify early-stage cardiovascular and heart disease risks using advanced statistical patterns.",
      githubUrl: "https://github.com/AnasKhan2310",
      liveDemoUrl: "https://medi-scan-ai-theta.vercel.app/",
      isHighlighted: false
    },
    {
      id: "classifier",
      title: "AI Image Classifier Pro",
      category: "DEEP LEARNING" as const,
      tag: "DEEP LEARNING",
      description: "Custom computer vision solutions for real-time recognition. Built specialized neural models that perform complex visual tasks with extreme speed and accuracy.",
      githubUrl: "https://github.com/AnasKhan2310",
      liveDemoUrl: "https://teachablemachice.netlify.app/",
      isHighlighted: false
    },
    {
      id: "heart",
      title: "Heart Disease Predictor",
      category: "MACHINE LEARNING" as const,
      tag: "PREDICTIVE ML",
      description: "A supervised Machine Learning project that analyzes patient health metrics to predict cardiovascular risks with exceptionally high statistical confidence.",
      githubUrl: "https://github.com/AnasKhan2310",
      liveDemoUrl: "https://heartdiseasepredictorai.netlify.app/",
      isHighlighted: false
    },
    {
      id: "spotify",
      title: "Spotify Streaming Analytics",
      category: "DATA ANALYSIS" as const,
      tag: "DATA SCIENCE",
      description: "Decoding consumer streaming behavior and music trends by analyzing massive Spotify datasets to uncover trends that drive strategic marketing decisions.",
      githubUrl: "https://github.com/AnasKhan2310/Spotify-Data-Analysis",
      liveDemoUrl: "#",
      isHighlighted: false
    }
  ];

  // Filtering Logic
  const filteredProjects = activeFilter === 'ALL' 
    ? projectsData 
    : projectsData.filter(proj => proj.category === activeFilter);

  // Services list
  const servicesList = [
    {
      id: "saas",
      title: "AI SaaS Development",
      description: "Designing and launching subscription-ready SaaS products integrated with custom LLMs, RAG models, and scalable cloud architectures.",
      tags: ["Next.js", "FastAPI", "RAG", "Stripe"],
      isFeatured: true
    },
    {
      id: "n8n",
      title: "Workflow Automation (n8n & MCP)",
      description: "Automating end-to-end business operations with n8n workflows, custom MCP toolkits, and Python background tasks.",
      tags: ["n8n", "MCP Protocol", "API Webhooks"],
      isFeatured: false
    },
    {
      id: "agents",
      title: "Autonomous AI Agents",
      description: "Architecting adaptive multi-agent teams with autonomous reasoning, tool execution, and context loops for customer ops and sales.",
      tags: ["Multi-Agent", "LangChain", "Autonomous"],
      isFeatured: false
    },
    {
      id: "fullstack",
      title: "Full-Stack Web & Next.js",
      description: "Building ultra-fast, responsive web applications with TypeScript, React, Next.js, Tailwind CSS, and secure API backends.",
      tags: ["TypeScript", "Tailwind", "REST APIs"],
      isFeatured: false
    },
    {
      id: "rag",
      title: "RAG & Vector Search",
      description: "Designing semantic search and enterprise retrieval pipelines with Pinecone, Chroma, and custom embedding pipelines.",
      tags: ["Vector DB", "Embeddings", "Semantic Search"],
      isFeatured: false
    },
    {
      id: "ml",
      title: "Machine Learning & Deep Learning",
      description: "Training predictive models, computer vision neural networks, and diagnostic classifiers using PyTorch & TensorFlow.",
      tags: ["PyTorch", "TensorFlow", "CNNs / LSTMs"],
      isFeatured: false
    }
  ];

  return (
    <div id="app-root" className="min-h-screen flex flex-col bg-[#0A0A0A] text-white selection:bg-[#FF4D00] selection:text-white scroll-smooth overflow-x-hidden font-sans relative">
      
      {/* Interactive Network Background */}
      <NetworkBackground />

      {/* Glowing Cursor Trail */}
      <GlowingCursor />

      {/* ========================================================================= */}
      {/* HEADER / NAVIGATION BAR (Exact layout from reference image) */}
      {/* ========================================================================= */}
      <header className="relative z-40 w-full max-w-7xl mx-auto pt-3 sm:pt-6 px-3 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-2.5 sm:py-3 px-3 sm:px-6 bg-[#111111]/95 backdrop-blur-md border border-[#222222] rounded-lg">
          
          {/* Brand Logo matching 'Cod≡r' design */}
          <a href="#about" className="flex items-center gap-2 group cursor-pointer">
            <div className="text-lg sm:text-2xl font-black font-syne text-white tracking-tight flex items-center">
              <span>Cod</span>
              <span className="text-[#FF4D00] font-black text-xl sm:text-3xl leading-none inline-block mx-0.5">≡</span>
              <span>r</span>
            </div>
          </a>

          {/* Center Navigation Links with Active Orange Pill indicator */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {[
              { id: 'about', label: 'About Me', href: '#about' },
              { id: 'services', label: 'Services', href: '#services' },
              { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
              { id: 'story', label: 'My Story', href: '#story' },
              { id: 'contact', label: 'Contact Us', href: '#contact' }
            ].map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveNav(item.id as any)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                  activeNav === item.id 
                    ? 'bg-[#FF4D00] text-white shadow-sm' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Action Button - Hire Me! */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-md transition-all duration-200 shadow-[0_4px_15px_rgba(255,77,0,0.3)] hover:shadow-[0_4px_20px_rgba(255,77,0,0.5)] cursor-pointer"
            >
              Hire Me!
            </a>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 text-neutral-300 hover:text-white bg-[#1A1A1A] border border-[#2A2A2A] rounded-md transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 p-2.5 bg-[#121212] border border-[#222222] rounded-lg flex flex-col gap-1 shadow-2xl relative z-50"
          >
            {[
              { id: 'about', label: 'About Me', href: '#about' },
              { id: 'services', label: 'Services', href: '#services' },
              { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
              { id: 'story', label: 'My Story', href: '#story' },
              { id: 'contact', label: 'Contact Us', href: '#contact' }
            ].map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-xs font-semibold ${
                  activeNav === item.id 
                    ? 'bg-[#FF4D00] text-white' 
                    : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* MAIN BODY CONTENT */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 overflow-x-hidden">
        
        {/* ========================================================================= */}
        {/* HERO SECTION (Matches the prominent hero split with geometric wireframe) */}
        {/* ========================================================================= */}
        <section id="about" className="relative pt-8 sm:pt-16 pb-12 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left Hero Content - Expanded column so name has ample space */}
            <div className="lg:col-span-8 flex flex-col items-start text-left z-20">
              
              {/* Badge: "Hello, I am" */}
              <div className="inline-block bg-[#FF4D00] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-sm mb-3 sm:mb-4 shadow-sm">
                Hello, I am
              </div>

              {/* Title: Muhammad Anas Khan (Responsive font scaling across mobile & desktop) */}
              <h1 className="text-[26px] xs:text-[32px] sm:text-4xl md:text-[40px] lg:text-[40px] xl:text-[48px] font-extrabold text-white font-syne tracking-tight leading-tight mb-3 sm:whitespace-nowrap break-words w-full">
                Muhammad Anas Khan
              </h1>

              {/* Subtitle */}
              <p className="text-neutral-400 text-xs sm:text-base md:text-lg font-normal mb-6 sm:mb-8 max-w-xl leading-relaxed">
                AI Automation Engineer building SaaS tools, dashboards & workflows that save businesses hours every week.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(true)}
                  className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-7 py-2.5 sm:py-3 rounded-md transition-all shadow-[0_4px_15px_rgba(255,77,0,0.35)] flex items-center gap-2 cursor-pointer"
                >
                  <Download size={15} />
                  <span>Download CV</span>
                </button>

                <a
                  href="#portfolio"
                  className="bg-transparent hover:bg-white/5 text-white border border-[#333333] hover:border-neutral-400 text-xs sm:text-sm font-semibold uppercase tracking-wider px-5 sm:px-7 py-2.5 sm:py-3 rounded-md transition-all cursor-pointer"
                >
                  My Work
                </a>
              </div>

              {/* Animated Mouse Scroll Indicator (from reference image) */}
              <div className="flex items-center gap-3 text-neutral-500 text-xs font-mono">
                <div className="w-4 sm:w-5 h-8 sm:h-9 border border-[#FF4D00]/60 rounded-full flex justify-center pt-1 sm:pt-1.5 relative">
                  <div className="w-1.5 h-1.5 bg-[#FF4D00] rounded-full animate-mouse-dot" />
                </div>
                <span className="text-[10px] sm:text-[11px] text-neutral-400 tracking-wider">Scroll down to explore</span>
              </div>

            </div>

            {/* Right Hero Visual - Compact, proportional portrait picture */}
            <div className="lg:col-span-4 relative flex justify-center lg:justify-end items-center z-10 mt-4 lg:mt-0">
              
              <div className="relative w-48 sm:w-56 md:w-64 lg:w-72 aspect-[4/5] flex items-center justify-center group max-w-full">
                
                {/* Subtle ambient back-glow behind portrait */}
                <div className="absolute inset-0 bg-radial from-[#FF4D00]/20 via-[#FF4D00]/5 to-transparent blur-2xl pointer-events-none" />

                {/* Portrait Photo with seamless bottom fade & clean transparency blend */}
                <div className="relative w-full h-full flex items-end justify-center overflow-visible">
                  <img 
                    src={picImage} 
                    alt="Muhammad Anas Khan - AI Solutions Engineer" 
                    className="w-full h-full object-cover object-top relative z-10 filter contrast-105 group-hover:scale-105 transition-transform duration-500 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
                  />
                </div>

                {/* SVG Polygonal Wireframe Lines (Artistic geometric line accent like in mockup) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 stroke-[#FF4D00]/60" viewBox="0 0 300 375" fill="none">
                  {/* Top polygonal triangle mesh */}
                  <polygon points="150,20 270,120 30,120" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  <polygon points="150,60 250,140 50,140" strokeWidth="1.2" opacity="0.8" />
                  <line x1="150" y1="20" x2="150" y2="350" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
                  {/* Center diamond & chevron wireframe */}
                  <polygon points="150,160 280,220 150,280 20,220" strokeWidth="1" opacity="0.7" />
                  <polygon points="150,180 260,230 150,340 40,230" strokeWidth="1.2" opacity="0.85" />
                  {/* Corner accents */}
                  <circle cx="150" cy="20" r="3" fill="#FF4D00" />
                  <circle cx="280" cy="220" r="3" fill="#FF4D00" />
                  <circle cx="20" cy="220" r="3" fill="#FF4D00" />
                  <circle cx="150" cy="340" r="3" fill="#FF4D00" />
                </svg>

              </div>

            </div>

          </div>

          {/* ========================================================================= */}
          {/* STATS / METRIC CARDS (Exact 4-box layout with highlighted orange card) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-16">
            
            {/* Box 1: Clients */}
            <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 sm:p-7 rounded-lg text-center flex flex-col justify-center items-center transition-all shadow-sm">
              <span className="text-2xl sm:text-4xl font-extrabold text-white font-syne tracking-tight">
                <Counter target={15} suffix="+" />
              </span>
              <span className="text-[11px] sm:text-sm text-neutral-400 font-medium tracking-wide mt-1">Clients</span>
            </div>

            {/* Box 2: Highlighted ORANGE card: Projects */}
            <div className="bg-[#FF4D00] text-white p-4 sm:p-7 rounded-lg text-center flex flex-col justify-center items-center shadow-[0_8px_25px_rgba(255,77,0,0.35)] transition-all transform hover:-translate-y-1">
              <span className="text-2xl sm:text-4xl font-extrabold text-white font-syne tracking-tight">
                <Counter target={25} suffix="+" />
              </span>
              <span className="text-[11px] sm:text-sm text-white/90 font-bold tracking-wide mt-1">Projects</span>
            </div>

            {/* Box 3: Deployments / Accuracy */}
            <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 sm:p-7 rounded-lg text-center flex flex-col justify-center items-center transition-all shadow-sm">
              <span className="text-2xl sm:text-4xl font-extrabold text-white font-syne tracking-tight">
                <Counter target={30} suffix="+" />
              </span>
              <span className="text-[11px] sm:text-sm text-neutral-400 font-medium tracking-wide mt-1">Deployments</span>
            </div>

            {/* Box 4: Years Experience */}
            <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 sm:p-7 rounded-lg text-center flex flex-col justify-center items-center transition-all shadow-sm">
              <span className="text-2xl sm:text-4xl font-extrabold text-white font-syne tracking-tight">
                03
              </span>
              <span className="text-[11px] sm:text-sm text-neutral-400 font-medium tracking-wide mt-1">Years Experience</span>
            </div>

          </div>

        </section>


        {/* ========================================================================= */}
        {/* SERVICES SECTION ("Our Services" with orange highlight card) */}
        {/* ========================================================================= */}
        <section id="services" className="py-16 lg:py-20 border-t border-[#1C1C1C]">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-syne tracking-tight mb-3">
              Our Services
            </h2>
            <div className="w-12 h-0.5 bg-[#FF4D00] mx-auto mb-3" />
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Such a passionate software engineer who specializes in modern AI architectures, agentic pipelines, and SaaS solutions.
            </p>
          </div>

          {/* Services Grid (6 cards, matching mockup layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service) => (
              <div
                key={service.id}
                className={`p-7 rounded-lg flex flex-col justify-between transition-all duration-300 relative group min-h-[220px] ${
                  service.isFeatured
                    ? 'bg-[#FF4D00] text-white shadow-[0_8px_30px_rgba(255,77,0,0.3)]'
                    : 'bg-[#121212] border border-[#222222] hover:border-[#FF4D00]/50 text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {service.id === 'saas' && <Layers size={22} className={service.isFeatured ? 'text-white' : 'text-[#FF4D00]'} />}
                      {service.id === 'n8n' && <TrendingUp size={22} className="text-[#FF4D00]" />}
                      {service.id === 'agents' && <Cpu size={22} className="text-[#FF4D00]" />}
                      {service.id === 'fullstack' && <Code2 size={22} className="text-[#FF4D00]" />}
                      {service.id === 'rag' && <Brain size={22} className="text-[#FF4D00]" />}
                      {service.id === 'ml' && <Sparkles size={22} className="text-[#FF4D00]" />}
                      
                      <h3 className="text-base sm:text-lg font-bold font-syne tracking-tight">
                        {service.title}
                      </h3>
                    </div>

                    <ArrowRight size={18} className={`transition-transform duration-300 group-hover:translate-x-1 ${service.isFeatured ? 'text-white' : 'text-neutral-400 group-hover:text-[#FF4D00]'}`} />
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${service.isFeatured ? 'text-white/90' : 'text-neutral-400'}`}>
                    {service.description}
                  </p>
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {service.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-sm ${
                        service.isFeatured 
                          ? 'bg-black/20 text-white' 
                          : 'bg-[#1A1A1A] text-neutral-400 border border-[#2A2A2A]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Show All CTA Button */}
          <div className="flex justify-center mt-10">
            <a
              href="#portfolio"
              className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-md transition-all shadow-md cursor-pointer"
            >
              Show All
            </a>
          </div>

        </section>


        {/* ========================================================================= */}
        {/* "READ ABOUT MY LIFE STRUGGLE STORY!" / JOURNEY & PHILOSOPHY SECTION */}
        {/* ========================================================================= */}
        <section id="story" className="py-16 lg:py-20 border-t border-[#1C1C1C]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Real Code & Interactive Terminal Preview */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* Terminal Frame */}
              <div className="relative rounded-xl overflow-hidden border border-[#222222] bg-[#121212] shadow-2xl">
                <TerminalTyping />
              </div>

              {/* Skills benchmarks preview */}
              <div className="bg-[#121212] border border-[#222222] p-5 rounded-xl">
                <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-[#FF4D00] rounded-full" />
                  Engineering Competency Matrix
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex justify-between items-center bg-[#181818] p-2.5 rounded border border-[#242424]">
                    <span className="text-neutral-300">AI SaaS Systems</span>
                    <span className="text-[#FF4D00] font-mono font-bold">96%</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#181818] p-2.5 rounded border border-[#242424]">
                    <span className="text-neutral-300">n8n & MCP Automation</span>
                    <span className="text-[#FF4D00] font-mono font-bold">95%</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#181818] p-2.5 rounded border border-[#242424]">
                    <span className="text-neutral-300">Autonomous Agents</span>
                    <span className="text-[#FF4D00] font-mono font-bold">94%</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#181818] p-2.5 rounded border border-[#242424]">
                    <span className="text-neutral-300">FastAPI & Python</span>
                    <span className="text-[#FF4D00] font-mono font-bold">95%</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Narrative Story matching the mockup heading */}
            <div className="lg:col-span-6 flex flex-col items-start">
              
              <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-3">
                MY JOURNEY & VISION
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-syne tracking-tight leading-tight mb-6">
                Read About My Life <br className="hidden sm:block" />
                <span className="text-[#FF4D00]">Struggle & Engineering Story!</span>
              </h2>

              <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                <p>
                  From building my foundation in Computer Science at <strong className="text-white">Federal Urdu University, Karachi</strong>, to architecting multi-agent AI ecosystems for global businesses, my journey has been driven by one mission: turning complex machine learning algorithms into tangible, high-ROI business tools.
                </p>
                <p>
                  I've spent years diving deep into deep neural networks, Convolutional Neural Networks (CNNs), Long Short-Term Memory (LSTM) models, and modern LLM orchestration. When the AI revolution arrived, I transitioned from theoretical models to production-ready AI SaaS and automated workflows.
                </p>
                <p>
                  Today, I help companies replace repetitive manual work with intelligent autonomous agents, custom RAG knowledge bases, and robust n8n pipelines that run 24/7 without friction.
                </p>
              </div>

              {/* Education & credentials badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-[#121212] border border-[#222222] px-4 py-2.5 rounded-lg">
                  <div className="text-[10px] font-mono uppercase text-[#FF4D00] font-bold">EDUCATION</div>
                  <div className="text-xs font-semibold text-white">BS Computer Science • Federal Urdu University</div>
                </div>
                <div className="bg-[#121212] border border-[#222222] px-4 py-2.5 rounded-lg">
                  <div className="text-[10px] font-mono uppercase text-[#FF4D00] font-bold">FOCUS</div>
                  <div className="text-xs font-semibold text-white">AI, Deep Learning & Autonomous Systems</div>
                </div>
              </div>

            </div>

          </div>

        </section>


        {/* ========================================================================= */}
        {/* PORTFOLIO SECTION ("Our Portfolio" matching mockup design) */}
        {/* ========================================================================= */}
        <section id="portfolio" className="py-16 lg:py-20 border-t border-[#1C1C1C]">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-syne tracking-tight mb-3">
              Our Portfolio
            </h2>
            <div className="w-12 h-0.5 bg-[#FF4D00] mx-auto mb-3" />
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Explore featured production software, autonomous workflows, and machine learning models.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 select-none">
            {(['ALL', 'AI SAAS', 'AGENTS & MCP', 'MACHINE LEARNING', 'DEEP LEARNING', 'DATA ANALYSIS'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[10px] sm:text-xs font-bold tracking-wider px-4 py-2 rounded-md uppercase transition-all duration-200 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#FF4D00] text-white shadow-md'
                    : 'bg-[#121212] hover:bg-[#1A1A1A] text-neutral-400 hover:text-white border border-[#222222]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Portfolio Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`rounded-lg p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 min-h-[260px] relative group ${
                  project.isHighlighted
                    ? 'bg-[#FF4D00] text-white shadow-[0_8px_30px_rgba(255,77,0,0.35)]'
                    : 'bg-[#121212] border border-[#222222] hover:border-[#FF4D00]/50 text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm ${
                      project.isHighlighted
                        ? 'bg-black/25 text-white'
                        : 'bg-[#1A1A1A] text-[#FF4D00] border border-[#FF4D00]/20'
                    }`}>
                      {project.tag}
                    </span>

                    {project.isHighlighted && (
                      <span className="text-[9px] uppercase font-bold tracking-widest bg-white text-[#FF4D00] px-2 py-0.5 rounded-sm">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-syne tracking-tight mb-2.5">
                    {project.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                    project.isHighlighted ? 'text-white/90' : 'text-neutral-400'
                  }`}>
                    {project.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className={`pt-4 border-t flex items-center justify-between ${
                  project.isHighlighted ? 'border-white/20' : 'border-[#222222]'
                }`}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors ${
                      project.isHighlighted ? 'text-white hover:text-black' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Github size={13} />
                    <span>Source Code</span>
                  </a>

                  {project.id === "spotify" ? (
                    <button
                      onClick={() => setIsSpotifyDashboardOpen(true)}
                      className={`text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                        project.isHighlighted ? 'text-white hover:underline' : 'text-[#FF4D00] hover:text-[#FF7700]'
                      }`}
                    >
                      <span>Interactive App</span>
                      <ChevronRight size={14} />
                    </button>
                  ) : project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-xs font-mono font-bold flex items-center gap-1 transition-colors ${
                        project.isHighlighted ? 'text-white hover:underline' : 'text-[#FF4D00] hover:text-[#FF7700]'
                      }`}
                    >
                      <span>Live Preview</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-10">
            <a
              href="https://github.com/AnasKhan2310"
              target="_blank"
              rel="noreferrer"
              className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-bold uppercase tracking-wider px-8 py-3 rounded-md transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>View All on GitHub</span>
              <Github size={14} />
            </a>
          </div>

        </section>


        {/* ========================================================================= */}
        {/* CONTACT SECTION ("Contact Us" matching mockup) */}
        {/* ========================================================================= */}
        <section id="contact" className="py-16 lg:py-20 border-t border-[#1C1C1C]">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-syne tracking-tight mb-3">
              Contact Us
            </h2>
            <div className="w-12 h-0.5 bg-[#FF4D00] mx-auto mb-3" />
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Have a project in mind, need to automate workflows, or launch an AI SaaS product? Let's talk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Contact Info Cards (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              <div className="bg-[#121212] border border-[#222222] p-5 rounded-lg flex items-center gap-4 hover:border-[#FF4D00]/50 transition-all">
                <div className="h-12 w-12 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00] shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-wider block">Email Address</span>
                  <a href="mailto:anaskhanz1980@gmail.com" className="text-white hover:text-[#FF4D00] text-sm font-semibold transition-colors mt-0.5 block">
                    anaskhanz1980@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-[#121212] border border-[#222222] p-5 rounded-lg flex items-center gap-4 hover:border-[#FF4D00]/50 transition-all">
                <div className="h-12 w-12 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00] shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-wider block">WhatsApp & Phone</span>
                  <a href="tel:+923112813828" className="text-white hover:text-[#FF4D00] text-sm font-semibold transition-colors mt-0.5 block">
                    +92 311 2813828
                  </a>
                </div>
              </div>

              <div className="bg-[#121212] border border-[#222222] p-5 rounded-lg flex items-center gap-4 hover:border-[#FF4D00]/50 transition-all">
                <div className="h-12 w-12 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00] shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-wider block">Location</span>
                  <span className="text-white text-sm font-semibold mt-0.5 block">
                    Karachi, Pakistan
                  </span>
                </div>
              </div>

              <div className="bg-[#121212] border border-[#222222] p-5 rounded-lg flex items-center gap-4 hover:border-[#FF4D00]/50 transition-all">
                <div className="h-12 w-12 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00] shrink-0">
                  <Linkedin size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-wider block">LinkedIn Profile</span>
                  <a href="https://www.linkedin.com/in/anas-khan1290/" target="_blank" rel="noreferrer" className="text-white hover:text-[#FF4D00] text-sm font-semibold transition-colors mt-0.5 block">
                    linkedin.com/in/anas-khan1290
                  </a>
                </div>
              </div>

            </div>

            {/* Right Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#121212] border border-[#222222] p-6 sm:p-8 rounded-lg shadow-xl">
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-neutral-400 text-xs font-mono font-semibold block mb-1.5">Your Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Mr. John Doe"
                      required
                      className="w-full bg-[#181818] border border-[#282828] focus:border-[#FF4D00] text-white text-xs sm:text-sm rounded-md px-4 py-3 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 text-xs font-mono font-semibold block mb-1.5">Your Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="john@company.com"
                      required
                      className="w-full bg-[#181818] border border-[#282828] focus:border-[#FF4D00] text-white text-xs sm:text-sm rounded-md px-4 py-3 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 text-xs font-mono font-semibold block mb-1.5">Subject</label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="AI SaaS Development / Automation Project..."
                    required
                    className="w-full bg-[#181818] border border-[#282828] focus:border-[#FF4D00] text-white text-xs sm:text-sm rounded-md px-4 py-3 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 text-xs font-mono font-semibold block mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Hi Anas, let's discuss building an AI agent system for our business..."
                    required
                    className="w-full bg-[#181818] border border-[#282828] focus:border-[#FF4D00] text-white text-xs sm:text-sm rounded-md px-4 py-3 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#FF4D00] hover:bg-[#E04400] text-white font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-md transition-all shadow-[0_4px_15px_rgba(255,77,0,0.35)] flex items-center justify-center gap-2 cursor-pointer self-start mt-2"
                >
                  <span>Send Message</span>
                  <Send size={14} />
                </button>

                {isSubmitted && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md text-xs flex items-center gap-2 animate-fade-in font-mono mt-2">
                    <CheckCircle size={15} />
                    <span>Message received! Anas will get back to you shortly.</span>
                  </div>
                )}

              </form>
            </div>

          </div>

        </section>

      </main>

      {/* ========================================================================= */}
      {/* FOOTER */}
      {/* ========================================================================= */}
      <footer className="w-full border-t border-[#1C1C1C] bg-[#0D0D0D] py-8 relative z-10 text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-syne font-extrabold text-white text-base">Cod<span className="text-[#FF4D00]">≡</span>r</span>
            <span className="text-neutral-700">|</span>
            <span>Muhammad Anas Khan Portfolio</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/anas-khan1290/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-[#FF4D00] transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="https://github.com/AnasKhan2310" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-[#FF4D00] transition-colors">
              <Github size={16} />
            </a>
            <a href="mailto:anaskhanz1980@gmail.com" className="text-neutral-400 hover:text-[#FF4D00] transition-colors">
              <Mail size={16} />
            </a>
          </div>

          <div className="font-mono text-[11px] text-neutral-600">
            &copy; {new Date().getFullYear()} Muhammad Anas Khan. All rights reserved.
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* FLOATING GEMINI AI CHATBOT DRAWER */}
      {/* ========================================================================= */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 font-sans">
        
        {!isChatOpen ? (
          <button 
            id="chatbot-trigger-bubble"
            onClick={() => setIsChatOpen(true)}
            className="h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-[#FF4D00] hover:bg-[#E04400] border-2 border-white/20 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 duration-300 group cursor-pointer"
            title="Ask Anas's AI Assistant"
            aria-label="Open AI Assistant Chat"
          >
            <Bot size={22} className="text-white group-hover:rotate-12 transition-transform duration-300 sm:w-6 sm:h-6" />
            <span className="absolute top-0 right-0 h-3 w-3 bg-emerald-500 border border-[#0A0A0A] rounded-full animate-pulse" />
          </button>
        ) : (
          <div className="w-[calc(100vw-32px)] sm:w-[370px] max-w-[370px] h-[480px] max-h-[calc(100vh-90px)] bg-[#121212] border border-[#2A2A2A] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative animate-fade-in">
            
            {/* Header */}
            <div className="bg-[#1A1A1A] px-4 py-3.5 border-b border-[#262626] flex items-center justify-between text-white">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 bg-[#FF4D00]/10 border border-[#FF4D00]/30 rounded-lg flex items-center justify-center">
                  <Bot size={16} className="text-[#FF4D00]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs tracking-wider uppercase font-mono text-white">ANAS'S AI ASSISTANT</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block -ml-2.5" />
                    <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-widest font-mono">ONLINE</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1 text-neutral-400 hover:text-white rounded-md hover:bg-white/5 transition-colors cursor-pointer"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat History Panel */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col bg-[#0F0F0F]">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-3 rounded-xl text-xs leading-relaxed max-w-[85%] ${
                    msg.role === 'user' 
                      ? 'bg-[#FF4D00] text-white rounded-br-none font-medium' 
                      : 'bg-[#181818] text-neutral-200 border border-[#282828] rounded-bl-none'
                  }`}>
                    {msg.parts[0].text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-xl bg-[#181818] border border-[#282828] text-xs text-neutral-400 rounded-bl-none flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-[#FF4D00] rounded-full animate-bounce" />
                    <span className="h-1.5 w-1.5 bg-[#FF4D00] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 bg-[#FF4D00] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {chatError && (
                <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-300 rounded-xl text-xs flex flex-col gap-1.5 font-mono">
                  <p className="font-bold text-[10px] uppercase text-red-400">Notice:</p>
                  <p className="text-[11px]">{chatError}</p>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-3 py-2 border-t border-[#222222] bg-[#141414] flex flex-col gap-1 shrink-0">
                <span className="text-[8.5px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Suggested Questions</span>
                <div className="flex flex-col gap-1">
                  {suggestions.map((prompt, sIdx) => (
                    <button 
                      key={sIdx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left text-xs text-neutral-300 hover:text-white bg-[#1A1A1A] hover:bg-[#242424] border border-[#282828] px-2.5 py-1.5 rounded-md transition-all cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Box */}
            <div className="p-2.5 border-t border-[#222222] bg-[#141414] flex items-center gap-2">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(inputMessage);
                }}
                disabled={isLoading}
                placeholder="Ask Anas's AI Assistant..." 
                className="flex-1 bg-[#1E1E1E] text-white text-xs border border-[#2D2D2D] focus:border-[#FF4D00] focus:outline-none rounded-lg px-3 py-2.5 transition-colors disabled:opacity-50"
              />
              <button 
                onClick={() => handleSendMessage(inputMessage)}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-[#FF4D00] hover:bg-[#E04400] text-white p-2.5 rounded-lg transition-all flex items-center justify-center disabled:bg-neutral-800 disabled:text-neutral-600 shrink-0 cursor-pointer"
                title="Send"
              >
                <Send size={14} />
              </button>
            </div>

          </div>
        )}

      </div>

      <Analytics />
      <SpotifyDashboard isOpen={isSpotifyDashboardOpen} onClose={() => setIsSpotifyDashboardOpen(false)} />
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </div>
  );
}
