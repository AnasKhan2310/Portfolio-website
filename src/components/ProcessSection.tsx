import React from 'react';
import { Search, LineChart, Code2, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      action: 'Requirements',
      icon: Search,
      description: 'Pinpoint business pain points, clarify target outcomes, and set success metrics.'
    },
    {
      number: '02',
      title: 'Analyze',
      action: 'Data Audit',
      icon: LineChart,
      description: 'Audit data sources, model schemas, and map out the cleanest architecture.'
    },
    {
      number: '03',
      title: 'Build',
      action: 'Engineering',
      icon: Code2,
      description: 'Engineer pipelines, train ML models, and build responsive dashboards with clean code.'
    },
    {
      number: '04',
      title: 'Deploy',
      action: 'Launch',
      icon: CheckCircle2,
      description: 'Deploy to cloud, test webhooks, verify accuracy, and refine performance.'
    }
  ];

  return (
    <section className="py-14 lg:py-20 border-t border-[#1C1C1C] relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-2.5">
          PROCESS
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-berghan text-white tracking-[-0.02em] mb-2.5">
          My Engineering Process
        </h2>
        <div className="w-10 h-0.5 bg-[#FF4D00] mx-auto mb-3" />
        
        {/* Visual Flow Indicator */}
        <div className="inline-flex items-center gap-2 bg-[#121212] border border-[#242424] px-3.5 py-1.5 rounded-full text-xs font-mono text-neutral-300">
          <span className="text-[#FF4D00] font-bold">Discover</span>
          <ArrowRight size={11} className="text-neutral-500" />
          <span className="text-[#FF4D00] font-bold">Analyze</span>
          <ArrowRight size={11} className="text-neutral-500" />
          <span className="text-[#FF4D00] font-bold">Build</span>
          <ArrowRight size={11} className="text-neutral-500" />
          <span className="text-[#FF4D00] font-bold">Deploy</span>
        </div>
      </div>

      {/* 4 Process Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="bg-[#121212] border border-[#222222] hover:border-[#383838] p-5 rounded-xl flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="h-9 w-9 rounded-lg bg-[#181818] border border-[#2A2A2A] flex items-center justify-center text-[#FF4D00]">
                    <Icon size={16} />
                  </div>
                  <span className="text-lg font-mono font-black text-neutral-600 group-hover:text-[#FF4D00] transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-bold font-berghan text-white tracking-tight mb-0.5">
                  {step.title}
                </h3>
                <span className="text-[10.5px] font-mono text-[#FF4D00] font-medium block mb-2.5">
                  {step.action}
                </span>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress Bar Indicator */}
              <div className="mt-4 pt-3 border-t border-[#1C1C1C] flex items-center gap-1.5">
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

export default ProcessSection;
