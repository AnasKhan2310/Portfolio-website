import { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { motion } from 'motion/react';
import { ResumeModal } from './components/ResumeModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TechStackSection } from './components/TechStackSection';
import NetworkBackground from './components/NetworkBackground';
import TerminalTyping from './components/TerminalTyping';
import InteractiveHeroPortrait from './components/InteractiveHeroPortrait';
import { ProjectItem } from './data/projectsData';
import { 
  Send, 
  X, 
  Bot, 
  Github, 
  Linkedin, 
  Mail, 
  Menu,
  Phone, 
  BarChart3,
  Brain,
  Layers
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  parts: { text: string }[];
}

export default function App() {
  // Navigation active tab & mobile menu
  const [activeNav, setActiveNav] = useState<'hero' | 'solutions' | 'projects' | 'process' | 'about' | 'contact'>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Floating Chatbot controls
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      parts: [{
        text: "Hello! I'm Anas's AI Assistant. Muhammad Anas Khan specializes in Data Analysis, AI/ML, and SaaS Development backed by real projects. How can I help you today?"
      }]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Modals state
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);

  // Message scroll reference
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to chatbot message updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Open Case Study Modal
  const handleOpenCaseStudy = (project: ProjectItem) => {
    setSelectedCaseStudy(project);
    setIsCaseStudyModalOpen(true);
  };

  // Open Interactive Previews
  const handleOpenInteractivePreview = (_type?: string) => {
    // Reserved for future interactive applet demos
  };

  // System instruction for Gemini chatbot
  const systemInstruction = `You are "Anas's AI Assistant", representing Muhammad Anas Khan, a versatile AI/ML Developer, Data Analytics Professional, and AI Applications Developer.

Primary Positioning:
- Professional Headline: "I Help Businesses Turn Data Into AI Solutions | Python | Machine Learning | AI Applications"
- Core Capabilities:
  1. Data Analytics & Visualization (Interactive dashboards, KPI reporting, statistical exploratory analysis in Python, Pandas, Power BI)
  2. Machine Learning & Predictive Modeling (Supervised classification, regression, customer churn prediction, recommendation systems using Scikit-learn, XGBoost)
  3. AI Applications & Chatbots (Document Q&A, OCR text extraction, LLM applications using OpenAI/Gemini/Anthropic, LangChain)
  4. Web Applications & SaaS Development (Full-stack architectures using FastAPI, Next.js, PostgreSQL, Tailwind CSS)
  5. Workflow Automation (n8n automations, event webhooks, autonomous agents)
- Target Clients: Organizations and businesses across diverse industries (SaaS, Healthcare, Financial Services, Retail, Logistics, Enterprise Operations).
- Key Principle: Muhammad Anas Khan does NOT specialize in a single niche; he builds tailored AI, ML, and data solutions for different business domains.

Contact & Profile:
- Name: Muhammad Anas Khan
- Degree: BS in Computer Science from Federal Urdu University
- Email: anaskhanz.dev@gmail.com
- Phone / WhatsApp: +92 311 2813828
- GitHub: https://github.com/AnasKhan2310
- LinkedIn: https://www.linkedin.com/in/anas-khan1290/

Featured Projects:
1. ZestFit: AI Health & Gym Management SaaS (Next.js, TypeScript, FastAPI, PostgreSQL, Stripe) - Live Demo: https://zestfitmanagement.vercel.app/
2. MediScan AI: Document Q&A & Clinical Intelligence (Python, LLMs, LangChain, OCR, FastAPI, React) - Live Demo: https://medi-scan-ai-theta.vercel.app/
3. Teachable Machine: Vision AI Classifier (Python, TensorFlow.js, Transfer Learning, Canvas API) - Interactive in-browser vision model.
4. Executive BI & Ecommerce Sales Intelligence Dashboard (Python, Pandas, Power BI / Recharts, SQL) - Live Demo: https://ecommerce-sales-intelligence-dashbo-flame.vercel.app/

Style: Be professional, articulate, and honest. Avoid marketing hype or fake metrics. Highlight real software architecture, clean code, and working project links.`;

  const suggestions = [
    "What kind of AI & ML solutions can Anas build for my business?",
    "Tell me about the 4 featured projects and working demos",
    "How can we collaborate on an AI or data project?"
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

  return (
    <div id="app-root" className="min-h-screen flex flex-col bg-[#0A0A0A] text-white selection:bg-[#FF4D00] selection:text-white scroll-smooth overflow-x-hidden font-sans relative">
      
      {/* Interactive Network Background */}
      <NetworkBackground />

      {/* ========================================================================= */}
      {/* HEADER / NAVIGATION BAR (EXACT MATCH TO REFERENCE) */}
      {/* ========================================================================= */}
      <header className="relative z-40 w-full max-w-7xl mx-auto pt-3 sm:pt-6 px-3 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-2.5 sm:py-3 px-3 sm:px-6 bg-[#111111] border border-[#222222] rounded-xl shadow-lg">
          
          {/* Brand Logo - Coder with orange triple-bar + Muhammad Anas Khan */}
          <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer">
            <div className="flex items-center text-xl sm:text-2xl font-black text-white font-display tracking-tight">
              <span>Cod</span>
              <span className="text-[#FF4D00] font-black text-2xl sm:text-3xl leading-none inline-block mx-0.5 tracking-tighter">≡</span>
              <span>r</span>
            </div>
            <div className="h-4 w-[1px] bg-[#333333] hidden sm:block" />
            <span className="hidden sm:inline-block text-xs sm:text-[13px] font-bold text-white tracking-normal whitespace-nowrap">
              Muhammad Anas Khan
            </span>
          </a>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <a
              href="#hero"
              onClick={() => setActiveNav('hero')}
              className={`text-xs sm:text-[13px] font-bold px-4 py-1.5 rounded-lg transition-all ${
                activeNav === 'hero'
                  ? 'bg-[#FF4D00] text-white shadow-sm'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </a>

            <a
              href="#solutions"
              onClick={() => setActiveNav('solutions')}
              className={`text-xs sm:text-[13px] font-medium px-3.5 py-1.5 rounded-lg transition-colors ${
                activeNav === 'solutions'
                  ? 'bg-[#FF4D00] text-white font-bold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Solutions
            </a>

            <a
              href="#projects"
              onClick={() => setActiveNav('projects')}
              className={`text-xs sm:text-[13px] font-medium px-3.5 py-1.5 rounded-lg transition-colors ${
                activeNav === 'projects'
                  ? 'bg-[#FF4D00] text-white font-bold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              Featured Projects
            </a>

            <a
              href="#about"
              onClick={() => setActiveNav('about')}
              className={`text-xs sm:text-[13px] font-medium px-3.5 py-1.5 rounded-lg transition-colors ${
                activeNav === 'about'
                  ? 'bg-[#FF4D00] text-white font-bold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              About
            </a>

            <a
              href="#contact"
              onClick={() => setActiveNav('contact')}
              className="border border-white/90 hover:border-white text-white hover:bg-white/10 text-xs sm:text-[13px] font-medium px-4 py-1.5 rounded-lg transition-all"
            >
              Contact
            </a>
          </div>

          {/* Right Action Button - LET'S TALK */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs sm:text-[13px] font-black uppercase tracking-wider px-4 sm:px-5 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(255,77,0,0.35)] cursor-pointer"
            >
              LET'S TALK
            </a>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 text-neutral-300 hover:text-white bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg transition-colors"
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
              { id: 'hero', label: 'Home', href: '#hero' },
              { id: 'solutions', label: 'Solutions', href: '#solutions' },
              { id: 'projects', label: 'Featured Projects', href: '#projects' },
              { id: 'about', label: 'About', href: '#about' },
              { id: 'contact', label: 'Contact', href: '#contact' }
            ].map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-xs font-medium ${
                  activeNav === item.id 
                    ? 'bg-[#FF4D00] text-white font-semibold' 
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
        {/* HERO SECTION: Repositioned for AI & Data Solutions for E-commerce & SaaS */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* HERO SECTION: Exact Reference 1 & 2 Editorial Studio Layout */}
        {/* ========================================================================= */}
        <section id="hero" className="relative pt-4 sm:pt-6 pb-12 lg:pb-16">
          
          {/* Centerpiece Visual & Editorial Typography */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center">
            <InteractiveHeroPortrait onOpenResume={() => setIsResumeModalOpen(true)} />
          </div>

          {/* 3 Core Pillars + Supporting Automation Pill */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 sm:mt-6">
            <span className="bg-[#141414] text-white border border-[#2C2C2C] text-xs font-mono px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
              <BarChart3 size={13} className="text-[#FF4D00]" />
              Data Analytics & BI
            </span>
            <span className="text-neutral-600 font-mono">→</span>
            <span className="bg-[#141414] text-white border border-[#2C2C2C] text-xs font-mono px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
              <Brain size={13} className="text-[#FF4D00]" />
              Machine Learning & Prediction
            </span>
            <span className="text-neutral-600 font-mono">→</span>
            <span className="bg-[#141414] text-white border border-[#2C2C2C] text-xs font-mono px-3.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
              <Layers size={13} className="text-[#FF4D00]" />
              AI Applications & SaaS
            </span>
            <span className="text-neutral-600 font-mono">|</span>
            <span className="bg-[#141414] text-neutral-400 border border-[#242424] text-[11px] font-mono px-2.5 py-1.5 rounded-md">
              + Automation
            </span>
          </div>

          {/* Grounded & Honest Metric / Capability Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-10 sm:mt-16">
            
            <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 sm:p-6 rounded-xl text-center flex flex-col justify-center items-center transition-all">
              <span className="text-xl sm:text-3xl font-extrabold text-[#FF4D00] font-display tracking-[-0.02em]">
                06
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-300 font-medium tracking-wide mt-1">Featured Projects</span>
              <span className="text-[10px] text-neutral-500 font-mono mt-0.5">BI • ML • LLMs • SaaS</span>
            </div>

            <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 sm:p-6 rounded-xl text-center flex flex-col justify-center items-center transition-all">
              <span className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-[-0.02em]">
                Cross-Industry
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-300 font-medium tracking-wide mt-1">Client Solutions</span>
              <span className="text-[10px] text-[#FF4D00] font-mono mt-0.5">Fintech • Health • Ops • SaaS</span>
            </div>

            <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 sm:p-6 rounded-xl text-center flex flex-col justify-center items-center transition-all">
              <span className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-[-0.02em]">
                Python & SQL
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-300 font-medium tracking-wide mt-1">Core Tech Stack</span>
              <span className="text-[10px] text-[#FF4D00] font-mono mt-0.5">Scikit-learn • FastAPI • Next.js</span>
            </div>

            <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 sm:p-6 rounded-xl text-center flex flex-col justify-center items-center transition-all">
              <span className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-[-0.02em]">
                Bachelor's
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-400 font-medium tracking-wide mt-1">Computer Science</span>
              <span className="text-[10px] text-[#FF4D00] font-mono mt-0.5">Federal Urdu University</span>
            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* SERVICES / SOLUTIONS SECTION (4 Clean Cards) */}
        {/* ========================================================================= */}
        <ServicesSection />

        {/* ========================================================================= */}
        {/* FEATURED & ADDITIONAL PROJECTS SECTION */}
        {/* ========================================================================= */}
        <ProjectsSection 
          onOpenCaseStudy={handleOpenCaseStudy}
          onOpenInteractivePreview={handleOpenInteractivePreview}
        />

        {/* ========================================================================= */}
        {/* ENGINEERING PROCESS SECTION (Discover → Analyze → Build → Deploy) */}
        {/* ========================================================================= */}
        <ProcessSection />

        {/* ========================================================================= */}
        {/* FOCUSED TECH STACK SECTION */}
        {/* ========================================================================= */}
        <TechStackSection />

        {/* ========================================================================= */}
        {/* ABOUT SECTION */}
        {/* ========================================================================= */}
        <section id="about" className="py-16 lg:py-20 border-t border-[#1C1C1C] relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Code Terminal & Competency Matrix */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              
              {/* Terminal Frame */}
              <div className="relative rounded-xl overflow-hidden border border-[#222222] bg-[#121212] shadow-2xl">
                <TerminalTyping />
              </div>

              {/* Engineering Competency */}
              <div className="bg-[#121212] border border-[#222222] p-5 rounded-xl">
                <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-3 bg-[#FF4D00] rounded-full" />
                  Engineering Competencies
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#181818] p-2.5 rounded border border-[#242424] flex items-center justify-between">
                    <span className="text-neutral-300 font-medium">Data Analytics & ETL</span>
                    <span className="text-[#FF4D00] font-mono font-bold">Pandas/SQL</span>
                  </div>
                  <div className="bg-[#181818] p-2.5 rounded border border-[#242424] flex items-center justify-between">
                    <span className="text-neutral-300 font-medium">Predictive ML</span>
                    <span className="text-[#FF4D00] font-mono font-bold">Scikit/XGBoost</span>
                  </div>
                  <div className="bg-[#181818] p-2.5 rounded border border-[#242424] flex items-center justify-between">
                    <span className="text-neutral-300 font-medium">Full-Stack SaaS</span>
                    <span className="text-[#FF4D00] font-mono font-bold">FastAPI/Next.js</span>
                  </div>
                  <div className="bg-[#181818] p-2.5 rounded border border-[#242424] flex items-center justify-between">
                    <span className="text-neutral-300 font-medium">Workflow Automation</span>
                    <span className="text-[#FF4D00] font-mono font-bold">n8n / Agents</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Narrative Position Statement */}
            <div className="lg:col-span-6 flex flex-col items-start">
              
              <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-3">
                ABOUT MUHAMMAD ANAS KHAN
              </div>

              <h2 className="text-3xl sm:text-4xl font-semibold text-white font-display tracking-[-0.02em] leading-tight mb-6">
                Turning Raw Data Into <br className="hidden sm:block" />
                <span className="text-[#FF4D00]">Actionable AI Solutions</span>
              </h2>

              <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                <p>
                  I'm a versatile <strong className="text-white">AI/ML Developer, Data Analytics professional, and AI Applications Developer</strong> dedicated to helping businesses across different industries unlock the full value of their data.
                </p>
                <p>
                  Rather than treating AI as an abstract experiment, I engineer interactive data analytics dashboards, machine learning prediction models, and practical AI applications that solve concrete business challenges, eliminate manual bottlenecks, and empower better strategic decisions.
                </p>
                <p>
                  Whether you need executive business intelligence dashboards, predictive customer churn modeling, recommendation algorithms, or full-stack AI SaaS applications, every solution is <strong className="text-white">grounded in production-ready code, transparent architectures, and measurable results</strong>.
                </p>
              </div>

              {/* Education & credentials badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-[#121212] border border-[#222222] px-4 py-2.5 rounded-lg">
                  <div className="text-[10px] font-mono uppercase text-[#FF4D00] font-bold">EDUCATION</div>
                  <div className="text-xs font-semibold text-white">Bachelor's in Computer Science • Federal Urdu University</div>
                </div>
                <div className="bg-[#121212] border border-[#222222] px-4 py-2.5 rounded-lg">
                  <div className="text-[10px] font-mono uppercase text-[#FF4D00] font-bold">CORE FOCUS</div>
                  <div className="text-xs font-semibold text-white">AI/ML Development • Data Analytics • AI Web Applications</div>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ========================================================================= */}
        {/* CONTACT / CTA SECTION */}
        {/* ========================================================================= */}
        <section id="contact" className="py-16 lg:py-24 border-t border-[#1C1C1C] relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-3">
              START A CONVERSATION
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white font-display tracking-[-0.02em] mb-3">
              Let's Work Together
            </h2>
            <div className="w-12 h-0.5 bg-[#FF4D00] mx-auto mb-3" />
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Have a data analytics challenge, need an AI/ML model or want to build a custom SaaS tool? Let's discuss how we can solve it.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Direct Email */}
              <a 
                href="mailto:anaskhanz.dev@gmail.com"
                className="bg-[#121212] border border-[#222222] p-6 rounded-xl flex items-center gap-4 hover:border-[#FF4D00]/50 hover:bg-[#161616] transition-all group"
              >
                <div className="h-12 w-12 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00] shrink-0 group-hover:scale-105 transition-transform">
                  <Mail size={22} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-wider block">Direct Email</span>
                  <span className="text-white group-hover:text-[#FF4D00] text-sm font-semibold transition-colors mt-0.5 block truncate">
                    anaskhanz.dev@gmail.com
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-0.5 block">Send project requirements or inquiries</span>
                </div>
              </a>

              {/* WhatsApp & Phone */}
              <a 
                href="https://wa.me/923112813828" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#121212] border border-[#222222] p-6 rounded-xl flex items-center gap-4 hover:border-[#FF4D00]/50 hover:bg-[#161616] transition-all group"
              >
                <div className="h-12 w-12 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00] shrink-0 group-hover:scale-105 transition-transform">
                  <Phone size={22} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-wider block">WhatsApp & Phone</span>
                  <span className="text-white group-hover:text-[#FF4D00] text-sm font-semibold transition-colors mt-0.5 block">
                    +92 311 2813828
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-0.5 block">Quick chat & consultation calls</span>
                </div>
              </a>

              {/* LinkedIn Profile */}
              <a 
                href="https://www.linkedin.com/in/anas-khan1290/" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#121212] border border-[#222222] p-6 rounded-xl flex items-center gap-4 hover:border-[#FF4D00]/50 hover:bg-[#161616] transition-all group"
              >
                <div className="h-12 w-12 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00] shrink-0 group-hover:scale-105 transition-transform">
                  <Linkedin size={22} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-wider block">LinkedIn Profile</span>
                  <span className="text-white group-hover:text-[#FF4D00] text-sm font-semibold transition-colors mt-0.5 block truncate">
                    linkedin.com/in/anas-khan1290
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-0.5 block">Professional network & recommendations</span>
                </div>
              </a>

              {/* GitHub Code */}
              <a 
                href="https://github.com/AnasKhan2310" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#121212] border border-[#222222] p-6 rounded-xl flex items-center gap-4 hover:border-[#FF4D00]/50 hover:bg-[#161616] transition-all group"
              >
                <div className="h-12 w-12 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00] shrink-0 group-hover:scale-105 transition-transform">
                  <Github size={22} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-wider block">GitHub Code</span>
                  <span className="text-white group-hover:text-[#FF4D00] text-sm font-semibold transition-colors mt-0.5 block truncate">
                    github.com/AnasKhan2310
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-0.5 block">Open-source projects & model pipelines</span>
                </div>
              </a>

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
            <span className="font-display font-bold text-white text-base">Cod<span className="text-[#FF4D00]">≡</span>r</span>
            <span className="text-neutral-700">|</span>
            <span>Muhammad Anas Khan • AI & Data Solutions</span>
          </div>

          {/* Clean Expertise Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#242424] text-[11px] font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
            <span>Data Analytics · Machine Learning · AI Applications</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/anas-khan1290/" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-[#FF4D00] transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="https://github.com/AnasKhan2310" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-[#FF4D00] transition-colors">
              <Github size={16} />
            </a>
            <a href="mailto:anaskhanz.dev@gmail.com" className="text-neutral-400 hover:text-[#FF4D00] transition-colors">
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
            className="h-12 w-12 rounded-full bg-[#FF4D00] hover:bg-[#E04400] text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            title="Ask Anas's AI Assistant"
            aria-label="Open AI Assistant Chat"
          >
            <Bot size={22} className="text-white" />
            <span className="absolute top-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-[#0A0A0A] rounded-full" />
          </button>
        ) : (
          <div className="w-[calc(100vw-32px)] sm:w-[370px] max-w-[370px] h-[480px] max-h-[calc(100vh-90px)] bg-[#121212] border border-[#2A2A2A] rounded-xl shadow-xl flex flex-col overflow-hidden relative">
            
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
                <span className="text-[8.5px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Suggested Inquiries</span>
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
                placeholder="Ask about AI & Data Solutions..." 
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

      {/* Analytics & Modals */}
      <Analytics />
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
      <CaseStudyModal 
        project={selectedCaseStudy} 
        isOpen={isCaseStudyModalOpen} 
        onClose={() => setIsCaseStudyModalOpen(false)} 
        onOpenInteractivePreview={handleOpenInteractivePreview}
      />
    </div>
  );
}
