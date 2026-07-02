import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function GlowingCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // High performance motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring configurations for smooth trailing effect
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Inner dot spring configurations
  const innerSpringConfig = { damping: 15, stiffness: 600, mass: 0.1 };
  const innerCursorXSpring = useSpring(cursorX, innerSpringConfig);
  const innerCursorYSpring = useSpring(cursorY, innerSpringConfig);

  useEffect(() => {
    // Detect mobile/touch devices to avoid layout jank and double cursor issues on touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ambient glow trail */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-amber-500/40 bg-amber-500/5 pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      {/* Inner precise pointer dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-amber-600 pointer-events-none z-50 shadow-[0_0_8px_rgba(217,119,6,0.5)]"
        style={{
          x: innerCursorXSpring,
          y: innerCursorYSpring,
          transform: 'translate(12px, 12px)'
        }}
      />
    </>
  );
}
