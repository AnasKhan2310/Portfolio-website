import React from 'react';
import { BarChart3, Brain, Layers, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 'analytics',
      title: 'Data Analytics',
      pillarNumber: '01',
      icon: BarChart3,
      tagline: 'Visibility & KPI Intelligence',
      description: 'Transforming messy business records and raw transaction dumps into intuitive, decision-ready analytics dashboards.',
      bullets: [
        'Business dashboards',
        'Sales analytics',
        'KPI reporting',
        'Customer analytics',
        'Forecasting'
      ],
      isHighlighted: false
    },
    {
      id: 'ai-ml',
      title: 'AI / Machine Learning',
      pillarNumber: '02',
      icon: Brain,
      tagline: 'Predictive & Generative Intelligence',
      description: 'Engineering high-accuracy predictive statistical models, document parsing pipelines, and customized LLM applications.',
      bullets: [
        'Predictive models',
        'AI-powered applications',
        'LLM applications',
        'Document intelligence',
        'Classification & recommendation systems'
      ],
      isHighlighted: false
    },
    {
      id: 'saas',
      title: 'SaaS Development',
      pillarNumber: '03',
      icon: Layers,
      tagline: 'Production Full-Stack Software',
      description: 'Architecting scalable web software, internal administrative hubs, and AI-enabled software-as-a-service applications.',
      bullets: [
        'AI SaaS MVPs',
        'Internal business tools',
        'Admin dashboards',
        'AI-powered SaaS products',
        'API-powered applications'
      ],
      isHighlighted: true // Subtle signature orange highlight card
    },
    {
      id: 'automation',
      title: 'Automation',
      pillarNumber: '04',
      icon: Cpu,
      tagline: 'Supporting Capability',
      description: 'Connecting disjointed SaaS platforms, webhooks, and autonomous agents to eliminate manual operational drag.',
      bullets: [
        'n8n workflows',
        'Automated reporting',
        'AI agents',
        'API integrations',
        'Repetitive workflow automation'
      ],
      isHighlighted: false
    }
  ];

  return (
    <section id="solutions" className="py-16 lg:py-24 border-t border-[#1C1C1C] relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-3">
          WHAT I BUILD & DELIVER
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-syne tracking-tight mb-3">
          Core Solutions & Capabilities
        </h2>
        <div className="w-12 h-0.5 bg-[#FF4D00] mx-auto mb-4" />
        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
          Tailored engineering for e-commerce brands, early-stage SaaS ventures, and digital agencies seeking scalable data, AI, and software systems.
        </p>
      </div>

      {/* 4 Clean Minimal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              className={`p-6 sm:p-7 rounded-xl flex flex-col justify-between transition-colors relative group min-h-[340px] ${
                srv.isHighlighted
                  ? 'bg-[#141414] border border-[#FF4D00]/60'
                  : 'bg-[#121212] border border-[#222222] hover:border-[#383838]'
              }`}
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-11 w-11 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#FF4D00]">
                    <Icon size={20} />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-neutral-500">
                    {srv.pillarNumber}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-syne text-white tracking-tight mb-1">
                  {srv.title}
                </h3>
                <span className="text-[10.5px] font-mono text-[#FF4D00] uppercase tracking-wider block mb-3">
                  {srv.tagline}
                </span>

                <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                  {srv.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 pt-3 border-t border-[#222222]">
                  {srv.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 size={13} className="text-[#FF4D00] shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA anchor */}
              <div className="pt-5 mt-4 border-t border-[#1E1E1E]">
                <a
                  href="#projects"
                  className="text-xs font-mono font-bold text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors group-hover:text-[#FF4D00]"
                >
                  <span>Explore Relevant Work</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
