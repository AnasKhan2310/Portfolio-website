import React from 'react';
import { Download, Printer, X, Mail, Phone, MapPin, Github, Linkedin, CheckCircle2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = document.getElementById('printable-resume');
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Muhammad Anas Khan - Resume</title>
          <meta charset="utf-8">
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap" rel="stylesheet">
          <style>
            @page { size: A4; margin: 12mm 15mm; }
            body { 
              font-family: 'Plus Jakarta Sans', sans-serif; 
              color: #111827; 
              background: #ffffff; 
              line-height: 1.45;
              font-size: 13px;
              margin: 0;
              padding: 10px;
            }
            h1, h2, h3 { margin: 0; font-family: 'Syne', sans-serif; }
            h1 { font-size: 26px; color: #111827; }
            .tagline { color: #ea580c; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }
            .header-contacts { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 10px; font-size: 12px; color: #4b5563; border-bottom: 2px solid #ea580c; padding-bottom: 12px; }
            .section-title { font-size: 14px; font-weight: 800; text-transform: uppercase; color: #ea580c; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-top: 16px; margin-bottom: 8px; letter-spacing: 0.5px; }
            .job-title { font-weight: 700; font-size: 13px; color: #111827; }
            .company { font-weight: 600; color: #374151; font-size: 12px; }
            .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px 16px; font-size: 12px; }
            .skill-item { display: flex; align-items: center; gap: 6px; }
            a { color: #ea580c; text-decoration: none; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => window.close(), 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDownloadDoc = () => {
    const resumeText = `
=====================================================
MUHAMMAD ANAS KHAN — CURRICULUM VITAE
AI & Data Solutions for E-commerce & SaaS
=====================================================
Email: anaskhanz1980@gmail.com
Phone/WhatsApp: +92 311 2813828
Location: Karachi, Pakistan
GitHub: https://github.com/AnasKhan2310
LinkedIn: https://www.linkedin.com/in/anas-khan1290/

PROFESSIONAL SUMMARY:
AI & Data Science developer focused on building practical business solutions using data analytics, machine learning, and SaaS development. Experienced in designing business intelligence dashboards, full-stack SaaS MVPs, and automated workflows that help e-commerce brands and SaaS companies understand their data, reduce manual friction, and make confident decisions.

CORE PILLARS & SKILLS:
- Data Analytics: Python, SQL, Pandas, NumPy, Power BI, Streamlit, Business Dashboards, Cohort Retention, KPI Reporting
- AI / Machine Learning: Scikit-learn, TensorFlow, XGBoost, Predictive Models, Document Intelligence (OCR/NLP), LLM Applications
- SaaS Development: FastAPI, Next.js, React, TypeScript, PostgreSQL, REST APIs, Stripe Integration, Tailwind CSS
- Supporting Automation: n8n workflows, Model Context Protocol (MCP), Autonomous Agents, API Integrations

FEATURED PROJECTS:
1. ZestFit / AI Fitness SaaS (Live SaaS)
   Full-stack subscription SaaS with dynamic AI routine generators, caloric/macro calculation, and progress dashboards.
   Live: https://zestfitmanagement.vercel.app/ | GitHub: https://github.com/AnasKhan2310/ZESTFIT-GYM-MANAGEMENT

2. AI Operations Manager (Autonomous Agents)
   Enterprise agent orchestration platform connecting Model Context Protocol (MCP) integrations and automated task routing.
   Live: https://ais-pre-ww4f45uamngffnxonvsnb5-307342142062.asia-east1.run.app/ | GitHub: https://github.com/AnasKhan2310/AI-Operations-Manager

3. Spotify Streaming Data Analytics (Data Science)
   Exploratory data analysis across massive music datasets uncovering audio feature correlations and listener behavior.
   GitHub: https://github.com/AnasKhan2310/Spotify-Data-Analysis

4. MediScan AI (Document Intelligence)
   Clinical report OCR and biomarker extraction tool creating structured patient summaries.
   Live: https://medi-scan-ai-theta.vercel.app/

EDUCATION:
- Bachelor of Science in Computer Science (BSCS)
  Federal Urdu University of Arts, Science and Technology, Karachi
  Focus: Artificial Intelligence, Data Science & Machine Learning
=====================================================
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Muhammad_Anas_Khan_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#141414] border border-[#2A2A2A] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="bg-[#1C1C1C] border-b border-[#2A2A2A] px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-3 w-3 rounded-full bg-[#FF4D00]" />
            <h2 className="text-white font-syne font-bold text-sm sm:text-base">
              Curriculum Vitae — Muhammad Anas Khan
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#2A2A2A] hover:bg-[#383838] text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer size={14} className="text-[#FF4D00]" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadDoc}
              className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-bold px-3.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              title="Download text copy"
            >
              <Download size={14} />
              <span>Download</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-md transition-colors ml-1 cursor-pointer"
              aria-label="Close CV preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-neutral-900/60 text-white font-sans space-y-6">
          
          <div id="printable-resume" className="bg-white text-neutral-900 p-6 sm:p-10 rounded-xl shadow-lg border border-neutral-200">
            
            {/* Header */}
            <div className="border-b-2 border-[#FF4D00] pb-5">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-syne text-neutral-900 tracking-tight">
                MUHAMMAD ANAS KHAN
              </h1>
              <p className="text-[#FF4D00] font-bold text-xs sm:text-sm uppercase tracking-wider mt-1">
                AI & Data Solutions for E-commerce & SaaS
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-neutral-600">
                <span className="flex items-center gap-1">
                  <Mail size={12} className="text-[#FF4D00]" /> anaskhanz1980@gmail.com
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-[#FF4D00]" /> +92 311 2813828
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} className="text-[#FF4D00]" /> Karachi, Pakistan
                </span>
                <span className="flex items-center gap-1">
                  <Github size={12} className="text-[#FF4D00]" /> github.com/AnasKhan2310
                </span>
                <span className="flex items-center gap-1">
                  <Linkedin size={12} className="text-[#FF4D00]" /> linkedin.com/in/anas-khan1290
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="mt-5">
              <h2 className="text-xs sm:text-sm font-extrabold uppercase text-[#FF4D00] tracking-wider border-b border-neutral-200 pb-1 mb-2 font-syne">
                Professional Summary
              </h2>
              <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
                AI & Data Science developer focused on building practical business solutions across Data Analytics, Machine Learning, and SaaS Development. Experienced in architecting business intelligence dashboards, full-stack web applications, and automated workflows that empower e-commerce businesses and SaaS companies to make better decisions with their data.
              </p>
            </div>

            {/* Core Competencies */}
            <div className="mt-5">
              <h2 className="text-xs sm:text-sm font-extrabold uppercase text-[#FF4D00] tracking-wider border-b border-neutral-200 pb-1 mb-2 font-syne">
                Core Pillars & Technical Stack
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-neutral-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-[#FF4D00] shrink-0" />
                  <span><strong>Data Analytics:</strong> SQL, Pandas, NumPy, Power BI, Streamlit, KPI Dashboards</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-[#FF4D00] shrink-0" />
                  <span><strong>AI & Machine Learning:</strong> Scikit-learn, TensorFlow, Predictive Models, OCR, NLP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-[#FF4D00] shrink-0" />
                  <span><strong>SaaS Development:</strong> Next.js, React, TypeScript, FastAPI, PostgreSQL, Tailwind</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-[#FF4D00] shrink-0" />
                  <span><strong>Supporting Automation:</strong> n8n workflows, MCP Protocol, Autonomous Agents</span>
                </div>
              </div>
            </div>

            {/* Featured Projects */}
            <div className="mt-5">
              <h2 className="text-xs sm:text-sm font-extrabold uppercase text-[#FF4D00] tracking-wider border-b border-neutral-200 pb-1 mb-3 font-syne">
                Key Solutions & Projects
              </h2>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-neutral-900">ZestFit — AI Fitness & Nutrition SaaS</span>
                    <span className="text-[11px] text-[#FF4D00] font-semibold">Live SaaS</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Engineered full-stack subscription platform with dynamic AI routine generators, macro calculation, and central client tracking.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-neutral-900">AI Operations Manager — Autonomous Workflow Platform</span>
                    <span className="text-[11px] text-[#FF4D00] font-semibold">Autonomous Agents</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Enterprise agent orchestration platform coordinating autonomous tool execution, MCP protocols, and multi-agent workflows.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-neutral-900">Spotify Streaming Data Analytics</span>
                    <span className="text-[11px] text-[#FF4D00] font-semibold">Data Analytics</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Exploratory data analysis across massive music datasets uncovering audio feature correlations and listener behavior.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-neutral-900">MediScan AI — Clinical Document Intelligence</span>
                    <span className="text-[11px] text-[#FF4D00] font-semibold">Document Intelligence</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Clinical report OCR and biomarker extraction tool creating structured patient summaries.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-5">
              <h2 className="text-xs sm:text-sm font-extrabold uppercase text-[#FF4D00] tracking-wider border-b border-neutral-200 pb-1 mb-2 font-syne">
                Education
              </h2>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-xs sm:text-sm text-neutral-900">
                    Bachelor of Science in Computer Science (BSCS)
                  </p>
                  <p className="text-xs text-neutral-600">
                    Federal Urdu University of Arts, Science & Technology, Karachi
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Specialization: Artificial Intelligence, Data Science & Machine Learning
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
