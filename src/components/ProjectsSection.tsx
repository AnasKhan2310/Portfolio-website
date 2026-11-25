import React from 'react';
import { ProjectItem, FEATURED_PROJECTS } from '../data/projectsData';
import { 
  ExternalLink, 
  Github, 
  FileText, 
  ArrowUpRight
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
          <div className="w-10 h-0.5 bg-[#FF4D00] mx-auto" />
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="bg-[#121212] border border-[#222222] hover:border-[#383838] rounded-xl flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] group"
            >
              {/* 1. Project Card Content: Minimal Title & Tech Stack Only */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#FF4D00] block mb-1.5">
                    0{index + 1}.
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-berghan text-white tracking-tight group-hover:text-[#FF4D00] transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>

                {/* Tech Tags */}
                <div className="pt-3 border-t border-[#1C1C1C] text-[10.5px] font-mono text-neutral-400 flex flex-wrap items-center gap-x-2 gap-y-1">
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
