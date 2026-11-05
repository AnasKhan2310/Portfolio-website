import React from 'react';
import { ProjectItem, FEATURED_PROJECTS } from '../data/projectsData';
import { TeachableMachineClassifier } from './TeachableMachineClassifier';
import { 
  ExternalLink, 
  Github, 
  FileText, 
  TrendingUp, 
  Dumbbell, 
  ArrowUpRight,
  FileSearch,
  CheckCircle2
} from 'lucide-react';

interface ProjectsSectionProps {
  projects?: ProjectItem[];
  onOpenCaseStudy: (project: ProjectItem) => void;
  onOpenInteractivePreview?: (type?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = FEATURED_PROJECTS,
  onOpenCaseStudy,
}) => {
  return (
    <section id="projects" className="py-16 lg:py-24 border-t border-[#1C1C1C] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-3">
            CURATED PORTFOLIO
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold font-display text-white tracking-[-0.02em] mb-3">
            Featured Projects & Working Prototypes
          </h2>
          <div className="w-12 h-0.5 bg-[#FF4D00] mx-auto mb-4" />
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Production web applications, computer vision models, document intelligence systems, and business analytics dashboards with live working demos.
          </p>
        </div>

        {/* Balanced 2x2 Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-[#121212] border border-[#222222] hover:border-[#383838] rounded-xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] group"
            >
              <div>
                
                {/* 1. Project Visual Preview Header */}
                <div className="p-4 sm:p-5 bg-[#0D0D0D] border-b border-[#1E1E1E]">
                  
                  {/* Status & Category Metadata (Unboxed typography) */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF4D00] font-bold">0{index + 1}.</span>
                      <span className="text-neutral-300 font-medium">{project.category}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-neutral-400">{project.statusBadge}</span>
                    </div>

                    {project.liveDemoUrl && (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Online</span>
                      </span>
                    )}
                  </div>

                  {/* Dynamic Visual UI Previews for each project */}
                  {project.previewVisualType === 'saas-platform' && (
                    <div className="rounded-lg bg-[#141414] border border-[#262626] p-3 text-xs">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#222222]">
                        <div className="flex items-center gap-2">
                          <Dumbbell size={14} className="text-[#FF4D00]" />
                          <span className="font-semibold text-white text-[11.5px]">ZestFit Workspace Hub</span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-500">FastAPI & PostgreSQL</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded bg-[#181818] border border-[#222222]">
                          <div className="text-[10px] font-mono text-neutral-400">Members</div>
                          <div className="text-sm font-bold text-white mt-0.5">142</div>
                        </div>
                        <div className="p-2 rounded bg-[#181818] border border-[#222222]">
                          <div className="text-[10px] font-mono text-neutral-400">Regimens</div>
                          <div className="text-sm font-bold text-[#FF4D00] mt-0.5">38 AI</div>
                        </div>
                        <div className="p-2 rounded bg-[#181818] border border-[#222222]">
                          <div className="text-[10px] font-mono text-neutral-400">MRR Billing</div>
                          <div className="text-sm font-bold text-emerald-400 mt-0.5">Stripe</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.previewVisualType === 'document-qa' && (
                    <div className="rounded-lg bg-[#141414] border border-[#262626] p-3 text-xs">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#222222]">
                        <div className="flex items-center gap-2">
                          <FileSearch size={14} className="text-[#38BDF8]" />
                          <span className="font-semibold text-white text-[11.5px]">MediScan AI Clinical Intelligence</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-400">OCR Conf: 99.2%</span>
                      </div>
                      <div className="bg-[#101010] p-2 rounded border border-[#222222] font-mono text-[10px] text-neutral-300 space-y-1">
                        <div className="flex justify-between">
                          <span>FASTING GLUCOSE:</span>
                          <span className="text-amber-400 font-bold">112 mg/dL (ELEVATED)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TOTAL CHOLESTEROL:</span>
                          <span className="text-emerald-400 font-bold">178 mg/dL (OPTIMAL)</span>
                        </div>
                        <div className="text-neutral-500 text-[9.5px] pt-1 border-t border-[#1E1E1E]">
                          Q&A: "What does this mean for diet?" → LLM instant contextual summary.
                        </div>
                      </div>
                    </div>
                  )}

                  {project.previewVisualType === 'teachable-machine' && (
                    <TeachableMachineClassifier />
                  )}

                  {project.previewVisualType === 'bi-dashboard' && (
                    <div className="rounded-lg bg-[#141414] border border-[#262626] p-3 text-xs">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#222222]">
                        <div className="flex items-center gap-2">
                          <TrendingUp size={14} className="text-[#FF4D00]" />
                          <span className="font-semibold text-white text-[11.5px]">520K+ Records ETL Dashboard</span>
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400">Power BI / Recharts</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-center mb-2">
                        <div className="p-1.5 rounded bg-[#181818] border border-[#222222]">
                          <div className="text-[9.5px] font-mono text-neutral-400">Net Processed Revenue</div>
                          <div className="text-xs font-bold text-white">£10.64M</div>
                        </div>
                        <div className="p-1.5 rounded bg-[#181818] border border-[#222222]">
                          <div className="text-[9.5px] font-mono text-neutral-400">Average Order Value</div>
                          <div className="text-xs font-bold text-[#FF4D00]">£486.20</div>
                        </div>
                      </div>
                      <div className="h-6 bg-[#181818] rounded flex items-center px-2 justify-between text-[9.5px] font-mono text-neutral-400">
                        <span>Cohort RFM: Champions (32%) · At-Risk (18%)</span>
                        <span className="text-emerald-400">+14.2% MoM</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* 2. Project Card Content */}
                <div className="p-5 sm:p-6">
                  
                  {/* Project Title */}
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight mb-2 group-hover:text-[#FF4D00] transition-colors">
                    {project.title}
                  </h3>

                  {/* Concise 1-Sentence Overview */}
                  <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>

                  {/* 3 Crisp Highlight Bullet Points */}
                  <div className="space-y-1.5 mb-5 pb-4 border-b border-[#1E1E1E]">
                    {project.keyHighlights.map((highlight, hIdx) => {
                      const [label, desc] = highlight.split(': ');
                      return (
                        <div key={hIdx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                          <CheckCircle2 size={12} className="text-[#FF4D00] shrink-0 mt-0.5" />
                          <span className="text-neutral-300">
                            <strong className="text-white font-medium">{label}:</strong> {desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Unboxed Technologies Metadata */}
                  <div className="text-[11px] font-mono text-neutral-400 flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                    <span className="text-neutral-500 font-semibold">Stack:</span>
                    {project.technologies.map((tech, tIdx) => (
                      <React.Fragment key={tIdx}>
                        <span className="hover:text-white transition-colors">{tech}</span>
                        {tIdx < project.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-neutral-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                </div>

              </div>

              {/* 3. Bottom Action Buttons */}
              <div className="p-4 sm:p-5 bg-[#0E0E0E] border-t border-[#1C1C1C] flex flex-wrap items-center justify-between gap-2.5">
                
                <div className="flex items-center gap-2">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-[11.5px] font-bold px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,77,0,0.3)] cursor-pointer"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#181818] hover:bg-[#222222] text-neutral-300 hover:text-white border border-[#2A2A2A] text-[11.5px] font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Github size={12} />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(project)}
                  className="text-neutral-400 hover:text-white text-[11.5px] font-medium flex items-center gap-1 transition-colors cursor-pointer group/btn ml-auto"
                >
                  <FileText size={12} className="text-[#FF4D00]" />
                  <span>Case Study</span>
                  <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
