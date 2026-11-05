import React from 'react';
import { BarChart3, Brain, Sparkles, Globe } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 'analytics',
      title: 'Data Analytics & BI',
      pillarNumber: '01',
      icon: BarChart3,
      tagline: 'Executive Dashboards & Insights',
      description: 'Transforming complex datasets and raw operational records into structured analytical pipelines, automated KPI reporting, and decision-ready dashboards.',
      bullets: [
        'Executive & operational KPI dashboards',
        'Exploratory data analysis (EDA) in Python',
        'Statistical distribution & cohort analysis',
        'Automated ETL pipelines & data cleaning',
        'Power BI, Recharts & interactive visuals'
      ],
      isHighlighted: false
    },
    {
      id: 'ml-prediction',
      title: 'Machine Learning & Prediction',
      pillarNumber: '02',
      icon: Brain,
      tagline: 'Predictive Models & Algorithms',
      description: 'Engineering practical classification, regression, and recommendation systems that evaluate risk factors, forecast trends, and personalize experiences.',
      bullets: [
        'Customer churn & lead risk scoring models',
        'Personalized recommendation engines',
        'Scikit-learn, XGBoost & statistical algorithms',
        'Feature engineering & ROC-AUC calibration',
        'FastAPI microservice inference endpoints'
      ],
      isHighlighted: false
    },
    {
      id: 'gen-ai',
      title: 'Generative AI & LLM Apps',
      pillarNumber: '03',
      icon: Sparkles,
      tagline: 'Document Intelligence & Q&A',
      description: 'Developing practical AI applications that automate unstructured document parsing, contextual question answering, and intelligent conversational workflows.',
      bullets: [
        'Document Q&A & intelligent OCR extraction',
        'OpenAI, Claude & Gemini API integrations',
        'Retrieval-Augmented Generation (RAG) pipelines',
        'Structured entity recognition from PDFs & scans',
        'Domain-specific AI chatbots & assistants'
      ],
      isHighlighted: true // Signature orange border
    },
    {
      id: 'saas-web',
      title: 'Web Applications & SaaS',
      pillarNumber: '04',
      icon: Globe,
      tagline: 'Full-Stack Software Architecture',
      description: 'Architecting scalable web applications, internal tools, and AI-enabled software products built for cross-industry clients and real production users.',
      bullets: [
        'FastAPI & Next.js full-stack applications',
        'PostgreSQL relational database modeling',
        'JWT authentication & access control',
        'Stripe subscription billing & webhook pipelines',
        'Cloud deployment & containerized workflows'
      ],
      isHighlighted: false
    }
  ];

  return (
    <section id="solutions" className="py-16 lg:py-24 border-t border-[#1C1C1C] relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-3">
          CROSS-INDUSTRY EXPERTISE
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white font-display tracking-[-0.02em] mb-3">
          How I Help Businesses Solve Problems
        </h2>
        <div className="w-12 h-0.5 bg-[#FF4D00] mx-auto mb-4" />
        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          Tailored engineering across Data Analytics, Machine Learning, and Full-Stack AI Applications — designed to help businesses understand data, automate workflows, and make better decisions.
        </p>
      </div>

      {/* 4 Clean Minimal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              className={`p-6 sm:p-7 rounded-xl flex flex-col justify-between transition-all duration-300 relative group min-h-[380px] hover:shadow-[0_4px_30px_rgba(0,0,0,0.5)] ${
                srv.isHighlighted
                  ? 'bg-[#141414] border border-[#FF4D00]/60'
                  : 'bg-[#121212] border border-[#222222] hover:border-[#383838]'
              }`}
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-11 w-11 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#FF4D00] group-hover:scale-105 transition-transform">
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-neutral-500">
                    {srv.pillarNumber}
                  </span>
                </div>

                <h3 className="text-lg font-semibold font-display text-white tracking-[-0.02em] mb-1">
                  {srv.title}
                </h3>
                <span className="text-[10.5px] font-mono text-[#FF4D00] uppercase tracking-wider block mb-3">
                  {srv.tagline}
                </span>

                <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                  {srv.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 pt-2 border-t border-[#1C1C1C]">
                  {srv.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-[11px] text-neutral-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] mt-1 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Action Link */}
              <div className="pt-5 mt-4 border-t border-[#1C1C1C]">
                <a
                  href="#contact"
                  className="text-xs font-mono font-semibold text-neutral-400 hover:text-white flex items-center gap-1.5 group/link transition-colors cursor-pointer"
                >
                  <span>Discuss Your Project</span>
                  <span className="text-[#FF4D00] group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default ServicesSection;
