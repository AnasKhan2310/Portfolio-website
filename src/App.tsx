import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
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
  
  // Floating Chatbot controls (collapsed by default to preserve landing page design)
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
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'MACHINE LEARNING' | 'DEEP LEARNING' | 'DATA ANALYSIS' | 'AI & CHATBOTS'>('ALL');

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
  const systemInstruction = `You are "Anas's AI Assistant", representing Muhammad Anas Khan. Anas is an exceptional "AI & Data Science Engineer".
Speak elegantly, professionally, and helpfully in Urdu or English as requested.
About Anas:
- Background: AI & Data Science Engineer who builds machine learning pipelines, deep learning models, advanced RAG systems, and AI agentic automation.
- Education: BS Computer Science from Federal Urdu University, Karachi, with focus on Artificial Intelligence & Data Science.
- Key skills: Python, Machine Learning (TensorFlow, Keras, PyTorch, Scikit-learn), Data analysis (Pandas, Numpy, Matplotlib, Seaborn), LLMs & Agents (Gemini API, LangChain, NLP, Grounding engines).
- Notable Projects:
  1. Mediscan AI (healthcare screening model)
  2. AI Invoice Pro (generative agent tool)
  3. AI Image Classifier Pro (computer vision pipeline)
  4. Heart Disease Predictor (extremely high confidence statistical model)
  5. Spotify Data Analysis (business intelligence dashboard)
- Contact details: Email 'anaskhanz1980@gmail.com', Location 'Karachi, Pakistan', Phone '+92 311 2413824'.
Keep responses concise, impressive, and tailored to recruitment or partnerships.`;

  // Quick prompt suggestions
  const suggestions = [
    "Tell me about his ML projects",
    "What are his main technical skills?",
    "How can I contact Anas?"
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
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch response");
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        parts: [{ text: data.text }]
      }]);
    } catch (error: any) {
      console.error("Chatbot query error:", error);
      if (error.message === "GEMINI_API_KEY_MISSING" || error.message.includes("401")) {
        setChatError("API Key is missing. Please configure GEMINI_API_KEY or MY_AI_KEY in AI Studio to try out the AI assistant.");
      } else {
        setChatError(`Error: ${error.message || "Something went wrong. Please check your connection."}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Skill proficiency metrics
  const skillsData = [
    { name: "AI / LLM Dev", level: 95 },
    { name: "Automation (n8n)", level: 90 },
    { name: "Data Visualization", level: 88 },
    { name: "Machine Learning", level: 85 },
    { name: "Web App Dev", level: 80 }
  ];

  // Projects list matching Screenshot 3
  const projectsData = [
    {
      id: "mediscan",
      title: "MEDISCAN AI",
      category: "MACHINE LEARNING" as const,
      tag: "MACHINE LEARNING",
      icon: (
        <div className="h-12 w-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 text-2xl font-semibold shadow-sm shrink-0">
          💉
        </div>
      ),
      description: "A high-precision healthcare model designed to save lives by identifying early-stage heart disease risks through advanced statistical patterns.",
      githubUrl: "https://github.com/AnasKhan2310",
      liveDemoUrl: "https://mediscan-ai-29938184252.europe-west1.run.app/",
      isHighlighted: false
    },
    {
      id: "invoice",
      title: "AI INVOICE PRO",
      category: "AI & CHATBOTS" as const,
      tag: "AI & CHATBOTS",
      icon: (
        <div className="h-12 w-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-500 text-2xl font-semibold shadow-sm shrink-0">
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
        <div className="h-12 w-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 text-2xl font-semibold shadow-sm shrink-0">
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
        <div className="h-12 w-12 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 text-2xl font-semibold shadow-sm animate-pulse shrink-0">
          ❤️
        </div>
      ),
      description: "A supervised Machine Learning project that analyzes health metrics to predict cardiovascular risks with high confidence.",
      githubUrl: "https://github.com/AnasKhan2310",
      liveDemoUrl: "https://heartdiseasepredictorai.netlify.app/",
      isHighlighted: true // Specialized Yellow border
    },
    {
      id: "spotify",
      title: "SPOTIFY DATA ANALYSIS",
      category: "DATA ANALYSIS" as const,
      tag: "DATA ANALYSIS",
      icon: (
        <div className="h-12 w-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-500 text-2xl font-semibold shadow-sm shrink-0">
          🎵
        </div>
      ),
      description: "Decoding consumer behavior through data. I analyze massive streaming datasets to uncover trends that drive strategic content and marketing decisions.",
      githubUrl: "https://github.com/AnasKhan2310/Spotify-Data-Analysis",
      liveDemoUrl: "#",
      isHighlighted: false
    },
    {
      id: "support-bot",
      title: "INTELLIGENT CUSTOMER SUPPORT BOT",
      category: "AI & CHATBOTS" as const,
      tag: "AI & CHATBOTS",
      icon: (
        <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 text-2xl font-semibold shadow-sm shrink-0">
          🤖
        </div>
      ),
      description: "Revolutionizing customer experience with LLM-based AI. This intelligent bot provides instant, human-like support while drastically lowering operational costs.",
      githubUrl: "https://github.com/AnasKhan2310/Intelligent-Customer-Support-Bot",
      liveDemoUrl: "#",
      isHighlighted: false
    }
  ];

  // Filtering Logic
  const filteredProjects = activeFilter === 'ALL' 
    ? projectsData 
    : projectsData.filter(proj => proj.category === activeFilter);

  return (
    <div id="app-root" className="min-h-screen flex flex-col bg-white selection:bg-amber-100 selection:text-amber-900 scroll-smooth">
      
      {/* HEADER / NAVIGATION BAR */}
      <nav id="navbar" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 px-6 py-4.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Logo Name */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center font-bold text-white text-lg tracking-wider shadow-md shadow-amber-500/10">
              AK
            </div>
            <div className="font-sans">
              <span className="font-extrabold text-stone-900 text-lg tracking-tight block leading-tight">Muhammad Anas Khan</span>
              <span className="text-[10px] text-amber-500 font-mono font-bold tracking-widest uppercase block mt-0.5">AI & DATA SCIENCE ENGINEER</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-[11px] font-extrabold uppercase tracking-widest text-stone-600 hover:text-amber-500 transition-colors">Home</a>
            <a href="#about" className="text-[11px] font-extrabold uppercase tracking-widest text-stone-600 hover:text-amber-500 transition-colors">About Me</a>
            <a href="#resume" className="text-[11px] font-extrabold uppercase tracking-widest text-stone-600 hover:text-amber-500 transition-colors">Resume</a>
            <a href="#projects" className="text-[11px] font-extrabold uppercase tracking-widest text-stone-600 hover:text-amber-500 transition-colors">Projects</a>
            <a href="#contact" className="text-[11px] font-extrabold uppercase tracking-widest text-stone-600 hover:text-amber-500 transition-colors">Contact</a>
          </div>

          {/* Mobile Navigation Interface Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-stone-800 hover:text-amber-500 p-2.5"
            >
              <Menu size={24} />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-stone-100 mt-4 flex flex-col gap-3 font-sans max-w-6xl mx-auto px-4">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-stone-600 hover:text-amber-500 py-1 text-xs font-bold uppercase tracking-widest">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-stone-600 hover:text-amber-500 py-1 text-xs font-bold uppercase tracking-widest">About Me</a>
            <a href="#resume" onClick={() => setMobileMenuOpen(false)} className="text-stone-600 hover:text-amber-500 py-1 text-xs font-bold uppercase tracking-widest">Resume</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-stone-600 hover:text-amber-500 py-1 text-xs font-bold uppercase tracking-widest">Projects</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-stone-600 hover:text-amber-500 py-1 text-xs font-bold uppercase tracking-widest">Contact</a>
          </div>
        )}
      </nav>

      <main className="flex-1 w-full flex flex-col">
        {/* HERO SECTION - Screenshot 1 Match  */}
        {/* ==================================== */}
        <section id="hero" className="relative min-h-[80vh] flex items-center py-16 px-6 lg:px-12 max-w-6xl w-full mx-auto border-b border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
            
            {/* Left Texts Description */}
            <div className="lg:col-span-8 flex flex-col items-start text-left lg:pr-6">
              
              {/* Top Banner Tag */}
              <div className="inline-flex items-center bg-amber-50 text-amber-500 border border-amber-300 px-5 py-2 rounded-full text-xs sm:text-sm font-extrabold tracking-[0.15em] uppercase mb-6 font-mono">
                WELCOME TO MY PORTFOLIO
              </div>

              {/* Title Section Name in a single elegant line */}
              <div className="flex flex-col gap-1 mb-4 select-all w-full max-w-full">
                <span className="text-stone-950 font-black text-2xl sm:text-3xl md:text-4xl tracking-normal leading-none font-sans">I'M</span>
                <h1 className="text-[1.65rem] xs:text-3xl sm:text-4.5xl md:text-5.2xl lg:text-[2.5rem] xl:text-[3.6rem] font-black text-amber-500 leading-none tracking-tight mt-1 whitespace-nowrap">
                  MUHAMMAD ANAS KHAN
                </h1>
              </div>

              {/* Thin Short Indicator Underline Line */}
              <div className="w-16 h-1.5 bg-amber-500 mb-6 rounded-full"></div>

              {/* Tagline Role */}
              <h3 className="text-stone-950 font-black text-xl sm:text-2xl md:text-3xl tracking-tight mb-6 font-sans uppercase whitespace-pre-line">
                I BUILD AI THAT{"\n"}ACTUALLY WORKS.
              </h3>

              {/* Narrative Content */}
              <div className="space-y-4 mb-8 max-w-xl text-stone-650 text-sm md:text-base leading-relaxed font-sans">
                <p>
                  Hey, I'm Anas Khan, an AI Solutions Developer. I specialize in building intelligent automation systems, AI chatbots, and data-driven applications that help businesses save time and grow faster.
                </p>
                <p>
                  While running an active freelance practice, I've shipped everything from healthcare ML models and n8n automation workflows to AI-powered web apps with real users. I don't just prototype; I deliver production-ready solutions.
                </p>
              </div>

              {/* Core Specialties badges */}
              <div className="flex flex-wrap gap-2 mb-8 max-w-xl">
                {[
                  "AI Chatbots",
                  "n8n Automation",
                  "Machine Learning",
                  "Data Visualization",
                  "Power BI",
                  "AI Agents",
                  "AI Workflows",
                  "Python / TensorFlow",
                  "LLM Integration"
                ].map((spec, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="bg-stone-50 border border-stone-200 text-stone-850 text-xs font-extrabold font-mono tracking-wider uppercase px-4 py-2 rounded-lg hover:border-amber-500 hover:text-amber-600 transition-all duration-300 cursor-default"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Action Trigger Pills */}
              <div className="flex flex-wrap gap-4 items-center">
                <a 
                  href="#about" 
                  className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-sans font-extrabold text-xs uppercase tracking-wider px-8 py-4.5 rounded-full shadow-md shadow-amber-500/15 hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>More About Me</span>
                  <ChevronRight size={15} className="group-hover:translate-x-1 duration-300" />
                </a>
              </div>

            </div>

            {/* Right Photo Avatar Frame with exact orange border & elevation shadow */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end items-center relative w-full h-full max-w-[280px] lg:ml-auto lg:mr-0 mx-auto">
              
              {/* Outer Glow Ring Grid */}
              <div className="absolute inset-0 bg-radial from-amber-500/5 to-transparent blur-2xl rounded-full scale-110 pointer-events-none"></div>
              
              {/* Portrait container matching Screenshot 1 */}
              <div className="relative w-full aspect-[4/5] bg-stone-50 border border-amber-500 rounded-[2rem] p-1.5 shadow-2.5xl shadow-stone-800/10 hover:shadow-amber-500/10 transition-transform duration-500 hover:-translate-y-1 overflow-hidden">
                <img 
                  src={picImage} 
                  alt="Muhammad Anas Khan"
                  className="w-full h-full object-cover object-top rounded-[1.75rem] block"
                />
              </div>

            </div>

          </div>
        </section>


        {/* ==================================== */}
        {/* ABOUT ME SECTION - Screenshot 2 Match */}
        {/* ==================================== */}
        <section id="about" className="scroll-mt-24 py-16 px-6 lg:px-12 max-w-6xl w-full mx-auto border-b border-stone-100">
          
          {/* Subheading: WHAT I DO? */}
          <div className="flex items-center gap-2 mb-8">
            <span className="w-1.5 h-6 bg-amber-500 block rounded-full"></span>
            <h3 className="font-extrabold text-stone-900 text-xs font-mono uppercase tracking-widest">
              WHAT I DO?
            </h3>
          </div>

          {/* Grids representing 3 functional pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-white border border-stone-100 p-8 rounded-3xl shadow-xs hover:border-amber-400 hover:shadow-md transition-all duration-300 flex flex-col gap-4">
              <div className="h-10 w-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
                <Brain size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-stone-900 text-xs font-mono tracking-wider uppercase mb-2">
                  MACHINE & DEEP LEARNING
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Developing end-to-end predictive models, neural networks, CNNs, and LSTMs using TensorFlow, Keras, and Scikit-learn for advanced pattern recognition.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-stone-100 p-8 rounded-3xl shadow-xs hover:border-amber-400 hover:shadow-md transition-all duration-300 flex flex-col gap-4">
              <div className="h-10 w-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
                <TrendingUp size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-stone-900 text-xs font-mono tracking-wider uppercase mb-2">
                  DATA ANALYSIS
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Performing EDA, visualization, and extracting insights with Pandas, Matplotlib, and Seaborn.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-stone-100 p-8 rounded-3xl shadow-xs hover:border-amber-400 hover:shadow-md transition-all duration-300 flex flex-col gap-4">
              <div className="h-10 w-10 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
                <Cpu size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-stone-900 text-xs font-mono tracking-wider uppercase mb-2">
                  AI AUTOMATION & CHATBOTS
                </h4>
                <p className="text-stone-600 text-xs leading-relaxed">
                  Automating workflows and designing intelligent conversational agents using NLP, LLMs, and frameworks like LangChain.
                </p>
              </div>
            </div>

          </div>

          {/* Solid Black Stat Cards - Screenshot 2 Match */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            
            {/* Stat Item 1 */}
            <div className="bg-[#171719] border border-stone-850 p-8 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg transition-all duration-300 hover:border-amber-500 hover:-translate-y-1">
              <span className="text-4xl sm:text-5xl font-black text-amber-500 font-sans tracking-tight">10+</span>
              <span className="text-[10px] text-[#A1A1AA] font-bold font-mono tracking-widest uppercase mt-3">PROJECTS SHIPPED</span>
            </div>
 
            {/* Stat Item 2 */}
            <div className="bg-[#171719] border border-stone-855 p-8 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg transition-all duration-300 hover:border-amber-500 hover:-translate-y-1">
              <span className="text-4xl sm:text-5xl font-black text-amber-500 font-sans tracking-tight">5+</span>
              <span className="text-[10px] text-[#A1A1AA] font-bold font-mono tracking-widest uppercase mt-3">AI TOOLS MASTERED</span>
            </div>
 
            {/* Stat Item 3 */}
            <div className="bg-[#171719] border border-stone-860 p-8 rounded-2xl text-center flex flex-col justify-center items-center shadow-lg transition-all duration-300 hover:border-amber-500 hover:-translate-y-1">
              <span className="text-4xl sm:text-5xl font-black text-amber-500 font-sans tracking-tight">100%</span>
              <span className="text-[10px] text-[#A1A1AA] font-bold font-mono tracking-widest uppercase mt-3">CLIENT FOCUSED</span>
            </div>
 
          </div>

        </section>


        {/* ==================================== */}
        {/* RESUME SECTION - Screenshot 2 Bottom Match */}
        {/* ==================================== */}
        <section id="resume" className="scroll-mt-24 py-16 px-6 lg:px-12 max-w-6xl w-full mx-auto border-b border-stone-100 bg-[#FAF9F6]">
          
          {/* Resume Main Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 uppercase mb-12">
            RESUME
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* EDUCATION COLUMN (Left) */}
            <div className="lg:col-span-5 flex flex-col">
              
              {/* Category Underline Header */}
              <div className="flex items-center gap-2 mb-8">
                <span className="w-1.5 h-6 bg-amber-500 block rounded-full"></span>
                <h3 className="font-extrabold text-stone-950 text-base font-mono uppercase tracking-wider">
                  EDUCATION
                </h3>
              </div>

              {/* Study Timeline Items with nodes matching design */}
              <div className="relative border-l-2 border-stone-300 pl-6 space-y-10 ml-3 py-2">
                
                {/* Degree 1 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-amber-500 bg-white inline-block"></span>
                  <div className="text-xs text-amber-600 font-black font-mono tracking-wider uppercase">
                    FEDERAL URDU UNIVERSITY, KARACHI
                  </div>
                  <h4 className="text-base font-bold text-stone-950 mt-1 uppercase">
                    BS COMPUTER SCIENCE
                  </h4>
                  <p className="text-sm text-stone-800 font-semibold mt-2 leading-relaxed">
                    Specializing in Artificial Intelligence & Data Science. Gaining deep knowledge in algorithms, data structures, and advanced computing.
                  </p>
                </div>

                {/* Spec 2 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-amber-500 bg-white inline-block"></span>
                  <div className="text-xs text-amber-600 font-black font-mono tracking-wider uppercase">
                    SPECIALIZATION
                  </div>
                  <h4 className="text-base font-bold text-stone-950 mt-1 uppercase">
                    DEEP LEARNING & NEURAL NETWORKS
                  </h4>
                  <p className="text-sm text-stone-800 font-semibold mt-2 leading-relaxed">
                    Hands-on experience with TensorFlow, Keras, CNNs, LSTMs, and Transfer Learning for computer vision and sequence modeling.
                  </p>
                </div>

                {/* Spec 3 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-amber-500 bg-white inline-block"></span>
                  <div className="text-xs text-amber-600 font-black font-mono tracking-wider uppercase">
                    SPECIALIZATION
                  </div>
                  <h4 className="text-base font-bold text-stone-950 mt-1 uppercase">
                    MACHINE LEARNING FUNDAMENTALS
                  </h4>
                  <p className="text-sm text-stone-800 font-semibold mt-2 leading-relaxed">
                    Mastering Scikit-learn for Regression, Classification, and Clustering. Understanding the mathematical foundations of AI.
                  </p>
                </div>

                {/* Spec 4 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-amber-500 bg-white inline-block"></span>
                  <div className="text-xs text-amber-600 font-black font-mono tracking-wider uppercase">
                    MORE SKILLS
                  </div>
                  <h4 className="text-base font-bold text-stone-950 mt-1 uppercase">
                    PYTHON FOR DATA SCIENCE
                  </h4>
                  <p className="text-sm text-stone-800 font-semibold mt-2 leading-relaxed">
                    Expertise in Pandas, NumPy, Matplotlib, and Seaborn for data manipulation and visualization.
                  </p>
                </div>

              </div>
            </div>

            {/* MY SKILLS PROGRESS BARS (Right) */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Category Underline Header */}
              <div className="flex items-center gap-2 mb-8">
                <span className="w-1.5 h-6 bg-amber-500 block rounded-full"></span>
                <h3 className="font-extrabold text-stone-950 text-base font-mono uppercase tracking-wider">
                  SKILL PROFICIENCY
                </h3>
              </div>

              {/* Skills Progress layout holding the 5 flat values */}
              <div className="bg-white border border-stone-200 p-8 rounded-3xl shadow-md space-y-6">
                {skillsData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-black text-stone-950 text-sm font-mono">{skill.name}</span>
                      <span className="font-black text-amber-600 text-sm font-mono">{skill.level}%</span>
                    </div>
                    {/* Sleek Horizontal Range bar in amber matching beautiful telemetry design */}
                    <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-amber-500 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>


        {/* ==================================== */}
        {/* PROJECTS SECTION - Screenshot 3 Match */}
        {/* ==================================== */}
        <section id="projects" className="scroll-mt-24 py-16 px-6 lg:px-12 max-w-6xl w-full mx-auto border-b border-stone-100">
          
          {/* Projects Main Header */}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 uppercase mb-8">
            PROJECTS
          </h2>

          {/* Interactive filter pills container */}
          <div className="flex flex-wrap gap-2 mb-10 select-none">
            {(['ALL', 'MACHINE LEARNING', 'DEEP LEARNING', 'DATA ANALYSIS', 'AI & CHATBOTS'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-[9px] sm:text-[10px] font-bold tracking-wider px-4 py-2.5 rounded-md font-mono uppercase transition-all duration-300 ${
                  activeFilter === filter 
                    ? 'bg-amber-505 bg-amber-500 text-white shadow-xs' 
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid list of structural project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className={`bg-white rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between min-h-[280px] p-6.5 ${
                  project.isHighlighted 
                    ? 'border-2 border-amber-500 shadow-lg shadow-amber-500/5' // Specialized Highlight for HEART DISEASE METRIC PREDICTOR
                    : 'border border-stone-100 hover:border-amber-400 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  
                  {/* Top line with Icon and category name */}
                  <div className="flex justify-between items-start mb-5.5">
                    {project.icon}
                    <span className="bg-stone-100 text-stone-800 border border-stone-300 text-[10px] font-black font-mono tracking-wider uppercase px-2.5 py-1 rounded-md">
                      {project.tag}
                    </span>
                  </div>

                  {/* Title & paragraph */}
                  <h4 className="text-lg md:text-xl font-black text-stone-950 mb-2.5 leading-tight">
                    {project.title}
                  </h4>
                  <p className="text-stone-850 text-[13px] md:text-sm font-semibold leading-relaxed">
                    {project.description}
                  </p>

                </div>

                {/* Lower Action buttons conforming to Screenshot 3 */}
                <div className="mt-6 pt-4.5 border-t border-stone-100 flex items-center justify-end">
                  {project.liveDemoUrl && (
                    <a 
                      href={project.liveDemoUrl}
                      className="inline-flex items-center gap-1.5 text-xs uppercase font-mono font-black text-amber-600 hover:text-amber-700 transition-colors"
                    >
                      <span>See Demo</span>
                      <ChevronRight size={14} />
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* GitHub Bottom CTA rounded button */}
          <div className="flex justify-center items-center mt-12">
            <a 
              href="https://github.com/AnasKhan2310"
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-sans font-bold text-xs uppercase tracking-wider px-8 py-4.5 rounded-full shadow-md shadow-amber-500/15 hover:shadow-lg transition-all duration-300"
            >
              <span>View All on GitHub</span>
              <Github size={15} />
            </a>
          </div>

        </section>


        {/* ==================================== */}
        {/* CONTACT SECTION - Screenshot 3 Bottom */}
        {/* ==================================== */}
        <section id="contact" className="scroll-mt-24 py-16 px-6 lg:px-12 max-w-6xl w-full mx-auto border-b border-stone-100 bg-[#FAF9F6] rounded-t-[2.5rem]">
          
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 uppercase mb-4">
            CONTACT
          </h2>

          {/* GET IN TOUCH tag bar header */}
          <div className="flex items-center gap-2 mb-10">
            <span className="w-1.5 h-6 bg-amber-500 block rounded-full"></span>
            <h3 className="font-extrabold text-stone-900 text-xs font-mono uppercase tracking-widest">
              GET IN TOUCH
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Contact details blocks (Left Column) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {/* Location Card */}
              <div className="flex items-center gap-4 bg-white border border-stone-150 p-5 rounded-2xl shadow-xs hover:border-amber-450 transition-all duration-300">
                <div className="h-12 w-12 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center text-amber-550 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-extrabold uppercase tracking-widest block font-mono">Location</span>
                  <span className="text-stone-955 text-sm font-bold block mt-1">Karachi, Pakistan</span>
                </div>
              </div>

              {/* Email Card */}
              <div className="flex items-center gap-4 bg-white border border-stone-150 p-5 rounded-2xl shadow-xs hover:border-amber-450 transition-all duration-300">
                <div className="h-12 w-12 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center text-amber-550 shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-extrabold uppercase tracking-widest block font-mono">Email Address</span>
                  <a href="mailto:anaskhanz1980@gmail.com" className="text-stone-900 hover:text-amber-600 text-sm font-bold block transition-colors mt-1">anaskhanz1980@gmail.com</a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-center gap-4 bg-white border border-stone-150 p-5 rounded-2xl shadow-xs hover:border-amber-450 transition-all duration-300">
                <div className="h-12 w-12 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center text-amber-550 shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-extrabold uppercase tracking-widest block font-mono">Phone Number</span>
                  <a href="tel:+923112813828" className="text-stone-900 hover:text-amber-600 text-sm font-bold block transition-colors mt-1">03112813828</a>
                </div>
              </div>

              {/* GitHub Card */}
              <div className="flex items-center gap-4 bg-white border border-stone-150 p-5 rounded-2xl shadow-xs hover:border-amber-450 transition-all duration-300">
                <div className="h-12 w-12 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center text-amber-550 shrink-0">
                  <Github size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-extrabold uppercase tracking-widest block font-mono">GitHub Handle</span>
                  <a href="https://github.com/AnasKhan2310" target="_blank" referrerPolicy="no-referrer" className="text-stone-900 hover:text-amber-600 text-sm font-bold block transition-colors mt-1">github.com/AnasKhan2310</a>
                </div>
              </div>

              {/* LinkedIn Card */}
              <div className="flex items-center gap-4 bg-white border border-stone-150 p-5 rounded-2xl shadow-xs hover:border-amber-450 transition-all duration-300">
                <div className="h-12 w-12 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center text-amber-550 shrink-0">
                  <Linkedin size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 font-extrabold uppercase tracking-widest block font-mono">LinkedIn Profile</span>
                  <a href="https://www.linkedin.com/in/anas-khan1290/" target="_blank" referrerPolicy="no-referrer" className="text-stone-900 hover:text-amber-600 text-sm font-bold block transition-colors mt-1">linkedin.com/in/anas-khan1290</a>
                </div>
              </div>

            </div>

            {/* Message submission client form (Right Column) */}
            <div className="lg:col-span-7 bg-white border border-stone-150 p-8 rounded-3xl shadow-md">
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-stone-600 font-extrabold text-[11px] tracking-widest uppercase block mb-1.5 font-mono">Your Name</label>
                    <input 
                      type="text" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="My full name..." 
                      required
                      className="w-full bg-[#FAF9F6] focus:bg-white text-stone-900 text-xs sm:text-sm font-semibold border border-stone-250 focus:border-amber-550 focus:outline-none rounded-xl px-4 py-3.5 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-stone-600 font-extrabold text-[11px] tracking-widest uppercase block mb-1.5 font-mono">Your Email</label>
                    <input 
                      type="email" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="email@organization.com" 
                      required
                      className="w-full bg-[#FAF9F6] focus:bg-white text-stone-900 text-xs sm:text-sm font-semibold border border-stone-250 focus:border-amber-550 focus:outline-none rounded-xl px-4 py-3.5 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-stone-600 font-extrabold text-[11px] tracking-widest uppercase block mb-1.5 font-mono">Subject</label>
                  <input 
                    type="text" 
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="E.g., Custom AI Integration..." 
                    required
                    className="w-full bg-[#FAF9F6] focus:bg-white text-stone-900 text-xs sm:text-sm font-semibold border border-stone-250 focus:border-amber-550 focus:outline-none rounded-xl px-4 py-3.5 transition-all"
                  />
                </div>

                <div>
                  <label className="text-stone-600 font-extrabold text-[11px] tracking-widest uppercase block mb-1.5 font-mono">Your Message</label>
                  <textarea 
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Hi Anas, let's build something beautiful..." 
                    required
                    className="w-full bg-[#FAF9F6] focus:bg-white text-stone-900 text-xs sm:text-sm font-semibold border border-stone-250 focus:border-amber-550 focus:outline-none rounded-xl px-4 py-3.5 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Elegant Solid Black Pill submit button matching Screenshot 3 bottom */}
                <button 
                  type="submit" 
                  className="bg-[#121212] hover:bg-amber-500 hover:text-stone-950 text-white font-sans font-extrabold text-xs uppercase tracking-widest py-4 px-8 rounded-full transition-all duration-300 inline-flex items-center gap-2 self-start shadow-md hover:shadow-lg"
                >
                  <span>Send Message</span>
                  <Send size={13} className="text-amber-400" />
                </button>

                {isSubmitted && (
                  <div className="bg-emerald-50 text-emerald-800 flex items-center gap-2 p-4 rounded-2xl border border-emerald-100 text-xs font-bold animate-fade-in font-mono">
                    <CheckCircle size={15} className="text-emerald-500" />
                    <span>Your request details have been dispatched to Anas!</span>
                  </div>
                )}

              </form>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#121212] border-t border-stone-900 text-[#71717A] px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white text-xs font-bold font-mono tracking-widest uppercase">Muhammad Anas Khan</span>
            <span className="text-stone-800">|</span>
            <span className="text-stone-400 text-xs font-mono uppercase tracking-wider">AI & Data Science Engineer Portfolio</span>
          </div>
          <div className="text-[10px] text-stone-500 font-mono tracking-wider">
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
            className="h-14 w-14 rounded-full bg-amber-500 hover:bg-amber-600 border-2 border-white text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 duration-300 group cursor-pointer"
            title="Ask Anas's AI"
          >
            <Bot size={26} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-emerald-400 border-2 border-white rounded-full animate-pulse"></span>
          </button>
        ) : (
          /* Main expandable chatbot overlay card */
          <div className="w-[340px] sm:w-[380px] h-[500px] bg-white border border-stone-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative animate-fade-in animate-duration-300">
            
            {/* Chatbot overlay Header */}
            <div className="bg-[#121212] px-4.5 py-4 border-b border-stone-850 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-stone-800 border border-stone-700 rounded-xl flex items-center justify-center">
                  <Bot size={18} className="text-amber-500 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold text-[11px] tracking-wider uppercase leading-none font-mono text-amber-500">ANAS'S AI ASSISTANT</h3>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-ping"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block -ml-3"></span>
                    <span className="text-[8.5px] font-bold text-stone-300 uppercase tracking-widest leading-none">ACTIVE NOW</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 bg-stone-800 hover:bg-stone-700 transition-colors rounded-xl text-stone-300 hover:text-white"
                title="Minimize AI Chat"
              >
                <X size={14} />
              </button>
            </div>

            {/* Chat History scroll panel */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 flex flex-col bg-[#FAF9F6]/25">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex gap-2 max-w-[85%] items-end">
                    {msg.role === 'assistant' && (
                      <div className="h-5 w-5 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 text-[9px] font-bold shrink-0">
                        AI
                      </div>
                    )}
                    
                    <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      msg.role === 'user' 
                        ? 'bg-amber-500 text-white rounded-br-none' 
                        : 'bg-white text-stone-800 border border-stone-150 rounded-bl-none'
                    }`}>
                      {msg.parts[0].text}
                    </div>

                    {msg.role === 'user' && (
                      <div className="h-5 w-5 rounded-md bg-stone-900 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                        U
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%] items-end">
                    <div className="h-5 w-5 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 text-[9px] shrink-0">
                      AI
                    </div>
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-400 font-semibold rounded-bl-none flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                      <span className="h-1.5 w-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="h-1.5 w-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}

              {chatError && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-850 rounded-2xl text-xs flex flex-col gap-2 font-mono">
                  <p className="font-bold uppercase text-[9px]">API Error:</p>
                  <p className="leading-relaxed text-[11px]">{chatError}</p>
                  <button 
                    onClick={() => handleSendMessage(messages[messages.length - 1]?.parts[0]?.text || "Hello")}
                    className="bg-red-100 hover:bg-red-200 text-red-900 border border-red-300 px-3 py-1.5 rounded-lg font-bold text-[9px] self-start uppercase transition-colors"
                  >
                    Retry Request
                  </button>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggested Prompts below chatbot history */}
            {messages.length === 1 && (
              <div className="px-4 py-3 border-t border-stone-100 flex flex-col gap-2 bg-[#FAF9F6]/20 shrink-0 select-none">
                <span className="text-[8.5px] text-stone-400 font-bold uppercase tracking-wider block font-mono">Suggested Inquiries</span>
                <div className="flex flex-col gap-1.5">
                  {suggestions.map((prompt, sIdx) => (
                    <button 
                      key={sIdx}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left text-xs text-stone-600 hover:text-amber-500 hover:border-amber-400 bg-white border border-stone-200 px-3 py-2 rounded-xl transition-all leading-snug shadow-3xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation text input area */}
            <div className="p-3 border-t border-stone-150 bg-white flex items-center gap-2">
              <input 
                type="text" 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage(inputMessage);
                }}
                disabled={isLoading}
                placeholder="Ask Anas's AI Assistant..." 
                className="flex-1 bg-stone-50 focus:bg-white text-stone-800 text-xs border border-stone-200 focus:border-amber-400 focus:outline-none rounded-xl px-4 py-3 transition-colors disabled:opacity-50 font-sans"
              />
              <button 
                onClick={() => handleSendMessage(inputMessage)}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-xl transition-all flex items-center justify-center shadow-xs disabled:bg-stone-50 disabled:text-stone-300 disabled:shadow-none shrink-0"
                title="Submit text"
              >
                <Send size={15} />
              </button>
            </div>

          </div>
        )}

      </div>

      <Analytics />
    </div>
  );
}
