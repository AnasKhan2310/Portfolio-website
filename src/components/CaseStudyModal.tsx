import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, ArrowRight, Layers, Cpu, Database, BarChart3, Sparkles } from 'lucide-react';
import { ProjectItem } from '../data/projectsData';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenInteractivePreview?: (type: 'spotify') => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
  onOpenInteractivePreview
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#121212] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="bg-[#1A1A1A] border-b border-[#2A2A2A] px-5 sm:px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-[#FF4D00]/15 text-[#FF4D00] border border-[#FF4D00]/30 px-2.5 py-1 rounded-sm">
              {project.category}
            </span>
            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider bg-[#222222] px-2.5 py-1 rounded-sm">
              {project.statusBadge}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8 text-neutral-300 font-sans">
          
          {/* Title & Overview */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-syne tracking-tight mb-3">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl">
              {project.shortDescription}
            </p>

            {/* Quick Action Links */}
            <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-[#222222]">
              {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-md transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Live Application</span>
                  <ExternalLink size={13} />
                </a>
              )}

              {project.hasInteractivePreview && project.previewType && onOpenInteractivePreview && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenInteractivePreview(project.previewType!);
                  }}
                  className="bg-[#242424] hover:bg-[#303030] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-md transition-all border border-[#3A3A3A] flex items-center gap-2 cursor-pointer"
                >
                  <BarChart3 size={14} className="text-[#FF4D00]" />
                  <span>Launch In-App Preview</span>
                </button>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1A1A1A] hover:bg-[#252525] text-neutral-300 hover:text-white text-xs font-mono font-semibold px-4 py-2 rounded-md transition-all border border-[#2D2D2D] flex items-center gap-2"
                >
                  <Github size={14} />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Workflow Sequence (if available, e.g. for forecasting) */}
          {project.caseStudy.workflowSteps && project.caseStudy.workflowSteps.length > 0 && (
            <div className="bg-[#181818] border border-[#282828] p-5 rounded-xl">
              <h3 className="text-xs font-mono font-bold uppercase text-[#FF4D00] tracking-widest mb-3.5 flex items-center gap-2">
                <Sparkles size={14} />
                System Engineering Workflow
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {project.caseStudy.workflowSteps.map((step, idx) => (
                  <div key={idx} className="bg-[#101010] p-3 rounded-lg border border-[#222222] flex items-start gap-2.5">
                    <span className="text-[11px] font-mono font-bold text-[#FF4D00] bg-[#FF4D00]/10 px-2 py-0.5 rounded shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="text-xs text-neutral-300 font-medium leading-tight">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Problem & Approach Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Problem */}
            <div className="bg-[#161616] border border-[#242424] p-5 sm:p-6 rounded-xl">
              <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold uppercase tracking-wider mb-2.5">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span>The Problem Statement</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white font-syne mb-2">
                What friction does this solve?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {project.caseStudy.businessProblem || project.problem}
              </p>
            </div>

            {/* The Engineering Approach */}
            <div className="bg-[#161616] border border-[#242424] p-5 sm:p-6 rounded-xl">
              <div className="flex items-center gap-2 text-[#FF4D00] text-xs font-mono font-bold uppercase tracking-wider mb-2.5">
                <Cpu size={14} />
                <span>Data & Engineering Approach</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white font-syne mb-2">
                How is the solution designed?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {project.caseStudy.approach}
              </p>
            </div>

          </div>

          {/* The Solution & Architecture */}
          <div className="bg-[#161616] border border-[#242424] p-5 sm:p-6 rounded-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2.5">
              <Layers size={14} />
              <span>What Was Built & Delivered</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white font-syne mb-2">
              System Architecture & Implementation
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {project.caseStudy.architectureSolution || project.solution}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-sm sm:text-base font-extrabold uppercase text-white tracking-wider mb-3.5 font-syne flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#FF4D00] rounded-sm" />
              Key Features & Modules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.caseStudy.keyFeatures.map((feat, idx) => (
                <div key={idx} className="bg-[#161616] border border-[#242424] p-3.5 rounded-lg flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-[#FF4D00] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Real Capabilities & Verified Outcomes */}
          <div>
            <h3 className="text-sm sm:text-base font-extrabold uppercase text-white tracking-wider mb-3.5 font-syne flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#FF4D00] rounded-sm" />
              Real Capabilities & Business Outcomes
            </h3>
            <div className="space-y-2.5">
              {project.caseStudy.capabilities.map((cap, idx) => (
                <div key={idx} className="bg-[#161616] border border-[#242424] p-3.5 rounded-lg flex items-start gap-2.5">
                  <ArrowRight size={14} className="text-[#FF4D00] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed">
                    {cap}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-[#181818] border border-[#262626] p-5 rounded-xl">
            <h3 className="text-xs font-mono font-bold uppercase text-neutral-400 tracking-widest mb-3 flex items-center gap-2">
              <Database size={13} className="text-[#FF4D00]" />
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-[#121212] text-neutral-300 border border-[#333333] text-xs font-mono px-3 py-1.5 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="bg-[#181818] border-t border-[#262626] px-5 sm:px-7 py-3.5 flex items-center justify-between text-xs text-neutral-400">
          <span className="font-mono text-[11px]">
            Muhammad Anas Khan • Portfolio Case Study
          </span>
          <button
            onClick={onClose}
            className="bg-[#2A2A2A] hover:bg-[#383838] text-white px-4 py-1.5 rounded-md font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
