import React from 'react';
import { ProjectItem, FEATURED_PROJECTS } from '../data/projectsData';
import { 
  ExternalLink, 
  Github, 
  FileText, 
  TrendingUp, 
  Dumbbell, 
  ArrowUpRight,
  FileSearch,
  AlertCircle,
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
    <section id="projects" className="py-14 lg:py-20 border-t border-[#1C1C1C] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-2.5">
            PORTFOLIO
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-berghan text-white tracking-[-0.02em] mb-2.5">
            Featured Projects & Real Solutions
          </h2>
          <div className="w-10 h-0.5 bg-[#FF4D00] mx-auto mb-3" />
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Production SaaS software, clinical document intelligence, and enterprise BI dashboards.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-[#121212] border border-[#222222] hover:border-[#383838] rounded-xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] group"
            >
              <div className="flex flex-col flex-1">
                
                {/* 1. Project Visual Preview Header */}
                <div className="p-3.5 bg-[#0D0D0D] border-b border-[#1E1E1E]">
                  
                  {/* Category & Status Metadata */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF4D00] font-bold">0{index + 1}.</span>
                      <span className="text-neutral-300 font-medium">{project.category}</span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span className="text-neutral-400">{project.statusBadge}</span>
                    </div>

                    {project.liveDemoUrl && (
                      <span className="text-[10px] text-[#FF4D00] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
                        <span>Online</span>
                      </span>
                    )}
                  </div>

                  {/* Visual UI Previews for each project */}
                  {project.previewVisualType === 'saas-platform' && (
                    <div className="rounded-lg bg-[#141414] border border-[#262626] p-2.5 text-xs">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#222222]">
                        <div className="flex items-center gap-2">
                          <Dumbbell size={13} className="text-[#FF4D00]" />
                          <span className="font-semibold text-white text-[11px]">ZestFit Gym SaaS</span>
                        </div>
                        <span className="text-[9.5px] font-mono text-neutral-500">FastAPI & Stripe</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-center">
                        <div className="p-1 rounded bg-[#181818] border border-[#222222]">
                          <div className="text-[9px] font-mono text-neutral-400">Members</div>
                          <div className="text-xs font-bold text-white">140+</div>
                        </div>
                        <div className="p-1 rounded bg-[#181818] border border-[#222222]">
                          <div className="text-[9px] font-mono text-neutral-400">Routines</div>
                          <div className="text-xs font-bold text-[#FF4D00]">AI Engine</div>
                        </div>
                        <div className="p-1 rounded bg-[#181818] border border-[#222222]">
                          <div className="text-[9px] font-mono text-neutral-400">Billing</div>
                          <div className="text-xs font-bold text-white">Stripe</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.previewVisualType === 'document-qa' && (
                    <div className="rounded-lg bg-[#141414] border border-[#262626] p-2.5 text-xs">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#222222]">
                        <div className="flex items-center gap-2">
                          <FileSearch size={13} className="text-[#FF4D00]" />
                          <span className="font-semibold text-white text-[11px]">MediScan Clinical AI</span>
                        </div>
                        <span className="text-[9.5px] font-mono text-[#FF4D00]">OCR: 99.2%</span>
                      </div>
                      <div className="bg-[#101010] p-1.5 rounded border border-[#222222] font-mono text-[9.5px] text-neutral-300 space-y-0.5">
                        <div className="flex justify-between">
                          <span>FASTING GLUCOSE:</span>
                          <span className="text-[#FF4D00] font-bold">112 mg/dL (ELEVATED)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TOTAL CHOLESTEROL:</span>
                          <span className="text-neutral-200 font-bold">178 mg/dL (NORMAL)</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {project.previewVisualType === 'bi-dashboard' && (
                    <div className="rounded-lg bg-[#141414] border border-[#262626] p-2.5 text-xs">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#222222]">
                        <div className="flex items-center gap-2">
                          <TrendingUp size={13} className="text-[#FF4D00]" />
                          <span className="font-semibold text-white text-[11px]">520K+ Orders ETL</span>
                        </div>
                        <span className="text-[9.5px] font-mono text-neutral-400">Power BI / SQL</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 text-center">
                        <div className="p-1 rounded bg-[#181818] border border-[#222222]">
                          <div className="text-[9px] font-mono text-neutral-400">Revenue</div>
                          <div className="text-xs font-bold text-white">£10.64M</div>
                        </div>
                        <div className="p-1 rounded bg-[#181818] border border-[#222222]">
                          <div className="text-[9px] font-mono text-neutral-400">Avg Order</div>
                          <div className="text-xs font-bold text-[#FF4D00]">£486.20</div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* 2. Project Card Content: Short Problem & Solution Only */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  
                  <div>
                    {/* Project Title */}
                    <h3 className="text-base font-bold font-berghan text-white tracking-tight mb-3 group-hover:text-[#FF4D00] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    {/* Problem Section */}
                    <div className="mb-2.5 bg-[#0F0F0F] border border-[#202020] rounded-lg p-2.5">
                      <div className="flex items-center gap-1.5 text-[9.5px] font-mono font-bold uppercase tracking-wider text-neutral-400 mb-0.5">
                        <AlertCircle size={11} className="shrink-0 text-neutral-400" />
                        <span>Problem</span>
                      </div>
                      <p className="text-[11.5px] text-neutral-300 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    {/* Solution Section */}
                    <div className="mb-3 bg-[#0F0F0F] border border-[#202020] rounded-lg p-2.5">
                      <div className="flex items-center gap-1.5 text-[9.5px] font-mono font-bold uppercase tracking-wider text-[#FF4D00] mb-0.5">
                        <CheckCircle2 size={11} className="shrink-0 text-[#FF4D00]" />
                        <span>Solution</span>
                      </div>
                      <p className="text-[11.5px] text-neutral-300 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="pt-2.5 border-t border-[#1C1C1C] text-[10.5px] font-mono text-neutral-400 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-neutral-500 font-semibold">Tech:</span>
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
              <div className="p-3.5 bg-[#0E0E0E] border-t border-[#1C1C1C] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,77,0,0.3)] cursor-pointer"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={11} />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#181818] hover:bg-[#222222] text-neutral-300 hover:text-white border border-[#2A2A2A] text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Github size={11} />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(project)}
                  className="text-neutral-400 hover:text-white text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer group/btn"
                >
                  <FileText size={11} className="text-[#FF4D00]" />
                  <span>Case Study</span>
                  <ArrowUpRight size={11} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
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
