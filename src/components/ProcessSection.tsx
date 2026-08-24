import React from 'react';
import { Search, LineChart, Code2, Rocket, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      action: 'Understand Requirements',
      icon: Search,
      description: 'Understand the core business problem, identify manual bottlenecks, and define precise target outcomes and KPI goals.'
    },
    {
      number: '02',
      title: 'Analyze',
      action: 'Data & Workflow Audit',
      icon: LineChart,
      description: 'Audit existing data sources, schemas, user flows, and automation opportunities to design a robust technical strategy.'
    },
    {
      number: '03',
      title: 'Build',
      action: 'Engineering & Modeling',
      icon: Code2,
      description: 'Develop the analytics pipelines, train or tune AI/ML models, and engineer production-ready SaaS dashboards with clean code.'
    },
    {
      number: '04',
      title: 'Deploy',
      action: 'Launch & Refine',
      icon: Rocket,
      description: 'Deploy to scalable cloud infrastructure, integrate API webhooks, verify system accuracy, and continuously refine performance.'
    }
  ];

  return (
    <section className="py-16 lg:py-20 border-t border-[#1C1C1C] relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-3">
          HOW I OPERATE
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-syne tracking-tight mb-3">
          My Engineering Process
        </h2>
        <div className="w-12 h-0.5 bg-[#FF4D00] mx-auto mb-4" />
        
        {/* Visual Flow Indicator */}
        <div className="inline-flex items-center gap-2 bg-[#121212] border border-[#242424] px-4 py-2 rounded-full text-xs font-mono text-neutral-300">
          <span className="text-[#FF4D00] font-bold">Discover</span>
          <ArrowRight size={12} className="text-neutral-500" />
          <span className="text-[#FF4D00] font-bold">Analyze</span>
          <ArrowRight size={12} className="text-neutral-500" />
          <span className="text-[#FF4D00] font-bold">Build</span>
          <ArrowRight size={12} className="text-neutral-500" />
          <span className="text-[#FF4D00] font-bold">Deploy</span>
        </div>
      </div>

      {/* 4 Process Cards with Connected Visual Lines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="bg-[#121212] border border-[#222222] hover:border-[#383838] p-6 rounded-xl flex flex-col justify-between transition-all duration-300 group relative"
            >
              <div>
                {/* Step Top */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-[#FF4D00] group-hover:scale-105 transition-transform">
                    <Icon size={18} />
                  </div>
                  <span className="text-xl font-mono font-extrabold text-neutral-600 group-hover:text-[#FF4D00] transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-syne text-white tracking-tight mb-1">
                  {step.title}
                </h3>
                <span className="text-[11px] font-mono text-[#FF4D00] font-medium block mb-3">
                  {step.action}
                </span>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress Bar Indicator */}
              <div className="mt-5 pt-3 border-t border-[#1C1C1C] flex items-center gap-1.5">
                {[0, 1, 2, 3].map((barIdx) => (
                  <div
                    key={barIdx}
                    className={`h-1 flex-1 rounded-full ${
                      barIdx <= idx ? 'bg-[#FF4D00]' : 'bg-[#222222]'
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
