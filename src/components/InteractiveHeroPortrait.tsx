import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';

interface HalftoneDot {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  color: string;
}

interface InteractiveHeroPortraitProps {
  onOpenResume?: () => void;
}

export const InteractiveHeroPortrait: React.FC<InteractiveHeroPortraitProps> = ({ onOpenResume }) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotsRef = useRef<HalftoneDot[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const scrollProgressRef = useRef<number>(0);

  // Scroll Listener: gentle, progressive transition without any blast or explosion
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Gentle scroll range: 0px to 320px
          const progress = Math.min(1, Math.max(0, currentScrollY / 320));
          scrollProgressRef.current = progress;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sample portrait into high-density TINY micro-particles (step = 2.4)
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/anas_portrait.png';

    img.onload = () => {
      const targetW = 320;
      const targetH = Math.round((320 * img.height) / img.width);

      const offscreen = document.createElement('canvas');
      offscreen.width = targetW;
      offscreen.height = targetH;
      const ctx = offscreen.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, targetW, targetH);
      const imgData = ctx.getImageData(0, 0, targetW, targetH);
      const data = imgData.data;

      const dots: HalftoneDot[] = [];
      const step = 2.4; // High-density sampling for tiny particles

      for (let y = 0; y < targetH; y += step) {
        for (let x = 0; x < targetW; x += step) {
          const px = Math.floor(x);
          const py = Math.floor(y);
          const idx = (py * targetW + px) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Skip outer transparent pixels
          if (a < 25) continue;

          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

          // Only keep visible face and suit details
          if (brightness > 0.05) {
            // Tiny micro-particle radius (0.45px to 1.1px)
            const radius = Math.max(0.45, brightness * 1.1);

            let dotColor = '#ECECEC';
            if (x > targetW * 0.52 && (r > 130 && g > 75 && b < 105)) {
              dotColor = '#FF8800'; // Warm amber glow
            } else if (x > targetW * 0.65 && r > 90) {
              dotColor = '#FFAA33';
            } else if (brightness < 0.25) {
              dotColor = 'rgba(255, 255, 255, 0.45)';
            }

            // Smooth gentle outward drift vectors (NOT a blast)
            const angle = Math.atan2(py - targetH * 0.45, px - targetW * 0.5) + (Math.random() - 0.5) * 0.5;
            const driftSpeed = Math.random() * 0.35 + 0.15; // Slow gentle drift

            dots.push({
              x: px,
              y: py,
              ox: px,
              oy: py,
              vx: Math.cos(angle) * driftSpeed,
              vy: Math.sin(angle) * driftSpeed,
              radius,
              baseRadius: radius,
              alpha: (a / 255) * (brightness > 0.3 ? 0.95 : 0.65),
              color: dotColor,
            });
          }
        }
      }

      dotsRef.current = dots;
    };
  }, []);

  // Animation Loop: Slow, soft particle float proportional to scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const dots = dotsRef.current;
      const mouse = mouseRef.current;
      const progress = scrollProgressRef.current;

      // Particle rendering only active when slightly scrolled
      if (progress > 0.02) {
        const time = Date.now() * 0.001;

        for (let i = 0; i < dots.length; i++) {
          const d = dots[i];

          // Gentle displacement proportional to scroll progress (max 28px offset)
          const targetX = d.ox + d.vx * progress * 55 + Math.sin(time + i * 0.05) * (progress * 3);
          const targetY = d.oy + d.vy * progress * 55 + Math.cos(time + i * 0.05) * (progress * 3);

          // Smooth interpolation towards target
          d.x += (targetX - d.x) * 0.12;
          d.y += (targetY - d.y) * 0.12;

          // Gentle mouse hover reaction
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60 && dist > 0) {
            const force = (60 - dist) / 60;
            d.x += (dx / dist) * force * 1.5;
            d.y += (dy / dist) * force * 1.5;
          }

          // Render micro-particle
          ctx.fillStyle = d.color;
          ctx.globalAlpha = d.alpha * Math.min(1, progress * 1.8);
          const r = d.baseRadius;
          ctx.fillRect(d.x - r, d.y - r, r * 2, r * 2);
        }
      } else {
        // Reset dots smoothly to origin
        for (let i = 0; i < dots.length; i++) {
          dots[i].x = dots[i].ox;
          dots[i].y = dots[i].oy;
        }
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      running = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = (e.clientX - rect.left) * (320 / rect.width);
    mouseRef.current.y = (e.clientY - rect.top) * (388 / rect.height);
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  };

  // Smooth, gradual opacity transition without hard cuts
  const photoOpacity = Math.max(0, 1 - scrollProgress * 1.4);
  const canvasOpacity = Math.min(1, scrollProgress * 1.6);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none pt-2 pb-6">

      {/* ========================================================================= */}
      {/* 1. COMPACT PORTRAIT CONTAINER (REDUCED LENGTH & EXACT #0A0A0A MATCH) */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full max-w-[270px] sm:max-w-[310px] md:max-w-[340px] aspect-[660/800] mx-auto flex flex-col items-center justify-center group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label="Portrait with gentle particle dispersion on scroll"
      >
        {/* Soft amber-orange ambient rim glow behind right shoulder & hair */}
        <div 
          className="absolute top-1/4 right-1/4 w-44 sm:w-56 h-44 sm:h-56 rounded-full pointer-events-none blur-[90px] bg-[#FF8800]/25 transition-all duration-700 z-0" 
        />

        {/* Soft cool key light glow behind left face */}
        <div 
          className="absolute top-1/4 left-1/4 w-36 sm:w-48 h-36 sm:h-48 rounded-full pointer-events-none blur-[80px] bg-neutral-800/30 z-0" 
        />

        {/* The 100% Real Studio Portrait Photo (Solid State with exact transparent edges) */}
        <motion.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center z-10 pointer-events-none overflow-hidden"
          animate={{
            opacity: photoOpacity,
            scale: 1 - scrollProgress * 0.04,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <img 
            src="/anas_portrait.png" 
            alt="Muhammad Anas Khan - Studio Portrait" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top select-none pointer-events-none"
            draggable={false}
          />
        </motion.div>

        {/* Tiny Particle Matrix Canvas (Gentle, slow float) */}
        <canvas
          ref={canvasRef}
          width={320}
          height={388}
          style={{ opacity: canvasOpacity }}
          className="w-full h-full object-cover object-top pointer-events-none z-20 transition-opacity duration-300"
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. EDITORIAL NAME TYPOGRAPHY & HEADLINE */}
      {/* ========================================================================= */}
      <div className="relative z-30 w-full max-w-4xl mx-auto text-center px-4 -mt-12 sm:-mt-16 md:-mt-20">
        
        {/* Name in Classic Editorial Serif */}
        <div className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white/90 leading-tight mb-2">
          <span className="font-normal">Muhammad </span>
          <span className="italic font-normal">Anas Khan</span>
        </div>

        {/* Primary Professional Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4 sm:mb-5 font-display max-w-3xl mx-auto">
          I Help Businesses <span className="text-[#FF4D00]">Turn Data Into AI Solutions</span>
        </h1>

        {/* Supporting Text */}
        <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed mb-7 sm:mb-9">
          I build data analytics dashboards, machine learning models, and practical AI applications that help businesses understand data, solve problems, and make better decisions.
        </p>

        {/* 3 Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <a
            href="#projects"
            className="bg-[#FF4D00] hover:bg-[#E04400] text-white text-xs sm:text-sm font-sans font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(255,77,0,0.35)] hover:shadow-[0_0_25px_rgba(255,77,0,0.5)] flex items-center gap-2 cursor-pointer"
          >
            <span>View My Projects</span>
            <ArrowDown size={14} className="animate-bounce" />
          </a>

          <a
            href="#contact"
            className="bg-[#121212] hover:bg-[#1A1A1A] text-white border border-[#2E2E2E] hover:border-neutral-400 text-xs sm:text-sm font-sans font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer group"
          >
            <span>Let's Work Together</span>
            <ArrowUpRight size={15} className="text-[#FF4D00] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {onOpenResume && (
            <button
              type="button"
              onClick={onOpenResume}
              className="bg-[#141414] hover:bg-[#1C1C1C] text-neutral-300 hover:text-white border border-[#262626] hover:border-neutral-500 text-xs sm:text-sm font-sans font-medium px-5 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Download size={14} className="text-[#FF4D00] group-hover:scale-110 transition-transform" />
              <span>Download Resume</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default InteractiveHeroPortrait;
