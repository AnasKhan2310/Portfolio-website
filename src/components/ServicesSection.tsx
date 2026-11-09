import React from 'react';
import { BarChart3, Brain, Sparkles, Globe, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 'analytics',
      title: 'Data Analytics & BI',
      pillarNumber: '01',
      icon: BarChart3,
      tagline: 'Dashboards & Insights',
      description: 'Transforming raw data into clear KPI dashboards and actionable business insights.',
      bullets: [
        'Executive & sales KPI dashboards',
        'Cohort & retention analysis',
        'Python & SQL data pipelines'
      ],
      isHighlighted: false
    },
    {
      id: 'ml-prediction',
      title: 'Machine Learning',
      pillarNumber: '02',
      icon: Brain,
      tagline: 'Predictive Modeling',
      description: 'Building practical ML models that forecast churn, score leads, and rank recommendations.',
      bullets: [
        'Churn & lead scoring models',
        'Recommendation engines',
        'FastAPI model endpoints'
      ],
      isHighlighted: false
    },
    {
      id: 'gen-ai',
      title: 'Generative AI & LLMs',
      pillarNumber: '03',
      icon: Sparkles,
      tagline: 'Document Intelligence',
      description: 'Developing AI applications that extract insights from unstructured reports and answer questions.',
      bullets: [
        'Document Q&A & OCR pipelines',
        'Gemini & OpenAI API integration',
        'Factual RAG workflows'
      ],
      isHighlighted: true
    },
    {
      id: 'saas-web',
      title: 'Web Apps & SaaS',
      pillarNumber: '04',
      icon: Globe,
      tagline: 'Full-Stack Software',
      description: 'Architecting scalable web applications and SaaS MVPs with secure auth and payment flows.',
      bullets: [
        'FastAPI & Next.js full-stack apps',
        'PostgreSQL database design',
        'Stripe subscriptions & webhooks'
      ],
      isHighlighted: false
    }
  ];

  return (
    <section id="solutions" className="py-14 lg:py-20 border-t border-[#1C1C1C] relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-2.5">
          SOLUTIONS
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-berghan text-white tracking-[-0.02em] mb-2.5">
          How I Help Businesses Solve Problems
        </h2>
        <div className="w-10 h-0.5 bg-[#FF4D00] mx-auto mb-3" />
        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
          Targeted solutions across data analytics, machine learning, and full-stack software.
        </p>
      </div>

      {/* 4 Clean Minimal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              className={`p-5 sm:p-6 rounded-xl flex flex-col justify-between transition-all duration-300 relative group hover:shadow-[0_4px_30px_rgba(0,0,0,0.5)] ${
                srv.isHighlighted
                  ? 'bg-[#141414] border border-[#FF4D00]/60'
                  : 'bg-[#121212] border border-[#222222] hover:border-[#383838]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="h-10 w-10 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#FF4D00] group-hover:scale-105 transition-transform">
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-neutral-500">
                    {srv.pillarNumber}
                  </span>
                </div>

                <h3 className="text-base font-bold font-berghan text-white tracking-tight mb-1">
                  {srv.title}
                </h3>
                <span className="text-[10px] font-mono text-[#FF4D00] uppercase tracking-wider block mb-2.5">
                  {srv.tagline}
                </span>

                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {srv.description}
                </p>

                <ul className="space-y-1.5 pt-2.5 border-t border-[#1C1C1C]">
                  {srv.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-[11px] text-neutral-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] mt-1 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1C1C1C]">
                <a
                  href="#contact"
                  className="text-xs font-mono font-semibold text-neutral-400 hover:text-white flex items-center gap-1.5 group/link transition-colors cursor-pointer"
                >
                  <span>Discuss Need</span>
                  <ArrowRight size={12} className="text-[#FF4D00] group-hover/link:translate-x-1 transition-transform" />
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
