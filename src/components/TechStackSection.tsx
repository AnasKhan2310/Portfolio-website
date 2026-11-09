import React from 'react';
import { BarChart3, Database, Brain, Sparkles, Bot, Globe, CheckCircle2 } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const skillCategories = [
    {
      category: 'Data Analytics & Visualization',
      icon: BarChart3,
      tagline: 'BI & Dashboards',
      skills: [
        'Power BI & DAX',
        'Pandas & NumPy',
        'SQL & Query Optimization',
        'Exploratory Data Analysis (EDA)',
        'KPI Dashboards & Recharts'
      ]
    },
    {
      category: 'Python & Data Pipelines',
      icon: Database,
      tagline: 'ETL & Data Engineering',
      skills: [
        'Python (Core & Advanced)',
        'ETL Data Pipelines',
        'Data Cleaning & Normalization',
        'REST APIs & JSON Parsing'
      ]
    },
    {
      category: 'Machine Learning',
      icon: Brain,
      tagline: 'Predictive Modeling',
      skills: [
        'Scikit-learn & XGBoost',
        'Supervised Classification',
        'Regression Analysis',
        'Model Tuning & ROC-AUC'
      ]
    },
    {
      category: 'Generative AI & LLMs',
      icon: Sparkles,
      tagline: 'RAG & Document Intelligence',
      skills: [
        'Gemini, OpenAI & Claude APIs',
        'LangChain & RAG Workflows',
        'Document Q&A & OCR Extraction',
        'Prompt Engineering'
      ]
    },
    {
      category: 'AI Agents & Automation',
      icon: Bot,
      tagline: 'Autonomous Workflows',
      skills: [
        'AI Chatbot Architectures',
        'Autonomous Agents & Function Calling',
        'n8n Workflow Automation',
        'Webhooks & Event Triggers'
      ]
    },
    {
      category: 'Web Apps & SaaS',
      icon: Globe,
      tagline: 'Full-Stack Architecture',
      skills: [
        'FastAPI (Python)',
        'Next.js, React & TypeScript',
        'PostgreSQL & Database Design',
        'Tailwind CSS & Stripe Integration'
      ]
    }
  ];

  return (
    <section id="tech-stack" className="py-14 lg:py-20 border-t border-[#1C1C1C] relative z-10">
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-2.5">
            TECHNICAL PROFICIENCY
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-berghan text-white tracking-[-0.02em] mb-2.5">
            Skills & Technical Tooling
          </h2>
          <div className="w-10 h-0.5 bg-[#FF4D00] mx-auto mb-3" />
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Core tools and frameworks powering production data pipelines, ML models, and SaaS apps.
          </p>
        </div>

        {/* 6 Grouped clean technology cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="bg-[#121212] border border-[#222222] hover:border-[#383838] p-6 rounded-xl flex flex-col justify-between transition-all group hover:shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
              >
                <div>
                  <div className="flex items-start justify-between mb-4 pb-3 border-b border-[#1E1E1E]">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-[#181818] border border-[#262626] flex items-center justify-center text-[#FF4D00] group-hover:scale-105 transition-transform">
                        <Icon size={19} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold font-display text-white tracking-tight">
                          {group.category}
                        </h3>
                        <span className="text-[10px] font-mono text-[#FF4D00]">
                          {group.tagline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-[#171717] hover:bg-[#202020] text-neutral-300 hover:text-white text-xs font-mono px-2.5 py-1 rounded-md border border-[#262626] transition-colors flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#FF4D00]/70" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#1C1C1C] flex items-center gap-1.5 text-[10px] font-mono text-neutral-500">
                  <CheckCircle2 size={12} className="text-[#FF4D00]" />
                  <span>Production & Project Tested</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default TechStackSection;
