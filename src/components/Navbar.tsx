import { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#about' },
  { name: 'Resume', href: '#resume' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const socials = [
  { icon: Github, href: 'https://github.com/AnasKhan2310' },
  { icon: Linkedin, href: 'https://linkedin.com/in/anas-khan1290' },
  { icon: Instagram, href: 'https://instagram.com/anas_khan_2310' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['home', 'about', 'resume', 'projects', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-16",
        scrolled ? "bg-dark shadow-xl py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-white text-lg md:text-xl font-black tracking-tighter whitespace-nowrap">MUHAMMAD ANAS KHAN</h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-10">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:text-accent relative group",
                    activeSection === link.href.slice(1) ? "text-accent" : "text-white/80"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full",
                    activeSection === link.href.slice(1) && "w-full"
                  )} />
                </a>
              </li>
            ))}
          </ul>
          
          <div className="h-4 w-[1px] bg-white/20 mx-2" />
          
          <div className="flex items-center space-x-4">
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-accent transition-colors duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-dark border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-6">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block text-sm font-bold uppercase tracking-widest transition-colors duration-300",
                        activeSection === link.href.slice(1) ? "text-accent" : "text-white/70"
                      )}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/10 flex items-center space-x-6">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-accent transition-colors duration-300"
                  >
                    <social.icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
