import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, BarChart3, Sparkles, BookOpen, Layers } from 'lucide-react';
import { FEATURED_PROJECTS, OTHER_PROJECTS, ProjectItem } from '../data/projectsData';

interface ProjectsSectionProps {
  onOpenCaseStudy: (project: ProjectItem) => void;
  onOpenInteractivePreview: (type: 'spotify') => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenCaseStudy,
  onOpenInteractivePreview
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'AI & SAAS',
    'DATA ANALYTICS',
    'AI / ML'
  ];

  const filterProject = (p: ProjectItem) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'AI & SAAS') return p.category === 'AI & SaaS';
    if (activeCategory === 'DATA ANALYTICS') return p.category === 'Data Analytics';
    if (activeCategory === 'AI / ML') return p.category === 'AI / ML';
    return true;
  };

  const filteredFeatured = FEATURED_PROJECTS.filter(filterProject);
  const filteredOther = OTHER_PROJECTS.filter(filterProject);

  return (
    <section id="projects" className="py-16 lg:py-24 border-t border-[#1C1C1C] relative z-10">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-block bg-[#FF4D00]/10 border border-[#FF4D00]/25 text-[#FF4D00] text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-sm mb-3">
          PROVEN SOLUTIONS & CASE STUDIES
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-syne tracking-tight mb-3">
          Featured Projects & Architecture
        </h2>
        <div className="w-12 h-0.5 bg-[#FF4D00] mx-auto mb-4" />
        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
          Production SaaS platforms, interactive data science dashboards, and document intelligence applications built to solve operational problems.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 select-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono font-bold tracking-wider px-3.5 py-1.5 rounded-md uppercase transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#FF4D00] text-white shadow-md'
                  : 'bg-[#121212] hover:bg-[#1A1A1A] text-neutral-400 hover:text-white border border-[#222222]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FEATURED PROJECTS (Main 4 Highlights) */}
      {/* ========================================================================= */}
      {filteredFeatured.length > 0 && (
        <div className="space-y-8 mb-16">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#FF4D00]">
            <Sparkles size={14} />
            <span>Core Flagship Case Studies</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredFeatured.map((project) => (
              <div
                key={project.id}
                className="bg-[#121212] border border-[#222222] hover:border-[#383838] rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 group shadow-lg"
              >
                <div>
                  
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FF4D00]/15 text-[#FF4D00] border border-[#FF4D00]/30 px-2.5 py-0.5 rounded-sm">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider bg-[#1A1A1A] border border-[#2A2A2A] px-2.5 py-0.5 rounded-sm">
                        {project.statusBadge}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono text-neutral-500 font-bold">
                      0{project.order}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl sm:text-2xl font-bold font-syne text-white tracking-tight mb-1">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-[#FF4D00] block mb-4">
                    {project.tag}
                  </span>

                  {/* Problem & Solution Accordion-like visual block */}
                  <div className="space-y-3 mb-5">
                    <div className="bg-[#171717] border border-[#242424] p-3.5 rounded-lg">
                      <span className="text-[10.5px] font-mono font-bold uppercase text-red-400 block mb-1">
                        The Problem:
                      </span>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="bg-[#171717] border border-[#242424] p-3.5 rounded-lg">
                      <span className="text-[10.5px] font-mono font-bold uppercase text-emerald-400 block mb-1">
                        Solution & Outcome:
                      </span>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono bg-[#181818] text-neutral-300 border border-[#2A2A2A] px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions Row */}
                <div className="pt-4 border-t border-[#202020] flex flex-wrap items-center justify-between gap-3">
                  
                  {/* Case Study Trigger */}
                  <button
                    type="button"
                    onClick={() => onOpenCaseStudy(project)}
                    className="text-xs font-mono font-bold text-white hover:text-[#FF4D00] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <BookOpen size={14} className="text-[#FF4D00]" />
                    <span>View Full Case Study</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </button>

                  <div className="flex items-center gap-2">
                    {/* In-app Interactive preview button */}
                    {project.hasInteractivePreview && project.previewType && (
                      <button
                        type="button"
                        onClick={() => onOpenInteractivePreview(project.previewType!)}
                        className="bg-[#1E1E1E] hover:bg-[#282828] text-white text-xs font-mono font-semibold px-3 py-1.5 rounded-md border border-[#333333] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <BarChart3 size={13} className="text-[#FF4D00]" />
                        <span>Interactive Demo</span>
                      </button>
                    )}

                    {/* Live Demo Link */}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={12} />
                      </a>
                    )}

                    {/* GitHub Link */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#181818] hover:bg-[#242424] text-neutral-300 hover:text-white p-2 rounded-md border border-[#2A2A2A] transition-colors"
                        title="View Source on GitHub"
                      >
                        <Github size={14} />
                      </a>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECONDARY PROJECTS ("Additional AI & Data Projects") */}
      {/* ========================================================================= */}
      {filteredOther.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-[#1C1C1C]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">
              <Layers size={14} className="text-[#FF4D00]" />
              <span>Additional AI & Data Science Projects</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">
              {filteredOther.length} Projects
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredOther.map((project) => (
              <div
                key={project.id}
                className="bg-[#121212] border border-[#222222] hover:border-[#333333] rounded-xl p-5 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase bg-[#181818] text-[#FF4D00] border border-[#2A2A2A] px-2 py-0.5 rounded-sm">
                      {project.statusBadge}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      0{project.order}
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-syne text-white tracking-tight mb-2">
                    {project.title}
                  </h4>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-[#161616] text-neutral-400 px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Links */}
                <div className="pt-3 border-t border-[#1E1E1E] flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => onOpenCaseStudy(project)}
                    className="text-xs font-mono text-neutral-400 hover:text-[#FF4D00] transition-colors cursor-pointer"
                  >
                    Details
                  </button>

                  <div className="flex items-center gap-2">
                    {project.id === 'spotify' ? (
                      <button
                        type="button"
                        onClick={() => onOpenInteractivePreview('spotify')}
                        className="text-xs font-mono font-bold text-[#FF4D00] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Interactive App</span>
                        <ArrowRight size={12} />
                      </button>
                    ) : project.liveDemoUrl ? (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono font-bold text-[#FF4D00] hover:underline flex items-center gap-1"
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1"
                      >
                        <Github size={13} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* GitHub Call to Action */}
      <div className="flex justify-center mt-12">
        <a
          href="https://github.com/AnasKhan2310"
          target="_blank"
          rel="noreferrer"
          className="bg-[#181818] hover:bg-[#222222] text-white text-xs font-mono font-bold uppercase tracking-wider px-6 py-3 rounded-lg border border-[#2D2D2D] hover:border-[#FF4D00]/50 transition-all flex items-center gap-2 shadow-sm"
        >
          <Github size={15} className="text-[#FF4D00]" />
          <span>Explore All Open-Source Repositories on GitHub</span>
        </a>
      </div>

    </section>
  );
};
