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
    <div className="w-full bg-white border border-[#2C2825]/10 rounded-2xl overflow-hidden font-mono text-sm shadow-[0_10px_30px_rgba(44,40,37,0.05)] select-none">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#FAF8F5] border-b border-[#2C2825]/10">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="text-[10px] text-[#2C2825]/60 font-bold uppercase tracking-wider">
          anas@agent: ~/automation
        </div>
        <div className="w-12" /> {/* Spacer */}
      </div>

      {/* Terminal Body */}
      <div className="p-5 text-[#2C2825] min-h-[140px] flex flex-col justify-between leading-relaxed">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#2C2825]/40">
            <span>Last login: {new Date().toDateString()} on ttys001</span>
          </div>
          <div className="text-amber-600 text-xs font-bold">
            $ npm run deploy --prod
          </div>
          <div className="text-[#2C2825]/50 text-xs">
            {`> anas-portfolio@3.2.0 build:production`}
            <br />
            {`> compiling core agent flows and neural weights...`}
          </div>
        </div>

        {/* Typed Output Line */}
        <div className="flex items-center gap-2 mt-4 text-amber-600 font-semibold md:text-base">
          <span className="text-[#2C2825]/40 font-black">&gt;</span>
          <span>{currentText}</span>
          <span className="w-1.5 h-4 bg-amber-50 animate-pulse inline-block" />
        </div>
      </div>
    </div>
  );
}
