import { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { motion } from 'motion/react';
import SpotifyDashboard from './components/SpotifyDashboard';
import { ResumeModal } from './components/ResumeModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TechStackSection } from './components/TechStackSection';
import NetworkBackground from './components/NetworkBackground';
import TerminalTyping from './components/TerminalTyping';
import picImage from './pic.png';
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
  MapPin, 
  ArrowRight, 
  Download,
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
        text: "Hello! I'm Anas's AI Assistant. Muhammad Anas Khan specializes in AI & Data Solutions for E-commerce & SaaS, focusing on Data Analytics, AI/ML, and SaaS Development. How can I help you today?"
      }]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Modals state
  const [isSpotifyDashboardOpen, setIsSpotifyDashboardOpen] = useState(false);
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
  const handleOpenInteractivePreview = (type: 'spotify') => {
    if (type === 'spotify') {
      setIsSpotifyDashboardOpen(true);
    }
  };

  // System instruction for Gemini chatbot
  const systemInstruction = `You are "Anas's AI Assistant", representing Muhammad Anas Khan, an AI & Data Science developer.

Primary Positioning:
- Muhammad Anas Khan builds AI & Data Solutions for E-commerce & SaaS.
- Three Core Pillars:
  1. Data Analytics (Business dashboards, KPI reporting, analytics pipelines)
  2. AI / Machine Learning (Predictive models, document intelligence, classification & computer vision, LLM applications)
  3. SaaS Development (AI SaaS MVPs, internal business tools, admin dashboards, full-stack software)
- Supporting Capability: Automation (n8n workflows, AI agents, API integrations)
- Target Clients: E-commerce & Shopify businesses, Early-stage SaaS companies, Marketing & Digital agencies.

Contact & Profile:
- Name: Muhammad Anas Khan
- Location: Karachi, Pakistan
- Degree: BS in Computer Science from Federal Urdu University, Karachi
- Email: anaskhanz.dev@gmail.com
- Phone / WhatsApp: +92 311 2813828
- GitHub: https://github.com/AnasKhan2310
- LinkedIn: https://www.linkedin.com/in/anas-khan1290/

Featured Projects:
1. ZestFit / AI Fitness SaaS (Live SaaS: https://zestfitmanagement.vercel.app/) - Next.js, TypeScript, FastAPI, PostgreSQL, Tailwind, Stripe.
2. Spotify Streaming Data Analytics (Interactive Data Science App) - Python, Pandas, React, Recharts.
3. MediScan AI (Healthcare Document Intelligence) - OCR, NLP, FastAPI, React.

Style: Be professional, concise, articulate, and honest. Avoid marketing hype or fake metrics. Highlight real software architecture and problem-solving.`;

  const suggestions = [
    "Tell me about your E-commerce & SaaS solutions",
    "How does the ZestFit AI SaaS platform work?",
    "What tech stack do you use for SaaS MVPs?"
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
      {/* HEADER / NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className="relative z-40 w-full max-w-7xl mx-auto pt-3 sm:pt-6 px-3 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-2.5 sm:py-3 px-3 sm:px-6 bg-[#111111] border border-[#222222] rounded-lg shadow-sm">
          
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2 group cursor-pointer">
            <div className="text-lg sm:text-2xl font-black font-syne text-white tracking-tight flex items-center">
              <span>Cod</span>
              <span className="text-[#FF4D00] font-black text-xl sm:text-3xl leading-none inline-block mx-0.5">≡</span>
              <span>r</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 pl-2 ml-2 border-l border-[#282828] text-[11px] font-mono text-neutral-400">
              <span className="text-white font-semibold">Muhammad Anas Khan</span>
            </div>
          </a>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
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
                onClick={() => setActiveNav(item.id as any)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                  activeNav === item.id 
                    ? 'bg-[#FF4D00] text-white' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Action Button - Let's Talk */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-md transition-colors cursor-pointer"
            >
              Let's Talk
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
        {/* HERO SECTION: Repositioned for AI & Data Solutions for E-commerce & SaaS */}
        {/* ========================================================================= */}
        <section id="hero" className="relative pt-8 sm:pt-14 pb-12 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-8 flex flex-col items-start text-left z-20">
              
              {/* Identity & Availability Pill */}
              <div className="inline-flex items-center gap-2 bg-[#161616] border border-[#2A2A2A] text-neutral-300 text-[11px] font-mono px-3 py-1 rounded-full mb-4">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-white">Muhammad Anas Khan</span>
                <span className="text-neutral-500">•</span>
                <span className="text-[#FF4D00]">Available for Projects</span>
              </div>

              {/* Exact Repositioning Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white font-syne tracking-tight leading-[1.15] mb-4">
                AI & Data Solutions for <br className="hidden sm:inline" />
                <span className="text-[#FF4D00]">E-commerce & SaaS</span>
              </h1>

              {/* Exact Repositioning Subheadline */}
              <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-normal mb-6 max-w-2xl leading-relaxed">
                I build analytics dashboards, AI/ML solutions and SaaS products that help businesses automate repetitive work, understand their data and make better decisions.
              </p>

              {/* 3 Core Pillars + Supporting Automation Pill */}
              <div className="flex flex-wrap items-center gap-2 mb-7">
                <span className="bg-[#141414] text-white border border-[#2C2C2C] text-xs font-mono px-3 py-1 rounded-md flex items-center gap-1.5">
                  <BarChart3 size={13} className="text-[#FF4D00]" />
                  Data Analytics
                </span>
                <span className="text-neutral-600 font-mono">→</span>
                <span className="bg-[#141414] text-white border border-[#2C2C2C] text-xs font-mono px-3 py-1 rounded-md flex items-center gap-1.5">
                  <Brain size={13} className="text-[#FF4D00]" />
                  AI / Machine Learning
                </span>
                <span className="text-neutral-600 font-mono">→</span>
                <span className="bg-[#141414] text-white border border-[#2C2C2C] text-xs font-mono px-3 py-1 rounded-md flex items-center gap-1.5">
                  <Layers size={13} className="text-[#FF4D00]" />
                  SaaS Development
                </span>
                <span className="text-neutral-600 font-mono">|</span>
                <span className="bg-[#141414] text-neutral-400 border border-[#242424] text-[11px] font-mono px-2.5 py-1 rounded-md">
                  + Automation
                </span>
              </div>

              {/* Target Audience Bar */}
              <div className="bg-[#121212] border border-[#222222] px-3.5 py-2 rounded-lg mb-8 text-xs text-neutral-400 font-mono flex flex-wrap items-center gap-2">
                <span className="text-[#FF4D00] font-bold uppercase text-[10px]">Target Clients:</span>
                <span>Shopify & E-commerce Brands</span>
                <span className="text-neutral-600">•</span>
                <span>Early-Stage SaaS</span>
                <span className="text-neutral-600">•</span>
                <span>Digital Agencies</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                <a
                  href="#projects"
                  className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 sm:px-8 py-3 rounded-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>View Projects</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href="#contact"
                  className="bg-transparent hover:bg-white/5 text-white border border-[#333333] hover:border-neutral-400 text-xs sm:text-sm font-semibold uppercase tracking-wider px-5 sm:px-7 py-3 rounded-md transition-all cursor-pointer"
                >
                  Let's Work Together
                </a>

                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(true)}
                  className="bg-[#161616] hover:bg-[#202020] text-neutral-300 hover:text-white border border-[#282828] text-xs sm:text-sm font-mono font-medium px-4 py-3 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={14} />
                  <span>CV</span>
                </button>
              </div>

            </div>

            {/* Right Hero Visual - Compact portrait with polygonal overlay */}
            <div className="lg:col-span-4 relative flex justify-center lg:justify-end items-center z-10 mt-4 lg:mt-0">
              
              <div className="relative w-48 sm:w-56 md:w-64 lg:w-72 aspect-[4/5] flex items-center justify-center group max-w-full">

                {/* Portrait Photo with seamless bottom fade */}
                <div className="relative w-full h-full flex items-end justify-center overflow-visible">
                  <img 
                    src={picImage} 
                    alt="Muhammad Anas Khan - AI & Data Solutions Developer" 
                    className="w-full h-full object-cover object-top relative z-10 filter contrast-105 transition-all duration-300 [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
                  />
                </div>

                {/* SVG Polygonal Wireframe Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 stroke-[#FF4D00]/60" viewBox="0 0 300 375" fill="none">
                  <polygon points="150,20 270,120 30,120" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  <polygon points="150,60 250,140 50,140" strokeWidth="1.2" opacity="0.8" />
                  <line x1="150" y1="20" x2="150" y2="350" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.3" />
                  <polygon points="150,160 280,220 150,280 20,220" strokeWidth="1" opacity="0.7" />
                  <polygon points="150,180 260,230 150,340 40,230" strokeWidth="1.2" opacity="0.85" />
                  <circle cx="150" cy="20" r="3" fill="#FF4D00" />
                  <circle cx="280" cy="220" r="3" fill="#FF4D00" />
                  <circle cx="20" cy="220" r="3" fill="#FF4D00" />
                  <circle cx="150" cy="340" r="3" fill="#FF4D00" />
                </svg>

              </div>

            </div>

          </div>

          {/* Grounded & Honest Metric / Capability Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-10 sm:mt-16">
            
            <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 sm:p-6 rounded-xl text-center flex flex-col justify-center items-center transition-all">
              <span className="text-xl sm:text-3xl font-extrabold text-white font-syne tracking-tight">
                03
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-400 font-medium tracking-wide mt-1">Core Pillars</span>
              <span className="text-[10px] text-[#FF4D00] font-mono mt-0.5">Data • AI • SaaS</span>
            </div>

            <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 sm:p-6 rounded-xl text-center flex flex-col justify-center items-center transition-all">
              <span className="text-xl sm:text-3xl font-extrabold text-white font-syne tracking-tight">
                Full-Stack
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-400 font-medium tracking-wide mt-1">Architecture</span>
              <span className="text-[10px] text-[#FF4D00] font-mono mt-0.5">FastAPI & Next.js</span>
            </div>

            <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 sm:p-6 rounded-xl text-center flex flex-col justify-center items-center transition-all">
              <span className="text-xl sm:text-3xl font-extrabold text-[#FF4D00] font-syne tracking-tight">
                End-to-End
              </span>
              <span className="text-[11px] sm:text-xs text-neutral-300 font-medium tracking-wide mt-1">Problem Solver</span>
              <span className="text-[10px] text-neutral-500 font-mono mt-0.5">Discover → Deploy</span>
            </div>

            <div className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 sm:p-6 rounded-xl text-center flex flex-col justify-center items-center transition-all">
              <span className="text-xl sm:text-3xl font-extrabold text-white font-syne tracking-tight">
                BS CS
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

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-syne tracking-tight leading-tight mb-6">
                Bridging Data Science, <br className="hidden sm:block" />
                <span className="text-[#FF4D00]">AI Models & Production SaaS</span>
              </h2>

              <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
                <p>
                  I'm an AI & Data Science developer focused on building practical business solutions using data analytics, machine learning, and SaaS development.
                </p>
                <p>
                  Rather than treating AI as an isolated experiment, I build analytics dashboards, AI-powered applications, automation workflows, and custom SaaS tools that help businesses reduce manual work, understand their data, and make better decisions.
                </p>
                <p>
                  My primary focus is working with <strong className="text-white">e-commerce and SaaS businesses</strong> that want to turn raw transactional records into clear operational foresight.
                </p>
              </div>

              {/* Education & credentials badge */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-[#121212] border border-[#222222] px-4 py-2.5 rounded-lg">
                  <div className="text-[10px] font-mono uppercase text-[#FF4D00] font-bold">EDUCATION</div>
                  <div className="text-xs font-semibold text-white">BS Computer Science • Federal Urdu University, Karachi</div>
                </div>
                <div className="bg-[#121212] border border-[#222222] px-4 py-2.5 rounded-lg">
                  <div className="text-[10px] font-mono uppercase text-[#FF4D00] font-bold">CORE FOCUS</div>
                  <div className="text-xs font-semibold text-white">AI & Data Solutions for E-commerce & SaaS</div>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-syne tracking-tight mb-3">
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

              {/* Location */}
              <div className="bg-[#121212] border border-[#222222] p-6 rounded-xl flex items-center gap-4 hover:border-[#FF4D00]/50 transition-all">
                <div className="h-12 w-12 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00] shrink-0">
                  <MapPin size={22} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-neutral-400 font-mono font-bold uppercase tracking-wider block">Location</span>
                  <span className="text-white text-sm font-semibold mt-0.5 block">
                    Karachi, Pakistan
                  </span>
                  <span className="text-[11px] text-neutral-500 mt-0.5 block">Available for Remote Worldwide contracts</span>
                </div>
              </div>

            </div>

            {/* Quick action buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/923112813828"
                target="_blank"
                rel="noreferrer"
                className="bg-[#FF4D00] hover:bg-[#E04400] text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Phone size={15} />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="mailto:anaskhanz.dev@gmail.com"
                className="bg-[#1A1A1A] hover:bg-[#222222] text-neutral-200 hover:text-white border border-[#333333] font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Mail size={15} />
                <span>Send Direct Email</span>
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
            <span className="font-syne font-extrabold text-white text-base">Cod<span className="text-[#FF4D00]">≡</span>r</span>
            <span className="text-neutral-700">|</span>
            <span>Muhammad Anas Khan • AI & Data Solutions</span>
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
      <SpotifyDashboard isOpen={isSpotifyDashboardOpen} onClose={() => setIsSpotifyDashboardOpen(false)} />
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
