import React from 'react';
import { Terminal, Database, Brain, Code, Cpu } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  const stackGroups = [
    {
      category: 'Programming',
      icon: Terminal,
      skills: ['Python', 'SQL', 'TypeScript']
    },
    {
      category: 'Data',
      icon: Database,
      skills: ['Pandas', 'NumPy', 'Power BI', 'Streamlit']
    },
    {
      category: 'AI / ML',
      icon: Brain,
      skills: ['Scikit-learn', 'TensorFlow', 'NLP', 'LLMs']
    },
    {
      category: 'Development',
      icon: Code,
      skills: ['FastAPI', 'PostgreSQL', 'REST APIs', 'React / Next.js']
    },
    {
      category: 'Automation',
      icon: Cpu,
      skills: ['n8n', 'AI APIs', 'Workflow Automation']
    }
  ];

  return (
    <section className="py-14 border-t border-[#1C1C1C] relative z-10">
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF4D00]">
              CORE TOOLING & ARCHITECTURE
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold font-display text-white tracking-[-0.02em]">
              Focused Technical Stack
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-md">
            Selected battle-tested frameworks and libraries prioritized for high-performance data analytics, machine learning, and SaaS engineering.
          </p>
        </div>

        {/* Grouped clean technology badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stackGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="bg-[#121212] border border-[#222222] hover:border-[#333333] p-4 rounded-xl flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1E1E1E]">
                    <Icon size={14} className="text-[#FF4D00]" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-300">
                      {group.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="bg-[#181818] hover:bg-[#202020] text-neutral-300 text-xs font-mono px-2.5 py-1 rounded border border-[#262626] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
