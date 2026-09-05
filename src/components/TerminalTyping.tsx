import { useEffect, useState } from 'react';

const phrases = [
  'Building AI Agents...',
  'Automating Workflows...',
  'Launching AI SaaS...',
  'Connecting APIs...'
];

export default function TerminalTyping() {
  const [currentText, setCurrentText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      // Deleting animation
      timer = setTimeout(() => {
        setCurrentText(prev => prev.slice(0, -1));
        setTypingSpeed(40); // Delete faster
      }, typingSpeed);
    } else {
      // Typing animation
      timer = setTimeout(() => {
        setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        setTypingSpeed(100); // Standard typing speed
      }, typingSpeed);
    }

    // Switch state triggers
    if (!isDeleting && currentText === currentPhrase) {
      // Pause at full phrase
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setPhraseIdx(prev => (prev + 1) % phrases.length);
      setTypingSpeed(150); // Pause briefly before next typing starts
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIdx, typingSpeed]);

  return (
    <div className="w-full bg-[#121212] border border-[#222222] rounded-xl overflow-hidden font-mono text-sm shadow-xl select-none">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border-b border-[#222222]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF4D00]" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
        </div>
        <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
          anas@agent: ~/ai-pipeline
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Terminal Body */}
      <div className="p-5 text-white min-h-[140px] flex flex-col justify-between leading-relaxed">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>System: neural-pipeline-v4.2 online</span>
          </div>
          <div className="text-[#FF5500] text-xs font-bold">
            $ execute ai_agent_daemon --model=gemini-2.5
          </div>
          <div className="text-white/50 text-xs">
            {`> compiling RAG vectors & MCP toolchains...`}
            <br />
            {`> orchestrating automated autonomous agent cluster [READY]`}
          </div>
        </div>

        {/* Typed Output Line */}
        <div className="flex items-center gap-2 mt-4 text-[#FF5500] font-bold md:text-base">
          <span className="text-white/40 font-black">&gt;</span>
          <span>{currentText}</span>
          <span className="w-2 h-4 bg-[#FF5500] animate-pulse inline-block" />
        </div>
      </div>
    </div>
  );
}
